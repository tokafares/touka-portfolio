import { ArrowUp } from 'lucide-react'
import { useI18n } from '../i18n/useI18n'
import { channels } from '../lib/contact'
import { displayName } from '../lib/name'
import { container } from '../lib/ui'
import { ChannelIcon } from './ChannelIcon'

const SOURCE_URL = 'https://github.com/tokafares/touka-portfolio'

export function Footer() {
  const { t, locale, num } = useI18n()
  const year = num(new Date().getFullYear())

  return (
    <footer className="border-t border-line">
      <div className={`${container} flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between`}>
        <div className="space-y-1.5">
          <p className="font-semibold tracking-tight">
            © {year} {displayName(locale)}
          </p>
          <p className="text-sm text-muted">
            {t.footer.builtWith}{' '}
            <a href={SOURCE_URL} target="_blank" rel="noreferrer" className="underline decoration-line-strong underline-offset-4 hover:text-text">
              {t.footer.source}
              <span className="sr-only"> {t.a11y.opensInNewTab}</span>
            </a>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {channels
            .filter((c) => c.id !== 'email')
            .map((c) => (
              <a
                key={c.id}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.contact.channels[c.id]} ${t.a11y.opensInNewTab}`}
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-text"
              >
                <ChannelIcon id={c.id} />
              </a>
            ))}
          <a
            href="#top"
            className="ms-2 inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-line-strong hover:text-text"
          >
            {t.footer.backToTop}
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
