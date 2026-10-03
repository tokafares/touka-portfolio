import { FlaskConical, User } from 'lucide-react'
import { useI18n } from '../i18n/useI18n'

/** Honest label: concept projects are fictional businesses, personal projects are my own products. */
export function ProjectBadge({ concept }: { concept: boolean }) {
  const { t } = useI18n()
  const Icon = concept ? FlaskConical : User
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        concept ? 'border border-line-strong text-muted' : 'bg-accent-soft text-accent'
      }`}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {concept ? t.work.concept : t.work.personal}
    </span>
  )
}
