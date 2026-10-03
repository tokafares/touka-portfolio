import { ar } from './ar'
import { en } from './en'
import type { Locale, Translations } from './types'

// Keep these keys in sync with the inline script in index.html.
export const LOCALE_STORAGE_KEY = 'touka:lang'
export const DEFAULT_LOCALE: Locale = 'en'

export const translations: Record<Locale, Translations> = { en, ar }

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ar'
}
