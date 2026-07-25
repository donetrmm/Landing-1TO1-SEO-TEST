// Única fuente del dominio canónico. Al migrar a 1to1ai.com, cambia solo esta constante
// (los .txt de public/ — llms.txt, llms-full.txt — se actualizan a mano).
export const SITE_URL = 'https://1to1ai.vercel.app'

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
