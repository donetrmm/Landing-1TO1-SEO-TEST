import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '../../lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Qué es la API de Conversiones de Meta y para qué sirve'

export default function Image() {
  return ogImage({
    kicker: 'FUNDAMENTOS',
    title: 'Qué es la API de Conversiones de Meta y para qué sirve',
    subtitle: 'Envío servidor a servidor, campos del evento, hasheo de user_data y deduplicación.',
  })
}
