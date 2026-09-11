/**
 * Lockup horizontal da marca: ícone + ELEVATE + LEAGUE.
 *
 * A geometria não é inventada — sai do arquivo oficial da identidade
 * (`public/brand/lockup.svg`), que é um lockup vertical. Medindo lá dentro: o
 * ícone é um quadrado de 188, e o bloco de texto — ELEVATE (101,46 de altura)
 * + respiro (43,97) + LEAGUE (40,6 de caixa alta) — soma 186. Os dois têm a
 * mesma altura, e é isso que permite deitar o lockup na horizontal sem
 * redesenhar nada: o ícone encosta no topo e na base do bloco de texto.
 *
 * ELEVATE entra como path porque a fonte display da marca (Tanjiro) não existe
 * como arquivo — regra fechada no PRODUCT.md: o wordmark nunca é texto
 * renderizado. LEAGUE, no arquivo original, já é Sora, então aqui é texto de
 * verdade: herda a webfont da página. É também o motivo de o lockup.svg não
 * poder ser usado como <img src>: SVG carregado como imagem roda isolado, não
 * enxerga a webfont, e o LEAGUE cairia numa fonte de sistema qualquer.
 */

/** Proporções lidas do arquivo da marca, todas relativas à altura do bloco. */
const RAZAO = {
  elevate: 101.46 / 186.03,
  /** o wordmark é 6,787× mais largo que alto */
  proporcao: 688.59 / 101.46,
  respiro: 43.97 / 186.03,
  league: 40.6 / 186.03,
} as const

/** Na Sora a caixa alta ocupa ~0,7 do corpo da fonte. */
const CAIXA_ALTA = 0.7

export function Logo({ height = 36, className = '' }: { height?: number; className?: string }) {
  const elevateH = height * RAZAO.elevate
  const elevateW = elevateH * RAZAO.proporcao
  const leagueSize = (height * RAZAO.league) / CAIXA_ALTA
  // O respiro do arquivo é medido até o topo da caixa alta, mas a linha de
  // texto carrega meia entrelinha acima dela. Descontar, senão o LEAGUE cai
  // mais longe do ELEVATE do que na marca.
  const respiro = height * RAZAO.respiro - (leagueSize * (1 - CAIXA_ALTA)) / 2

  return (
    <span
      role="img"
      aria-label="Elevate League"
      className={`inline-flex items-center ${className}`}
      style={{ gap: height * 0.3 }}
    >
      {/* Ícone recortado no próprio desenho: o arquivo original tem uma moldura
          de folga de ~28% que, em tamanho de rodapé, some com o traço. */}
      <svg
        viewBox="442.94 325 188 188"
        width={height}
        height={height}
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M610.2,325h-146.52c-11.46,0-20.74,9.29-20.74,20.74v131.23l49.5,36.04h117.76c11.46,0,20.74-9.29,20.74-20.74v-146.53c0-11.45-9.29-20.74-20.74-20.74ZM594.81,479.52h-23.53v-76.22l-36.17-36.17-35.98,35.39v76.22h-23.72v-52.5l23.72-23.72v-32.67l26.44-26.44h19.06l50.17,49.97v86.14Z" />
      </svg>

      <span className="flex flex-col" style={{ gap: respiro }}>
        <svg
          viewBox="195.71 552.48 688.59 101.46"
          width={elevateW}
          height={elevateH}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M261.14,615.89h-47.85v20.46h-17.58v-56.64l26.66-26.66h61.83v17.58h-54.62l-16.29,16.29v11.53h47.85v17.44ZM213.29,636.36h70.9v17.58h-53.47l-17.44-17.58Z" />
          <path d="M300.48,553.06h17.58v83.3h-17.58v-83.3ZM318.06,636.36h70.91v17.58h-53.47l-17.44-17.58Z" />
          <path d="M466.21,615.89h-47.85v20.46h-17.58v-56.64l26.66-26.66h61.83v17.58h-54.62l-16.29,16.29v11.53h47.85v17.44ZM418.37,636.36h70.9v17.58h-53.47l-17.44-17.58Z" />
          <path d="M518.67,553.06v56.49l-17.58-17.58v-38.91h17.58ZM572.13,552.48h17.44v63.84l-37.18,37.04h-14.12l-19.6-19.6v-24.21l26.66,26.23,26.8-26.81v-56.49Z" />
          <path d="M625.6,629.15l13.26-13.26h24.64l-37.9,38.05h-17.58v-74.22l26.66-26.66h44.24v17.58h-37.04l-16.29,16.29v42.23ZM678.92,570.64l17.58,17.44v65.86h-17.58v-38.05h-15.42v-17.44h15.42v-27.81Z" />
          <path d="M699.68,553.06h88.49v17.58h-88.49v-17.58ZM735.13,653.94v-65.86l17.58-17.44v83.3h-17.58Z" />
          <path d="M861.23,615.89h-47.85v20.46h-17.58v-56.64l26.66-26.66h61.83v17.58h-54.62l-16.29,16.29v11.53h47.85v17.44ZM813.39,636.36h70.91v17.58h-53.47l-17.44-17.58Z" />
        </svg>

        {/* Centralizado sob o ELEVATE, como na marca. O text-indent compensa o
            espaçamento que a última letra também recebe e que, sem isso,
            empurraria a palavra meio caractere pra esquerda. */}
        <span
          aria-hidden="true"
          style={{
            width: elevateW,
            fontSize: leagueSize,
            // Peso fixo: se o lockup cair dentro de um bloco `font-bold`, o
            // LEAGUE engordaria sozinho e a marca sairia errada.
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '0.6em',
            textIndent: '0.6em',
            textAlign: 'center',
          }}
        >
          LEAGUE
        </span>
      </span>
    </span>
  )
}
