'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AccentHeadline } from '@/components/ui/SectionHeader'
import { CampoTexto, GrupoOpcoes, formatarTelefone } from '@/components/quiz/Campos'
import { BRAND, PRIVACIDADE_PATH } from '@/lib/constants'
import {
  abertura,
  apuracao,
  contato as copyContato,
  TOTAL_PASSOS,
  type Pergunta,
  type Resultado,
} from '@/lib/quiz'

const botao =
  'inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-bold transition-[filter,background-color,border-color,opacity] duration-200'
const primario = `${botao} bg-accent text-ink hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:brightness-100`
const fantasma = `${botao} border border-line text-paper hover:border-accent hover:text-accent`

// Título das telas de pergunta e contato. Um degrau menor no celular: em 36px
// "O que você faz hoje?" ocupava três linhas em 360px e, somado às 6 opções,
// jogava o botão pra fora da tela.
const tituloTela = 'text-balance text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-display-md'

// ─── Abertura ────────────────────────────────────────────────────────────────

export function TelaAbertura({ onComecar }: { onComecar: () => void }) {
  return (
    <div className="mx-auto max-w-prose text-center">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">
        {abertura.eyebrow}
      </p>
      <h1 className="mx-auto mt-5 max-w-[22ch] text-balance text-display-md font-bold sm:text-display-lg">
        <AccentHeadline headline={abertura.headline} />
      </h1>
      <p className="mt-6 text-pretty text-lg text-paper/70">{abertura.body}</p>
      <p className="mt-4 text-sm text-paper/55">{abertura.nota}</p>
      <button type="button" onClick={onComecar} className={`${primario} mt-10`}>
        {abertura.cta}
      </button>
    </div>
  )
}

// ─── Progresso ───────────────────────────────────────────────────────────────

function Progresso({ passo, onVoltar }: { passo: number; onVoltar: () => void }) {
  return (
    <div className="mb-6 sm:mb-10">
      <div className="flex items-center justify-between gap-4">
        {/* py-3 com -my-2: área de toque de 44px sem empurrar a barra. */}
        <button
          type="button"
          onClick={onVoltar}
          className="-my-2 -ml-3 rounded-full px-3 py-3 text-sm text-paper/50 transition-colors hover:text-paper"
        >
          ← Voltar
        </button>
        <p className="text-sm tabular-nums text-paper/50">
          {passo} de {TOTAL_PASSOS}
        </p>
      </div>
      <div
        className="mt-3 h-px w-full bg-line/40"
        role="progressbar"
        aria-valuenow={passo}
        aria-valuemin={1}
        aria-valuemax={TOTAL_PASSOS}
        aria-label="Progresso da peneira"
      >
        <div
          className="h-px bg-accent transition-[width] duration-300"
          style={{ width: `${(passo / TOTAL_PASSOS) * 100}%` }}
        />
      </div>
    </div>
  )
}

// ─── Pergunta ────────────────────────────────────────────────────────────────

export function TelaPergunta({
  pergunta,
  valor,
  textoOutro,
  onEscolher,
  onTextoOutro,
  onContinuar,
  onVoltar,
}: {
  pergunta: Pergunta
  valor: string | string[] | undefined
  textoOutro: string
  onEscolher: (valor: string | string[], porPonteiro: boolean) => void
  onTextoOutro: (texto: string) => void
  onContinuar: () => void
  onVoltar: () => void
}) {
  const valorOutro = pergunta.opcoes.find((o) => o.outro)?.value
  const marcouOutro =
    !!valorOutro && (Array.isArray(valor) ? valor.includes(valorOutro) : valor === valorOutro)
  // "Outro" sem texto não é resposta: é a pessoa dizendo que nenhuma serve e
  // não dizendo qual serve. Duas letras bastam — "TI" é resposta.
  const respondida =
    (Array.isArray(valor) ? valor.length > 0 : !!valor) &&
    (!marcouOutro || textoOutro.trim().length >= 2)

  return (
    <div className="mx-auto max-w-2xl text-center">
      <Progresso passo={pergunta.passo} onVoltar={onVoltar} />
      <h1 className={tituloTela}>{pergunta.pergunta}</h1>
      {pergunta.ajuda && <p className="mt-3 text-base text-paper/50 sm:mt-4">{pergunta.ajuda}</p>}

      <GrupoOpcoes
        pergunta={pergunta}
        valor={valor}
        textoOutro={textoOutro}
        onEscolher={onEscolher}
        onTextoOutro={onTextoOutro}
        // Enter no campo do "Outro" faz o mesmo que o botão, se já der.
        onConfirmarOutro={() => respondida && onContinuar()}
      />

      {/* Sempre presente, mesmo quando o clique já avança sozinho: é o caminho
          de quem navega por teclado e a saída de quem marcou duas na múltipla. */}
      <button
        type="button"
        onClick={onContinuar}
        disabled={!respondida}
        className={`${primario} mt-6 sm:mt-8`}
      >
        Continuar
      </button>
    </div>
  )
}

// ─── Contato ─────────────────────────────────────────────────────────────────

