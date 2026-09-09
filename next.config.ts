import type { NextConfig } from 'next'

// Vazio no dev e num domínio próprio; "/elevate" quando o GitHub Pages serve
// o site a partir do subcaminho do repositório. Quem define é o workflow.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  // Static export não tem otimizador de imagem no servidor.
  images: { unoptimized: true },
}

export default nextConfig
