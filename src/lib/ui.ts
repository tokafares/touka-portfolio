// Shared class recipes so buttons and chips look the same everywhere.
const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,transform,filter] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

export const button = {
  primary: `${base} h-11 px-5 text-sm bg-accent text-accent-ink hover:brightness-110`,
  secondary: `${base} h-11 px-5 text-sm border border-line-strong text-text hover:border-muted hover:bg-surface-2`,
  small: `${base} h-9 px-3.5 text-[0.8125rem] border border-line-strong text-text hover:border-muted hover:bg-surface-2`,
  smallPrimary: `${base} h-9 px-3.5 text-[0.8125rem] bg-accent text-accent-ink hover:brightness-110`,
  icon: 'inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-text transition-colors hover:border-line-strong hover:bg-surface-2',
}

export const chip = 'inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[0.72rem] leading-none text-muted'

export const container = 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'
