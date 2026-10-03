import { BriefcaseBusiness, Mail, Store } from 'lucide-react'
import type { ChannelId } from '../lib/contact'
import { GitHubIcon, LinkedInIcon, UpworkIcon, WhatsAppIcon } from './icons'

export function ChannelIcon({ id, className = 'size-4' }: { id: ChannelId; className?: string }) {
  switch (id) {
    case 'email':
      return <Mail aria-hidden="true" className={className} />
    case 'whatsapp':
      return <WhatsAppIcon className={className} />
    case 'linkedin':
      return <LinkedInIcon className={className} />
    case 'upwork':
      return <UpworkIcon className={className} />
    case 'mostaql':
      return <BriefcaseBusiness aria-hidden="true" className={className} />
    case 'khamsat':
      return <Store aria-hidden="true" className={className} />
    case 'github':
      return <GitHubIcon className={className} />
  }
}
