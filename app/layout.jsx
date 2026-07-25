import './globals.css'
import { IS_CANONICAL_DEPLOY, SITE_URL } from '../lib/site'

const TITLE = '1to1AI | Trackea tus ventas de WhatsApp y optimiza Meta Ads'
const DESCRIPTION =
  'Trackea cada venta de WhatsApp y alimenta tu Pixel de Meta automáticamente. Optimiza campañas que antes eran imposibles de medir y baja tu CPL. Solicita acceso.'

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
    images: ['/uploads/logo.png'],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION.replace(' Solicita acceso.', ''),
    images: ['/uploads/logo.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  )
}
