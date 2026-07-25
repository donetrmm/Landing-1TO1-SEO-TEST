import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Cómo trackear ventas de WhatsApp en Meta Ads'

export default function Image() {
  return ogImage({
    kicker: 'GUÍA BASE',
    title: 'Cómo trackear ventas de WhatsApp en Meta Ads',
    subtitle: 'Del clic en el anuncio al evento atribuido, y los cuatro puntos donde se rompe.',
  })
}
