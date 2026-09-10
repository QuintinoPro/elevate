'use client'

import { useEffect } from 'react'
import { capturarUtms } from '@/lib/utm'

/**
 * Guarda os parâmetros de campanha assim que a landing carrega. Precisa estar
 * aqui e não só na peneira porque a navegação até /quiz/ é client-side: a query
 * string do anúncio se perde no caminho, e sem ela a venda chega no checkout
 * sem origem.
 *
 * Não renderiza nada e roda depois da hidratação — não toca no LCP.
 */
export function UtmKeeper() {
  useEffect(() => {
    capturarUtms()
  }, [])
  return null
}
