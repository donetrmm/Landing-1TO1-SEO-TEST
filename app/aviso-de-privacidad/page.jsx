import Link from 'next/link'
import LegalShell, { legalMetadata } from '../../components/LegalShell'
import ContactChannel, { hasContact } from '../../components/ContactChannel'
import { BUSINESS } from '../../lib/site'

const DESCRIPTION =
  'Aviso de privacidad de 1to1AI: datos personales que se recaban en el formulario de solicitud, finalidades del tratamiento, transferencias a Meta y ejercicio de derechos ARCO conforme a la LFPDPPP.'

export const metadata = legalMetadata({
  title: 'Aviso de privacidad | 1to1AI',
  description: DESCRIPTION,
  path: '/aviso-de-privacidad',
})

export default function Page() {
  return (
    <LegalShell title="Aviso de privacidad" kicker="LEGAL" description={DESCRIPTION} path="/aviso-de-privacidad">
      <h2>1. Responsable del tratamiento</h2>
      <p>
        El artículo 16 de la Ley Federal de Protección de Datos Personales en Posesión de los
        Particulares (LFPDPPP) exige que todo aviso de privacidad identifique al responsable con
        su denominación o razón social y su domicilio.{' '}
        <strong>Este documento no puede cumplir ese requisito</strong>, y conviene decirlo sin
        rodeos en lugar de rellenarlo con datos inventados: {BUSINESS.name} es un producto
        ficticio, no existe persona moral constituida, ni domicilio fiscal, ni RFC.
      </p>
      <p>
        La consecuencia práctica es que <strong>este sitio no está en condiciones de recabar
        datos personales</strong>, y por eso no lo hace: el formulario de solicitud valida los
        campos en el navegador y no transmite nada a ningún servidor (sección 2). Un aviso de
        privacidad sin responsable identificable solo es admisible porque no hay tratamiento
        detrás. En cuanto exista un formulario que envíe datos de verdad, esta sección deja de
        ser un apunte metodológico y pasa a ser un incumplimiento.
      </p>
      <p>
        Canal de contacto para cualquier asunto relacionado con este aviso:{' '}
        <ContactChannel fallback="no hay buzón de contacto activo mientras el proyecto sea una demostración" />
        .
      </p>

      <h2>2. Datos personales que se recaban</h2>
      <p>
        El formulario de solicitud de acceso de este sitio contempla los siguientes campos:
      </p>
      <ul>
        <li>Nombre completo</li>
        <li>Correo electrónico corporativo</li>
        <li>Nombre de la empresa</li>
        <li>Número telefónico con WhatsApp</li>
        <li>Volumen aproximado de leads mensuales</li>
        <li>Descripción libre del motivo de la solicitud</li>
      </ul>
      <p>
        No se recaban datos personales sensibles en los términos del artículo 3, fracción VI de la
        LFPDPPP: no se solicita origen racial o étnico, estado de salud, información genética,
        creencias religiosas, filosóficas o morales, afiliación sindical, opiniones políticas ni
        preferencia sexual.
      </p>
      <p>
        <strong>Importante:</strong> el formulario de este sitio es una demostración de interfaz. La
        validación ocurre en el navegador y los datos capturados no se transmiten ni se almacenan en
        ningún servidor.
      </p>

      <h2>3. Finalidades del tratamiento</h2>
      <p>Finalidades primarias, necesarias para la relación:</p>
      <ul>
        <li>Evaluar si la solicitud cumple los criterios de acceso al producto.</li>
        <li>Contactar al solicitante para dar respuesta y coordinar la configuración inicial.</li>
        <li>Prestar el servicio contratado y dar soporte técnico.</li>
      </ul>
      <p>Finalidades secundarias, que el titular puede rechazar sin afectar la relación:</p>
      <ul>
        <li>Envío de comunicaciones sobre novedades del producto.</li>
        <li>Elaboración de estadísticas agregadas de uso y de perfilamiento comercial.</li>
      </ul>
      <p>
        Para oponerse a las finalidades secundarias bastaría con indicarlo expresamente por el
        canal de contacto: <ContactChannel />.
      </p>

      <h2>4. Transferencias y remisiones de datos</h2>
      <p>
        Esta sección es la más relevante para un producto de atribución publicitaria y merece
        lectura atenta.
      </p>
      <p>
        La operación del producto descrito en este sitio implica enviar identificadores de contacto
        —correo electrónico y número telefónico— a <strong>Meta Platforms, Inc.</strong> a través de
        la API de Conversiones, con la finalidad de medir la efectividad de campañas publicitarias y
        permitir su optimización.
      </p>
      <p>
        Esos identificadores se transmiten cifrados mediante una función hash SHA-256 tras su
        normalización. El proceso reduce la exposición del dato, pero{' '}
        <strong>no lo convierte en información anónima</strong>: el hash sigue siendo un
        identificador que permite reconocer a la persona dentro de la plataforma de destino. Por
        ello se trata, en todos los casos, como dato personal.
      </p>
      <p>
        El tratamiento posterior que Meta realiza de esa información se rige por sus propias
        políticas de privacidad y condiciones para empresas. Puedes ampliar el contexto técnico en
        nuestra guía sobre{' '}
        <Link href="/api-de-conversiones-meta-que-es">
          qué es la API de Conversiones de Meta
        </Link>
        .
      </p>
      <p>
        Fuera de lo anterior, no se realizan transferencias de datos personales a terceros sin el
        consentimiento del titular, salvo en los supuestos previstos en el artículo 37 de la
        LFPDPPP.
      </p>

      <h2>5. Derechos ARCO</h2>
      <p>
        El titular tiene derecho a conocer qué datos personales se tienen sobre él, para qué se
        utilizan y las condiciones del uso que se les da (Acceso); solicitar la corrección de su
        información cuando esté desactualizada, sea inexacta o incompleta (Rectificación); pedir que
        se elimine de los registros cuando considere que no está siendo utilizada conforme a los
        principios y deberes que marca la normativa (Cancelación); y oponerse al uso de sus datos
        personales para fines específicos (Oposición).
      </p>
      {!hasContact && (
        <p>
          <strong>Sin canal de contacto activo, estos derechos no son ejercitables aquí.</strong>{' '}
          Es una consecuencia directa de lo dicho en la sección 1, y la razón por la que este
          sitio no recaba dato alguno: no se recoge lo que no se puede atender. El procedimiento
          que sigue describe cómo debería tramitarse en una implementación real.
        </p>
      )}
      <p>
        La solicitud debe enviarse por el canal de contacto (<ContactChannel />) con el
        nombre del titular, un medio para comunicarle la respuesta, los documentos que acrediten su
        identidad, la descripción clara de los datos respecto de los que busca ejercer el derecho y
        cualquier elemento que facilite su localización.
      </p>
      <p>
        La LFPDPPP establece un plazo máximo de veinte días hábiles para comunicar la determinación
        adoptada, y quince días hábiles adicionales para hacerla efectiva cuando resulte procedente.
      </p>

      <h2>6. Revocación del consentimiento</h2>
      <p>
        El titular puede revocar en cualquier momento el consentimiento otorgado para el tratamiento
        de sus datos personales, por el mismo medio señalado en la sección anterior. Conviene
        considerar que en ciertos casos la revocación puede implicar la imposibilidad de continuar
        prestando el servicio, y que en otros la normativa exige conservar cierta información por
        obligaciones legales.
      </p>

      <h2>7. Uso de cookies y tecnologías de rastreo</h2>
      <p>
        Este sitio no instala cookies de rastreo publicitario ni herramientas de analítica de
        terceros. Las fuentes tipográficas se sirven desde el propio dominio, de modo que la
        navegación no genera peticiones a servidores externos.
      </p>
      <p>
        En una implementación real que incorporara el Pixel de Meta, esta sección debería detallar
        qué cookies se instalan, con qué finalidad, su vigencia y el mecanismo por el que el usuario
        puede deshabilitarlas.
      </p>

      <h2>8. Medidas de seguridad</h2>
      <p>
        El sitio se sirve íntegramente sobre HTTPS. En una implementación real deben describirse
        además las medidas administrativas, técnicas y físicas adoptadas para proteger los datos
        personales contra daño, pérdida, alteración, destrucción o uso no autorizado, conforme al
        artículo 19 de la LFPDPPP.
      </p>

      <h2>9. Cambios al aviso de privacidad</h2>
      <p>
        Cualquier modificación a este aviso se publicará en esta misma dirección, indicando la fecha
        de última actualización en el encabezado del documento. Se recomienda revisarlo
        periódicamente.
      </p>

      <h2>10. Autoridad competente</h2>
      <p>
        Si el titular considera que su derecho a la protección de datos personales ha sido
        vulnerado, puede acudir ante la autoridad competente en materia de protección de datos
        personales en México para presentar la denuncia o queja correspondiente.
      </p>

      <p className="prose-note">
        Documento de demostración con fines de prueba de posicionamiento. No constituye asesoría
        legal. Antes de publicar un aviso de privacidad real, revísalo con un profesional del
        derecho.
      </p>
    </LegalShell>
  )
}
