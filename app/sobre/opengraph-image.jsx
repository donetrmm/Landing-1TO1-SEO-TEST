import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Iskander Ramos'

export default function Image() {
  return ogImage({
    kicker: 'Autor',
    title: 'Iskander Ramos',
    subtitle: 'Ingeniero en Software. Firma las cinco guías de atribución de WhatsApp.',
  })
}
