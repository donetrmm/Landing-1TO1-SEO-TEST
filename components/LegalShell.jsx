import Link from 'next/link'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { BUSINESS, IS_DEMO, LAST_REVIEWED } from '../lib/site'

export default function LegalShell({ title, kicker, children }) {
  return (
    <div className="page">
      <SiteHeader />
      <main>
        <article className="art legal">
          <div className="wrap art-in">
            <nav className="crumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </nav>
            <p className="eyebrow">{kicker}</p>
            <h1 className="h1 art-h1">{title}</h1>
            <p className="art-meta">
              <time dateTime={LAST_REVIEWED}>Última actualización: 24 de julio de 2026</time>
            </p>

            {IS_DEMO && (
              <div className="notice" role="note">
                <p className="notice-h">Aviso importante: este es un documento de demostración</p>
                <p>
                  {BUSINESS.name} es un producto ficticio. Este sitio existe únicamente como banco
                  de pruebas de posicionamiento en buscadores y no presta ningún servicio comercial.
                  El texto que sigue reproduce la estructura que exige la normativa mexicana, pero{' '}
                  <strong>no constituye un documento legal vinculante</strong> ni sustituye la
                  asesoría de un profesional. No envíes datos personales reales a través de este
                  sitio.
                </p>
              </div>
            )}

            <div className="prose">{children}</div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
