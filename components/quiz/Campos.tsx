'use client'

import { useRef } from 'react'
import type { Pergunta } from '@/lib/quiz'

const cartao =
  'relative flex cursor-pointer items-center gap-4 rounded-2xl border border-line/40 bg-surface/30 px-5 py-4 text-left transition-colors duration-150 hover:border-line'
const cartaoMarcado = 'peer-checked:border-accent peer-checked:bg-accent/10'
const foco = 'peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink'

/**
 * Radio e checkbox nativos, escondidos com `sr-only` e desenhados pelo label.
 * `sr-only` recorta, não remove: as setas do teclado continuam navegando entre
 * as opções e o leitor de tela continua anunciando o grupo. Um `<div onClick>`
 * com aparência de botão perderia as duas coisas — o PRODUCT.md proíbe.
 */
export function GrupoOpcoes({
  pergunta,
  valor,
  onEscolher,
}: {
  pergunta: Pergunta
  valor: string | string[] | undefined
  /** `porPonteiro` diz se a escolha veio de clique/toque — só aí vale avançar sozinho. */
  onEscolher: (valor: string | string[], porPonteiro: boolean) => void
}) {
  // Avançar sozinho é bom no dedo e péssimo no teclado: quem navega com as
  // setas trocaria de tela ao passar pela segunda opção, sem nunca chegar na
  // terceira. Então a origem da interação decide.
  const porPonteiro = useRef(false)

  const multipla = pergunta.tipo === 'multipla'
  const marcados = multipla ? ((valor as string[]) ?? []) : valor ? [valor as string] : []
  const noTeto = multipla && !!pergunta.max && marcados.length >= pergunta.max

  const alternar = (opcao: string) => {
    if (!multipla) {
      onEscolher(opcao, porPonteiro.current)
      return
    }
    const proximo = marcados.includes(opcao)
      ? marcados.filter((v) => v !== opcao)
      : [...marcados, opcao]
    // Múltipla nunca avança sozinha: a pessoa ainda pode querer marcar a segunda.
    onEscolher(proximo, false)
  }

  return (
    <fieldset
      className="mt-8"
      onPointerDown={() => (porPonteiro.current = true)}
      onKeyDown={() => (porPonteiro.current = false)}
    >
      <legend className="sr-only">{pergunta.pergunta}</legend>
      <div className="grid gap-3">
        {pergunta.opcoes.map((opcao) => {
          const marcado = marcados.includes(opcao.value)
          const bloqueado = noTeto && !marcado
          return (
            <label
              key={opcao.value}
              className={bloqueado ? 'cursor-not-allowed opacity-40' : ''}
            >
              <input
                type={multipla ? 'checkbox' : 'radio'}
                name={pergunta.id}
                value={opcao.value}
                checked={marcado}
                disabled={bloqueado}
                onChange={() => alternar(opcao.value)}
                className="peer sr-only"
              />
              <span className={`${cartao} ${cartaoMarcado} ${foco}`}>
                <span
                  aria-hidden
                  className={`grid h-5 w-5 shrink-0 place-items-center border border-line ${
                    multipla ? 'rounded-md' : 'rounded-full'
                  } ${marcado ? 'border-accent bg-accent' : ''}`}
                >
                  {marcado && <span className="block h-2 w-2 rounded-full bg-ink" />}
                </span>
                <span className="text-base sm:text-lg">{opcao.label}</span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function CampoSelect({
  label,
  name,
  valor,
  onChange,
  opcoes,
}: {
  label: string
  name?: string
  valor: string
  onChange: (v: string) => void
  opcoes: { value: string; label: string }[]
}) {
  return (
    <label className="block text-left">
      <span className="text-sm font-bold uppercase tracking-[0.16em] text-paper/50">{label}</span>
      <select
        name={name}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full appearance-none rounded-2xl border border-line/40 bg-surface/30 px-5 py-4 text-base text-paper focus-visible:border-accent"
      >
        <option value="">Selecione</option>
        {opcoes.map((o) => (
          <option key={o.value} value={o.value} className="bg-ink">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function CampoTexto({
  label,
  name,
  valor,
  onChange,
  tipo = 'text',
  placeholder,
  inputMode,
  autoComplete,
}: {
  label: string
  name?: string
  valor: string
  onChange: (v: string) => void
  tipo?: string
  placeholder?: string
  inputMode?: 'text' | 'tel'
  autoComplete?: string
}) {
  return (
    <label className="block text-left">
      <span className="text-sm font-bold uppercase tracking-[0.16em] text-paper/50">{label}</span>
      <input
        type={tipo}
        name={name}
        // Nome próprio e telefone não são texto corrido: o corretor só marca
        // tudo de vermelho e atrapalha quem digita.
        spellCheck={false}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="mt-3 w-full rounded-2xl border border-line/40 bg-surface/30 px-5 py-4 text-base text-paper placeholder:text-paper/30 focus-visible:border-accent"
      />
    </label>
  )
}

/**
 * (11) 99999-9999 enquanto digita. O formatado é o que vai pra planilha, porque
 * é o que se lê; quem precisa de dígito puro (link do WhatsApp, checkout) tira
 * em `quiz-envio.ts`.
 */
export function formatarTelefone(bruto: string): string {
  const d = bruto.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}
