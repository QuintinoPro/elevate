/**
 * A seção do problema em uma imagem: os mesmos seis pontos, soltos de um lado
 * e ligados do outro. Não é ilustração de banco de imagem — é o argumento do
 * texto ("não falta conteúdo, falta gente") desenhado.
 *
 * Coordenadas fixas de propósito: nada aleatório, para o desenho ser idêntico
 * no servidor e no cliente, e entre um deploy e outro.
 */

const SOLTOS = [
  [58, 62],
  [140, 38],
  [206, 108],
  [46, 166],
  [152, 202],
  [214, 58],
] as const

const LIGADOS = [
  [398, 68],
  [478, 44],
  [552, 96],
  [392, 164],
  [468, 196],
  [546, 150],
] as const

const ARESTAS = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [4, 5],
  [1, 4],
  [2, 5],
  [0, 4],
] as const

export function NetworkGraphic({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="28 16 546 208"
      className={className}
      role="img"
      aria-label="Seis pontos soltos de um lado; os mesmos seis conectados do outro."
    >
      <defs>
        <radialGradient id="ng-glow">
          <stop offset="0%" stopColor="#1E90FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1E90FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soltos — visíveis o bastante para o contraste com o lado ligado ser
          o que se lê primeiro; fracos demais e o desenho perde o argumento */}
      {SOLTOS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#fff" fillOpacity="0.4" />
      ))}

      {/* ligados */}
      {/* raio contido dentro do viewBox: maior que isso e o degradê é cortado,
          deixando uma borda reta visível em volta do brilho */}
      <circle cx="470" cy="120" r="95" fill="url(#ng-glow)" />
      {ARESTAS.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={LIGADOS[a][0]}
          y1={LIGADOS[a][1]}
          x2={LIGADOS[b][0]}
          y2={LIGADOS[b][1]}
          stroke="#1E90FF"
          strokeOpacity="0.55"
          strokeWidth="1.6"
        />
      ))}
      {LIGADOS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7.5" fill="#1E90FF" />
      ))}
    </svg>
  )
}
