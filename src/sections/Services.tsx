import { CalendarCheck, Languages, LayoutDashboard, PanelsTopLeft, ShoppingBag, type LucideIcon } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { serviceIds, type ServiceId } from '../data/services'
import { useI18n } from '../i18n/useI18n'
import { container } from '../lib/ui'

const icons: Record<ServiceId, LucideIcon> = {
  landing: PanelsTopLeft,
  dashboards: LayoutDashboard,
  ecommerce: ShoppingBag,
  booking: CalendarCheck,
  rtl: Languages,
}

export function Services() {
  const { t } = useI18n()
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28">
      <div className={container}>
        <SectionHeading id="services" index={1} eyebrow={t.services.eyebrow} title={t.services.title} intro={t.services.intro} />
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {serviceIds.map((id, index) => {
            const Icon = icons[id]
            const item = t.services.items[id]
            return (
              <li key={id} className={`bg-bg ${index === serviceIds.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                <Reveal delay={index * 60} className="group h-full p-6 transition-colors duration-300 hover:bg-surface sm:p-8">
                  <span className="mb-6 grid size-11 place-items-center rounded-xl border border-line bg-surface text-accent transition-colors duration-300 group-hover:border-accent/40">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="text-pretty text-muted">{item.body}</p>
                </Reveal>
              </li>
            )
          })}
          {/* Filler cell keeps the 3-column grid even on large screens. */}
          <li aria-hidden="true" className="hidden bg-bg lg:block">
            <div className="bg-grid h-full min-h-40 opacity-60" />
          </li>
        </ul>
      </div>
    </section>
  )
}
