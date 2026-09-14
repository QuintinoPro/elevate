// Estado deduzido do DDD do WhatsApp. Substituiu o campo "de onde você é" da
// ficha, que saiu em 13/09/2026 quando a peneira encurtou: o DDD já diz o
// estado, então perguntar de novo era uma tela a mais pra responder o que a
// gente já tinha.
//
// Limite conhecido: é o estado do número, não de onde a pessoa mora hoje. Quem
// mudou e manteve o chip aparece no estado antigo. Pra segmentar encontro
// presencial é bom o bastante; pra endereço, não serve.
//
// Cada DDD pertence a um estado só. O 61 cobre o DF e parte do entorno em GO,
// e fica como DF.

const UF_POR_DDD: Record<string, string> = {
  11: 'SP', 12: 'SP', 13: 'SP', 14: 'SP', 15: 'SP', 16: 'SP', 17: 'SP', 18: 'SP', 19: 'SP',
  21: 'RJ', 22: 'RJ', 24: 'RJ',
  27: 'ES', 28: 'ES',
  31: 'MG', 32: 'MG', 33: 'MG', 34: 'MG', 35: 'MG', 37: 'MG', 38: 'MG',
  41: 'PR', 42: 'PR', 43: 'PR', 44: 'PR', 45: 'PR', 46: 'PR',
  47: 'SC', 48: 'SC', 49: 'SC',
  51: 'RS', 53: 'RS', 54: 'RS', 55: 'RS',
  61: 'DF',
  62: 'GO', 64: 'GO',
  63: 'TO',
  65: 'MT', 66: 'MT',
  67: 'MS',
  68: 'AC',
  69: 'RO',
  71: 'BA', 73: 'BA', 74: 'BA', 75: 'BA', 77: 'BA',
  79: 'SE',
  81: 'PE', 87: 'PE',
  82: 'AL',
  83: 'PB',
  84: 'RN',
  85: 'CE', 88: 'CE',
  86: 'PI', 89: 'PI',
  91: 'PA', 93: 'PA', 94: 'PA',
  92: 'AM', 97: 'AM',
  95: 'RR',
  96: 'AP',
  98: 'MA', 99: 'MA',
}

/** "(21) 99999-8888" → "RJ". DDD que não existe devolve vazio, não um palpite. */
export function ufPeloWhatsapp(telefone: string): string {
  const ddd = telefone.replace(/\D/g, '').slice(0, 2)
  return UF_POR_DDD[ddd] ?? ''
}
