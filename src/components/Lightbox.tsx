import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, type TouchEvent } from 'react'
import type { ProjectSlug } from '../data/projects'
import { useEscape, useFocusTrap, useLockBodyScroll } from '../hooks/useOverlay'
import { useI18n } from '../i18n/useI18n'
import { screenshotSize, screenshotSrc } from './Screenshot'

interface LightboxProps {
  slug: ProjectSlug
  images: readonly { name: string; caption: string }[]
  index: number | null
  onChange: (index: number) => void
  onClose: () => void
}

export function Lightbox({ slug, images, index, onChange, onClose }: LightboxProps) {
  const { t, dir } = useI18n()
  const open = index !== null
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStart = useRef<number | null>(null)
  const total = images.length

  const go = useCallback((delta: number) => index !== null && onChange((index + delta + total) % total), [index, onChange, total])

  useEscape(open, onClose)
  useLockBodyScroll(open)
  useFocusTrap(open, dialogRef)

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  // Arrow keys follow reading direction: in RTL, ArrowLeft moves forward.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      const forward = (event.key === 'ArrowRight') === (dir === 'ltr')
      go(forward ? 1 : -1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, dir, go])

  if (index === null) return null
  const image = images[index]
  if (!image) return null
  const { width, height } = screenshotSize(slug, image.name)

  const onTouchStart = (event: TouchEvent) => {
    touchStart.current = event.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current
    const end = event.changedTouches[0]?.clientX
    touchStart.current = null
    if (start === null || end === undefined || Math.abs(end - start) < 40) return
    const swipedLeft = end < start
    go(swipedLeft === (dir === 'ltr') ? 1 : -1)
  }

  const navButton =
    'grid size-11 place-items-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/70'

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={image.caption}
      className="animate-fade-in fixed inset-0 z-[70] flex flex-col bg-black/90 text-white backdrop-blur-sm"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="min-w-0 truncate text-sm text-white/80" aria-live="polite">
          <span className="text-white/50 tabular-nums">{t.a11y.imageCount(index + 1, total)}</span>
          <span aria-hidden="true" className="mx-2 text-white/30">
            ·
          </span>
          {image.caption}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t.a11y.closeGallery} className={navButton}>
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20 sm:pb-8" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img
          key={image.name}
          src={screenshotSrc(slug, image.name)}
          width={width}
          height={height}
          alt={image.caption}
          className="animate-fade-in max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
        />
        {total > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={t.a11y.previousImage} className={`${navButton} absolute start-3 top-1/2 -translate-y-1/2 max-sm:hidden`}>
              <ChevronLeft aria-hidden="true" className="flip-rtl size-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={t.a11y.nextImage} className={`${navButton} absolute end-3 top-1/2 -translate-y-1/2 max-sm:hidden`}>
              <ChevronRight aria-hidden="true" className="flip-rtl size-5" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex justify-center gap-3 pb-5 sm:hidden">
          <button type="button" onClick={() => go(-1)} aria-label={t.a11y.previousImage} className={navButton}>
            <ChevronLeft aria-hidden="true" className="flip-rtl size-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label={t.a11y.nextImage} className={navButton}>
            <ChevronRight aria-hidden="true" className="flip-rtl size-5" />
          </button>
        </div>
      )}
    </div>
  )
}
