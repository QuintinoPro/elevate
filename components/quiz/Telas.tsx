'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AccentHeadline } from '@/components/ui/SectionHeader'
import { CampoSelect, CampoTexto, GrupoOpcoes, formatarTelefone } from '@/components/quiz/Campos'
import { BRAND } from '@/lib/constants'
import { ESTADOS, FORA_DO_BRASIL } from '@/lib/estados'
import {
  abertura,
  apuracao,
  contato as copyContato,
  ficha as copyFicha,
  TOTAL_PASSOS,
  type Pergunta,
  type Resultado,
  type Trilha,
} from '@/lib/quiz'

const botao =
  'inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-bold transition-[filter,background-color,border-color,opacity] duration-200'
const primario = `${botao} bg-accent text-ink hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:brightness-100`
const fantasma = `${botao} border border-line text-paper hover:border-accent hover:text-accent`

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
    <div className="mb-10">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onVoltar}
          className="-ml-2 rounded-full px-2 py-1 text-sm text-paper/50 transition-colors hover:text-paper"
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
  onEscolher,
  onContinuar,
  onVoltar,
}: {
  pergunta: Pergunta
  valor: string | string[] | undefined
  onEscolher: (valor: string | string[], porPonteiro: boolean) => void
  onContinuar: () => void
  onVoltar: () => void
}) {
  const respondida = Array.isArray(valor) ? valor.length > 0 : !!valor

  return (
    <div className="mx-auto max-w-2xl text-center">
      <Progresso passo={pergunta.passo} onVoltar={onVoltar} />
      <h1 className="text-balance text-display-md font-bold">{pergunta.pergunta}</h1>
      {pergunta.ajuda && <p className="mt-4 text-base text-paper/50">{pergunta.ajuda}</p>}

      <GrupoOpcoes pergunta={pergunta} valor={valor} onEscolher={onEscolher} />

      {/* Sempre presente, mesmo quando o clique já avança sozinho: é o caminho
          de quem navega por teclado e a saída de quem marcou duas na múltipla. */}
      <button
        type="button"
        onClick={onContinuar}
        disabled={!respondida}
        className={`${primario} mt-8`}
      >
        Continuar
      </button>
    </div>
  )
}

// ─── Ficha ───────────────────────────────────────────────────────────────────

export function TelaFicha({
  trilha,
  valores,
  onChange,
  onContinuar,
  onVoltar,
}: {
  trilha: Trilha | null
  valores: Record<string, string>
  onChange: (id: string, valor: string) => void
  onContinuar: () => void
  onVoltar: () => void
}) {
  const campos = copyFicha.campos.filter(
    (c) => !('ocultarNasTrilhas' in c) || !trilha || !c.ocultarNasTrilhas.includes(trilha),
  )
  const completo = campos.every((c) => valores[c.id])

  return (
    <div className="mx-auto max-w-2xl text-center">
      <Progresso passo={TOTAL_PASSOS} onVoltar={onVoltar} />
      <h1 className="text-balance text-display-md font-bold">{copyFicha.titulo}</h1>
      <p className="mt-4 text-base text-paper/50">{copyFicha.ajuda}</p>

      <div className="mt-8 grid gap-5">
        {campos.map((campo) =>
          campo.tipo === 'estado' ? (
            <CampoSelect
              key={campo.id}
              label={campo.label}
              valor={valores[campo.id] ?? ''}
              onChange={(v) => onChange(campo.id, v)}
              opcoes={[...ESTADOS, FORA_DO_BRASIL].map((uf) => ({ value: uf, label: uf }))}
            />
          ) : (
            <CampoSelect
              key={campo.id}
              label={campo.label}
              valor={valores[campo.id] ?? ''}
              onChange={(v) => onChange(campo.id, v)}
              opcoes={'opcoes' in campo ? [...campo.opcoes] : []}
            />
          ),
        )}
      </div>

      <button type="button" onClick={onContinuar} disabled={!completo} className={`${primario} mt-8`}>
        Continuar
      </button>
    </div>
  )
}

// ─── Contato ─────────────────────────────────────────────────────────────────

export function TelaContato({
  valores,
  onChange,
  onEnviar,
  onVoltar,
}: {
  valores: { nome: string; whatsapp: string }
  onChange: (id: 'nome' | 'whatsapp', valor: string) => void
  onEnviar: () => void
  onVoltar: () => void
}) {
  const digitos = valores.whatsapp.replace(/\D/g, '')
  const valido = valores.nome.trim().length >= 2 && digitos.length >= 10

  return (
    <div className="mx-auto max-w-2xl text-center">
      <Progresso passo={TOTAL_PASSOS} onVoltar={onVoltar} />
      <h1 className="text-balance text-display-md font-bold">{copyContato.titulo}</h1>
      <p className="mt-4 text-base text-paper/50">{copyContato.ajuda}</p>

      <form
        className="mt-8 grid gap-5"
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
        <Link href="/" className="underline underline-offset-4 hover:text-paper/60">
          Voltar para a página da liga
        </Link>
      </p>
    </div>
  )
}
