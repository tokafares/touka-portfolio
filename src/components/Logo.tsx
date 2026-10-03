import { Link } from 'react-router'
import { useI18n } from '../i18n/useI18n'
import { displayName, initials } from '../lib/name'

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  const { locale } = useI18n()
  const name = displayName(locale)
  return (
    <Link to="/" onClick={onNavigate} className="group inline-flex items-center gap-2.5 rounded-lg" aria-label={name}>
      <span
        aria-hidden="true"
        dir="ltr"
        className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-[0.8rem] font-semibold tracking-tight text-accent-ink transition-transform duration-300 group-hover:-rotate-6"
      >
        {initials()}
      </span>
      <span aria-hidden="true" className="text-[0.95rem] font-semibold tracking-tight">
        {name}
      </span>
    </Link>
  )
}
