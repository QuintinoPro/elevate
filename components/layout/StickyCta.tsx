import Link from 'next/link'
import { CTA_LABEL_MOBILE, QUIZ_PATH } from '@/lib/constants'

/**
 * Só no mobile: +11% de conversão em landing de tráfego social.
 *
 * O padding de baixo respeita a safe area: no iPhone com barra de gestos, um
 * `p-4` puro deixa o botão parcialmente embaixo dela. O `max()` mantém os 16px
 * onde não existe inset, então nada muda no Android e no desktop.
 */
export function StickyCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line/40 bg-ink/95 p-4 backdrop-blur sm:hidden"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <Link
        href={QUIZ_PATH}
        className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 text-base font-bold text-ink"
      >
        {CTA_LABEL_MOBILE}
      </Link>
    </div>
  )
}
