import './globals.css'
import { IS_CANONICAL_DEPLOY, SITE_URL } from '../lib/site'

const TITLE = '1to1AI | Trackea tus ventas de WhatsApp y optimiza Meta Ads'
const DESCRIPTION =
  'Trackea cada venta de WhatsApp y alimenta tu Pixel de Meta automáticamente. Optimiza campañas que antes eran imposibles de medir y baja tu CPL.'

// El JSON-LD ya no vive aquí: cada ruta declara el suyo (la home en app/page.jsx, las
// guías en components/ArticleShell). Tenerlo en el layout inyectaba el FAQPage de la
// home en todas las páginas internas.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  // Los espejos (Netlify, previews) se sirven con noindex. Se deja crawleable a
  // propósito: si además lo bloqueáramos por robots.txt, el rastreador no podría leer
  // la propia etiqueta noindex.
  ...(IS_CANONICAL_DEPLOY ? {} : { robots: { index: false, follow: false } }),
  verification: { google: '7qlw5EF9VOeYZGMe_2K3eJfHdHMorpQmuWKXtoLCea4' },
  icons: { icon: '/uploads/logo.png' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: '1to1AI',
    locale: 'es_MX',
    title: TITLE,
    description: DESCRIPTION.replace(' Solicita acceso.', ''),
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION.replace(' Solicita acceso.', ''),
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      {/* El H1 es el elemento LCP en todas las páginas y usa Space Grotesk. Sin este
          preload la fuente no se descubre hasta que el navegador parsea el CSS inline,
          lo que retrasa el pintado del texto grande. Solo esta familia: precargar también
          Inter y JetBrains Mono las pondría a competir por el mismo ancho de banda en el
          momento más crítico.
          React 19 lo eleva a <head>, pero además deja el elemento literal: sale dos
          veces con distinto orden de atributos. Probé como hijo de <html> y dentro de
          <body> y ocurre igual. El navegador deduplica por URL —la fuente se descarga
          una sola vez— así que el coste real es cero; se documenta para que no vuelva a
          reportarse como defecto pendiente. */}
      <body>
        {/* Skip link: hay 4 enlaces de nav y 5 del rail lateral antes del
            contenido, en las 10 URLs. */}
        <a className="skip" href="#contenido">Ir al contenido</a>
        <link
          rel="preload"
          href="/uploads/fonts/space-grotesk-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {children}
      </body>
    </html>
  )
}
