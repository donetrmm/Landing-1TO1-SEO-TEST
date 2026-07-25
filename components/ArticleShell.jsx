import Link from 'next/link'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import Sources from './Sources'
import { relatedOf } from '../lib/articles'
import { AUTHOR, SITE_URL } from '../lib/site'
import { WEBSITE_ID, orgRef, organizationNode, personNode, personRef, websiteNode } from '../lib/schema'

const LONG_DATE = { day: 'numeric', month: 'long', year: 'numeric' }
const fmtDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('es-MX', { ...LONG_DATE, timeZone: 'UTC' })

// Metadata de Next para una guía. Cada page.jsx exporta `metadata = articleMetadata(a)`.
export function articleMetadata(a) {
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/${a.slug}` },
    openGraph: {
      type: 'article',
      url: `/${a.slug}`,
      siteName: '1to1AI',
      locale: 'es_MX',
      title: a.title,
      description: a.description,
      publishedTime: a.published,
      modifiedTime: a.lastmod,
    },
    twitter: {
      card: 'summary_large_image',
      title: a.title,
      description: a.description,
    },
  }
}

function articleJsonLd(a) {
  const url = `${SITE_URL}/${a.slug}`
  // El Organization va como nodo completo con su @id estable, y author/publisher lo
  // referencian. Antes se redefinía inline en cada campo de cada página: siete copias de
  // la misma entidad en vez de una.
  // Google resuelve el @graph por documento: no cose @id entre URLs. Los nodos que se
  // referencian —Organization, WebSite, Person— tienen que emitirse en la misma página,
  // o `isPartOf` y `publisher` quedan colgando.
  const graph = [
    organizationNode(),
    websiteNode(),
    personNode(),
    {
      '@type': 'TechArticle',
      '@id': `${url}#article`,
      headline: a.h1,
      name: a.title,
      description: a.description,
      inLanguage: 'es-MX',
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      // `image` es requisito de Google para rich results de articulo, y la imagen ya
      // existe desde que se generan las OG por pagina. Faltaba cablearla.
      image: { '@type': 'ImageObject', url: `${url}/opengraph-image`, width: 1200, height: 630 },
      isPartOf: { '@id': WEBSITE_ID },
      datePublished: a.published,
      dateModified: a.lastmod,
      // author = persona, publisher = organización. Un autor con nombre y perfil
      // verificable pesa más que una marca anónima, sobre todo en un dominio sin
      // autoridad propia.
      author: personRef,
      publisher: orgRef,
      about: [
        { '@type': 'Thing', name: 'Meta Ads' },
        { '@type': 'Thing', name: 'API de Conversiones de Meta' },
        { '@type': 'Thing', name: 'Atribución de marketing' },
        { '@type': 'Thing', name: 'WhatsApp Business' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Guías', item: `${SITE_URL}/guias` },
        { '@type': 'ListItem', position: 3, name: a.h1, item: url },
      ],
    },
  ]
  if (a.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: a.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export default function ArticleShell({ article, children }) {
  const related = relatedOf(article.slug)
  return (
    <div className="page">
      <SiteHeader />
      <main id="contenido">
        <article className="art">
          <div className="wrap art-in">
            <nav className="crumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link href="/guias">Guías</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{article.h1}</span>
            </nav>

            <p className="eyebrow">{article.kicker}</p>
            <h1 className="h1 art-h1">{article.h1}</h1>
            <p className="art-standfirst">{article.standfirst}</p>
            <p className="art-meta">
              <span className="byline">
                Por <Link href="/sobre" rel="author">{AUTHOR.name}</Link>, {AUTHOR.jobTitle}
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.published}>Publicado el {fmtDate(article.published)}</time>
              <span aria-hidden="true">·</span>
              <span>Revisado el {fmtDate(article.lastmod)}</span>
            </p>

            <div className="prose">{children}</div>

            <Sources items={article.sources} />

            {article.faq?.length > 0 && (
              <section className="art-faq" aria-labelledby={`faq-${article.slug}`}>
                <h2 id={`faq-${article.slug}`} className="sub-h">Preguntas frecuentes</h2>
                <div className="faq-list">
                  {article.faq.map((f) => (
                    <details key={f.q}>
                      <summary>{f.q}</summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {related.length > 0 && (
              // El enlace envuelve SOLO el título, que es el anchor descriptivo que
              // interesa; el kicker y el resumen quedan fuera. La tarjeta entera sigue
              // siendo clicable vía ::after, sin diluir el anchor con 30 palabras.
              <nav className="art-rel" aria-labelledby="rel-h">
                <h2 id="rel-h" className="sub-h">Sigue leyendo</h2>
                <ul>
                  {related.map((r) => (
                    <li key={r.slug} className="rel-card">
                      <p className="rel-k">{r.kicker}</p>
                      <p className="rel-t"><Link href={`/${r.slug}`}>{r.h1}</Link></p>
                      <p className="rel-d">{r.standfirst}</p>
                    </li>
                  ))}
                </ul>
                <p className="rel-all">
                  <Link href="/guias">Ver las cinco guías de atribución de WhatsApp</Link>
                </p>
              </nav>
            )}

            <aside className="art-cta">
              <p className="art-cta-k">
                <span className="pin" aria-hidden="true" />ACCESO POR SOLICITUD
              </p>
              <h2 className="h3">¿Quieres esto funcionando sobre tu cuenta?</h2>
              <p>
                1to1AI configura el evento personalizado, el formulario inteligente y el envío a
                CAPI. La revisión de la solicitud toma de 24 a 48 horas.
              </p>
              <a href="/#contacto" className="btn">
                Solicitar acceso<span className="cir" aria-hidden="true">→</span>
              </a>
            </aside>
          </div>
        </article>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
    </div>
  )
}
