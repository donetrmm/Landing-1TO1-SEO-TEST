import { SITE_URL } from '../lib/site'

// Decisión GEO consciente: los crawlers de motores generativos están PERMITIDOS
// para que ChatGPT, Perplexity, Claude, Gemini y AI Overviews puedan citar la página.
// Para revocar el permiso a alguno, cambia su allow: '/' por disallow: '/'.
export default function robots() {
  return {
    rules: [
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
