// Technologies used across the projects on this site. Names are not translated.

export const skillGroupIds = ['frontend', 'backend', 'database', 'tools'] as const
export type SkillGroupId = (typeof skillGroupIds)[number]

export const skills: Record<SkillGroupId, readonly string[]> = {
  frontend: ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind CSS', 'Vite', 'React Router', 'TanStack Query', 'Zustand', 'Framer Motion', 'Recharts', 'i18n & RTL'],
  backend: ['Node.js', 'Fastify', 'REST APIs', 'Socket.io', 'Zod', 'JWT auth'],
  database: ['PostgreSQL', 'Drizzle ORM', 'Prisma', 'Redis', 'Neon'],
  tools: ['Git & GitHub', 'Vercel', 'Railway', 'Docker', 'Vitest'],
}
