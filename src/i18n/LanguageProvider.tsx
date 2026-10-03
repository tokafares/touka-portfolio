import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import { I18nContext, type I18nContextValue } from './context'
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, isLocale, translations } from './translations'
import type { Locale } from './types'

function initialLocale(): Locale {
  const stored = readStorage(LOCALE_STORAGE_KEY)
  return isLocale(stored) ? stored : DEFAULT_LOCALE
}

/** Loads Cairo only when Arabic is actually shown, so English visitors don't download it. */
function ensureArabicFont() {
  void import('@fontsource-variable/cairo')
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = locale === 'ar' ? 'rtl' : 'ltr'
    if (locale === 'ar') ensureArabicFont()
    writeStorage(LOCALE_STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])
  const toggleLocale = useCallback(() => setLocaleState((current) => (current === 'en' ? 'ar' : 'en')), [])

  const value = useMemo<I18nContextValue>(() => {
    const formatter = (minDigits: number) =>
      new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { minimumIntegerDigits: minDigits, useGrouping: false })
    return {
      locale,
      t: translations[locale],
      dir: locale === 'ar' ? 'rtl' : 'ltr',
      setLocale,
      toggleLocale,
      num: (n, minDigits = 1) => formatter(minDigits).format(n),
    }
  }, [locale, setLocale, toggleLocale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
