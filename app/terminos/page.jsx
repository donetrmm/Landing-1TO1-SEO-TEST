import Link from 'next/link'
import LegalShell, { legalMetadata } from '../../components/LegalShell'
import ContactChannel from '../../components/ContactChannel'
import { BUSINESS } from '../../lib/site'

const DESCRIPTION =
  'Términos y condiciones de uso del sitio de 1to1AI: naturaleza demostrativa del proyecto, alcance del contenido publicado, propiedad intelectual y limitación de responsabilidad.'

export const metadata = legalMetadata({
  title: 'Términos y condiciones | 1to1AI',
  description: DESCRIPTION,
  path: '/terminos',
})

export default function Page() {
  return (
    <LegalShell title="Términos y condiciones" kicker="LEGAL" description={DESCRIPTION} path="/terminos">
      <h2>1. Naturaleza de este sitio</h2>
      <p>
        {BUSINESS.name} es un producto ficticio. Este sitio se publica exclusivamente como banco de
        pruebas para experimentar con posicionamiento en buscadores y con la forma en que los
        motores generativos interpretan contenido estructurado.
      </p>
      <p>
        En consecuencia: no se comercializa ningún software, no existe una relación contractual
        posible derivada del uso de este sitio, y las funcionalidades descritas en la página
        principal ilustran un producto hipotético.
      </p>

      <h2>2. Aceptación</h2>
      <p>
        El acceso y la navegación por este sitio implican la aceptación de estos términos. Quien no
        esté de acuerdo con ellos debe abstenerse de utilizarlo.
      </p>

      <h2>3. Alcance del contenido publicado</h2>
      <p>
        Las guías técnicas publicadas en este sitio —sobre la API de Conversiones de Meta,
        atribución de conversaciones y medición de retorno publicitario— tienen finalidad
        informativa y educativa. Se elaboraron con cuidado, pero:
      </p>
      <ul>
        <li>
          Describen plataformas de terceros cuyo comportamiento, nombres de campo y contratos de API
          cambian con frecuencia y sin previo aviso.
        </li>
        <li>
          No sustituyen la documentación oficial del proveedor correspondiente, que es la única
          fuente autoritativa.
        </li>
        <li>
          No constituyen asesoría profesional en materia técnica, fiscal, legal ni de marketing.
        </li>
      </ul>
      <p>
        Cualquier decisión de implementación basada en este contenido debe verificarse contra la
        documentación vigente del proveedor. Las guías están disponibles desde la{' '}
        <Link href="/#guias">sección de guías</Link> de la página principal.
      </p>

      <h2>4. Formulario de solicitud</h2>
      <p>
        El formulario de la sección de contacto es una demostración de interfaz: valida los campos
        en el navegador y muestra un mensaje de confirmación, pero no transmite ni almacena
        información en ningún servidor. No debe utilizarse para enviar datos personales reales.
      </p>
      <p>
        El tratamiento hipotético de esos datos se describe en el{' '}
        <Link href="/aviso-de-privacidad">aviso de privacidad</Link>.
      </p>

      <h2>5. Cifras y ejemplos</h2>
      <p>
        Las métricas mostradas en la página principal —retorno publicitario, conversiones, leads
        atribuidos y variación del costo por lead— corresponden a una cuenta de ejemplo construida
        con fines ilustrativos. No representan resultados obtenidos por clientes reales ni
        constituyen promesa alguna de desempeño.
      </p>
      <p>
        Del mismo modo, las conversaciones de WhatsApp reproducidas en las ilustraciones son
        escenarios inventados para explicar el funcionamiento del producto hipotético.
      </p>

      <h2>6. Propiedad intelectual</h2>
      <p>
        Los textos y el diseño de este sitio son obra de sus autores. Las marcas mencionadas —Meta,
        Facebook, Instagram, WhatsApp y cualesquiera otras— pertenecen a sus respectivos titulares y
        se citan únicamente con finalidad descriptiva. Este sitio no está afiliado, patrocinado ni
        avalado por Meta Platforms, Inc. ni por ninguna de sus filiales.
      </p>

      <h2>7. Limitación de responsabilidad</h2>
      <p>
        El sitio se ofrece "tal cual", sin garantía de disponibilidad, exactitud o adecuación a un
        fin particular. No se asume responsabilidad por daños directos o indirectos derivados del
        uso del sitio o de la aplicación de la información aquí publicada.
      </p>

      <h2>8. Enlaces a terceros</h2>
      <p>
        Este sitio puede referirse a documentación y plataformas de terceros. No se ejerce control
        alguno sobre esos recursos ni se asume responsabilidad por su contenido, sus condiciones de
        uso o sus prácticas de privacidad.
      </p>

      <h2>9. Modificaciones</h2>
      <p>
        Estos términos pueden actualizarse en cualquier momento. La versión vigente es siempre la
        publicada en esta dirección, con la fecha de última actualización indicada en el encabezado.
      </p>

      <h2>10. Contacto</h2>
      <p>
        Para cualquier consulta relacionada con estos términos:{' '}
        <ContactChannel fallback="no hay buzón de contacto activo mientras el proyecto sea una demostración" />
        .
      </p>

      <p className="prose-note">
        Documento de demostración con fines de prueba de posicionamiento. No constituye asesoría
        legal ni un contrato.
      </p>
    </LegalShell>
  )
}
