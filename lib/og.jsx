import { ImageResponse } from 'next/og'

// Generador único de imágenes Open Graph, 1200×630.
//
// Antes las 10 páginas compartían el logo de 300×95 px como og:image. Está por debajo
// del mínimo de altura (200 px) de Facebook, LinkedIn y X, así que ninguna plataforma
// renderizaba tarjeta. En un dominio sin autoridad —que no va a recibir enlaces
// editoriales— el enlace compartido a mano es el único canal de distribución realista, y
// un enlace sin tarjeta visual lo desactiva.
//
// Sin fuentes personalizadas a propósito: los .woff2 del sitio no sirven aquí (Satori
// necesita TTF/OTF) y descargar variantes solo para esto añadiría peso al repo sin
// mejorar la tarjeta de forma perceptible.

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const NAVY = '#00132E'
const CYAN = '#43C5FF'
const LINE = '#D7E3F4'

export function ogImage({ kicker, title, subtitle }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: NAVY,
          backgroundImage: `radial-gradient(900px 500px at 100% 0%, #0056CF66, transparent 70%), radial-gradient(700px 500px at 0% 100%, #0B9EFD33, transparent 70%)`,
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: CYAN }} />
          <div style={{ fontSize: 26, letterSpacing: 4, color: CYAN, textTransform: 'uppercase' }}>
            {kicker}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              fontSize: title.length > 62 ? 62 : 74,
              lineHeight: 1.08,
              color: '#FFFFFF',
              fontWeight: 700,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 30, lineHeight: 1.4, color: LINE, maxWidth: 900 }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid #FFFFFF33`,
            paddingTop: 28,
            fontSize: 26,
            color: LINE,
          }}
        >
          <div style={{ display: 'flex', color: '#FFFFFF', fontWeight: 700 }}>1to1AI</div>
          <div style={{ display: 'flex' }}>1to1ai.vercel.app</div>
        </div>
      </div>
    ),
    OG_SIZE
  )
}
