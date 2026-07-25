import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Términos y condiciones'

export default function Image() {
  return ogImage({
    kicker: 'Legal',
    title: 'Términos y condiciones',
    subtitle: 'Naturaleza demostrativa del proyecto y alcance del contenido publicado.',
  })
}
