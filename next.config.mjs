/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    inlineCss: true,
  },

  async redirects() {
    return [
      // /index servía la home completa con 200: una URL duplicada más que rastrear.
      // El canonical apuntaba bien, así que Google la clasificaba como "página
      // alternativa con etiqueta canónica adecuada" —benigno— pero se gastaba
      // presupuesto de rastreo en ella. Un 308 lo cierra de raíz.
      { source: '/index', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        // llms.txt y llms-full.txt reproducen buena parte del contenido del sitio en
        // texto plano. Un .txt no puede llevar <link rel="canonical">, así que para
        // Google son duplicados sin canónico declarado — justo el estado "Duplicada: el
        // usuario no ha indicado ninguna versión canónica". El único modo de resolverlo
        // en un fichero de texto es la cabecera HTTP.
        //
        // noindex es una directiva de indexación en buscador; no impide que GPTBot,
        // ClaudeBot o PerplexityBot los descarguen y citen, que es para lo que existen.
        // El propósito GEO queda intacto.
        source: '/:file(llms\\.txt|llms-full\\.txt)',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        // Fichero de verificación de Search Console: una línea de texto. Indexarlo solo
        // añade una página sin valor al índice.
        source: '/google598c255b1cd5e026.html',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ]
  },
}

export default nextConfig
