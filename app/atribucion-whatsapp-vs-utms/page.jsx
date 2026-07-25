import Link from 'next/link'
import ArticleShell, { articleMetadata } from '../../components/ArticleShell'
import { bySlug } from '../../lib/articles'

const article = bySlug('atribucion-whatsapp-vs-utms')
export const metadata = articleMetadata(article)

export default function Page() {
  return (
    <ArticleShell article={article}>
      <p>
        Los parámetros UTM llevan dos décadas siendo el estándar de facto para saber de dónde viene
        el tráfico, y funcionan extraordinariamente bien para lo que fueron diseñados: etiquetar una
        visita a una página web para que una herramienta de analítica la clasifique. El problema
        aparece cuando se les pide algo que nunca prometieron — sobrevivir a un salto fuera del
        navegador.
      </p>
      <p>
        Un UTM es texto en una URL. Si no hay URL, no hay UTM. Y en un anuncio Click-to-WhatsApp no
        hay URL: el usuario toca el anuncio y aterriza en una conversación.
      </p>

      <h2>Dónde se rompe exactamente</h2>
      <p>
        Vale la pena separar dos escenarios, porque el diagnóstico es distinto.
      </p>

      <h3>Escenario A: el anuncio va a WhatsApp directo</h3>
      <p>
        El formato Click-to-WhatsApp abre la app sin pasar por navegador. No se carga ninguna
        página, ninguna herramienta de analítica registra sesión y no hay campo donde depositar{' '}
        <code>utm_source</code>. El UTM no se pierde: nunca llegó a existir. Lo que sí existe es el{' '}
        <code>ctwa_clid</code> que Meta adjunta al primer mensaje entrante — el identificador que
        cumple aquí el papel del <code>fbclid</code>.
      </p>
      <p>
        La diferencia se ve mejor puesta una al lado de la otra. Arriba, lo que registra tu
        analítica cuando el tráfico pasa por web; abajo, lo que llega cuando no pasa:
      </p>
      <pre className="code-block" aria-label="Comparación entre un UTM registrado en web y el objeto referral de WhatsApp">
{`// A) tráfico web — lo que ve tu analítica
GET /landing?utm_source=facebook&utm_campaign=verano&utm_content=ad7231
   → sesión con campaña, medio y contenido. Vive en TU analítica.

// B) Click-to-WhatsApp — no hay GET, no hay URL, no hay sesión.
//    Lo que llega es el primer mensaje, con este bloque adjunto:
"referral": {
  "source_id":   "120210000000000000",   // el anuncio, no la campaña
  "source_type": "ad",
  "ctwa_clid":   "ARBcd…"                // la llave, y solo llega una vez
}`}
      </pre>
      <p>
        Y este es el destino de esa llave. Nótese que el <code>ctwa_clid</code> viaja en claro
        —es un identificador de clic, no un dato personal— mientras que el teléfono va hasheado:
      </p>
      <pre className="code-block" aria-label="Evento de conversión enviado a la API de Conversiones con ctwa_clid">
{`{
  "event_name":        "Purchase",
  "event_time":        1753315200,       // el momento de la venta, no del envío
  "action_source":     "business_messaging",
  "messaging_channel": "whatsapp",
  "user_data": {
    "ctwa_clid": "ARBcd…",              // en claro
    "ph": "<sha256(5215512345678)>"     // E.164, sin "+", sin espacios
  },
  "custom_data": { "value": 1890.00, "currency": "MXN" }
}`}
      </pre>
      <p>
        Un UTM nunca puede llegar a ese objeto: no hay campo donde ponerlo, y aunque lo hubiera,
        Meta no atribuye por cadenas de texto que tú declares — atribuye por identificadores que
        él mismo emitió.
      </p>

      <h3>Escenario B: el anuncio va a una landing y de ahí al chat</h3>
      <p>
        Aquí el UTM sí se registra: la landing carga con sus parámetros y la analítica los guarda.
        El corte ocurre un paso después, cuando el usuario toca el botón de WhatsApp. Ese enlace
        abre la app con, como mucho, un mensaje precargado. Todo el contexto de sesión —campaña,
        anuncio, término de búsqueda— se queda del otro lado del salto, salvo que lo codifiques
        deliberadamente.
      </p>
      <p>
        El truco habitual es inyectar un código en el texto precargado del enlace{' '}
        <code>wa.me</code>:
      </p>
      <pre className="code-block" aria-label="Enlace wa.me con código de referencia precargado">
{`https://wa.me/5215512345678?text=Hola,%20quiero%20cotizar%20[ref:ad7231]`}
      </pre>
      <p>
        Funciona a medias, y conviene saber por qué. El usuario puede borrar el texto antes de
        enviarlo; el código es visible y con frecuencia despierta desconfianza; identifica la campaña
        pero no a la persona, así que no sirve para la coincidencia de eventos en Meta; y en el
        mejor de los casos el dato termina en tu hoja de cálculo, no en el dataset que alimenta la
        optimización.
      </p>

      <h2>El quinto método: los reportes nativos de Meta</h2>
      <p>
        Antes de la comparativa hay que meter en la mesa una opción que casi nunca aparece en
        este tipo de artículos, y cuya omisión sesga el resultado: <strong>Meta ya te da
        atribución de anuncio para las conversaciones de WhatsApp, gratis y sin montar
        nada</strong>. Si el anuncio es Click-to-WhatsApp, el Administrador de anuncios reporta
        conversaciones de mensajería iniciadas a nivel de anuncio individual.
      </p>
      <p>
        Es el punto de partida real de cualquier cuenta, no el vacío. Y para muchas
        operaciones puede ser suficiente: si tu tasa de cierre por conversación es estable
        entre anuncios, optimizar hacia conversaciones iniciadas aproxima bastante bien el
        optimizar hacia ventas.
      </p>
      <p>
        Lo que <em>no</em> sabe el reporte nativo es qué pasó después. Cuenta que la
        conversación empezó; no si terminó en compra, ni por cuánto. Un anuncio que atrae
        curiosos y otro que atrae compradores se ven idénticos. Ahí está toda la diferencia, y
        es la única razón por la que vale la pena montar lo demás.
      </p>

      <h2>Comparativa de los cinco métodos</h2>
      <p>
        Las tres últimas filas son las que suelen faltar en estas tablas. Sin ellas, la
        comparación es propaganda.
      </p>
      <div className="tbl-wrap">
        <table className="tbl">
          <caption className="sr-only">
            Comparación de métodos de atribución para ventas cerradas en WhatsApp
          </caption>
          <thead>
            <tr>
              <th scope="col">CRITERIO</th>
              <th scope="col">UTMS</th>
              <th scope="col">CÓDIGO EN WA.ME</th>
              <th scope="col">"¿CÓMO NOS CONOCISTE?"</th>
              <th scope="col">REPORTE NATIVO DE META</th>
              <th scope="col" className="hl">CAPI + CTWA_CLID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Sobrevive al salto a la app</th>
              <td>No</td>
              <td>Parcialmente</td>
              <td>No aplica</td>
              <td>Sí</td>
              <td className="hl">Sí</td>
            </tr>
            <tr>
              <th scope="row">Granularidad</th>
              <td>Campaña</td>
              <td>Campaña</td>
              <td>Canal, aproximado</td>
              <td>Anuncio individual</td>
              <td className="hl">Anuncio individual</td>
            </tr>
            <tr>
              <th scope="row">Qué cuenta como conversión</th>
              <td>Sesión web</td>
              <td>Sesión web</td>
              <td>Lo que el cliente recuerda</td>
              <td>Conversación iniciada</td>
              <td className="hl">La venta, con su valor</td>
            </tr>
            <tr>
              <th scope="row">Depende del usuario</th>
              <td>No</td>
              <td>Sí, puede borrar el texto</td>
              <td>Sí, depende de su memoria</td>
              <td>No</td>
              <td className="hl">No</td>
            </tr>
            <tr>
              <th scope="row">El dato llega a Meta</th>
              <td>No</td>
              <td>No</td>
              <td>No</td>
              <td>Sí</td>
              <td className="hl">Sí</td>
            </tr>
            <tr>
              <th scope="row">Optimiza hacia la venta</th>
              <td>No</td>
              <td>No</td>
              <td>No</td>
              <td>No — hacia la conversación</td>
              <td className="hl">Sí</td>
            </tr>
            <tr>
              <th scope="row">Esfuerzo de montaje</th>
              <td>Bajo</td>
              <td>Bajo</td>
              <td>Nulo</td>
              <td>Nulo</td>
              <td className="hl">Medio, una sola vez</td>
            </tr>
            <tr>
              <th scope="row">Mantenimiento</th>
              <td>Bajo</td>
              <td>Nulo</td>
              <td>Nulo</td>
              <td>Nulo</td>
              <td>Continuo: versiones de API, tokens que caducan</td>
            </tr>
            <tr>
              <th scope="row">Cuando falla, se nota</th>
              <td>Sí</td>
              <td>Sí</td>
              <td>Sí</td>
              <td>Sí</td>
              <td>No: un hash mal normalizado se acepta sin error</td>
            </tr>
            <tr>
              <th scope="row">Carga de cumplimiento</th>
              <td>Baja</td>
              <td>Ninguna</td>
              <td>Ninguna</td>
              <td>Ninguna: el dato ya es de Meta</td>
              <td>Alta: transfieres identificadores personales a un tercero</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Las tres filas donde CAPI pierde</h3>
      <p>
        <strong>Mantenimiento.</strong> Los otros cuatro métodos, una vez montados, no se
        rompen. Una integración de CAPI sí: cambia la versión de la Graph API, caduca el token
        de sistema, alguien toca el formato del teléfono en el CRM. Es infraestructura, y la
        infraestructura pide atención.
      </p>
      <p>
        <strong>Falla en silencio.</strong> Es el defecto más caro y el menos comentado. Si
        envías un teléfono hasheado con el signo de suma delante, Meta acepta el evento,
        responde 200, lo cuenta como recibido — y no lo casa con nadie. No hay error, no hay
        alerta, no hay nada raro en el dashboard: solo un ROAS que baja lentamente sin causa
        aparente. Un UTM roto, en cambio, se ve a simple vista en el reporte.
      </p>
      <p>
        <strong>Cumplimiento.</strong> Preguntar "¿cómo nos conociste?" no transfiere datos
        personales a nadie. Enviar el teléfono y el email de tu cliente a Meta —aunque vayan
        hasheados— sí es tratamiento y sí exige aviso de privacidad con finalidades y
        transferencias declaradas. En México, la LFPDPPP. Es un coste real, no un trámite.
      </p>
      <p>
        La conclusión honesta no es "CAPI gana": es que CAPI compra una capacidad concreta —
        optimizar hacia la venta y no hacia la conversación— a cambio de mantenimiento,
        fragilidad silenciosa y carga legal. Si tu tasa de cierre es homogénea entre anuncios,
        el reporte nativo te da el 80 % del valor por el 0 % del trabajo, y montar CAPI es
        sobreingeniería.
      </p>

      <h2>La fila que decide: "el dato llega a Meta"</h2>
      <p>
        Es la diferencia de categoría entre los tres primeros métodos y el cuarto, y suele pasarse
        por alto porque los cuatro producen un reporte al final.
      </p>
      <p>
        UTMs, códigos de referencia y la pregunta al cliente producen <strong>información para
        humanos</strong>. Alguien la lee, la interpreta y decide mover presupuesto. Es un ciclo de
        días, con sesgo y con capacidad limitada de detalle: nadie reasigna presupuesto anuncio por
        anuncio cada mañana.
      </p>
      <p>
        La atribución por API de Conversiones produce <strong>información para el algoritmo</strong>.
        El sistema de entrega de Meta la consume continuamente y ajusta a quién muestra cada anuncio
        sin intervención humana. No es que mida mejor: es que cierra el circuito. Ese es el motivo
        real por el que una operación que conecta la señal ve movimiento en el costo por venta, y no
        el hecho de tener un dashboard más preciso.
      </p>

      <h2>"¿Cómo nos conociste?" merece un párrafo aparte</h2>
      <p>
        Como señal cualitativa tiene valor: descubre canales que no estabas midiendo, revela cómo
        describe el cliente su propio recorrido, y a veces es la única fuente disponible al empezar.
        Nada de eso está en discusión.
      </p>
      <p>
        Como atribución falla en cuatro frentes a la vez. Depende de la memoria, que sobrerrepresenta
        el último contacto. No distingue entre anuncios de la misma cuenta —"Facebook" no es una
        campaña—. Introduce fricción en el momento más delicado de la conversación. Y, sobre todo,
        la respuesta se queda contigo: Meta nunca la ve.
      </p>

      <h2>La ventana: el eje que ninguno de los dos comparte</h2>
      <p>
        Hay una asimetría que hace que comparar los números de ambos sistemas sea, literalmente,
        comparar cosas distintas. Tu analítica web atribuye por <strong>sesión</strong>: la
        visita ocurrió el martes, el UTM dice de dónde vino, se acabó. Meta atribuye por{' '}
        <strong>ventana</strong>: cuenta la conversión si ocurre dentro de un plazo desde el
        clic, y la imputa al día del <em>clic</em>, no al día de la venta.
      </p>
      <p>
        El estándar es 7 días de clic y 1 día de visualización. Con ciclos de chat esto importa
        más que en e-commerce: una venta consultiva que se cierra al cuarto día entra en la
        ventana de 7 días y desaparece con la de 1 día. El mismo negocio, medido con dos
        ventanas, produce dos verdades.
      </p>
      <p>
        De ahí tres consecuencias prácticas que conviene tener presentes antes de sacar
        conclusiones de cualquier reporte:
      </p>
      <ul>
        <li>
          <strong>Los UTMs y Meta no van a cuadrar nunca</strong>, y no porque uno esté roto.
          Uno cuenta sesiones por fecha de visita; el otro, conversiones por fecha de clic.
        </li>
        <li>
          <strong>El dato de ayer siempre está incompleto.</strong> Dentro de la ventana la
          atribución sigue consolidándose. Decisiones de presupuesto sobre un día suelto es la
          forma más eficiente de apagar campañas que funcionaban.
        </li>
        <li>
          <strong>Fija la ventana y no la muevas.</strong> Comparar el rendimiento de dos
          periodos medidos con ventanas distintas no compara nada.
        </li>
      </ul>
      <p>
        El desarrollo completo, con el desfase de reporte y la diferencia entre ROAS reportado
        e incremental, está en{' '}
        <Link href="/medir-roas-campanas-whatsapp">
          cómo medir el ROAS de campañas que cierran por WhatsApp
        </Link>
        .
      </p>

      <h2>Entonces, ¿los UTMs se tiran?</h2>
      <p>
        No. Siguen siendo el instrumento correcto para todo lo que <em>sí</em> pasa por navegador:
        tráfico a landings, campañas de email, contenido orgánico, cualquier medición dentro de tu
        analítica web. Y en el escenario B conviene mantenerlos, porque documentan la mitad del
        recorrido que el <code>ctwa_clid</code> no cubre.
      </p>
      <p>
        La postura sensata es que son <strong>complementarios y de distinto ámbito</strong>: los UTMs
        miden sesiones de navegador para tu analítica; la API de Conversiones lleva conversiones al
        motor de optimización de Meta. Sustituir uno por otro es el error; usarlos como si midieran
        lo mismo, también.
      </p>

      <h2>Un orden de implementación razonable</h2>
      <ol>
        <li>
          <strong>Empieza por el reporte nativo.</strong> Si tus anuncios son Click-to-WhatsApp,
          ya tienes conversaciones iniciadas por anuncio en el Administrador de anuncios. Míralo
          antes de montar nada: puede que responda tu pregunta y te ahorre el resto de la lista.
        </li>
        <li>Mantén los UTMs en todo el tráfico que pase por web. No cuesta nada y sigue sirviendo.</li>
        <li>
          Captura el <code>ctwa_clid</code> del primer mensaje en todas las conversaciones
          originadas por anuncio, aunque todavía no envíes nada a Meta. Es un dato irrecuperable:
          cada día sin guardarlo es historia perdida.
        </li>
        <li>
          Define el evento de conversión que representa tu negocio y empieza a enviarlo por CAPI —
          el procedimiento está en{' '}
          <Link href="/como-trackear-ventas-whatsapp-meta-ads">
            cómo trackear ventas de WhatsApp en Meta Ads
          </Link>
          .
        </li>
        <li>
          Añade valor y moneda al evento cuando tengas confianza en la cifra, y solo entonces
          empieza a leer{' '}
          <Link href="/medir-roas-campanas-whatsapp">el ROAS del canal</Link>.
        </li>
        <li>
          Retira la pregunta "¿cómo nos conociste?" del guion de ventas cuando la atribución
          automática cubra el volumen suficiente. Recuperas fricción y tiempo de vendedor.
        </li>
      </ol>

      <p className="prose-note">
        El comportamiento de los enlaces <code>wa.me</code>, la disponibilidad de{' '}
        <code>ctwa_clid</code> y los formatos de anuncio Click-to-WhatsApp dependen de la plataforma
        y cambian con el tiempo. Confirma el comportamiento vigente antes de diseñar tu montaje.
      </p>
    </ArticleShell>
  )
}
