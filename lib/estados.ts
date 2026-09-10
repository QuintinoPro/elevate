// UFs para o campo "de onde você é" da ficha. Lista fechada em vez de campo
// livre: cidade digitada à mão chega como "sp", "S.Paulo" e "sao paulo" na
// mesma planilha e não dá pra agrupar nada depois.
export const ESTADOS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const

export const FORA_DO_BRASIL = 'Fora do Brasil'
