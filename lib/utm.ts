// Os parâmetros de campanha chegam na landing, mas quem precisa deles é o
// checkout — duas navegações depois. Como a navegação entre / e /quiz/ é
// client-side, a query string se perde no caminho: por isso guardamos em
// sessionStorage assim que a pessoa entra.
//
// sessionStorage e não localStorage de propósito: campanha é da visita, não da
// pessoa. Se ela voltar amanhã por link orgânico, a venda é do orgânico.

const CHAVES = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
] as const

const STORE = 'elevate:campanha'

/** Lê a URL atual e guarda o que houver. Chamar cedo, em toda página de entrada. */
export function capturarUtms(): void {
  if (typeof window === 'undefined') return
  try {
    const query = new URLSearchParams(window.location.search)
    const achados: Record<string, string> = {}
    for (const chave of CHAVES) {
      const valor = query.get(chave)
      if (valor) achados[chave] = valor
    }
    // Só sobrescreve se esta visita realmente trouxe campanha. Sem isso, um
    // clique interno sem query apagaria a origem da visita.
    if (Object.keys(achados).length) {
      sessionStorage.setItem(STORE, JSON.stringify(achados))
    }
  } catch {
    // Navegador in-app do Instagram em modo restrito bloqueia o storage. Não é
    // motivo pra derrubar a peneira: perde-se a atribuição, não o lead.
  }
}

/** O que estiver na URL de agora vence o que foi guardado antes. */
export function lerUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  let guardado: Record<string, string> = {}
  try {
    guardado = JSON.parse(sessionStorage.getItem(STORE) ?? '{}')
  } catch {
    guardado = {}
  }
  const agora: Record<string, string> = {}
  const query = new URLSearchParams(window.location.search)
  for (const chave of CHAVES) {
    const valor = query.get(chave)
    if (valor) agora[chave] = valor
  }
  return { ...guardado, ...agora }
}
