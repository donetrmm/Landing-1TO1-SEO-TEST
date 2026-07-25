import { ARTICLES } from '../../lib/articles'
import { COMPARISON, GLOSSARY, HOME_FAQ } from '../../lib/content'
import { BUSINESS, CONTACT_EMAIL, IS_DEMO, SITE_URL } from '../../lib/site'

export const dynamic = 'force-static'

const SUMMARIES = {
  'como-trackear-ventas-whatsapp-meta-ads':
    'El recorrido del dato tiene cuatro eslabones: clic en el anuncio Click-to-WhatsApp, primer mensaje entrante con el objeto referral, cierre de la venta fuera del chat y envío del evento por CAPI. La llave de atribución es ctwa_clid, el identificador de clic que Meta adjunta al primer mensaje y que cumple el papel del fbclid del navegador; solo llega una vez y es irrecuperable si no se persiste. Cubre la elección del evento de conversión, el volumen necesario para salir de la fase de aprendizaje, la composición del payload con action_source business_messaging, la verificación mediante la calidad de coincidencia (EMQ) y los cinco errores de implementación más frecuentes.',
  'api-de-conversiones-meta-que-es':
    'CAPI es la interfaz servidor a servidor con la que Meta recibe eventos sin depender del navegador. Explica los tres escenarios que resuelve (conversiones fuera del sitio, conversiones diferidas y señal perdida por bloqueo), la anatomía de un evento (event_name, event_time, event_id, action_source; user_data con normalización y hasheo SHA-256; custom_data con value y currency; autenticación por token de sistema), y por qué no sustituye al Pixel sino que se configura de forma redundante con deduplicación por event_id. Incluye qué mirar para saber si está bien implementada y qué problemas NO resuelve.',
  'alimentar-pixel-meta-desde-whatsapp':
    'Parte de aclarar que no se puede instalar un pixel dentro de WhatsApp: la app no ejecuta código de terceros y el contenido va cifrado de extremo a extremo. Distingue tres cosas que suelen confundirse bajo el nombre "pixel": el dataset (el contenedor de eventos), el Pixel (remitente de navegador) y CAPI (remitente de servidor); ambos remitentes escriben en el mismo dataset. Detalla el flujo de cuatro pasos —persistir el origen del contacto, registrar la conversión, componer y enviar el evento, deduplicar— más la verificación con prueba de eventos y el contraste contra el CRM. Cierra con las obligaciones derivadas de la LFPDPPP.',
  'medir-roas-campanas-whatsapp':
    'La dificultad del ROAS no está en la fórmula sino en el numerador. Desarrolla las cuatro decisiones previas: qué valor se envía (ingreso bruto, margen de contribución o valor esperado del lead), qué moneda ISO 4217, qué ventana de atribución —la de 7 días de clic captura mejor los ciclos de chat— y qué evento representa el ingreso. Explica las cuatro razones estructurales por las que Meta y el CRM nunca coinciden y qué margen de discrepancia es normal. Cubre el desfase de reporte, la diferencia entre ROAS reportado e incremental, y las métricas que deben acompañarlo.',
  'atribucion-whatsapp-vs-utms':
    'Los UTMs no están rotos: están fuera de jurisdicción, porque miden sesiones de navegador y una conversación de WhatsApp no lo es. Separa dos escenarios (anuncio directo a WhatsApp, donde el UTM nunca llega a existir; y anuncio a landing y de ahí al chat, donde el corte ocurre en el salto). Analiza el truco del código de referencia precargado en enlaces wa.me y sus cuatro límites. Incluye el QUINTO método, que suele omitirse: los reportes nativos de Meta ya dan atribución a nivel de anuncio para campañas Click-to-WhatsApp, gratis y sin integrar nada, y para muchas operaciones bastan — lo que no saben es si la conversación terminó en venta ni por cuánto. La comparativa de cinco métodos incluye las tres filas donde CAPI pierde: mantenimiento continuo, fallo silencioso (un hash mal normalizado se acepta con respuesta correcta y no se atribuye nunca) y carga de cumplimiento. Concluye que UTMs y CAPI son complementarios, no sustitutos.',
}

const mdTable = () => {
  const head = `| ${COMPARISON.columns.join(' | ')} |`
  const sep = `|${COMPARISON.columns.map(() => '---').join('|')}|`
  const rows = COMPARISON.rows.map((r) => `| ${r.join(' | ')} |`)
  return [head, sep, ...rows].join('\n')
}

