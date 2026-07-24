import Link from 'next/link'
import ArticleShell, { articleMetadata } from '../../components/ArticleShell'
import { bySlug } from '../../lib/articles'

const article = bySlug('alimentar-pixel-meta-desde-whatsapp')
export const metadata = articleMetadata(article)

export default function Page() {
  return (
    <ArticleShell article={article}>
      <p>
        "¿Cómo instalo el Pixel de Meta en WhatsApp?" es una de las búsquedas más frecuentes de
        quien vende por chat, y tiene una respuesta incómoda: no se puede. El Pixel es un fragmento
        de JavaScript que se ejecuta dentro de una página web. WhatsApp no es una página web, no
        ejecuta código de terceros dentro de la conversación y su contenido está cifrado de extremo
        a extremo. No hay hueco donde meterlo, y eso es una característica de diseño, no una
        limitación pendiente de resolver.
      </p>
      <p>
        La pregunta útil es otra: <strong>¿cómo hago que el dataset del Pixel reciba las
        conversiones que ocurren en el chat?</strong> Y ahí sí hay respuesta, porque el Pixel y la
        API de Conversiones escriben en el mismo sitio.
      </p>

      <h2>Pixel, dataset y CAPI: quién es quién</h2>
      <p>
        Conviene separar tres cosas que en el habla cotidiana se llaman todas "el pixel":
      </p>
      <ul>
        <li>
          <strong>El dataset (antes "conjunto de datos del Pixel"):</strong> el contenedor en la
          cuenta de Meta donde se acumulan tus eventos. Tiene un ID numérico. Es lo que realmente
          importa.
        </li>
        <li>
          <strong>El Pixel:</strong> uno de los dos remitentes posibles. Corre en el navegador y
          escribe en el dataset.
        </li>
        <li>
          <strong>La API de Conversiones:</strong> el otro remitente. Corre en tu servidor y escribe
          en el mismo dataset.
        </li>
      </ul>
      <p>
        Una vez que se ve así, el problema se disuelve: no hay que llevar el Pixel a WhatsApp, hay
        que hacer que el servidor escriba en el dataset lo que pasó en WhatsApp. Para Meta, un{' '}
        <code>Purchase</code> que llega por CAPI y uno que llega por Pixel valen igual a efectos de
        optimización.
      </p>

      <h2>El flujo completo, paso a paso</h2>

      <h3>1. Capturar el origen al inicio de la conversación</h3>
      <p>
        El primer mensaje que un usuario envía tras tocar un anuncio Click-to-WhatsApp llega al
        webhook con un objeto <code>referral</code> que contiene el ID del anuncio y el{' '}
        <code>ctwa_clid</code>. Ese es el único momento en que ese dato existe. Guárdalo indexado
        por el número de teléfono del usuario, junto con la marca de tiempo.
      </p>
      <pre className="code-block" aria-label="Persistir el origen del contacto">
{`// al recibir el webhook del primer mensaje
guardar({
  telefono:  msg.from,                    // 5215512345678
  ctwa_clid: msg.referral.ctwa_clid,
  ad_id:     msg.referral.source_id,
  visto_en:  msg.timestamp
})`}
      </pre>
      <p>
        Si el contacto no viene de un anuncio, no habrá <code>referral</code>. Es normal: parte de
        tu tráfico es orgánico, referido o de recompra, y esas conversaciones no deben atribuirse a
        ninguna campaña.
      </p>

      <h3>2. Registrar la conversión cuando ocurre</h3>
      <p>
        El cierre casi nunca ocurre dentro del chat. Suele ser un formulario que envías por el chat,
        una liga de pago, o el momento en que un vendedor marca el trato como ganado en el CRM. Da
        igual cuál sea, siempre que el registro incluya el teléfono del cliente —la llave con la que
        recuperarás el <code>ctwa_clid</code>— y el valor de la operación.
      </p>
      <p>
        Aquí es donde un formulario intermedio gana frente a la captura manual: normaliza el
        teléfono, obtiene el email y deja la marca de tiempo exacta, que son justo los tres insumos
        que la calidad de coincidencia necesita.
      </p>

      <h3>3. Componer y enviar el evento</h3>
      <pre className="code-block" aria-label="Evento de conversión de WhatsApp enviado a CAPI">
{`POST https://graph.facebook.com/v<version>/<dataset_id>/events

{
  "data": [{
    "event_name":        "Purchase",
    "event_time":        1753315200,
    "action_source":     "business_messaging",
    "messaging_channel": "whatsapp",
    "event_id":          "ord-40219",
    "user_data": {
      "ctwa_clid": "ARBcd…",
      "ph": "<sha256(5215512345678)>",
      "em": "<sha256(cliente@empresa.com)>"
    },
    "custom_data": { "value": 1890.00, "currency": "MXN" }
  }],
  "access_token": "<token de sistema>"
}`}
      </pre>
      <p>
        Los tres campos que la gente equivoca: <code>action_source</code> debe reflejar mensajería,
        no <code>website</code>; <code>event_time</code> es el momento de la venta, no el del envío;
        y el teléfono se hashea en formato E.164 <em>sin</em> el signo de suma y sin espacios. El
        desglose completo está en{' '}
        <Link href="/api-de-conversiones-meta-que-es">qué es la API de Conversiones</Link>.
      </p>

      <h3>4. Deduplicar si además tienes eventos web</h3>
      <p>
        Si la misma venta puede dispararse también desde una página de gracias —por ejemplo, cuando
        el cliente paga en tu web tras hablar por WhatsApp— ambos envíos deben compartir{' '}
        <code>event_name</code> y <code>event_id</code>. Sin eso, Meta cuenta dos compras por una y
        tu ROAS reportado se duplica sin que nadie lo note durante semanas.
      </p>

      <h2>Cómo comprobar que está funcionando</h2>
      <ol>
        <li>
          <strong>Prueba de eventos</strong> en el Administrador de eventos: envía un evento con el{' '}
          <code>test_event_code</code> y confirma que aparece en tiempo real con los campos
          esperados.
        </li>
        <li>
          <strong>Calidad de coincidencia:</strong> con <code>ctwa_clid</code> más teléfono y email
          hasheados, la puntuación suele situarse por encima de 6. Si ronda 2 o 3, revisa la
          normalización antes que cualquier otra cosa.
        </li>
        <li>
          <strong>Desglose por anuncio:</strong> en el Administrador de anuncios, las conversiones
          deben empezar a repartirse entre anuncios concretos. Si todo se acumula en un solo anuncio
          o en ninguno, el <code>ctwa_clid</code> no está llegando.
        </li>
        <li>
          <strong>Contraste con el CRM:</strong> compara el conteo de ventas de WhatsApp de una
          semana cerrada. Una discrepancia del 10 al 20 por ciento es esperable; del 60 por ciento
          indica pérdida de identificadores.
        </li>
      </ol>

      <h2>Qué esperar del algoritmo</h2>
      <p>
        Con la señal conectada, el conjunto de anuncios entra en fase de aprendizaje y necesita del
        orden de 50 conversiones semanales para estabilizarse. Durante esos días los costos se mueven
        de forma errática y la tentación de tocar presupuestos es alta — hacerlo reinicia el
        aprendizaje. La disciplina de no intervenir es, en la práctica, la mitad del resultado.
      </p>
      <p>
        Pasado ese periodo, el cambio observable es de composición: Meta deja de perseguir a quien
        abre chats y empieza a perseguir a quien compra en chats. Cómo traducir eso a una métrica
        económica defendible está en{' '}
        <Link href="/medir-roas-campanas-whatsapp">
          cómo medir el ROAS de campañas que cierran por WhatsApp
        </Link>
        , y el panorama completo del recorrido, en{' '}
        <Link href="/como-trackear-ventas-whatsapp-meta-ads">
          cómo trackear ventas de WhatsApp en Meta Ads
        </Link>
        .
      </p>

      <h2>Consideraciones de privacidad</h2>
      <p>
        Enviar el teléfono o el email de un cliente —aunque vayan hasheados— a una plataforma
        publicitaria es tratamiento de datos personales. En México, la LFPDPPP obliga a informarlo
        en un aviso de privacidad accesible antes de la recolección, indicando finalidades y
        transferencias. El hash reduce el riesgo de exposición, pero no convierte el dato en
        anónimo: sigue siendo un identificador que permite reconocer a la persona.
      </p>

      <p className="prose-note">
        El nombre del endpoint, los valores admitidos en <code>action_source</code> y la existencia
        de <code>messaging_channel</code> dependen de la versión de la Graph API. Verifica el
        contrato vigente en la documentación de Meta for Developers antes de implementar.
      </p>
    </ArticleShell>
  )
}
