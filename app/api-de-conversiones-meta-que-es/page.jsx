import Link from 'next/link'
import ArticleShell, { articleMetadata } from '../../components/ArticleShell'
import { bySlug } from '../../lib/articles'

const article = bySlug('api-de-conversiones-meta-que-es')
export const metadata = articleMetadata(article)

export default function Page() {
  return (
    <ArticleShell article={article}>
      <p>
        La API de Conversiones —CAPI, por <em>Conversions API</em>— es la interfaz que Meta expone
        para recibir eventos de conversión directamente desde tu servidor, sin pasar por el
        navegador del usuario. Es la respuesta de Meta a una década de erosión de la señal web:
        bloqueadores de anuncios, restricciones de cookies de terceros, el marco de transparencia de
        seguimiento de iOS y navegadores que acortan la vida de las cookies propias.
      </p>
      <p>
        La descripción corta que circula por ahí —"es el Pixel pero en el servidor"— es cómoda y
        engañosa. CAPI no observa: recibe lo que tú le declaras. Eso lo hace más fiable y, a la vez,
        te vuelve responsable de todo lo que el Pixel resolvía solo.
      </p>

      <h2>Qué resuelve exactamente</h2>
      <p>
        El Pixel es JavaScript que corre en una página y depende de tres cosas frágiles: que el
        navegador ejecute el script, que la cookie sobreviva, y que la conversión ocurra dentro de
        una página web. CAPI elimina las tres dependencias y con ello habilita tres escenarios que
        el Pixel no cubre:
      </p>
      <ul>
        <li>
          <strong>Conversiones fuera del sitio.</strong> Una venta cerrada por WhatsApp, una llamada
          telefónica, una firma en punto de venta. No hay página que cargue: no hay Pixel que
          dispare.
        </li>
        <li>
          <strong>Conversiones diferidas.</strong> El lead llega hoy y compra en catorce días. El
          hecho relevante ocurre en tu CRM, no en el navegador.
        </li>
        <li>
          <strong>Señal perdida por bloqueo.</strong> Una fracción de los eventos web que deberían
          dispararse simplemente no llegan. CAPI recupera parte de ese volumen.
        </li>
      </ul>

      <h2>Anatomía de un evento</h2>
      <p>
        Un evento CAPI es un objeto JSON dentro de un arreglo <code>data</code>, enviado por POST al
        endpoint de eventos del dataset. Tiene cuatro bloques con responsabilidades distintas.
      </p>

      <h3>Identidad del evento</h3>
      <ul>
        <li>
          <code>event_name</code> — el evento estándar (<code>Purchase</code>, <code>Lead</code>,{' '}
          <code>Schedule</code>) o uno personalizado. Los estándar habilitan optimización y reportes
          nativos; los personalizados exigen configurar una conversión personalizada.
        </li>
        <li>
          <code>event_time</code> — marca de tiempo Unix del <em>momento real</em> de la conversión,
          no del envío. Meta acepta eventos con hasta 7 días de antigüedad.
        </li>
        <li>
          <code>event_id</code> — identificador único que permite deduplicar contra el Pixel. Es el
          campo que más implementaciones olvidan y el que más ROAS infla cuando falta.
        </li>
        <li>
          <code>action_source</code> — dónde ocurrió: <code>website</code>, <code>app</code>,{' '}
          <code>phone_call</code>, <code>business_messaging</code>, <code>physical_store</code>,{' '}
          <code>system_generated</code>, <code>other</code>. Es obligatorio y afecta cómo Meta
          interpreta el resto.
        </li>
      </ul>

      <h3>user_data: la parte que decide si el evento sirve</h3>
      <p>
        Aquí van los identificadores con los que Meta intentará casar el evento con una cuenta real.
        Cuantas más señales envíes, mayor probabilidad de coincidencia. Los datos personales viajan
        <strong> hasheados con SHA-256</strong> tras una normalización estricta.
      </p>
      <pre className="code-block" aria-label="Normalización previa al hasheo de user_data">
{`em  email        →  minúsculas, sin espacios     →  sha256
ph  teléfono     →  solo dígitos, E.164 sin "+"  →  sha256
fn  nombre       →  minúsculas, sin acentos      →  sha256
ct  ciudad       →  minúsculas, sin espacios     →  sha256
external_id      →  tu ID interno de cliente     →  sha256

// se envían SIN hashear (no son datos personales):
fbc, fbp, ctwa_clid, client_ip_address, client_user_agent`}
      </pre>
      <p>
        Un error de normalización no produce error HTTP: produce un hash que no coincide con nada.
        El evento se acepta, se cuenta como recibido y no se atribuye a nadie. Es el fallo más caro
        de diagnosticar precisamente porque no se parece a un fallo.
      </p>
      <p>
        Los identificadores de clic son los más potentes. <code>fbc</code> deriva del{' '}
        <code>fbclid</code> de la URL y tiene el formato <code>fb.1.timestamp.fbclid</code>;{' '}
        <code>fbp</code> es la cookie propia del navegador; y <code>ctwa_clid</code> es el
        equivalente para anuncios Click-to-WhatsApp, explicado en{' '}
        <Link href="/como-trackear-ventas-whatsapp-meta-ads">
          cómo trackear ventas de WhatsApp en Meta Ads
        </Link>
        .
      </p>

      <h3>custom_data: el valor del negocio</h3>
      <p>
        <code>value</code> y <code>currency</code> convierten un conteo en una métrica económica. Sin
        ellos no hay ROAS ni optimización por valor de conversión. Junto a ellos pueden viajar{' '}
        <code>content_ids</code>, <code>content_type</code>, <code>order_id</code> y campos propios
        para segmentar después en los reportes.
      </p>

      <h3>Autenticación</h3>
      <p>
        La petición se firma con un token de acceso de sistema generado en el Administrador de
        eventos, con permiso sobre el dataset. Vive en el servidor y nunca debe llegar al cliente:
        quien lo tenga puede escribir eventos falsos en tu dataset y envenenar la optimización de
        tus campañas.
      </p>

      <h2>Deduplicación: por qué CAPI no sustituye al Pixel</h2>
      <p>
        La configuración que Meta recomienda es <strong>redundante</strong>: los mismos eventos por
        ambos canales. El Pixel aporta contexto de navegador (cookies propias, user agent, señales
        de sesión) que el servidor no tiene; CAPI aporta fiabilidad y los eventos que el navegador
        nunca verá. Juntos elevan la calidad de coincidencia por encima de lo que cualquiera de los
        dos logra por separado.
      </p>
      <p>
        Para que la redundancia no se convierta en doble conteo, ambos envíos deben compartir el
        mismo <code>event_name</code> y el mismo <code>event_id</code>. Cuando Meta detecta la
        pareja dentro de la ventana de deduplicación, conserva un solo evento — normalmente el que
        llegó primero, completando sus campos con el segundo.
      </p>
      <pre className="code-block" aria-label="Mismo event_id en Pixel y en CAPI">
{`// navegador
fbq('track', 'Purchase', {value: 1890, currency: 'MXN'},
    {eventID: 'ord-40219'});

// servidor
{"event_name": "Purchase", "event_id": "ord-40219", …}`}
      </pre>
      <p>
        La regla mental: el <code>event_id</code> debe derivar de algo estable del negocio —el número
        de pedido, el ID de la conversación— y jamás de una marca de tiempo o de un aleatorio, que
        producirían valores distintos en cada canal.
      </p>

      <h2>Cómo se mide si está bien implementada</h2>
      <ul>
        <li>
          <strong>Calidad de coincidencia (EMQ):</strong> puntuación de 1 a 10 por evento en el
          Administrador de eventos. Por debajo de 4, Meta descarta una parte sustancial de tus
          conversiones. Se sube añadiendo identificadores a <code>user_data</code>, no aumentando el
          volumen.
        </li>
        <li>
          <strong>Cobertura de deduplicación:</strong> el porcentaje de eventos con pareja
          identificada. Si es bajo teniendo ambos canales activos, el <code>event_id</code> no está
          coincidiendo.
        </li>
        <li>
          <strong>Diagnósticos:</strong> Meta reporta ahí parámetros mal formados, hashes inválidos
          y eventos fuera de ventana temporal. Es el primer sitio donde mirar cuando los números no
          cuadran.
        </li>
      </ul>

      <h2>Lo que CAPI no arregla</h2>
      <p>
        Conviene decirlo porque se vende al revés. CAPI no mejora la creatividad ni la segmentación.
        No recupera atribución de clics que nunca capturaste. No convierte datos sucios en datos
        limpios: si tu CRM guarda teléfonos en cinco formatos distintos, CAPI amplifica ese
        desorden. Y no exime del deber de informar al usuario qué datos tratas y con qué finalidad —
        en México, la LFPDPPP exige aviso de privacidad, y enviar identificadores hasheados a un
        tercero es tratamiento de datos personales.
      </p>
      <p>
        Lo que sí hace, y hace bien, es cerrar la brecha entre dónde ocurre la venta y dónde se
        decide el presupuesto. Para el caso concreto de WhatsApp, sigue en{' '}
        <Link href="/alimentar-pixel-meta-desde-whatsapp">
          cómo alimentar el Pixel de Meta desde WhatsApp
        </Link>{' '}
        o en{' '}
        <Link href="/medir-roas-campanas-whatsapp">
          cómo medir el ROAS de campañas que cierran por chat
        </Link>
        .
      </p>

      <p className="prose-note">
        Los nombres de campo, los valores de <code>action_source</code> y las ventanas temporales
        admitidas cambian entre versiones de la Graph API. Confirma el contrato vigente en la
        documentación de Meta for Developers antes de implementar.
      </p>
    </ArticleShell>
  )
}
