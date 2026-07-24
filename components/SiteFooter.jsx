import Link from 'next/link'
import { ARTICLES } from '../lib/articles'
import { BUSINESS, IS_DEMO } from '../lib/site'

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
            <li><Link href="/">Inicio</Link></li>
            <li><a href={h('caracteristicas')}>Características de 1to1AI</a></li>
            <li><a href={h('beneficios')}>Beneficios para marketing y ventas</a></li>
            <li><a href={h('faq')}>Preguntas frecuentes</a></li>
            <li><a href={h('contacto')}>Solicitar acceso</a></li>
          </ul>
        </nav>
        <nav aria-label="Guías">
          <p className="foot-h">GUÍAS</p>
          <ul>
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link href={`/${a.slug}`}>{a.h1}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <nav aria-label="Legal">
            <p className="foot-h">LEGAL</p>
            <ul>
              <li><Link href="/aviso-de-privacidad">Aviso de privacidad</Link></li>
              <li><Link href="/terminos">Términos y condiciones</Link></li>
            </ul>
          </nav>
          <p className="foot-h" style={{ marginTop: 28 }}>CONTACTO</p>
          <ul className="mono-list">
            <li><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
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
