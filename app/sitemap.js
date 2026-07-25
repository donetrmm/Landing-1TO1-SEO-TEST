import { ARTICLES } from '../lib/articles'
import { LAST_REVIEWED, SITE_URL } from '../lib/site'

const reviewed = new Date(LAST_REVIEWED)

// lastmod por página, no una constante compartida. Google solo confía en el campo si es
// consistentemente veraz: si al editar una guía se movieran las nueve fechas, deja de
// creerse el campo en todo el sitemap. La fecha de cada guía sale de su `lastmod` en
// lib/articles.js y solo cambia cuando cambia ese artículo.
const homeLastmod = new Date(
  ARTICLES.reduce((max, a) => (a.lastmod > max ? a.lastmod : max), LAST_REVIEWED)
)

export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: homeLastmod,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/guias`,
      lastModified: homeLastmod,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...ARTICLES.map((a) => ({
      url: `${SITE_URL}/${a.slug}`,
      lastModified: new Date(a.lastmod),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/sobre`,
      // LAST_REVIEWED, no homeLastmod: /sobre no cambia porque se edite una guía, y un
      // lastmod que se mueve sin cambio real es exactamente lo que hace que Google deje
      // de creerse el campo.
      lastModified: reviewed,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
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
