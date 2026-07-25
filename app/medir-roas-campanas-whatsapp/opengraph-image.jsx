import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Cómo medir el ROAS de campañas que cierran por WhatsApp'

export default function Image() {
  return ogImage({
    kicker: 'MEDICIÓN',
    title: 'Cómo medir el ROAS de campañas que cierran por WhatsApp',
    subtitle: 'Valor de conversión, moneda, ventanas de atribución y ROAS incremental.',
  })
}
