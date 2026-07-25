import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Guías de atribución de WhatsApp para Meta Ads'

export default function Image() {
  return ogImage({
    kicker: 'Guías',
    title: 'Guías de atribución de WhatsApp para Meta Ads',
    subtitle: 'Cinco guías técnicas: ctwa_clid, API de Conversiones, deduplicación y ROAS.',
  })
}
