import Link from 'next/link'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import ContactChannel from '../../components/ContactChannel'
import { ARTICLES } from '../../lib/articles'
import { AUTHOR, SITE_URL } from '../../lib/site'
import { PERSON_ID, orgRef, organizationNode, personNode, websiteNode } from '../../lib/schema'

const TITLE = `${AUTHOR.name} — autor de las guías de atribución de WhatsApp`
const DESCRIPTION = `${AUTHOR.name}, ${AUTHOR.jobTitle.toLowerCase()}, firma las guías técnicas sobre atribución de conversaciones de WhatsApp en Meta Ads publicadas en este sitio.`

export const metadata = {
  title: `Sobre ${AUTHOR.name} | 1to1AI`,
  description: DESCRIPTION,
  alternates: { canonical: '/sobre' },
  openGraph: {
    type: 'profile',
    url: '/sobre',
    siteName: '1to1AI',
    locale: 'es_MX',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationNode(),
    websiteNode(),
    personNode(),
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/sobre#profile`,
      url: `${SITE_URL}/sobre`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'es-MX',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      image: { '@type': 'ImageObject', url: `${SITE_URL}/sobre/opengraph-image`, width: 1200, height: 630 },
      mainEntity: { '@id': PERSON_ID },
      publisher: orgRef,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: `Sobre ${AUTHOR.name}`, item: `${SITE_URL}/sobre` },
      ],
    },
  ],
}

export default function Page() {
  return (
    <div className="page">
      <SiteHeader />
      <main id="contenido">
        <article className="art">
          <div className="wrap art-in">
            <nav className="crumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Sobre {AUTHOR.name}</span>
            </nav>

            <p className="eyebrow">AUTOR</p>
            <h1 className="h1 art-h1">{AUTHOR.name}</h1>
            <p className="art-standfirst">
              {AUTHOR.jobTitle}. Firma las guías técnicas sobre atribución de conversaciones de
              WhatsApp en Meta Ads publicadas en este sitio.
            </p>

            <div className="prose">
              <p>
                Este sitio es un banco de pruebas de posicionamiento en buscadores y de
                interpretación por motores generativos. El producto que aparece en la página
                principal, 1to1AI, es ficticio: no existe empresa constituida ni servicio
                comercial detrás, y así está declarado en los{' '}
                <Link href="/terminos">términos</Link> y en el{' '}
                <Link href="/aviso-de-privacidad">aviso de privacidad</Link>.
              </p>
              <p>
                Lo que no es ficticio es el contenido técnico. Las cinco guías describen cómo
                funciona de verdad la atribución de conversaciones de WhatsApp en la plataforma
                publicitaria de Meta: qué identificador de clic sostiene la cadena, qué campos
                lleva un evento de la API de Conversiones, cómo se normalizan y hashean los
                identificadores de contacto, y qué se puede concluir —y qué no— de las cifras
                que devuelve el Administrador de anuncios.
              </p>
              <p>
                Cada guía cierra con sus fuentes: documentación de primera mano de Meta,
                enlazada y verificada. Los contratos de la API cambian entre versiones, así que
                cuando algo de una guía no coincida con lo que ves, manda la fuente. Si
                encuentras un error, escribe: <ContactChannel />.
              </p>

              <h2>Guías firmadas</h2>
              <ul>
                {ARTICLES.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/${a.slug}`}>{a.h1}</Link>
                  </li>
                ))}
              </ul>

              <h2>Perfil</h2>
              <ul className="perfil-list">
                <li>
                  <a href={AUTHOR.sameAs[0]} target="_blank" rel="nofollow noopener me">
                    LinkedIn
                  </a>
                </li>
                <li><ContactChannel /></li>
              </ul>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
