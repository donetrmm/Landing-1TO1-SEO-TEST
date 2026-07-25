import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import { ARTICLES } from '../../lib/articles'
import { SITE_URL } from '../../lib/site'
import { orgRef, organizationNode } from '../../lib/schema'

const TITLE = 'Guías de atribución de WhatsApp para Meta Ads'
const DESCRIPTION =
  'Cinco guías técnicas sobre cómo atribuir a Meta Ads las ventas que cierran en WhatsApp: identificadores de clic, API de Conversiones, deduplicación de eventos y medición de ROAS.'

export const metadata = {
  title: `${TITLE} | 1to1AI`,
  description: DESCRIPTION,
  alternates: { canonical: '/guias' },
  openGraph: {
    type: 'website',
    url: '/guias',
    siteName: '1to1AI',
    locale: 'es_MX',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/uploads/logo.png'],
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION, images: ['/uploads/logo.png'] },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationNode(),
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/guias#collection`,
      name: TITLE,
      description: DESCRIPTION,
      url: `${SITE_URL}/guias`,
      inLanguage: 'es-MX',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: orgRef,
      mainEntity: {
        '@type': 'ItemList',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: ARTICLES.length,
        itemListElement: ARTICLES.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: a.h1,
          url: `${SITE_URL}/${a.slug}`,
        })),
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Guías', item: `${SITE_URL}/guias` },
      ],
    },
  ],
}

export default function Page() {
  return (
    <div className="page">
      <SiteHeader />
      <main>
        <div className="art">
          <div className="wrap art-in art-in-wide">
            <nav className="crumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Guías</span>
            </nav>
            <p className="eyebrow">GUÍAS</p>
            <h1 className="h1 art-h1">{TITLE}</h1>
            <p className="art-standfirst">
              Cómo se atribuye a una campaña de Meta una venta que se cerró dentro de una
              conversación de WhatsApp. Cinco guías escritas para quien va a implementarlo: qué
              identificador sostiene la atribución, cómo se envía el evento, cómo se verifica y
              qué se puede concluir del número que sale al final.
            </p>

            <ol className="guias-list">
              {ARTICLES.map((a, i) => (
                <li key={a.slug} className="guia-row">
                  <span className="guia-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="guia-body">
                    <p className="guia-k">{a.kicker}</p>
                    <h2 className="h3">
                      <Link href={`/${a.slug}`}>{a.h1}</Link>
                    </h2>
                    <p className="guia-d">{a.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="guias-foot">
              El punto de partida recomendado es{' '}
              <Link href="/como-trackear-ventas-whatsapp-meta-ads">
                cómo trackear ventas de WhatsApp en Meta Ads
              </Link>
              : las otras cuatro desarrollan una pieza concreta de ese recorrido.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
