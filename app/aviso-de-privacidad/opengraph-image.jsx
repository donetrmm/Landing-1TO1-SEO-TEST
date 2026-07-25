import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Aviso de privacidad'

export default function Image() {
  return ogImage({
    kicker: 'Legal',
    title: 'Aviso de privacidad',
    subtitle: 'Datos recabados, finalidades, transferencias a Meta y derechos ARCO.',
  })
}
