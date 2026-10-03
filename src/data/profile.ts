/**
 * Your personal details, used everywhere on the site.
 *
 * Fill in every value marked TODO. Leave a value as '' to hide it:
 * empty or invalid links are filtered out automatically and never rendered.
 */
export const profile = {
  /** TODO: confirm how your name should appear (hero, footer, page titles). */
  name: 'Toka Fares',

  /** TODO (optional): your name in Arabic. When empty, `name` is shown on the Arabic version too. */
  nameAr: '',

  /**
   * TODO: public contact email, e.g. 'hello@example.com'.
   * Also turns on the contact form, which opens a pre-filled email to this address.
   */
  email: '',

  /** TODO: WhatsApp number in international format, digits only, e.g. '201001234567'. */
  whatsapp: '',

  /** TODO: full LinkedIn profile URL, e.g. 'https://www.linkedin.com/in/your-name'. */
  linkedin: '',

  /** TODO: full Upwork profile URL, e.g. 'https://www.upwork.com/freelancers/~0123456789abcdef'. */
  upwork: '',

  /** TODO: full Mostaql profile URL, e.g. 'https://mostaql.com/u/your-name'. */
  mostaql: '',

  /** TODO: full Khamsat profile URL, e.g. 'https://khamsat.com/user/your-name'. */
  khamsat: '',

  /** GitHub username. */
  github: 'tokafares',

  /** Shows the "available for freelance work" status in the hero. */
  availableForWork: true,
} as const
