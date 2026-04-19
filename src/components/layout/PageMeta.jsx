import { useEffect } from 'react'

const SITE = 'Giga Arena Aachen'

export function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — VR, Arcade & Racing`

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    if (description) meta.content = description

    // og tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.content = document.title

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc && description) ogDesc.content = description
  }, [title, description])

  return null
}

export default PageMeta