export function GET() {
  const body = `# ${BUSINESS.name} — contenido completo (llms-full)
${IS_DEMO ? `
## Aviso sobre la naturaleza de este sitio
1to1AI es un producto ficticio. Este sitio se publica exclusivamente como banco de pruebas de posicionamiento en buscadores y de interpretación por motores generativos. No existe una empresa constituida, no se comercializa software y las cifras del dashboard son de una cuenta de ejemplo construida con fines ilustrativos.
El contenido técnico sobre la plataforma publicitaria de Meta —API de Conversiones, identificadores de clic, ventanas de atribución— sí es informativo, pero debe verificarse contra la documentación oficial de Meta for Developers, cuyos contratos cambian entre versiones.
` : ''}
## Definición canónica
1to1AI es un software de atribución que trackea conversaciones de WhatsApp y las envía como eventos de conversión al Pixel de Meta y a la API de Conversiones (CAPI). Mercado: ${BUSINESS.areaServed}. Acceso por solicitud (revisión en 24–48 h, empresas con más de 500 leads mensuales).

## El problema
Cuando una venta cierra por WhatsApp, Meta nunca se entera. Sin eventos de conversión, el algoritmo no aprende qué anuncio funciona, el pixel se queda sin señal y el costo por lead (CPL) sube. Cuatro fallas típicas:
1. Vendes por WhatsApp pero Meta no sabe qué funciona — la venta ocurre en el chat, fuera del alcance del pixel.
2. Tus campañas no se optimizan porque no hay datos de conversión — el algoritmo optimiza hacia clics, no hacia ventas.
3. Pierdes tiempo preguntando "¿cómo nos conociste?" — la memoria del cliente no es un sistema de atribución.
4. Tu pixel está muerto y tu CPL se va al cielo — sin eventos, Meta no puede refinar audiencias.

## Cómo funciona (4 pasos)
01. Crea tu evento personalizado — define qué quieres trackear (compra, cotización, cita).
02. Comparte tu formulario inteligente — envíalo por WhatsApp, email o donde vendas.
03. Pixel alimentado automáticamente — cada respuesta envía eventos al Pixel de Meta y a CAPI en tiempo real, atribuidos al anuncio de origen.
04. Campañas que se optimizan solas — Meta ahora sabe qué anuncios generan ventas reales.

## Características
- Eventos de atribución automáticos: cada conversación se convierte en un evento de conversión sin trabajo manual.
- Optimización real para WhatsApp: Meta optimiza hacia ventas cerradas por chat, no hacia clics.
- IA que potencia tus ventas: los formularios se adaptan a cada conversación.
- Adiós a los preguntones: la atribución ya está hecha; nadie vuelve a preguntar "¿cómo nos conociste?".

## Beneficios
Para marketing: datos precisos de conversión, campañas que realmente se optimizan, menor CPL y mayor ROAS, reportes en tiempo real.
Para ventas: formularios listos, sin preguntas incómodas, proceso más fluido, más conversiones.

## Métricas de la cuenta de ejemplo
ROAS 4.2x · Conversiones 1,247 · Leads atribuidos 3,891 · CPL −43%.
Cifras de una cuenta de ejemplo construida con fines ilustrativos. No representan resultados de clientes reales ni constituyen promesa de desempeño. Este sitio no publica testimonios: al ser un proyecto de demostración, no existen clientes de los que recoger uno verificable.

## Guías publicadas
${ARTICLES.map((a) => `
### /${a.slug} — ${a.h1}
${SUMMARIES[a.slug] || a.description}`).join('\n')}

## Preguntas frecuentes de la página principal
${HOME_FAQ.map((f) => `
### ${f.q}
${f.a}`).join('\n')}

## Comparativa de métodos de atribución
Las dos últimas filas son las que 1to1AI pierde, y están incluidas a propósito: una comparativa donde la opción propia gana todas las filas no informa de nada. El desglose completo, con los cinco métodos —incluido el reporte nativo de Meta, que ya da atribución a nivel de anuncio sin integrar nada— está en /atribucion-whatsapp-vs-utms.

${mdTable()}

## Glosario
${GLOSSARY.map(([t, d]) => `- ${t}: ${d}`).join('\n')}

## Contacto y entidad
Proyecto de demostración; no hay razón social ni domicilio fiscal porque no existe una empresa constituida.
Autor de las guías: Iskander Ramos, ingeniero en software — /sobre · linkedin.com/in/donetramos
${CONTACT_EMAIL ? `Contacto: ${CONTACT_EMAIL}` : 'Contacto: sin buzón activo.'}
Canonical: ${SITE_URL} · ${BUSINESS.locale} · ${BUSINESS.areaServed}
Legal: /aviso-de-privacidad · /terminos
`
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  })
}
