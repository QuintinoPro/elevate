import Link from 'next/link'
import { CTA_LABEL, QUIZ_PATH } from '@/lib/constants'

// Só no mobile: +11% de conversão em landing de tráfego social.
export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line/40 bg-ink/95 p-4 backdrop-blur sm:hidden">
      <Link
        href={QUIZ_PATH}
        className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 text-base font-bold text-ink"
      >
        {CTA_LABEL}
      </Link>
    </div>
  )
}
