// Saída da peneira: o que vai pra planilha e o que vai pro checkout.

import { CHECKOUT_URL, QUIZ_ENDPOINT } from '@/lib/constants'
import { classificar, ficha as copyFicha, perguntas, somarScore, type Trilha } from '@/lib/quiz'
import { lerUtms } from '@/lib/utm'

export type Respostas = Record<string, string | string[]>

// Nome de coluna por pergunta. Existe porque quem vai ler a planilha é o
// Khayllan e o Lucas, na mão — "i-tentou" não diz nada numa aba de 40 colunas.
// Colunas de trilhas diferentes ficam vazias nas linhas das outras trilhas, e
// tudo bem: é isso que permite filtrar "quem fatura mais de 10k" sem cruzar
// planilha nenhuma.
const COLUNAS: Record<string, string> = {
  idade: 'Idade',
  momento: 'O que faz hoje',
  'e-oque': 'O que vende',
  'e-tempo': 'Tempo de negócio',
  'e-faturamento': 'Faturamento mensal',
  'e-time': 'Sozinho ou com time',
  'e-gargalo': 'Gargalo',
  'c-area': 'Área de trabalho',
  'c-salario': 'Salário',
  'c-porfora': 'Tenta algo por fora',
  'c-objetivo': 'Objetivo em 12 meses',
  'c-trava': 'Trava',
  'i-estudo': 'Estudos',
  'i-renda': 'Trabalho e renda',
  'i-tentou': 'Já tentou no digital',
  'i-objetivo': 'O que quer primeiro',
  'i-trava': 'Trava',
  erros: 'Erros que já custaram tempo',
  temas: 'Temas de interesse',
  'tempo-semana': 'Horas por semana',
  investimento: 'Sobre os R$497',
}

/** Converte o valor guardado no rótulo que a pessoa leu na tela. */
const rotular = (perguntaId: string, valor: string | string[]): string => {
  const pergunta = perguntas.find((p) => p.id === perguntaId)
  if (!pergunta) return Array.isArray(valor) ? valor.join(' · ') : valor
  const valores = Array.isArray(valor) ? valor : [valor]
  return valores
    .map((v) => pergunta.opcoes.find((o) => o.value === v)?.label ?? v)
    .join(' · ')
}

/** O select da ficha guarda o value; quem lê a planilha quer o rótulo. */
const rotularFicha = (campoId: string, valor: string): string => {
  const campo = copyFicha.campos.find((c) => c.id === campoId)
  if (!campo || !('opcoes' in campo)) return valor
  return campo.opcoes.find((o) => o.value === valor)?.label ?? valor
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
  ficha: Record<string, string>
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
    'Estado': dados.ficha.estado ?? '',
    'Formação': dados.ficha.formacao ? rotularFicha('formacao', dados.ficha.formacao) : '',
    'Já saiu do Brasil': dados.ficha.viagem ? rotularFicha('viagem', dados.ficha.viagem) : '',
  }

  for (const [id, valor] of Object.entries(dados.respostas)) {
    linha[COLUNAS[id] ?? id] = rotular(id, valor)
  }

  for (const [chave, valor] of Object.entries(lerUtms())) {
    linha[chave] = valor
  }

  return linha
}

/**
 * Manda a linha pra planilha e segue a vida. Três decisões aqui:
 *
 * - `text/plain` no Content-Type: é o que evita o preflight OPTIONS, que o Web
 *   App do Apps Script não responde. O script faz o JSON.parse do corpo.
 * - `keepalive`: a pessoa vai clicar em "ir pro checkout" segundos depois, e a
 *   navegação cancelaria um fetch normal no meio.
 * - Nunca lança. Se a planilha estiver fora do ar, a pessoa ainda vê o
 *   resultado dela — perder o dado é ruim, perder a venda é pior.
 */
export async function enviarParaPlanilha(linha: Record<string, string | number>): Promise<boolean> {
  if (!QUIZ_ENDPOINT) return false
  try {
    await fetch(QUIZ_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(linha),
    })
    return true
  } catch {
    return false
  }
}

/**
 * URL do checkout com trilha, contato e campanha.
 *
 * A plataforma é a Hubla. Os nomes dos parâmetros (`name`, `phone`, `sck`)
 * vêm da convenção de Kiwify/Cakto/Hotmart e **ainda não foram confirmados na
 * Hubla** — parâmetro que ela não reconhece é ignorado, então nada quebra, mas
 * o pré-preenchimento pode simplesmente não acontecer. TODO: fazer uma compra
 * de teste e ver o que chega no formulário e no relatório de vendas.
 */
export function montarUrlCheckout(dados: DadosPeneira): string | null {
  if (!CHECKOUT_URL) return null
  try {
    const url = new URL(CHECKOUT_URL)
    if (dados.contato.nome) url.searchParams.set('name', dados.contato.nome)
    // Só dígitos: nenhuma plataforma de checkout aceita "(11) 99999-9999".
    const digitos = dados.contato.whatsapp.replace(/\D/g, '')
    if (digitos) url.searchParams.set('phone', digitos)
    if (dados.trilha) {
      url.searchParams.set('trilha', dados.trilha)
      // Parâmetro de rastreio livre da maioria das plataformas: faz a trilha
      // aparecer no relatório de vendas sem depender de cruzar planilha.
      url.searchParams.set('sck', `peneira-${dados.trilha}`)
    }
    for (const [chave, valor] of Object.entries(lerUtms())) {
      url.searchParams.set(chave, valor)
    }
    return url.toString()
  } catch {
    return CHECKOUT_URL
  }
}
