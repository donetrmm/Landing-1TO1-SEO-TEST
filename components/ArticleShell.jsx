import Link from 'next/link'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { relatedOf } from '../lib/articles'
import { LAST_REVIEWED, SITE_URL } from '../lib/site'

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
      modifiedTime: LAST_REVIEWED,
      images: ['/uploads/logo.png'],
    },
    twitter: {
      card: 'summary',
      title: a.title,
      description: a.description,
      images: ['/uploads/logo.png'],
    },
  }
}

function articleJsonLd(a) {
  const url = `${SITE_URL}/${a.slug}`
  const graph = [
    {
      '@type': 'TechArticle',
      '@id': `${url}#article`,
      headline: a.h1,
      name: a.title,
      description: a.description,
      inLanguage: 'es-MX',
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      datePublished: a.published,
      dateModified: LAST_REVIEWED,
      author: { '@type': 'Organization', name: '1to1AI', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: '1to1AI',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/uploads/logo.png` },
      },
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
        { '@type': 'ListItem', position: 2, name: 'Guías', item: `${SITE_URL}/#guias` },
        { '@type': 'ListItem', position: 3, name: a.h1, item: url },
      ],
    },
  ]
  if (a.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
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
      <main>
        <article className="art">
          <div className="wrap art-in">
            <nav className="crumbs" aria-label="Ruta de navegación">
              <Link href="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <a href="/#guias">Guías</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{article.h1}</span>
            </nav>

            <p className="eyebrow">{article.kicker}</p>
            <h1 className="h1 art-h1">{article.h1}</h1>
            <p className="art-standfirst">{article.standfirst}</p>
            <p className="art-meta">
              <time dateTime={article.published}>Publicado el 24 de julio de 2026</time>
              <span aria-hidden="true">·</span>
              <span>Revisado el 24 de julio de 2026</span>
              <span aria-hidden="true">·</span>
              <span>1to1AI</span>
            </p>

            <div className="prose">{children}</div>

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
              <nav className="art-rel" aria-labelledby="rel-h">
                <h2 id="rel-h" className="sub-h">Sigue leyendo</h2>
                <ul>
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/${r.slug}`}>
                        <span className="rel-k">{r.kicker}</span>
                        <span className="rel-t">{r.h1}</span>
                        <span className="rel-d">{r.standfirst}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
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
