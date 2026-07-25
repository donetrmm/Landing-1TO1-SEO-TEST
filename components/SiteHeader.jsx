import Link from 'next/link'
import { IS_DEMO } from '../lib/site'

// `home` alterna entre anclas locales (#faq) y enlaces absolutos (/#faq), para que el
// mismo header funcione en la landing y en las guías internas.
export default function SiteHeader({ home = false }) {
  const h = (id) => (home ? `#${id}` : `/#${id}`)
  return (
    <>
      {IS_DEMO && (
        <p className="demo-bar">
          <span aria-hidden="true">●</span> Sitio de demostración — 1to1AI es un producto
          ficticio usado como banco de pruebas de SEO. No hay servicio comercial detrás.
        </p>
      )}
      <header id="siteHeader" className="hdr">
        <div id="scrollProgress" className="hdr-prog" aria-hidden="true" />
        <div className="wrap hdr-in">
          <Link href="/" aria-label="1to1AI — inicio" className="hdr-logo">
            <img src="/uploads/logo.png" alt="Logotipo de 1to1AI" width="118" height="34" />
          </Link>
          <nav aria-label="Navegación principal" className="nav" id="mainNav">
            <a href={h('caracteristicas')}>Características</a>
            <a href={h('beneficios')}>Beneficios</a>
            <Link href="/guias">Guías</Link>
            <a href={h('contacto')}>Contacto</a>
          </nav>
          <div className="hdr-right">
            <div className="lang" role="group" aria-label="Idioma">
              <span aria-current="true">ES</span>
              <span className="soon" title="Versión en inglés — próximamente">EN</span>
            </div>
            <a href={h('contacto')} className="hdr-cta">
              Solicitar acceso<span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>
    </>
  )
}
