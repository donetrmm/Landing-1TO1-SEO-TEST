import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Atribución de WhatsApp vs UTMs'

export default function Image() {
  return ogImage({
    kicker: 'COMPARATIVA',
    title: 'Atribución de WhatsApp vs UTMs',
    subtitle: 'Los UTMs no están rotos: están fuera de jurisdicción. Comparativa de cinco métodos.',
  })
}
