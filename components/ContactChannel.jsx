import { CONTACT_EMAIL } from '../lib/site'

// Canal de contacto, o su ausencia declarada. Mientras CONTACT_EMAIL sea null el sitio no
// finge tener buzón: decirlo es verificable, y una dirección que no resuelve no lo es.
export default function ContactChannel({ fallback = 'este sitio no tiene un buzón de contacto activo' }) {
  if (CONTACT_EMAIL) return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
  return <em>{fallback}</em>
}

export const hasContact = Boolean(CONTACT_EMAIL)
