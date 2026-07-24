import { ARTICLES } from '../lib/articles'
import { LAST_REVIEWED, SITE_URL } from '../lib/site'

const reviewed = new Date(LAST_REVIEWED)

export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: reviewed,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...ARTICLES.map((a) => ({
      url: `${SITE_URL}/${a.slug}`,
      lastModified: reviewed,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/aviso-de-privacidad`,
      lastModified: reviewed,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terminos`,
      lastModified: reviewed,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
