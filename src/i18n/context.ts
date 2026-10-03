import { createContext } from 'react'
import type { Locale, Translations } from './types'

export interface I18nContextValue {
  locale: Locale
  t: Translations
  dir: 'ltr' | 'rtl'
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  /** Formats a number with the locale's digits (Arabic-Indic in Arabic). */
  num: (value: number, minDigits?: number) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)
