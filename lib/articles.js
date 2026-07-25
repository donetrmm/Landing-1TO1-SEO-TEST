// Registro único de las guías internas. Alimenta el sitemap, el hub de la home,
// los enlaces "sigue leyendo" y el JSON-LD de cada página. Añadir una guía = añadir
// una entrada aquí + su app/<slug>/page.jsx.

export const ARTICLES = [
  {
    slug: 'como-trackear-ventas-whatsapp-meta-ads',
    kicker: 'GUÍA BASE',
    title: 'Cómo trackear ventas de WhatsApp en Meta Ads (guía 2026)',
    h1: 'Cómo trackear ventas de WhatsApp en Meta Ads',
    description:
      'Guía práctica para atribuir las ventas que cierras por WhatsApp a la campaña de Meta que las originó: ctwa_clid, API de Conversiones, deduplicación y ventanas de atribución.',
    standfirst:
      'La venta ocurre en un chat, pero la decisión de presupuesto ocurre en Meta Ads. Este es el recorrido completo del dato — del clic en el anuncio al evento de conversión atribuido — y los cuatro puntos donde normalmente se rompe.',
    published: '2026-07-24',
    lastmod: '2026-07-24',
    related: [
      'api-de-conversiones-meta-que-es',
      'alimentar-pixel-meta-desde-whatsapp',
      'atribucion-whatsapp-vs-utms',
    ],
    sources: [
      { url: 'https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples/', title: 'Referencia de webhooks de mensajes', note: 'objeto referral del primer mensaje entrante' },
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/business-messaging/', title: 'API de conversiones para mensajes comerciales: guía de registro', note: 'eventos de conversación y ctwa_clid' },
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event/', title: 'Parámetros de eventos del servidor', note: 'event_name, event_time, event_id, action_source' },
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters/', title: 'Parámetros de información del cliente', note: 'normalización y hasheo de user_data' },
    ],
    faq: [
      {
        q: '¿Se puede trackear una venta de WhatsApp en Meta Ads?',
        a: 'Sí, pero no con el Pixel del navegador: WhatsApp no ejecuta JavaScript de terceros. La vía es capturar el identificador de clic ctwa_clid que Meta adjunta al primer mensaje entrante de un anuncio Click-to-WhatsApp y reenviar la conversión por la API de Conversiones con action_source business_messaging.',
      },
      {
        q: '¿Qué es ctwa_clid?',
        a: 'Es el identificador de clic que la plataforma de WhatsApp Business incluye en el objeto referral del primer mensaje que envía un usuario tras tocar un anuncio Click-to-WhatsApp. Funciona como el fbclid del navegador: es la llave que permite atribuir la conversación posterior al anuncio de origen.',
      },
      {
        q: '¿Cuánto tarda en verse la conversión en el Administrador de anuncios?',
        a: 'El evento suele aparecer en el Administrador de eventos en minutos, pero la atribución en los reportes de campaña se consolida en horas y se sigue ajustando dentro de la ventana de atribución configurada, típicamente 7 días de clic y 1 día de visualización.',
      },
    ],
  },
  {
    slug: 'api-de-conversiones-meta-que-es',
    kicker: 'FUNDAMENTOS',
    title: 'Qué es la API de Conversiones de Meta (CAPI) y para qué sirve',
    h1: 'Qué es la API de Conversiones de Meta y para qué sirve',
    description:
      'Explicación de la API de Conversiones (CAPI) de Meta: cómo funciona el envío servidor a servidor, qué campos lleva un evento, cómo se hashea user_data y por qué mejora la señal frente al Pixel solo.',
    standfirst:
      'CAPI no es "el Pixel pero en el servidor". Es un canal distinto, con sus propios campos obligatorios, su propio criterio de calidad de coincidencia y su propia forma de fallar en silencio.',
    published: '2026-07-24',
    lastmod: '2026-07-24',
    related: [
      'alimentar-pixel-meta-desde-whatsapp',
      'como-trackear-ventas-whatsapp-meta-ads',
      'medir-roas-campanas-whatsapp',
    ],
    sources: [
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/', title: 'API de conversiones', note: 'visión general del canal servidor a servidor' },
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event/', title: 'Parámetros de eventos del servidor', note: 'event_name, event_time, event_id, action_source' },
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters/', title: 'Parámetros de información del cliente', note: 'normalización y hasheo de user_data' },
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/', title: 'Manejo de eventos de píxel y de API de conversiones duplicados', note: 'criterio de deduplicación por event_id' },
    ],
    faq: [
      {
        q: '¿Qué es la API de Conversiones de Meta?',
        a: 'Es una interfaz servidor a servidor que permite enviar eventos de conversión directamente a Meta desde tu propia infraestructura, sin depender del navegador del usuario ni de cookies de terceros.',
      },
      {
        q: '¿CAPI reemplaza al Pixel de Meta?',
        a: 'No. Meta recomienda una configuración redundante: los mismos eventos por Pixel y por CAPI, unidos con un event_id común para que se deduplican. El Pixel aporta señal de navegador; CAPI aporta los eventos que el navegador nunca ve.',
      },
      {
        q: '¿Qué datos personales exige CAPI?',
        a: 'Ninguno en claro. Los identificadores de user_data —email, teléfono, nombre, external_id— se envían hasheados con SHA-256 tras normalizarlos. Meta los usa solo para hacer coincidir el evento con una cuenta.',
      },
    ],
  },
  {
    slug: 'alimentar-pixel-meta-desde-whatsapp',
    kicker: 'IMPLEMENTACIÓN',
    title: 'Cómo alimentar el Pixel de Meta desde WhatsApp',
    h1: 'Cómo alimentar el Pixel de Meta desde WhatsApp',
    description:
      'WhatsApp no ejecuta píxeles. Cómo enviar de todos modos eventos de conversión al Pixel de Meta desde una conversación: payload, deduplicación, calidad de coincidencia y errores frecuentes.',
    standfirst:
      'La pregunta está mal planteada: no se instala un pixel dentro de WhatsApp. Se conecta la conversación al mismo dataset que usa el Pixel, por la puerta del servidor.',
    published: '2026-07-24',
    lastmod: '2026-07-24',
    related: [
      'api-de-conversiones-meta-que-es',
      'como-trackear-ventas-whatsapp-meta-ads',
      'medir-roas-campanas-whatsapp',
    ],
    sources: [
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/business-messaging/', title: 'API de conversiones para mensajes comerciales: guía de registro', note: 'eventos de conversación y ctwa_clid' },
      { url: 'https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples/', title: 'Referencia de webhooks de mensajes', note: 'objeto referral del primer mensaje entrante' },
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/', title: 'Manejo de eventos de píxel y de API de conversiones duplicados', note: 'criterio de deduplicación por event_id' },
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/guides/end-to-end-implementation/', title: 'Implementación de la API de conversiones de extremo a extremo', note: 'flujo completo de integración' },
    ],
    faq: [
      {
        q: '¿Se puede instalar el Pixel de Meta en WhatsApp?',
        a: 'No. El Pixel es JavaScript que corre en una página web y WhatsApp no ejecuta código de terceros dentro del chat. Lo que sí se puede es enviar eventos al mismo dataset del Pixel desde un servidor, mediante la API de Conversiones.',
      },
      {
        q: '¿Qué es la deduplicación de eventos?',
        a: 'Es el mecanismo por el que Meta descarta la copia repetida de un evento que llega por Pixel y por CAPI. Se activa cuando ambos envíos comparten el mismo event_name y el mismo event_id dentro de la ventana de deduplicación.',
      },
    ],
  },
  {
    slug: 'medir-roas-campanas-whatsapp',
    kicker: 'MEDICIÓN',
    title: 'Cómo medir el ROAS de campañas que cierran por WhatsApp',
    h1: 'Cómo medir el ROAS de campañas que cierran por WhatsApp',
    description:
      'Qué hace falta para que el ROAS de una campaña con cierre en WhatsApp sea real y no estimado: valor de conversión, moneda, ventanas de atribución, desfase de reporte y ROAS incremental.',
    standfirst:
      'Un ROAS sin valor de conversión no es un ROAS: es un conteo. Lo que separa una métrica accionable de un número decorativo son cuatro decisiones que se toman antes de enviar el primer evento.',
    published: '2026-07-24',
    lastmod: '2026-07-24',
    related: [
      'como-trackear-ventas-whatsapp-meta-ads',
      'atribucion-whatsapp-vs-utms',
      'api-de-conversiones-meta-que-es',
    ],
    sources: [
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event/', title: 'Parámetros de eventos del servidor', note: 'event_name, event_time, event_id, action_source' },
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/', title: 'API de conversiones', note: 'visión general del canal servidor a servidor' },
    ],
    faq: [
      {
        q: '¿Cómo se calcula el ROAS en Meta Ads?',
        a: 'Meta divide la suma del valor de las conversiones atribuidas a la campaña entre el gasto de esa campaña en el mismo periodo. Si tus eventos no llevan el campo value, el numerador es cero y el ROAS no se puede calcular.',
      },
      {
        q: '¿Por qué el ROAS de Meta no coincide con mi CRM?',
        a: 'Por tres razones estructurales: Meta reporta por fecha de impresión del anuncio y el CRM por fecha de cobro; Meta atribuye dentro de una ventana configurable mientras el CRM suele usar último clic; y una parte de las ventas del CRM no tiene origen publicitario.',
      },
      {
        q: '¿Qué ventana de atribución conviene para ventas por WhatsApp?',
        a: 'Los ciclos de chat son más largos que los de checkout web, así que la ventana de 7 días de clic captura mejor el cierre. Lo importante es fijar una y compararla siempre contra sí misma, no alternar entre ventanas al analizar.',
      },
    ],
  },
  {
    slug: 'atribucion-whatsapp-vs-utms',
    kicker: 'COMPARATIVA',
    title: 'Atribución de WhatsApp vs UTMs: por qué los parámetros no bastan',
    h1: 'Atribución de WhatsApp vs UTMs',
    description:
      'Comparación honesta entre UTMs, enlaces wa.me con mensaje precargado, la pregunta "¿cómo nos conociste?" y la atribución por API de Conversiones para ventas que cierran en WhatsApp.',
    standfirst:
      'Los UTMs no están rotos: están fuera de jurisdicción. Miden sesiones de navegador, y la conversación de WhatsApp no es una sesión de navegador.',
    published: '2026-07-24',
    lastmod: '2026-07-25',
    related: [
      'como-trackear-ventas-whatsapp-meta-ads',
      'medir-roas-campanas-whatsapp',
      'alimentar-pixel-meta-desde-whatsapp',
    ],
    sources: [
      { url: 'https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples/', title: 'Referencia de webhooks de mensajes', note: 'objeto referral del primer mensaje entrante' },
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/business-messaging/', title: 'API de conversiones para mensajes comerciales: guía de registro', note: 'eventos de conversación y ctwa_clid' },
      { url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/', title: 'API de conversiones', note: 'visión general del canal servidor a servidor' },
    ],
    faq: [
      {
        q: '¿Los UTMs funcionan con WhatsApp?',
        a: 'Solo parcialmente y solo si el usuario pasa por una página web tuya antes del chat. En un anuncio Click-to-WhatsApp el usuario salta directo a la app y no hay URL que cargue parámetros, así que el UTM nunca llega a registrarse.',
      },
      {
        q: '¿No basta con el reporte nativo de Meta para anuncios Click-to-WhatsApp?',
        a: 'Para muchas operaciones sí. El Administrador de anuncios ya reporta conversaciones de mensajería iniciadas a nivel de anuncio individual, gratis y sin montar nada. Lo que no sabe es qué pasó después: no distingue un anuncio que atrae curiosos de uno que atrae compradores, ni conoce el valor de la venta. Si tu tasa de cierre es homogénea entre anuncios, el reporte nativo aproxima bien y montar CAPI es sobreingeniería.',
      },
      {
        q: '¿Cuál es la desventaja de atribuir por API de Conversiones?',
        a: 'Tres, y conviene tenerlas presentes: exige mantenimiento continuo (versiones de API, tokens que caducan); falla en silencio, porque un identificador mal normalizado se acepta con respuesta correcta y simplemente no se atribuye; y traslada carga de cumplimiento, ya que transferir teléfono o email hasheados a Meta es tratamiento de datos personales y exige aviso de privacidad.',
      },
      {
        q: '¿Sirve preguntar "¿cómo nos conociste?"',
        a: 'Como señal cualitativa sí, como atribución no. Depende de la memoria del cliente, no distingue entre anuncios de la misma cuenta y —lo decisivo— la respuesta se queda en tu hoja de cálculo: nunca llega al algoritmo de Meta, que es quien reparte el presupuesto.',
      },
    ],
  },
]

export const bySlug = (slug) => ARTICLES.find((a) => a.slug === slug)

export const relatedOf = (slug) =>
  (bySlug(slug)?.related ?? []).map(bySlug).filter(Boolean)
