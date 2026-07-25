import { IS_CANONICAL_DEPLOY, SITE_URL } from '../lib/site'

// Decisión GEO consciente: los crawlers de motores generativos están PERMITIDOS
// para que ChatGPT, Perplexity, Claude, Gemini y AI Overviews puedan citar la página.
// Para revocar el permiso a alguno, cambia su allow: '/' por disallow: '/'.
//
// En despliegues espejo (Netlify, previews) se sigue permitiendo el rastreo pero NO se
// anuncia sitemap: la exclusión la hace la etiqueta noindex del layout, y para leerla el
// rastreador necesita poder entrar. Bloquear por robots.txt conseguiría lo contrario —
// una URL bloqueada puede acabar indexada sin contenido, porque nadie llegó a leer el
// noindex.
export default function robots() {
  const rules = [
    { userAgent: 'GPTBot', allow: '/' },
    { userAgent: 'ClaudeBot', allow: '/' },
    { userAgent: 'PerplexityBot', allow: '/' },
    { userAgent: 'Google-Extended', allow: '/' },
    { userAgent: 'CCBot', allow: '/' },
    { userAgent: '*', allow: '/' },
  ]
  return IS_CANONICAL_DEPLOY
    ? { rules, sitemap: `${SITE_URL}/sitemap.xml` }
    : { rules }
}
