'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  TelaAbertura,
  TelaApuracao,
  TelaContato,
  TelaPergunta,
  TelaResultado,
} from '@/components/quiz/Telas'
import {
  apuracao,
  perguntas,
  perguntasDaTrilha,
  resultados,
  type Saida,
  type Trilha,
} from '@/lib/quiz'
import {
  enviarParaPlanilha,
  montarLinha,
  montarUrlCheckout,
  type DadosPeneira,
  type Respostas,
} from '@/lib/quiz-envio'
import { capturarUtms } from '@/lib/utm'

type Etapa = 'abertura' | 'perguntas' | 'contato' | 'apuracao' | 'resultado'

/** As duas primeiras perguntas, antes de existir trilha. */
const COMECO = perguntas.filter((p) => !p.trilhas).sort((a, b) => a.passo - b.passo).slice(0, 2)

/** Quando a pessoa muda a resposta da pergunta 2, o miolo antigo não vale mais. */
const semRespostasDeTrilha = (respostas: Respostas): Respostas =>
  Object.fromEntries(
    Object.entries(respostas).filter(([id]) => !perguntas.find((p) => p.id === id)?.trilhas),
  )

export function Peneira() {
  const [etapa, setEtapa] = useState<Etapa>('abertura')
  const [indice, setIndice] = useState(0)
  const [respostas, setRespostas] = useState<Respostas>({})
  const [trilha, setTrilha] = useState<Trilha | null>(null)
  const [saida, setSaida] = useState<Saida | null>(null)
  // O texto de cada "Outro", por pergunta. Fica guardado mesmo se a pessoa
  // trocar de opção — se ela voltar pro "Outro", o que escreveu continua lá.
  // Quem decide se vale é a opção marcada, na hora de montar a linha.
  const [outros, setOutros] = useState<Record<string, string>>({})
  const [contato, setContato] = useState({ nome: '', whatsapp: '' })
  const [aceite, setAceite] = useState(false)
  const [urlCheckout, setUrlCheckout] = useState<string | null>(null)

  const foco = useRef<HTMLDivElement>(null)
  const avancoAgendado = useRef<ReturnType<typeof setTimeout> | null>(null)
  // A trilha também vive num ref porque o avanço por clique é agendado: quando
  // o timeout dispara, o `trilha` capturado na renderização do clique ainda é o
  // anterior (null, na pergunta 2), e o fluxo calculado a partir dele teria 2
  // perguntas em vez de 7 — a peneira pulava o miolo inteiro e caía no contato.
  const trilhaRef = useRef<Trilha | null>(null)

  useEffect(() => {
    capturarUtms()
    return () => {
      if (avancoAgendado.current) clearTimeout(avancoAgendado.current)
    }
  }, [])

  // Cada tela é uma tela nova: volta pro topo e leva o foco junto, senão quem
  // navega por teclado continua no botão da tela anterior e quem usa leitor de
  // tela não é avisado de que a pergunta mudou.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    foco.current?.focus({ preventScroll: true })
  }, [etapa, indice])

  const fluxo = useMemo(() => (trilha ? perguntasDaTrilha(trilha) : COMECO), [trilha])
  const pergunta = fluxo[indice]

  /** O fluxo de agora, não o da renderização em que o clique aconteceu. */
  const fluxoAtual = useCallback(
    () => (trilhaRef.current ? perguntasDaTrilha(trilhaRef.current) : COMECO),
    [],
  )

  const dados: DadosPeneira = useMemo(
    () => ({
      respostas,
      trilha,
      resultadoId: saida ?? trilha ?? 'inicio',
      outros,
      contato,
    }),
    [respostas, trilha, saida, outros, contato],
  )

  // A tela da ficha (estado, formação, viagem) saiu em 13/09/2026: a última
  // pergunta leva direto ao contato, e o estado vem do DDD.
  const irParaContato = useCallback(() => setEtapa('contato'), [])

  const avancar = useCallback(
    (idPergunta?: string, valorEscolhido?: string | string[]) => {
      if (avancoAgendado.current) clearTimeout(avancoAgendado.current)

      // A rota de saída é lida da opção escolhida, não do estado: o setState
      // ainda não foi aplicado quando o clique avança.
      const opcao =
        idPergunta && typeof valorEscolhido === 'string'
          ? perguntas.find((p) => p.id === idPergunta)?.opcoes.find((o) => o.value === valorEscolhido)
          : undefined

      if (opcao?.saida === 'recusa-menor') {
        // Sai na primeira pergunta. Sem apuração e sem pedir contato: não há
        // lista de espera pra quem só precisa fazer aniversário.
        setSaida(opcao.saida)
        setEtapa('resultado')
        return
      }
      if (opcao?.saida === 'espera-investimento') {
        // Não passa, mas segue o fluxo até o contato — essa pessoa tem perfil e
        // vai pra lista de espera de verdade.
        setSaida(opcao.saida)
      }

      const ultima = indice >= fluxoAtual().length - 1
      if (ultima) irParaContato()
      else setIndice((i) => i + 1)
    },
    [fluxoAtual, indice, irParaContato],
  )

  const escolher = useCallback(
    (valor: string | string[], porPonteiro: boolean) => {
      if (!pergunta) return
      const id = pergunta.id

      setRespostas((anteriores) => {
        const proximas = { ...anteriores, [id]: valor }
        if (id !== 'momento') return proximas
        // A pergunta 2 é o ponto de ramificação: trocar a resposta dela invalida
        // o miolo já respondido de outra trilha.
        const novaTrilha =
          perguntas.find((p) => p.id === 'momento')?.opcoes.find((o) => o.value === valor)?.trilha ??
          null
        if (novaTrilha === trilha) return proximas
        return { ...semRespostasDeTrilha(anteriores), [id]: valor }
      })

      if (id === 'momento' && typeof valor === 'string') {
        const novaTrilha =
          perguntas.find((p) => p.id === 'momento')?.opcoes.find((o) => o.value === valor)?.trilha ??
          null
        // O ref primeiro, e de forma síncrona: é ele que o avanço agendado lê.
        trilhaRef.current = novaTrilha
        setTrilha(novaTrilha)
      }

      // O "Outro" nunca avança sozinho: a pessoa ainda precisa escrever.
      const marcouOutro =
        typeof valor === 'string' && !!pergunta.opcoes.find((o) => o.value === valor)?.outro

      if (porPonteiro && pergunta.tipo === 'unica' && !marcouOutro) {
        // Pausa curta só pra dar tempo de a opção acender antes da tela trocar.
        avancoAgendado.current = setTimeout(() => avancar(id, valor), 220)
      }
    },
    [avancar, pergunta, trilha],
  )

  const voltar = useCallback(() => {
    if (avancoAgendado.current) clearTimeout(avancoAgendado.current)
    if (etapa === 'contato') {
      setEtapa('perguntas')
      return setIndice(fluxo.length - 1)
    }
    if (indice === 0) return setEtapa('abertura')
    setIndice((i) => i - 1)
  }, [etapa, fluxo.length, indice])

  const enviar = useCallback(() => {
    setEtapa('apuracao')
    setUrlCheckout(montarUrlCheckout(dados))
    void enviarParaPlanilha(montarLinha(dados))
    setTimeout(() => setEtapa('resultado'), apuracao.duracaoMs)
  }, [dados])

  // A frase do resultado devolve a trava que a pessoa marcou. Se ela saiu antes
  // de chegar lá, cai no inimigo que a página inteira nomeia.
  //
  // No "Outro", o eco é o que ela escreveu, entre aspas. As aspas são o que faz
  // qualquer texto caber na frase: "o que te trava é “grana curta”" lê como
  // citação, e é exatamente isso — a gente repetindo o que ela disse. Sem aspas,
  // a gramática de um texto livre quebraria a frase metade das vezes.
  const eco = useMemo(() => {
    for (const id of ['e-gargalo', 'c-trava', 'i-trava']) {
      const escolhido = respostas[id]
      if (typeof escolhido !== 'string') continue
      const opcao = perguntas.find((p) => p.id === id)?.opcoes.find((o) => o.value === escolhido)
      if (opcao?.outro) {
        const texto = outros[id]?.trim().replace(/[.!?]+$/, '')
        // Minúscula na primeira letra, porque a citação cai no meio da frase.
        // Sigla fica como veio: "TI" não vira "tI".
        if (texto) {
          const sigla = texto.length > 1 && texto[1] === texto[1].toUpperCase() && /\p{L}/u.test(texto[1])
          return `“${sigla ? texto : texto[0].toLowerCase() + texto.slice(1)}”`
        }
      }
      if (opcao?.eco) return opcao.eco
    }
    return 'crescer sozinho'
  }, [respostas, outros])

  return (
    // O foco vem daqui a cada tela — é o que avisa leitor de tela e teclado de
    // que a pergunta mudou. Mas o anel do :focus-visible global existe pra
    // marcar o que é clicável, e este container não é: desenhado num bloco de
    // tela inteira, vira uma moldura azul em volta de tudo.
    <div
      ref={foco}
      tabIndex={-1}
      className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
    >
      {etapa === 'abertura' && <TelaAbertura onComecar={() => setEtapa('perguntas')} />}

      {etapa === 'perguntas' && pergunta && (
        <TelaPergunta
          key={pergunta.id}
          pergunta={pergunta}
          valor={respostas[pergunta.id]}
          textoOutro={outros[pergunta.id] ?? ''}
          onEscolher={escolher}
          onTextoOutro={(texto) => setOutros((o) => ({ ...o, [pergunta.id]: texto }))}
          onContinuar={() => {
            const valor = respostas[pergunta.id]
            avancar(pergunta.id, typeof valor === 'string' ? valor : undefined)
          }}
          onVoltar={voltar}
        />
      )}

      {etapa === 'contato' && (
        <TelaContato
          valores={contato}
          aceite={aceite}
          onChange={(id, valor) => setContato((c) => ({ ...c, [id]: valor }))}
          onAceite={setAceite}
          onEnviar={enviar}
          onVoltar={voltar}
        />
      )}

      {etapa === 'apuracao' && <TelaApuracao />}

      {etapa === 'resultado' && (
        <TelaResultado
          resultado={resultados[saida ?? trilha ?? 'inicio']}
          eco={eco}
          nome={contato.nome}
          urlCheckout={urlCheckout}
        />
      )}
    </div>
  )
}
