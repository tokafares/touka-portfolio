import { THUMB_WIDTH, screenshotSizes } from '../data/screenshots.gen'
import type { ProjectSlug } from '../data/projects'

interface Size {
  width: number
  height: number
}

export function screenshotSize(slug: ProjectSlug, name: string): Size {
  const sizes: Record<string, Size> = screenshotSizes[slug]
  return sizes[name] ?? { width: 1440, height: 900 }
}

export function screenshotSrc(slug: ProjectSlug, name: string): string {
  return `/screenshots/${slug}/${name}.webp`
}

export function isMobileShot(slug: ProjectSlug, name: string): boolean {
  const { width, height } = screenshotSize(slug, name)
  return height > width
}

interface ScreenshotProps {
  slug: ProjectSlug
  name: string
  alt: string
  /** CSS `sizes` attribute, so the browser picks the 640px file for small slots. */
  sizes?: string
  eager?: boolean
  className?: string
}

export function Screenshot({ slug, name, alt, sizes = '(min-width: 1024px) 560px, 100vw', eager = false, className = '' }: ScreenshotProps) {
  const { width, height } = screenshotSize(slug, name)
  const full = screenshotSrc(slug, name)
  const thumb = `/screenshots/${slug}/${name}-${THUMB_WIDTH}.webp`
  return (
    <img
      src={full}
      srcSet={`${thumb} ${THUMB_WIDTH}w, ${full} ${width}w`}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      className={className}
    />
  )
}
