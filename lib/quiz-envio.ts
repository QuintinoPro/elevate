// Saída da peneira: o que vai pra planilha. Até 21/10/2026 também montava a
// URL do checkout; desde que o preço saiu do site, a planilha é o único destino.

import { QUIZ_ENDPOINT } from '@/lib/constants'
import { ufPeloWhatsapp } from '@/lib/estados'
import { classificar, perguntas, somarScore, type Trilha } from '@/lib/quiz'
import { privacidade } from '@/lib/privacidade'
import { lerUtms } from '@/lib/utm'

export type Respostas = Record<string, string | string[]>

// Nome de coluna por pergunta. Existe porque quem vai ler a planilha é o
// Khayllan e o Lucas, na mão — "i-tentou" não diz nada numa aba de 40 colunas.
// Colunas de trilhas diferentes ficam vazias nas linhas das outras trilhas, e
// tudo bem: é isso que permite filtrar "quem fatura mais de 10k" sem cruzar
// planilha nenhuma.
//
// Colunas de perguntas que saíram em 13/09 (tempo de negócio, time, área,
// objetivo, estudos, erros, temas, formação, viagem) continuam na planilha com
// as linhas antigas. O Apps Script só acrescenta coluna, nunca apaga. O mesmo
// vale pra "Sobre os R$497", que saiu em 21/10 com o preço.
const COLUNAS: Record<string, string> = {
  idade: 'Idade',
  momento: 'O que faz hoje',
  'e-oque': 'O que vende',
  'e-faturamento': 'Faturamento mensal',
  'e-gargalo': 'Gargalo',
  'c-porfora': 'Tenta algo por fora',
  'c-salario': 'Salário',
  'c-trava': 'Trava',
  'i-tentou': 'Já tentou no digital',
  'i-renda': 'Trabalho e renda',
  'i-trava': 'Trava',
  'tempo-semana': 'Horas por semana',
  quando: 'Quando quer começar',
}

/**
 * Converte o valor guardado no rótulo que a pessoa leu na tela. No "Outro", o
 * que interessa é o que ela escreveu: sai "Outro: servidor público", não só
 * "Outro", que numa planilha não diz nada.
 */
const rotular = (perguntaId: string, valor: string | string[], textoOutro?: string): string => {
  const pergunta = perguntas.find((p) => p.id === perguntaId)
  if (!pergunta) return Array.isArray(valor) ? valor.join(' · ') : valor
  const valores = Array.isArray(valor) ? valor : [valor]
  return valores
    .map((v) => {
      const opcao = pergunta.opcoes.find((o) => o.value === v)
      if (opcao?.outro && textoOutro?.trim()) return `${opcao.label}: ${textoOutro.trim()}`
      return opcao?.label ?? v
    })
    .join(' · ')
}

/**
 * Só os dígitos, com o 55 na frente quando o número é brasileiro. É o que faz o
 * wa.me funcionar — e o follow-up da peneira acontece no WhatsApp, então a
 * planilha precisa entregar o link clicável, não um número pra redigitar.
 */
const linkWhatsapp = (telefone: string): string => {
  const digitos = telefone.replace(/\D/g, '')
  if (digitos.length < 10 || digitos.length > 11) return ''
  return `https://wa.me/55${digitos}`
}

export type DadosPeneira = {
  respostas: Respostas
  trilha: Trilha | null
  resultadoId: string
  /** Texto do "Outro", por id de pergunta. Só vale se a opção marcada for o "Outro". */
  outros: Record<string, string>
  contato: { nome: string; whatsapp: string }
}

const NOME_TRILHA: Record<Trilha, string> = {
  empreendedor: 'Empreendedor',
  carreira: 'Carreira',
  inicio: 'Início',
}

export function montarLinha(dados: DadosPeneira): Record<string, string | number> {
  const score = somarScore(dados.respostas)
  const linha: Record<string, string | number> = {
    'Data': new Date().toISOString(),
    'Nome': dados.contato.nome,
    'WhatsApp': dados.contato.whatsapp,
    'Resultado': dados.resultadoId === 'empreendedor' || dados.resultadoId === 'carreira' || dados.resultadoId === 'inicio'
      ? 'Aprovado'
      : 'Não passou',
    'Trilha': dados.trilha ? NOME_TRILHA[dados.trilha] : '',
    'Score': score,
    'Temperatura': classificar(score),
    'Link WhatsApp': linkWhatsapp(dados.contato.whatsapp),
    // Pelo DDD, não perguntado — ver lib/estados.ts.
    'Estado': ufPeloWhatsapp(dados.contato.whatsapp),
    // Prova do consentimento da LGPD: o ônus de provar que a pessoa aceitou é
    // de quem guarda o dado. Só existe linha se a caixa foi marcada — a tela de
    // contato não envia sem ela —, então a coluna registra a data da política
    // que estava valendo no aceite, que é o que importa se ela mudar.
    'Aceite da política': `Sim (versão de ${privacidade.atualizacao})`,
  }

  for (const [id, valor] of Object.entries(dados.respostas)) {
    linha[COLUNAS[id] ?? id] = rotular(id, valor, dados.outros[id])
  }

  for (const [chave, valor] of Object.entries(lerUtms())) {
    linha[chave] = valor
  }

  return linha
}

/** Espera entre tentativas: a rede do celular costuma voltar em segundos. */
const ESPERAS_MS = [0, 1500, 4000]

/**
 * Manda a linha pra planilha. Quatro decisões aqui:
 *
 * - `text/plain` no Content-Type: é o que evita o preflight OPTIONS, que o Web
 *   App do Apps Script não responde. O script faz o JSON.parse do corpo.
 * - `keepalive`: a pessoa pode fechar a aba ou ir pro Instagram segundos
 *   depois, e a navegação cancelaria um fetch normal no meio.
 * - Três tentativas. Em `no-cors` o fetch só falha quando a rede cai (a
 *   resposta do script é opaca), e é exatamente o caso de rede ruim e do
 *   navegador do Instagram. Se a conexão cair depois de o script gravar, a
 *   repetição pode gerar uma linha duplicada — melhor que um lead perdido.
 * - Nunca lança: devolve false se as três falharem, e a tela de resultado
 *   oferece "Enviar de novo" em vez de dizer "Cadastro feito" (revisão de
 *   21/10/2026: antes o lead sumia sem ninguém saber). Sem QUIZ_ENDPOINT,
 *   devolve false de cara.
 */
export async function enviarParaPlanilha(linha: Record<string, string | number>): Promise<boolean> {
  if (!QUIZ_ENDPOINT) return false
  const corpo = JSON.stringify(linha)
  for (const espera of ESPERAS_MS) {
    if (espera) await new Promise((r) => setTimeout(r, espera))
    try {
      await fetch(QUIZ_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: corpo,
      })
      return true
    } catch {
      // Rede caiu: a próxima volta do laço tenta de novo.
    }
  }
  return false
}
