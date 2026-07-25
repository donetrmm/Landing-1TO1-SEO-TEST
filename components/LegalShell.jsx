import Link from 'next/link'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { BUSINESS, IS_DEMO, LAST_REVIEWED, SITE_URL } from '../lib/site'
import { orgRef, organizationNode, websiteNode } from '../lib/schema'

// Metadata de una página legal. Antes solo declaraban title/description/canonical, así
// que heredaban el bloque openGraph del layout y publicaban og:url apuntando a la home —
// contradiciendo su propio canonical en dos URLs.
export function legalMetadata({ title, description, path }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      siteName: '1to1AI',
      locale: 'es_MX',
      title,
      description,
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

function legalJsonLd({ title, description, path }) {
  const url = `${SITE_URL}${path}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      websiteNode(),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: 'es-MX',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        publisher: orgRef,
        dateModified: LAST_REVIEWED,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: title, item: url },
        ],
      },
    ],
  }
}

export default function LegalShell({ title, kicker, description, path, children }) {
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
              <time dateTime={LAST_REVIEWED}>Última actualización: 25 de julio de 2026</time>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalJsonLd({ title, description, path })),
        }}
      />
    </div>
  )
}
