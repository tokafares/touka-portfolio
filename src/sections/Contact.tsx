import { ArrowUpRight, ChevronDown, Send } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { ChannelIcon } from '../components/ChannelIcon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useI18n } from '../i18n/useI18n'
import { buildMailto, channels, contactEmail } from '../lib/contact'
import { button, container } from '../lib/ui'

type ProjectType = 'landing' | 'dashboards' | 'ecommerce' | 'booking' | 'rtl' | 'other'
const projectTypes: readonly ProjectType[] = ['landing', 'dashboards', 'ecommerce', 'booking', 'rtl', 'other']

const MIN_MESSAGE = 10

const fieldClass =
  'w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-text placeholder:text-muted/70 transition-colors hover:border-muted focus-visible:border-accent aria-[invalid=true]:border-red-400'

function ContactForm() {
  const { t } = useI18n()
  const f = t.contact.form
  const uid = useId()
  const [name, setName] = useState('')
  const [type, setType] = useState<ProjectType>('landing')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({})
  const [opened, setOpened] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = {
      name: name.trim() ? undefined : f.errors.name,
      message: message.trim().length >= MIN_MESSAGE ? undefined : f.errors.message,
    }
    setErrors(next)
    if (next.name || next.message) {
      document.getElementById(`${uid}-${next.name ? 'name' : 'message'}`)?.focus()
      return
    }
    const typeLabel = f.types[type]
    const href = buildMailto(f.subject(typeLabel, name.trim()), f.body(message.trim(), typeLabel, name.trim()))
    if (!href) return
    window.location.href = href
    setOpened(true)
  }

  const errorId = (field: string) => `${uid}-${field}-error`

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-3xl border border-line bg-surface p-6 card-shadow sm:p-8">
      <h3 className="mb-6 text-xl font-semibold tracking-tight">{f.title}</h3>
      <div className="grid gap-5">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-medium">
            {f.name}
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={f.namePlaceholder}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? errorId('name') : undefined}
            className={fieldClass}
            maxLength={80}
          />
          {errors.name && (
            <p id={errorId('name')} className="mt-1.5 text-sm text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-type`} className="mb-2 block text-sm font-medium">
            {f.type}
          </label>
          <div className="relative">
            <select
              id={`${uid}-type`}
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value as ProjectType)}
              className={`${fieldClass} appearance-none pe-11`}
            >
              {projectTypes.map((id) => (
                <option key={id} value={id}>
                  {f.types[id]}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          </div>
        </div>

        <div>
          <label htmlFor={`${uid}-message`} className="mb-2 block text-sm font-medium">
            {f.message}
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={f.messagePlaceholder}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? errorId('message') : undefined}
            className={`${fieldClass} resize-y`}
            maxLength={2000}
          />
          {errors.message && (
            <p id={errorId('message')} className="mt-1.5 text-sm text-red-400">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xs text-sm text-muted">{f.note}</p>
          <button type="submit" className={button.primary}>
            {f.submit}
            <Send aria-hidden="true" className="flip-rtl size-4" />
          </button>
        </div>
        <p aria-live="polite" className="text-sm text-accent empty:hidden">
          {opened ? f.opened : ''}
        </p>
      </div>
    </form>
  )
}

export function Contact() {
  const { t } = useI18n()
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 sm:py-28">
      <div className={container}>
        <SectionHeading id="contact" index={5} eyebrow={t.contact.eyebrow} title={t.contact.title} intro={t.contact.intro} />
        <div className={`grid gap-6 ${contactEmail ? 'lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]' : ''}`}>
          <Reveal>
            <h3 className="label mb-4 text-muted">{t.contact.channelsTitle}</h3>
            <ul className={`grid gap-3 ${contactEmail ? '' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
              {channels.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noreferrer' : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-surface-2"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-bg text-accent">
                      <ChannelIcon id={c.id} className="size-[1.1rem]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{t.contact.channels[c.id]}</span>
                      <span className="block truncate font-mono text-sm text-muted">
                        <bdi>{c.handle}</bdi>
                      </span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="flip-rtl size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
                    {c.external && <span className="sr-only">{t.a11y.opensInNewTab}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          {contactEmail && (
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
