// El dominio que debe posicionar. Es el único que se indexa; cualquier otro despliegue
// —Netlify, previews, ramas— es un espejo y se marca noindex. Al migrar a 1to1ai.com,
// cambia esta constante (los .txt de public/ se actualizan a mano).
export const CANONICAL_URL = 'https://1to1ai.vercel.app'

const strip = (u) => (u || '').replace(/\/$/, '')

// El host del despliegue actual, resuelto en build.
//
// El default es el canónico: solo se desvía si detectamos POSITIVAMENTE un espejo. Es
// deliberado. Derivar la URL de variables de Vercel sería frágil — si el dominio de
// producción del proyecto no fuese exactamente CANONICAL_URL, el sitio bueno se
// marcaría a sí mismo como espejo y se saldría del índice. Un fallo de detección debe
// dejar el sitio indexable, nunca al revés.
//
// Consecuencia práctica: en Vercel no se lee ninguna variable y el build sale idéntico
// a como salía antes de existir este bloque.
//   NEXT_PUBLIC_SITE_URL → override manual, gana siempre
//   URL                  → lo inyecta Netlify con el dominio principal del sitio
const DEPLOY_URL =
  strip(process.env.NEXT_PUBLIC_SITE_URL) ||
  (process.env.NETLIFY ? strip(process.env.URL) : '')

export const SITE_URL = DEPLOY_URL || CANONICAL_URL

// Solo el despliegue canónico se indexa. Dos copias idénticas indexables se canibalizan
// y reparten señales entre ambas; y un espejo que se declara canónico hacia el otro
// dominio simplemente no posiciona, con lo que la comparación entre proveedores no
// mediría nada de todos modos.
export const IS_CANONICAL_DEPLOY = SITE_URL === CANONICAL_URL

// 1to1AI es un producto ficticio: este sitio existe únicamente como banco de pruebas de
// SEO/GEO. Los datos de entidad son genéricos a propósito — no inventamos razón social,
// RFC ni domicilio fiscal, porque señales de entidad falsas son peor que ausentes.
export const IS_DEMO = true

// Buzón de contacto real. `null` mientras no haya uno que resuelva de verdad.
//
// Antes había aquí 'hola@1to1ai.example'. Es peor que no poner nada: .example es un TLD
// reservado por la RFC 2606 que por diseño nunca resuelve, así que la dirección parecía
// un canal de contacto sin poder serlo — y arrastraba esa mentira al `email` del
// Organization del JSON-LD. Con null, la interfaz y el schema omiten el campo y el sitio
// dice explícitamente que no hay buzón, que es verdad comprobable.
//
// Para activarlo: pon aquí una dirección que recibas de verdad. Se propaga sola al
// footer, al aviso de privacidad, a los términos y al JSON-LD.
export const CONTACT_EMAIL = 'donetramosm@gmail.com'

// Autor de las guías. Es una persona real: todo lo que se declare aquí tiene que ser
// verificable. No hay años de experiencia, ni clientes, ni certificaciones, porque nadie
// me los ha dado — inventarlos sería el mismo fallo que la dirección .example, con la
// diferencia de que aquí se falsificarían credenciales de alguien.
export const AUTHOR = {
  name: 'Iskander Ramos',
  jobTitle: 'Ingeniero en Software',
  description:
    'Ingeniero en software. Firma las cinco guías técnicas sobre atribución de conversaciones de WhatsApp en Meta Ads publicadas en este sitio, contrastadas contra la documentación oficial de Meta.',
  url: '/sobre',
  sameAs: ['https://www.linkedin.com/in/donetramos'],
}

export const BUSINESS = {
  name: '1to1AI',
  legalNotice:
    'Proyecto de demostración. 1to1AI no es una empresa constituida ni ofrece un servicio comercial.',
  noContactNotice:
    'Sitio de demostración sin buzón de contacto: no hay una dirección a la que escribir.',
  areaServed: 'México y LATAM',
  locale: 'es-MX',
}

// Fecha de última revisión editorial global (páginas legales). Las guías llevan su
// propio `lastmod` en lib/articles.js: un lastmod compartido deja de ser veraz en cuanto
// editas una sola página, y Google descarta el campo entero cuando lo detecta.
export const LAST_REVIEWED = '2026-07-25'
