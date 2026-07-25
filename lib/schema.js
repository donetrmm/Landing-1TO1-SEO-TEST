import { AUTHOR, BUSINESS, CONTACT_EMAIL, IS_DEMO, SITE_URL } from './site'

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const LOGO_ID = `${SITE_URL}/#logo`
export const PERSON_ID = `${SITE_URL}/sobre#person`

// Persona real. Mismo criterio que el Organization: un nodo único con @id estable,
// referenciado desde el `author` de cada guía. Sin `worksFor`, porque 1to1AI es ficticio
// y vincular a una persona real con una empresa inexistente sería una afirmación falsa
// sobre ella.
export const personNode = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: AUTHOR.name,
  jobTitle: AUTHOR.jobTitle,
  url: `${SITE_URL}/sobre`,
  sameAs: AUTHOR.sameAs,
})

export const personRef = { '@id': PERSON_ID }

// Nodo canónico de la entidad. Se incluye en el @graph de TODAS las páginas con el mismo
// @id: así Google consolida una entidad única en vez de una copia inline por página.
// `author` y `publisher` la referencian con orgRef en lugar de redefinirla.
//
// Campos ausentes a propósito mientras el proyecto sea una demo: email (no hay buzón que
// resuelva), address y legalName (no hay persona moral constituida) y sameAs (no hay
// perfiles). Declarar cualquiera de ellos con datos inventados sería peor que omitirlo.
export const organizationNode = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: BUSINESS.name,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', '@id': LOGO_ID, url: `${SITE_URL}/uploads/logo.png` },
  areaServed: ['MX', 'LATAM'],
  ...(CONTACT_EMAIL
    ? {
        email: CONTACT_EMAIL,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: CONTACT_EMAIL,
          // Solo es-MX: la versión en inglés todavía no existe (el header la marca como
          // "próximamente"). Declarar un idioma que no se sirve es una afirmación falsa.
          availableLanguage: ['es-MX'],
        },
      }
    : {}),
  ...(IS_DEMO ? { disambiguatingDescription: BUSINESS.legalNotice } : {}),
})

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: BUSINESS.name,
  url: SITE_URL,
  inLanguage: 'es-MX',
  publisher: { '@id': ORG_ID },
})

export const orgRef = { '@id': ORG_ID }
