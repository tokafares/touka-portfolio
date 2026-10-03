import { Menu, Moon, Sun, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useActiveSection } from '../hooks/useActiveSection'
import { useEscape, useFocusTrap, useLockBodyScroll } from '../hooks/useOverlay'
import { useScrolled } from '../hooks/useScrolled'
import { useI18n } from '../i18n/useI18n'
import { useTheme } from '../theme/useTheme'
import { button, container } from '../lib/ui'
import { Logo } from './Logo'

export const SECTION_IDS = ['services', 'work', 'skills', 'process', 'contact'] as const

function LanguageToggle() {
  const { t, locale, toggleLocale } = useI18n()
  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.a11y.switchLanguage}
      lang={locale === 'en' ? 'ar' : 'en'}
      className={`${button.icon} w-auto px-3 text-[0.8125rem] font-semibold`}
    >
      {t.languageToggle}
    </button>
  )
}

function ThemeToggle() {
  const { t } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const toLight = theme === 'dark'
  return (
    <button type="button" onClick={toggleTheme} aria-label={toLight ? t.a11y.themeToLight : t.a11y.themeToDark} className={button.icon}>
      {toLight ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
    </button>
  )
}

export function Header() {
  const { t, num } = useI18n()
  const { pathname } = useLocation()
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS, pathname === '/')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const closeAndRestoreFocus = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  useEscape(menuOpen, closeAndRestoreFocus)
  useLockBodyScroll(menuOpen)
  useFocusTrap(menuOpen, panelRef)

  useEffect(() => {
    if (menuOpen) panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()
  }, [menuOpen])

  // Close the drawer if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const onChange = () => query.matches && setMenuOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const links = SECTION_IDS.map((id) => ({ id, label: t.nav[id], to: { pathname: '/', hash: `#${id}` } }))

  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-3 z-[60] -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition-transform focus:translate-y-0"
      >
        {t.a11y.skipToContent}
      </a>

      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          scrolled || menuOpen ? 'border-line bg-bg/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <div className={`${container} flex h-16 items-center justify-between gap-4`}>
          <Logo />

          <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => {
                const isActive = active === link.id
                return (
                  <li key={link.id}>
                    <Link
                      to={link.to}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${isActive ? 'text-text' : 'text-muted hover:text-text'}`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-accent transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.a11y.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`${button.icon} lg:hidden`}
            >
              <Menu aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer: outside the header so its backdrop-filter can't trap the fixed panel. */}
      <div className={`fixed inset-0 z-50 overflow-hidden lg:hidden ${menuOpen ? 'visible' : 'invisible delay-300'}`} aria-hidden={!menuOpen}>
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.a11y.mainNav}
          className={`absolute inset-y-0 end-0 flex w-[min(20rem,86vw)] flex-col border-s border-line bg-surface transition-transform duration-300 ease-out-soft ${
            menuOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-4">
            <Logo onNavigate={closeMenu} />
            <button type="button" onClick={closeAndRestoreFocus} aria-label={t.a11y.closeMenu} className={button.icon}>
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
          <nav aria-label={t.a11y.mainNav} className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="flex flex-col gap-1">
              {links.map((link, index) => (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    onClick={closeMenu}
                    className="flex items-baseline gap-3 rounded-xl px-3 py-3 text-lg font-medium transition-colors hover:bg-surface-2"
                  >
                    <span className="label text-accent">{num(index + 1, 2)}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
