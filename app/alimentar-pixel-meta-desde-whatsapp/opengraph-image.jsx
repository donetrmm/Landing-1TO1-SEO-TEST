import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Cómo alimentar el Pixel de Meta desde WhatsApp'

export default function Image() {
  return ogImage({
    kicker: 'IMPLEMENTACIÓN',
    title: 'Cómo alimentar el Pixel de Meta desde WhatsApp',
    subtitle: 'No se instala un pixel en WhatsApp. Se escribe en su dataset desde el servidor.',
  })
}
