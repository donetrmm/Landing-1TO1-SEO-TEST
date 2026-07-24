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

      <h2>Comparativa de los cuatro métodos</h2>
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
              <th scope="col" className="hl">CAPI + CTWA_CLID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Sobrevive al salto a la app</th>
              <td>No</td>
              <td>Parcialmente</td>
              <td>No aplica</td>
              <td className="hl">Sí</td>
            </tr>
            <tr>
              <th scope="row">Granularidad</th>
              <td>Campaña</td>
              <td>Campaña</td>
              <td>Canal, aproximado</td>
              <td className="hl">Anuncio individual</td>
            </tr>
            <tr>
              <th scope="row">Depende del usuario</th>
              <td>No</td>
              <td>Sí, puede borrar el texto</td>
              <td>Sí, depende de su memoria</td>
              <td className="hl">No</td>
            </tr>
            <tr>
              <th scope="row">El dato llega a Meta</th>
              <td>No</td>
              <td>No</td>
              <td>No</td>
              <td className="hl">Sí</td>
            </tr>
            <tr>
              <th scope="row">Permite optimización algorítmica</th>
              <td>No</td>
              <td>No</td>
              <td>No</td>
              <td className="hl">Sí</td>
            </tr>
            <tr>
              <th scope="row">Esfuerzo de montaje</th>
              <td>Bajo</td>
              <td>Bajo</td>
              <td>Nulo</td>
              <td className="hl">Medio, una sola vez</td>
            </tr>
          </tbody>
        </table>
      </div>

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
