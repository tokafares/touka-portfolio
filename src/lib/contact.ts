import { profile } from '../data/profile'

export const channelIds = ['email', 'whatsapp', 'linkedin', 'upwork', 'mostaql', 'khamsat', 'github'] as const
export type ChannelId = (typeof channelIds)[number]

export interface Channel {
  id: ChannelId
  href: string
  /** Short human-readable handle shown next to the label, e.g. the address or the username. */
  handle: string
  external: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WHATSAPP_RE = /^\d{8,15}$/
const GITHUB_RE = /^[a-z\d](?:[a-z\d-]{0,38})$/i

/** Accepts only absolute https URLs on the expected host, so placeholders and typos never render as broken links. */
function profileUrl(value: string, host: string): URL | null {
  if (!value.trim()) return null
  try {
    const url = new URL(value.trim())
    const ok = url.protocol === 'https:' && (url.hostname === host || url.hostname.endsWith(`.${host}`))
    return ok ? url : null
  } catch {
    return null
  }
}

function handleFrom(url: URL): string {
  const parts = url.pathname.split('/').filter(Boolean)
  return decodeURIComponent(parts.at(-1) ?? url.hostname)
}

export const contactEmail: string | null = EMAIL_RE.test(profile.email.trim()) ? profile.email.trim() : null

const whatsappDigits = profile.whatsapp.replace(/[\s+()-]/g, '')
export const whatsappNumber: string | null = WHATSAPP_RE.test(whatsappDigits) ? whatsappDigits : null

function buildChannels(): Channel[] {
  const list: Channel[] = []
  if (contactEmail) list.push({ id: 'email', href: `mailto:${contactEmail}`, handle: contactEmail, external: false })
  if (whatsappNumber) list.push({ id: 'whatsapp', href: `https://wa.me/${whatsappNumber}`, handle: `+${whatsappNumber}`, external: true })

  const hosts: [ChannelId, string, string][] = [
    ['linkedin', profile.linkedin, 'linkedin.com'],
    ['upwork', profile.upwork, 'upwork.com'],
    ['mostaql', profile.mostaql, 'mostaql.com'],
    ['khamsat', profile.khamsat, 'khamsat.com'],
  ]
  for (const [id, value, host] of hosts) {
    const url = profileUrl(value, host)
    if (url) list.push({ id, href: url.href, handle: handleFrom(url), external: true })
  }

  if (GITHUB_RE.test(profile.github)) {
    list.push({ id: 'github', href: `https://github.com/${profile.github}`, handle: profile.github, external: true })
  }
  return list
}

export const channels: readonly Channel[] = buildChannels()

export function channel(id: ChannelId): Channel | undefined {
  return channels.find((c) => c.id === id)
}

export function buildMailto(subject: string, body: string): string | null {
  if (!contactEmail) return null
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
