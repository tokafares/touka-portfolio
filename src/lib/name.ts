import { profile } from '../data/profile'
import type { Locale } from '../i18n/types'

export function displayName(locale: Locale): string {
  return locale === 'ar' && profile.nameAr.trim() ? profile.nameAr.trim() : profile.name
}

/** Two-letter monogram from the Latin name, e.g. "Toka Fares" → "tf". */
export function initials(): string {
  const letters = profile.name
    .trim()
    .split(/\s+/)
    .map((word) => word[0] ?? '')
    .join('')
  return (letters.slice(0, 2) || 'me').toLowerCase()
}
