import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Emphasis } from '../components/Emphasis'
import { profile } from '../data/profile'
import { useI18n } from '../i18n/useI18n'
import { displayName } from '../lib/name'
import { button, container } from '../lib/ui'

export function Hero() {
  const { t, locale } = useI18n()
  const name = displayName(locale)
  const spec = profile.availableForWork
    ? [t.hero.spec.focus, t.hero.spec.stack, t.hero.spec.languages, t.hero.spec.availability]
    : [t.hero.spec.focus, t.hero.spec.stack, t.hero.spec.languages]

  return (
    <section aria-labelledby="hero-title" className="relative isolate -mt-16 overflow-hidden pt-16">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="bg-glow absolute inset-0 -z-10" />

      <div className={`${container} grid items-center gap-12 pt-14 pb-20 sm:pt-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16 lg:pt-28 lg:pb-24`}>
        <div>
          {profile.availableForWork && (
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 ps-2.5 pe-3.5 text-sm text-muted backdrop-blur">
              <span aria-hidden="true" className="status-dot size-2 rounded-full bg-accent" />
              {t.hero.available}
            </p>
          )}

          <h1 id="hero-title" className="text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
            {name}
          </h1>
          <p className="mt-4 text-2xl leading-snug font-medium tracking-tight text-muted sm:text-3xl">
            <Emphasis text={t.hero.role} />
          </p>
          <p className="mt-6 max-w-xl text-lg text-pretty text-text/85">{t.hero.lead}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={{ pathname: '/', hash: '#work' }} className={button.primary}>
              {t.hero.viewProjects}
              <ArrowDown aria-hidden="true" className="size-4" />
            </Link>
            <Link to={{ pathname: '/', hash: '#contact' }} className={button.secondary}>
              {t.hero.contactMe}
              <ArrowUpRight aria-hidden="true" className="flip-rtl size-4" />
            </Link>
          </div>
        </div>

        {/* A small "config file" card: a quick, factual summary instead of stats. */}
        <div className="hero-in hero-in-delay">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/80 card-shadow backdrop-blur">
            <div className="flex items-center justify-between border-b border-line px-4 py-3" dir="ltr">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-line-strong" />
                <span className="size-2.5 rounded-full bg-line-strong" />
                <span className="size-2.5 rounded-full bg-line-strong" />
              </div>
              <span className="font-mono text-xs text-muted">{t.hero.specFile}</span>
              <span className="w-10" />
            </div>
            <dl className="divide-y divide-line px-5 py-2 text-[0.9375rem]">
              {spec.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5 sm:grid-cols-[7.5rem_1fr]">
                  <dt className="label pt-0.5 text-accent">{label}</dt>
                  <dd className="text-text/90">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
