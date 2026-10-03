import { useEffect, type RefObject } from 'react'

/** Calls `onEscape` when Escape is pressed while `active`. */
export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, onEscape])
}

/** Prevents the page behind an open overlay from scrolling, without layout shift from the scrollbar. */
export function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return
    const { style } = document.body
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const previous = { overflow: style.overflow, paddingInlineEnd: style.paddingInlineEnd }
    style.overflow = 'hidden'
    if (scrollbar > 0) style.paddingInlineEnd = `${scrollbar}px`
    return () => {
      style.overflow = previous.overflow
      style.paddingInlineEnd = previous.paddingInlineEnd
    }
  }, [active])
}

/** Keeps Tab / Shift+Tab inside `container` while `active`. */
export function useFocusTrap(active: boolean, container: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !container.current) return
      const focusable = container.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, container])
}
