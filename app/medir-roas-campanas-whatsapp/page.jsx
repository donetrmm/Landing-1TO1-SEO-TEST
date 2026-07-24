import Link from 'next/link'
import ArticleShell, { articleMetadata } from '../../components/ArticleShell'
import { bySlug } from '../../lib/articles'

const article = bySlug('medir-roas-campanas-whatsapp')
export const metadata = articleMetadata(article)

export default function Page() {
  return (
    <ArticleShell article={article}>
      <p>
        El ROAS —retorno sobre la inversión publicitaria— es una división honesta: ingresos
        atribuidos entre gasto publicitario. La dificultad nunca está en la fórmula, sino en el
        numerador. En una operación que cierra por WhatsApp, ese numerador vive en un chat, en una
        hoja de cálculo o en la cabeza de un vendedor, y Meta no tiene forma de conocerlo salvo que
        alguien se lo diga.
      </p>
      <p>
        De ahí que tantas cuentas reporten un ROAS de 0 con ventas reales sucediendo. No es un fallo
        de medición: es que nunca se envió el valor.
      </p>

      <h2>Las cuatro decisiones previas</h2>
      <p>
        Antes de mirar un solo número hay que tomar cuatro decisiones. Tomadas mal, ningún dashboard
        posterior las arregla.
      </p>

      <h3>1. Qué valor se envía</h3>
      <p>
        El campo <code>value</code> de <code>custom_data</code> admite cualquier cifra, así que la
        pregunta es cuál refleja tu negocio:
      </p>
      <ul>
        <li>
          <strong>Ingreso bruto de la venta.</strong> Lo más común y lo más comparable con el resto
          del mercado.
        </li>
        <li>
          <strong>Margen de contribución.</strong> Más honesto si tus márgenes varían mucho por
          producto; obliga a reinterpretar el umbral de rentabilidad, que deja de ser ROAS 1.
        </li>
        <li>
          <strong>Valor esperado del lead.</strong> Cuando el cierre tarda semanas y no cabe en la
          ventana de atribución, se envía el ticket promedio multiplicado por la tasa histórica de
          cierre. Es una estimación declarada, y hay que tratarla como tal.
        </li>
      </ul>
      <p>
        La única regla inviolable: elegir una y no cambiarla. Un cambio de definición a mitad de
        trimestre destruye toda comparación histórica y no queda rastro de por qué.
      </p>

      <h3>2. Qué moneda</h3>
      <p>
        <code>currency</code> es obligatorio junto a <code>value</code> y debe ser un código ISO
        4217 — <code>MXN</code>, <code>USD</code>, <code>COP</code>. Meta convierte a la moneda de
        la cuenta publicitaria usando su propio tipo de cambio, que no coincidirá exactamente con el
        de tu contabilidad. Para operaciones multipaís, esa diferencia es una fuente permanente de
        discusión entre marketing y finanzas: conviene documentarla antes de que aparezca.
      </p>

      <h3>3. Qué ventana de atribución</h3>
      <p>
        Meta atribuye una conversión a un anuncio si ocurre dentro de una ventana desde el clic o la
        visualización. El estándar es 7 días de clic y 1 día de visualización; existen otras
        configuraciones según el objetivo de campaña.
      </p>
      <p>
        Para WhatsApp esto importa más que en e-commerce. Una conversación de venta consultiva no se
        cierra en veinte minutos: se cierra en tres días, con dos idas y vueltas de por medio. Con
        una ventana de 1 día de clic, buena parte de tus ventas quedaría fuera y el canal parecería
        peor de lo que es. La ventana de 7 días de clic captura mejor ese comportamiento.
      </p>
      <p>
        Y una advertencia de método: comparar el ROAS de dos periodos medidos con ventanas distintas
        no es comparar nada. Fija la ventana y compárala siempre contra sí misma.
      </p>

      <h3>4. Qué evento representa el ingreso</h3>
      <p>
        Si optimizas hacia <code>Lead</code> pero mides ROAS con <code>Purchase</code>, el algoritmo
        y el reporte están mirando cosas distintas — lo cual está bien mientras seas consciente. Lo
        que no funciona es enviar valor monetario en el evento de lead <em>y también</em> en el de
        compra: contarías el mismo ingreso dos veces.
      </p>

      <h2>Por qué Meta y tu CRM nunca van a coincidir</h2>
      <p>
        Es la conversación más repetida en cualquier revisión de campaña, y casi siempre se plantea
        como si uno de los dos sistemas estuviera roto. No lo está. Difieren por tres razones
        estructurales:
      </p>
      <div className="tbl-wrap">
        <table className="tbl">
          <caption className="sr-only">
            Diferencias estructurales entre el reporte de Meta y el CRM
          </caption>
          <thead>
            <tr>
              <th scope="col">CRITERIO</th>
              <th scope="col" className="hl">META ADS</th>
              <th scope="col">CRM / CONTABILIDAD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Fecha que reporta</th>
              <td className="hl">La del clic o impresión del anuncio</td>
              <td>La del cobro o la factura</td>
            </tr>
            <tr>
              <th scope="row">Modelo de atribución</th>
              <td className="hl">Ventana configurable, multi-touch propietaria</td>
              <td>Último clic, o el origen que capturó el vendedor</td>
            </tr>
            <tr>
              <th scope="row">Universo medido</th>
              <td className="hl">Solo lo atribuible a anuncios</td>
              <td>Todas las ventas, incluidas orgánicas y recompras</td>
            </tr>
            <tr>
              <th scope="row">Consolidación</th>
              <td className="hl">Se ajusta durante días dentro de la ventana</td>
              <td>Cierra y no se mueve</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Una diferencia del 10 al 20 por ciento entre ambos sistemas es normal y no requiere
        investigación. Una diferencia del 60 por ciento sí: ahí lo habitual es pérdida de
        identificadores de clic, hasheo mal normalizado o eventos enviados fuera de la ventana
        temporal admitida. El diagnóstico está en{' '}
        <Link href="/alimentar-pixel-meta-desde-whatsapp">
          cómo alimentar el Pixel de Meta desde WhatsApp
        </Link>
        .
      </p>

      <h2>El desfase de reporte, y cómo no engañarse</h2>
      <p>
        Meta imputa la conversión al día del <em>clic</em>, no al día de la venta. Consecuencia
        práctica: el ROAS de ayer siempre está incompleto, y el de hace siete días es el primero
        razonablemente estable. Revisar rendimiento a las nueve de la mañana con datos de la
        madrugada y tomar decisiones de presupuesto sobre eso es la forma más eficiente de apagar
        campañas que funcionaban.
      </p>
      <p>
        Regla operativa sencilla: decisiones de pausar o escalar, sobre ventanas móviles de 7 o 14
        días. Nunca sobre un día suelto.
      </p>

      <h2>ROAS reportado y ROAS incremental</h2>
      <p>
        El ROAS que devuelve la plataforma responde a "cuántos ingresos se asociaron a estos
        anuncios". La pregunta de negocio es otra: "cuántos ingresos <em>no habrían existido</em>
        sin estos anuncios". Las campañas de retargeting y las de marca ya conocida suelen reclamar
        ventas que habrían ocurrido igual, lo que infla el ROAS reportado sin aportar crecimiento.
      </p>
      <p>
        Medir incrementalidad exige un experimento: pruebas de retención geográfica —apagar el canal
        en algunas plazas y comparar—, estudios de <em>conversion lift</em>, o modelos de mezcla de
        medios cuando hay historia suficiente. No es trabajo de todos los meses, pero una lectura al
        año recalibra expectativas y suele ahorrar más presupuesto que cualquier optimización de
        pujas.
      </p>

      <h2>Métricas que acompañan al ROAS</h2>
      <ul>
        <li>
          <strong>Costo por conversación iniciada:</strong> la métrica de entrada del canal. Si sube
          sin que suba el ROAS, el problema es de creatividad o de saturación de audiencia.
        </li>
        <li>
          <strong>Tasa de conversación a venta:</strong> es responsabilidad del equipo de ventas, no
          del algoritmo. Un ROAS bajo con buen costo por conversación apunta al guion de atención,
          no a la campaña.
        </li>
        <li>
          <strong>Tiempo medio hasta el cierre:</strong> define qué ventana de atribución es honesta
          para tu negocio. Vale la pena medirlo antes de discutir la ventana.
        </li>
        <li>
          <strong>Valor de vida del cliente:</strong> en negocios de recompra, un ROAS de primera
          compra por debajo de 1 puede ser perfectamente rentable. Sin este dato la conversación
          sobre rentabilidad está incompleta.
        </li>
      </ul>

      <p>
        Si aún no tienes el valor de conversión llegando a Meta, el ROAS es una discusión prematura:
        empieza por{' '}
        <Link href="/como-trackear-ventas-whatsapp-meta-ads">
          conectar la señal de atribución
        </Link>{' '}
        y por entender{' '}
        <Link href="/atribucion-whatsapp-vs-utms">
          por qué los UTMs no cubren este caso
        </Link>
        .
      </p>

      <p className="prose-note">
        Las ventanas de atribución disponibles y los nombres de las métricas varían según el
        objetivo de campaña y la versión de la plataforma. Confirma la configuración vigente en el
        Administrador de anuncios de tu cuenta.
      </p>
    </ArticleShell>
  )
}
