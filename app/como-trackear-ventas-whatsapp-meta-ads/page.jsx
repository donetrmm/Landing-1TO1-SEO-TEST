import Link from 'next/link'
import ArticleShell, { articleMetadata } from '../../components/ArticleShell'
import { bySlug } from '../../lib/articles'

const article = bySlug('como-trackear-ventas-whatsapp-meta-ads')
export const metadata = articleMetadata(article)

export default function Page() {
  return (
    <ArticleShell article={article}>
      <p>
        Hay un momento exacto en el que la mayoría de las cuentas de Meta Ads se quedan ciegas: el
        usuario toca el botón <em>Enviar mensaje</em> del anuncio y sale del navegador. A partir de
        ahí la conversación ocurre en una app cifrada de extremo a extremo, sin cookies, sin URL y
        sin Pixel. Si la venta se cierra en ese chat, el algoritmo que reparte tu presupuesto nunca
        se entera de que ese anuncio vendió.
      </p>
      <p>
        Trackear ventas de WhatsApp en Meta Ads no consiste en meter un pixel donde no cabe.
        Consiste en reconstruir la cadena de identidad que se rompió al saltar de un canal a otro, y
        devolverle a Meta el evento de conversión por una puerta distinta: la API de Conversiones.
      </p>

      <h2>Los cuatro eslabones del recorrido</h2>
      <p>
        Un evento de compra atribuido correctamente atraviesa cuatro etapas. Cada una tiene su
        propio modo de fallar, y conviene diagnosticarlas por separado antes de culpar al canal
        entero.
      </p>
      <ol>
        <li>
          <strong>Clic en el anuncio.</strong> El usuario toca un anuncio Click-to-WhatsApp (CTWA).
          Meta genera un identificador de clic para esa interacción.
        </li>
        <li>
          <strong>Primer mensaje entrante.</strong> WhatsApp entrega ese identificador junto al
          mensaje, en un objeto de referencia que tu sistema debe leer y guardar.
        </li>
        <li>
          <strong>Cierre de la venta.</strong> Ocurre minutos, horas o días después, normalmente
          fuera de WhatsApp: un formulario, una liga de pago, una transferencia.
        </li>
        <li>
          <strong>Envío del evento.</strong> Tu servidor manda la conversión a Meta con el
          identificador guardado, para que Meta la case con el clic original.
        </li>
      </ol>

      <h2>1. El identificador que lo sostiene todo: ctwa_clid</h2>
      <p>
        En la web, la llave de atribución es el <code>fbclid</code> que Meta añade a la URL de
        destino y que el Pixel guarda como cookie <code>_fbc</code>. En WhatsApp no hay URL ni
        cookie, así que Meta usa un equivalente propio: <code>ctwa_clid</code>, el
        <em> Click-to-WhatsApp click ID</em>.
      </p>
      <p>
        Cuando alguien llega a tu número desde un anuncio CTWA, el webhook de la plataforma de
        WhatsApp Business entrega ese primer mensaje con un bloque <code>referral</code> adjunto.
        Ahí viajan, entre otros campos, el identificador del anuncio de origen, el tipo de origen, y
        el <code>ctwa_clid</code>.
      </p>
      <pre className="code-block" aria-label="Ejemplo del bloque referral de un mensaje entrante">
{`"referral": {
  "source_url":  "https://fb.me/…",
  "source_id":   "120210000000000000",   // ID del anuncio
  "source_type": "ad",
  "headline":    "Cotiza por WhatsApp",
  "ctwa_clid":   "ARBcd…"                // la llave de atribución
}`}
      </pre>
      <p>
        Tres cosas críticas sobre este campo. Primera: <strong>solo llega en el primer mensaje</strong> de
        la conversación originada por el anuncio; si tu integración no lo persiste en ese instante,
        se pierde. Segunda: se asocia al número de teléfono del usuario, así que ese número es la
        clave con la que después recuperarás el <code>ctwa_clid</code> al cerrar la venta. Tercera:
        tiene vida útil — no sirve para atribuir una compra que ocurre meses después.
      </p>
      <p>
        Si tu operación no usa anuncios Click-to-WhatsApp sino que lleva tráfico a una landing y de
        ahí al chat, el identificador que debes capturar es el <code>fbclid</code> de la URL, antes
        de que el usuario salte a WhatsApp. Es el mismo problema con otra llave, y lo desarrollamos
        en{' '}
        <Link href="/atribucion-whatsapp-vs-utms">
          atribución de WhatsApp frente a los UTMs
        </Link>
        .
      </p>

      <h2>2. Definir qué cuenta como conversión</h2>
      <p>
        Antes de enviar nada hay que decidir qué evento representa el negocio. Es una decisión de
        marketing, no técnica, y determina hacia qué optimizará Meta durante los siguientes meses.
      </p>
      <ul>
        <li>
          <strong>Lead:</strong> el usuario escribió y dejó datos de contacto. Volumen alto, señal
          barata, útil para arrancar el aprendizaje de la campaña.
        </li>
        <li>
          <strong>Cita agendada o cotización enviada:</strong> intención real. Suele ser el punto
          dulce para ciclos de venta largos.
        </li>
        <li>
          <strong>Purchase:</strong> la venta cerrada, con su valor monetario. Es la señal más
          valiosa y la única que permite calcular ROAS.
        </li>
      </ul>
      <p>
        La regla práctica: Meta necesita del orden de <strong>50 conversiones semanales por conjunto
        de anuncios</strong> para salir de la fase de aprendizaje. Si tus compras por WhatsApp no
        llegan a ese volumen, optimiza hacia un evento intermedio más frecuente y reporta el
        Purchase igualmente para medir, aunque no optimices por él.
      </p>

      <h2>3. Enviar el evento por la API de Conversiones</h2>
      <p>
        El envío es una petición HTTPS de servidor a servidor al endpoint de eventos del dataset
        (el mismo dataset que usa tu Pixel). Lo que distingue un evento de WhatsApp de uno web son
        dos campos:
      </p>
      <pre className="code-block" aria-label="Ejemplo de evento enviado a la API de Conversiones">
{`{
  "event_name":   "Purchase",
  "event_time":   1753315200,
  "action_source": "business_messaging",
  "messaging_channel": "whatsapp",
  "event_id":     "wa-8f21c0-purchase",
  "user_data": {
    "ctwa_clid": "ARBcd…",
    "ph": "<sha256 del teléfono en formato E.164 sin +>",
    "em": "<sha256 del email normalizado>"
  },
  "custom_data": {
    "value": 1890.00,
    "currency": "MXN"
  }
}`}
      </pre>
      <p>
        <code>action_source</code> le dice a Meta dónde ocurrió la conversión. Para conversaciones
        de mensajería el valor correcto es <code>business_messaging</code>, acompañado de{' '}
        <code>messaging_channel</code> para precisar el canal. Usar <code>website</code> en eventos
        que no ocurrieron en un sitio web degrada la calidad de coincidencia y puede provocar
        rechazos.
      </p>
      <p>
        Todos los identificadores personales de <code>user_data</code> van hasheados con SHA-256
        después de normalizarlos: minúsculas, sin espacios, teléfono en formato internacional sin el
        signo de suma. El <code>ctwa_clid</code>, en cambio, se envía en claro — no es un dato
        personal, es un identificador de clic. El detalle campo por campo está en{' '}
        <Link href="/api-de-conversiones-meta-que-es">qué es la API de Conversiones</Link>.
      </p>

      <h2>4. Verificar que Meta lo recibió y lo casó</h2>
      <p>
        Un evento enviado no es un evento atribuido. En el Administrador de eventos hay que revisar
        tres indicadores antes de dar por buena la implementación:
      </p>
      <ul>
        <li>
          <strong>Eventos recibidos:</strong> aparecen en minutos. Si no aparecen, el problema es de
          credenciales, de versión de API o de formato del payload.
        </li>
        <li>
          <strong>Calidad de coincidencia de eventos (EMQ):</strong> puntuación de 1 a 10 por
          evento. Con <code>ctwa_clid</code> más teléfono hasheado se suele superar el 6; por debajo
          de 4, Meta está descartando buena parte de tus conversiones al no poder atribuirlas.
        </li>
        <li>
          <strong>Eventos duplicados:</strong> si el mismo hecho llega por Pixel y por CAPI sin un{' '}
          <code>event_id</code> común, Meta lo cuenta dos veces y tu ROAS sale inflado.
        </li>
      </ul>
      <p>
        La atribución en los reportes de campaña tarda más que la recepción del evento: se consolida
        en horas y sigue ajustándose dentro de la ventana configurada — típicamente 7 días de clic y
        1 día de visualización. No juzgues una campaña de WhatsApp con los datos del mismo día.
      </p>

      <h2>Los errores que más se repiten</h2>
      <ol>
        <li>
          <strong>No guardar el <code>ctwa_clid</code> del primer mensaje.</strong> Es irrecuperable.
          Sin él, la conversión llega a Meta pero sin anuncio al cual atribuirse.
        </li>
        <li>
          <strong>Enviar el evento sin <code>value</code>.</strong> Meta cuenta la conversión pero no
          puede calcular retorno. Ver{' '}
          <Link href="/medir-roas-campanas-whatsapp">cómo medir el ROAS</Link>.
        </li>
        <li>
          <strong>Hashear mal.</strong> Un teléfono con espacios o con el signo de suma produce un
          hash distinto al que Meta espera y la coincidencia falla en silencio.
        </li>
        <li>
          <strong>Usar <code>event_time</code> del momento del envío</strong> en lugar del momento
          real de la conversión. Desplaza la atribución de día y ensucia los reportes.
        </li>
        <li>
          <strong>Reenviar el histórico completo</strong> al conectar la integración. Meta acepta
          eventos con hasta 7 días de antigüedad; más allá se descartan.
        </li>
      </ol>

      <h2>Qué cambia cuando la señal llega</h2>
      <p>
        El efecto no es un dashboard más bonito: es que el algoritmo de entrega deja de optimizar
        hacia clics baratos y empieza a optimizar hacia personas parecidas a quienes ya te
        compraron por chat. La audiencia se estrecha, el CPL sube en apariencia y el costo por venta
        baja de verdad. Ese reacomodo tarda entre una y dos semanas en estabilizarse, que es
        justamente el tiempo que dura la fase de aprendizaje.
      </p>
      <p>
        Si quieres el detalle de la mecánica interna —cómo un evento de servidor termina alimentando
        el mismo dataset del Pixel— continúa en{' '}
        <Link href="/alimentar-pixel-meta-desde-whatsapp">
          cómo alimentar el Pixel de Meta desde WhatsApp
        </Link>
        .
      </p>

      <p className="prose-note">
        Los nombres de campo y los valores admitidos por la API de Conversiones cambian entre
        versiones. Antes de implementar, confirma el contrato vigente en la documentación de Meta
        for Developers para la versión de la Graph API que estés usando.
      </p>
    </ArticleShell>
  )
}
