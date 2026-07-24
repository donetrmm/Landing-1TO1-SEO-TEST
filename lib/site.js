// Única fuente del dominio canónico. Al migrar a 1to1ai.com, cambia solo esta constante
// (los .txt de public/ — llms.txt, llms-full.txt — se actualizan a mano).
export const SITE_URL = 'https://1to1ai.vercel.app'

// 1to1AI es un producto ficticio: este sitio existe únicamente como banco de pruebas de
// SEO/GEO. Los datos de entidad son genéricos a propósito — no inventamos razón social,
// RFC ni domicilio fiscal, porque señales de entidad falsas son peor que ausentes.
export const IS_DEMO = true

export const BUSINESS = {
  name: '1to1AI',
  legalNotice:
    'Proyecto de demostración. 1to1AI no es una empresa constituida ni ofrece un servicio comercial.',
  email: 'hola@1to1ai.example',
  areaServed: 'México y LATAM',
  locale: 'es-MX',
}

// Fecha de última revisión editorial del contenido. Se usa en artículos y páginas legales.
export const LAST_REVIEWED = '2026-07-24'
