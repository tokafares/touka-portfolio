import { useI18n } from '../i18n/useI18n'
import { Emphasis } from './Emphasis'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  index: number
  eyebrow: string
  title: string
  intro?: string
}

/** Numbered section header: "01 — Services", a large title and an optional intro. */
export function SectionHeading({ id, index, eyebrow, title, intro }: SectionHeadingProps) {
  const { num } = useI18n()
  return (
    <Reveal className="mb-10 grid gap-5 sm:mb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-12">
      <div>
        <p className="label mb-4 flex items-center gap-3 text-muted">
          <span className="text-accent">{num(index, 2)}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          <Emphasis text={title} />
        </h2>
      </div>
      {intro && <p className="max-w-xl text-pretty text-muted lg:pb-1.5">{intro}</p>}
    </Reveal>
  )
}
