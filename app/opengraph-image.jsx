import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '../lib/og'

// Imagen por defecto del sitio. Las rutas que definen su propio opengraph-image la
// sobrescriben; el resto la hereda.
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt =
  '1to1AI — trackea tus ventas de WhatsApp y optimiza Meta Ads'

export default function Image() {
  return ogImage({
    kicker: 'Atribución de WhatsApp · México y LATAM',
    title: 'Convierte cada conversación de WhatsApp en datos que optimizan tus campañas',
    subtitle: 'Eventos de conversión al Pixel de Meta y a la API de Conversiones.',
  })
}
