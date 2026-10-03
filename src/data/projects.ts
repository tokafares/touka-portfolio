// Project facts that don't depend on language. All copy lives in src/i18n.
// Screenshot names match files in public/screenshots/<slug>/ (see scripts/optimize-images.mjs).

export const projectSlugs = ['nour-clinic', 'ember', 'sahtein', 'pulse-analytics', 'gamersense'] as const
export type ProjectSlug = (typeof projectSlugs)[number]

export interface Project {
  slug: ProjectSlug
  /** Omitted when there is no public demo. */
  liveUrl?: string
  repoUrl: string
  /** A fictional business built for the portfolio. */
  concept: boolean
  tech: readonly string[]
  /** Screenshot used on cards and as the case-study hero. */
  cover: string
  /** Gallery order on the case-study page. */
  screenshots: readonly string[]
}

export const projects: readonly Project[] = [
  {
    slug: 'nour-clinic',
    liveUrl: 'https://nour-clinic-silk.vercel.app',
    repoUrl: 'https://github.com/tokafares/nour-clinic',
    concept: true,
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Fastify', 'Drizzle ORM', 'PostgreSQL', 'Zod', 'Vitest'],
    cover: 'home',
    screenshots: ['home', 'booking', 'confirmation', 'admin-overview', 'admin-appointments', 'admin-hours', 'mobile-booking'],
  },
  {
    slug: 'ember',
    liveUrl: 'https://ember-store-ten.vercel.app',
    repoUrl: 'https://github.com/tokafares/ember-store',
    concept: true,
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'],
    cover: 'home',
    screenshots: ['home', 'shop', 'product', 'cart', 'checkout', 'mobile'],
  },
  {
    slug: 'sahtein',
    liveUrl: 'https://sahtein-restaurant.vercel.app',
    repoUrl: 'https://github.com/tokafares/sahtein-restaurant',
    concept: true,
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Intl API', 'RTL'],
    cover: 'hero-ar',
    screenshots: ['hero-ar', 'menu-ar', 'hero-en', 'reservation', 'mobile-menu'],
  },
  {
    slug: 'pulse-analytics',
    liveUrl: 'https://pulse-analytics-touka.vercel.app',
    repoUrl: 'https://github.com/tokafares/pulse-analytics',
    concept: true,
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'React Router'],
    cover: 'overview-dark',
    screenshots: ['overview-dark', 'overview-light', 'customers-drawer', 'login', 'mobile-overview'],
  },
  {
    slug: 'gamersense',
    // Backend-free demo build (the `demo` branch); live duels need the real server.
    liveUrl: 'https://gamersense-touka.vercel.app',
    repoUrl: 'https://github.com/tokafares/Gamer-Sense',
    concept: false,
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'Fastify', 'Socket.io', 'Prisma', 'PostgreSQL', 'Redis'],
    cover: 'landing',
    screenshots: ['landing', 'scenarios', 'guess-rank', 'guess-rank-results', 'profile', 'knowledge-hub', 'champion', 'mobile-landing'],
  },
]

export function findProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
