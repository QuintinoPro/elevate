'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { asset } from '@/lib/constants'

/**
 * Lua com anel de partículas, adaptada do "lunar gravity card" para a Elevate.
 *
 * Três desvios deliberados do original, todos por causa das regras do brief:
 *  - Sem `Environment preset="city"`: o drei baixaria um HDR de vários MB de um
 *    CDN de terceiros. Luzes diretas dão um resultado próximo por zero byte.
 *  - Paleta refeita: o anel original é cinza/ciano/roxo. Aqui é branco e o azul
 *    da marca — a identidade não tem tom quente nem roxo.
 *  - Textura auto-hospedada em /brand/moon.jpg em vez do CDN externo, para o
 *    site não depender de um terceiro para renderizar.
 */

const RADIUS = 2
const PARTICLES = 18000 // o original usa 60k; aqui é asset de seção, não protagonista

function Moon() {
  const ref = useRef<THREE.Mesh>(null)
  const map = useTexture(asset('/brand/moon.jpg'))

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.05
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[RADIUS, 48, 48]} />
      <meshStandardMaterial map={map} bumpMap={map} bumpScale={0.02} roughness={0.85} metalness={0.1} />
    </mesh>
  )
}

function Ring() {
  const ref = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLES * 3)
    const col = new Float32Array(PARTICLES * 3)
    for (let i = 0; i < PARTICLES; i++) {
      const angle = Math.random() * Math.PI * 2
      const rDist = Math.pow(Math.random(), 1.5)
      const radius = 2.2 + rDist * 2.2
      const thickness = 0.4 - rDist * 0.2
      const y = (Math.random() + Math.random() + Math.random() - 1.5) * thickness

      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(angle) * radius

      // Só branco e o azul da marca. O brilho cai com a distância do centro,
      // e uma minoria cintila mais forte para o anel não ficar chapado.
      const intensity = 1 - rDist
      const azul = Math.random() < 0.35
      const sparkle = Math.random() > 0.95 ? 2.5 : 1
      const [r, g, b] = azul ? [0.12, 0.56, 1.0] : [0.75, 0.82, 0.9]
      col[i * 3] = r * intensity * sparkle
      col[i * 3 + 1] = g * intensity * sparkle
      col[i * 3 + 2] = b * intensity * sparkle
    }
    return [pos, col]
  }, [])

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y -= dt * 0.02
  })

  return (
    <points ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function MoonAsset() {
  return (
    <Canvas camera={{ position: [0, 4, 10], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.06} />
      <directionalLight position={[8, 5, 5]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.25} color="#1E90FF" />
      <group rotation={[Math.PI / 8, 0, 0]}>
        <Suspense fallback={null}>
          <Moon />
          <Ring />
        </Suspense>
      </group>
    </Canvas>
  )
}
