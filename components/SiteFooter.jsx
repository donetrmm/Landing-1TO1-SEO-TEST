import Link from 'next/link'
import { BUSINESS, CONTACT_EMAIL, IS_DEMO } from '../lib/site'

// El footer ya NO lista las cinco guías. Repetirlas en las nueve páginas producía 45
// enlaces boilerplate que Google descuenta, aplanaban el grafo interno hasta volverlo una
// malla sin jerarquía, e inflaban cualquier conteo de enlaces entrantes. Ahora hay un
// único enlace a /guias, que es el nodo que distribuye hacia las cinco.
export default function SiteFooter({ home = false }) {
  const h = (id) => (home ? `#${id}` : `/#${id}`)
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-about">
          <img src="/uploads/logo.png" alt="Logotipo de 1to1AI" width="104" height="30" />
          <p>
            Software de atribución que conecta tus conversaciones de WhatsApp con el Pixel de
            Meta y la API de Conversiones.
          </p>
        </div>
        <nav aria-label="Navegación del sitio">
          <p className="foot-h">SITIO</p>
          <ul>
            <li><a href={h('caracteristicas')}>Características de 1to1AI</a></li>
            <li><a href={h('beneficios')}>Beneficios para marketing y ventas</a></li>
            <li><Link href="/guias">Guías de atribución de WhatsApp</Link></li>
            <li><a href={h('faq')}>Preguntas frecuentes</a></li>
            <li><a href={h('contacto')}>Solicitar acceso</a></li>
          </ul>
        </nav>
        <nav aria-label="Legal">
          <p className="foot-h">LEGAL</p>
          <ul>
            <li><Link href="/aviso-de-privacidad">Aviso de privacidad</Link></li>
            <li><Link href="/terminos">Términos y condiciones</Link></li>
          </ul>
        </nav>
        <div>
          <p className="foot-h">CONTACTO</p>
          <ul className="mono-list">
            {CONTACT_EMAIL ? (
              <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            ) : (
              <li className="foot-nocontact">{BUSINESS.noContactNotice}</li>
            )}
            <li>{BUSINESS.areaServed} · {BUSINESS.locale}</li>
          </ul>
        </div>
      </div>
      <div className="foot-bar">
        <p className="wrap">
          © 2026 1to1AI · {BUSINESS.areaServed} · es-MX
          {IS_DEMO && <span className="foot-demo"> · {BUSINESS.legalNotice}</span>}
        </p>
      </div>
    </footer>
  )
}
