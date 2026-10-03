import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useI18n } from '../i18n/useI18n'
import { container } from '../lib/ui'

export function Process() {
  const { t, num } = useI18n()
  return (
    <section id="process" aria-labelledby="process-title" className="border-t border-line py-20 sm:py-28">
      <div className={container}>
        <SectionHeading id="process" index={4} eyebrow={t.process.eyebrow} title={t.process.title} intro={t.process.intro} />
        <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, index) => (
            <li key={step.title} className="bg-bg">
              <Reveal delay={index * 80} className="relative flex h-full flex-col p-6 sm:p-8">
                <span aria-hidden="true" className="step-num text-6xl leading-none text-accent">
                  {num(index + 1, 2)}
                </span>
                <h3 className="mt-8 mb-2 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="text-pretty text-muted">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
