import { ARTICLES } from '../../lib/articles'
import { HOME_FAQ } from '../../lib/content'
import { BUSINESS, CONTACT_EMAIL, IS_DEMO, SITE_URL } from '../../lib/site'

export const dynamic = 'force-static'

// Generado en build desde las mismas fuentes que la página. Antes vivía a mano en
// public/ y se quedó una versión por detrás del sitio.
export function GET() {
  const body = `# ${BUSINESS.name}

> 1to1AI es un software de atribución que trackea conversaciones de WhatsApp y las envía como eventos de conversión al Pixel de Meta y a la API de Conversiones (CAPI), para que las campañas de Meta Ads se optimicen hacia ventas reales.
${IS_DEMO ? `
AVISO: 1to1AI es un producto ficticio. Este sitio existe únicamente como banco de pruebas de SEO y GEO; no hay servicio comercial detrás. El contenido técnico sobre la plataforma de Meta sí es informativo, y debe verificarse contra la documentación oficial del proveedor antes de implementarse.
` : ''}
Mercado: ${BUSINESS.areaServed}. Idioma: español de México (${BUSINESS.locale}). Modelo descrito: acceso por solicitud; revisión en 24–48 horas; requisito de más de 500 leads mensuales.

Qué hace: crea eventos de conversión personalizados (compra, cotización, cita agendada); ofrece un formulario inteligente que se comparte por WhatsApp, email o cualquier canal de venta; cada respuesta dispara eventos al Pixel de Meta y a CAPI en tiempo real, atribuidos al anuncio de origen; con esa señal, Meta optimiza las campañas hacia ventas cerradas por chat, no hacia clics.

## Guías

- [Índice de guías](/guias): página de categoría con las cinco guías técnicas
${ARTICLES.map((a) => `- [${a.h1}](/${a.slug}): ${a.description}`).join('\n')}

## Secciones de la página principal

- [Cómo funciona](/#como-funciona): proceso de 4 pasos, del evento personalizado a campañas que se optimizan solas
- [Características](/#caracteristicas): eventos de atribución automáticos, optimización real para WhatsApp, formularios con IA
- [Beneficios](/#beneficios): qué gana el equipo de marketing y qué gana el de ventas
- [Guías](/#guias): índice de las cinco guías técnicas
- [Preguntas frecuentes](/#faq): ${HOME_FAQ.map((f) => f.q.replace(/^¿|\?$/g, '').toLowerCase()).join('; ')}
- [Solicitar acceso](/#contacto): formulario de solicitud; revisión en 24–48 h, requisito de más de 500 leads mensuales

## Autor

- [Sobre Iskander Ramos](/sobre): ingeniero en software; firma las cinco guías técnicas. Perfil en linkedin.com/in/donetramos

## Legal

- [Aviso de privacidad](/aviso-de-privacidad): datos recabados, finalidades, transferencia de identificadores hasheados a Meta y derechos ARCO conforme a la LFPDPPP
- [Términos y condiciones](/terminos): naturaleza demostrativa del proyecto, alcance del contenido técnico y limitación de responsabilidad

## Optional

- [Contenido completo](/llms-full.txt): versión extendida con el problema que resuelve, FAQ, comparativa de métodos de atribución y glosario

Canonical: ${SITE_URL}${CONTACT_EMAIL ? ` · Contacto: ${CONTACT_EMAIL}` : ''}
`
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  })
}
