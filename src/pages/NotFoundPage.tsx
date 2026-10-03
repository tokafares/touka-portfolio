import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../i18n/useI18n'
import { displayName } from '../lib/name'
import { button, container } from '../lib/ui'

export function NotFoundPage() {
  const { t, locale, num } = useI18n()
  useDocumentMeta({ title: `${t.notFound.title} · ${displayName(locale)}`, description: t.notFound.body, path: '/404' })

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div className={`${container} flex min-h-[60vh] flex-col items-start justify-center py-24`}>
        <p className="step-num text-7xl text-accent sm:text-8xl">{num(404)}</p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{t.notFound.title}</h1>
        <p className="mt-3 max-w-md text-muted">{t.notFound.body}</p>
        <Link to="/" className={`${button.primary} mt-8`}>
          <ArrowLeft aria-hidden="true" className="flip-rtl size-4" />
          {t.notFound.home}
        </Link>
      </div>
    </section>
  )
}