export function TelaContato({
  valores,
  aceite,
  onChange,
  onAceite,
  onEnviar,
  onVoltar,
}: {
  valores: { nome: string; whatsapp: string }
  aceite: boolean
  onChange: (id: 'nome' | 'whatsapp', valor: string) => void
  onAceite: (aceite: boolean) => void
  onEnviar: () => void
  onVoltar: () => void
}) {
  const digitos = valores.whatsapp.replace(/\D/g, '')
  const valido = valores.nome.trim().length >= 2 && digitos.length >= 10 && aceite

  return (
    <div className="mx-auto max-w-2xl text-center">
      <Progresso passo={TOTAL_PASSOS} onVoltar={onVoltar} />
      <h1 className={tituloTela}>{copyContato.titulo}</h1>
      <p className="mt-3 text-base text-paper/50 sm:mt-4">{copyContato.ajuda}</p>

      <form
        className="mt-6 grid gap-4 sm:mt-8 sm:gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          if (valido) onEnviar()
        }}
      >
        <CampoTexto
          label="Seu nome"
          valor={valores.nome}
          onChange={(v) => onChange('nome', v)}
          placeholder="Como te chamam"
          name="nome"
          autoComplete="name"
        />
        <CampoTexto
          label="WhatsApp com DDD"
          valor={valores.whatsapp}
          onChange={(v) => onChange('whatsapp', formatarTelefone(v))}
          placeholder="(11) 99999-9999"
          tipo="tel"
          name="whatsapp"
          inputMode="tel"
          autoComplete="tel"
        />
        {/* Mesmo desenho das opções de múltipla escolha: checkbox nativo em
            sr-only, caixa desenhada ao lado. Fica colado no botão de propósito,
            porque é o último requisito dele — quem vê o botão apagado enxerga
            a caixa vazia logo acima. */}
        <label className="flex cursor-pointer items-start gap-3 text-left text-sm leading-relaxed text-paper/70">
          <input
            type="checkbox"
            name="aceite"
            checked={aceite}
            onChange={(e) => onAceite(e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink ${
              aceite ? 'border-accent bg-accent' : 'border-line'
            }`}
          >
            {aceite && (
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-ink" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            )}
          </span>
          <span>
            {copyContato.aceite.antes}
            <Link
              href={PRIVACIDADE_PATH}
              target="_blank"
              rel="noopener"
              className="text-accent underline underline-offset-4 hover:brightness-110"
            >
              {copyContato.aceite.link}
            </Link>
            {copyContato.aceite.depois}
          </span>
        </label>
        <div>
          <button type="submit" disabled={!valido} className={primario}>
            {copyContato.cta}
          </button>
          <p className="mt-4 text-sm text-paper/55">{copyContato.nota}</p>
        </div>
      </form>
    </div>
  )
}

// ─── Apuração ────────────────────────────────────────────────────────────────

/**
 * Teatro honesto: os três passos são exatamente o que o código faz enquanto a
 * tela está no ar. Curto de propósito — segurar mais que isso vira truque de
 * infoproduto e desmonta a sobriedade que a página inteira construiu.
 */
export function TelaApuracao() {
  const [ativo, setAtivo] = useState(0)

  useEffect(() => {
    const intervalo = apuracao.duracaoMs / apuracao.passos.length
    const id = setInterval(() => setAtivo((n) => Math.min(n + 1, apuracao.passos.length - 1)), intervalo)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mx-auto max-w-prose text-center" role="status" aria-live="polite">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">
        Apurando
      </p>
      <ul className="mt-8 grid gap-4">
        {apuracao.passos.map((passo, i) => (
          <li
            key={passo}
            className={`flex items-center justify-center gap-3 text-lg transition-opacity duration-500 ${
              i <= ativo ? 'opacity-100' : 'opacity-25'
            }`}
          >
            <span
              aria-hidden
              className={`h-2 w-2 shrink-0 rounded-full ${i <= ativo ? 'bg-accent' : 'bg-line'}`}
            />
            {passo}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Resultado ───────────────────────────────────────────────────────────────

export function TelaResultado({
  resultado,
  eco,
  nome,
  urlCheckout,
}: {
  resultado: Resultado
  eco: string
  nome: string
  urlCheckout: string | null
}) {
  const primeiroNome = nome.trim().split(' ')[0]

  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">
        {resultado.eyebrow}
        {primeiroNome && ` · ${primeiroNome}`}
      </p>
      <h1 className="mt-5 text-balance text-display-md font-bold sm:text-display-lg">
        <AccentHeadline headline={resultado.headline} />
      </h1>
      <p className="mt-6 text-pretty text-lg text-paper/70">{resultado.leitura.replace('{eco}', eco)}</p>

      <ul className="mt-10 grid gap-4">
        {resultado.bullets.map((b) => (
          <li key={b.titulo} className="rounded-2xl border border-line/40 bg-surface/30 px-5 py-5 text-left">
            <p className="font-bold">{b.titulo}</p>
            <p className="mt-2 text-paper/60">{b.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        {resultado.aprovado && resultado.cta ? (
          urlCheckout ? (
            <a href={urlCheckout} className={primario}>
              {resultado.cta}
            </a>
          ) : (
            // Botão parado é melhor que botão que leva a lugar nenhum. Some
            // sozinho no minuto em que o CHECKOUT_URL for preenchido.
            <div>
              <button type="button" disabled className={primario}>
                {resultado.cta}
              </button>
              <p className="mt-4 text-sm text-paper/55">
                Checkout em configuração — preencher <code>CHECKOUT_URL</code> em{' '}
                <code>lib/constants.ts</code>.
              </p>
            </div>
          )
        ) : (
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className={fantasma}>
            Seguir a gente no Instagram
          </a>
        )}
        {resultado.rodape && <p className="mt-6 text-sm text-paper/55">{resultado.rodape}</p>}
      </div>

      <p className="mt-12 text-sm text-paper/30">
        <Link href="/" className="inline-block py-3 underline underline-offset-4 hover:text-paper/60">
          Voltar para a página da liga
        </Link>
      </p>
    </div>
  )
}
