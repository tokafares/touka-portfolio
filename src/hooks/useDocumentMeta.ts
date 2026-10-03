import { useEffect } from 'react'
import { SITE_URL } from '../data/site'

interface Meta {
  title: string
  description: string
  /** Path without the domain, e.g. '/projects/ember'. */
  path: string
  /** Absolute or root-relative image for Open Graph; defaults to the site card. */
  image?: string
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.append(el)
  }
  el.content = content
}

/** Keeps the title, description, canonical URL and social tags in sync with the current page and language. */
export function useDocumentMeta({ title, description, path, image = '/og-image.png' }: Meta) {
  useEffect(() => {
    const url = `${SITE_URL}${path === '/' ? '/' : path}`
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', imageUrl)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url)
  }, [title, description, path, image])
}
