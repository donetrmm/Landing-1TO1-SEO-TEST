import Link from 'next/link'
import Behaviors from '../components/Behaviors'
import Contacto from '../components/Contacto'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { ARTICLES } from '../lib/articles'
import { BUSINESS, SITE_URL } from '../lib/site'
import { orgRef, organizationNode, websiteNode } from '../lib/schema'
import { COMPARISON, GLOSSARY, HOME_FAQ } from '../lib/content'

// FUENTE ÚNICA del FAQ de la home: la consumen el <details> visible y el FAQPage del
// JSON-LD. Antes eran dos arrays independientes y habían divergido en 4 de 6 respuestas
// —una decía lo contrario que la otra— además de declarar en el marcado una pregunta que
// no aparecía en la página. Marcar contenido que el usuario no ve infringe las políticas
// de datos estructurados de Google. Si añades una pregunta, va aquí y sale en los dos.
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationNode(),
    websiteNode(),
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: '1to1AI',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: SITE_URL,
      publisher: orgRef,
      description:
        'Software de atribución que trackea conversaciones de WhatsApp y las envía como eventos de conversión al Pixel de Meta y a la API de Conversiones.',
      // La declaración de que el producto es ficticio viajaba solo en el Organization.
      // Quien leyera este nodo aislado veía un producto real con precio, así que se
      // repite aquí y se retira la Offer: no hay nada que ofertar.
      disambiguatingDescription: BUSINESS.legalNotice,
    },
    {
      '@type': 'ItemList',
      // Anclado a /guias, que es donde vive la lista. Antes había dos ItemList sin
      // relación: este con @id en la home y otro anónimo dentro de /guias.
      '@id': `${SITE_URL}/guias#list`,
      name: 'Guías de atribución de WhatsApp para Meta Ads',
      url: `${SITE_URL}/guias`,
      itemListElement: ARTICLES.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: a.h1,
        url: `${SITE_URL}/${a.slug}`,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: HOME_FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

function Check() {
  return (
    <span className="chk" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 13c3 1.5 5 4 6 6 2-6 6.5-12 10-15" /></svg>
    </span>
  )
}

function Rail() {
  return (
    <nav id="rail" className="rail" aria-label="Secciones">
      <div id="railPill" className="rail-pill" aria-hidden="true" />
      <a href="#hero" data-rail="0" aria-label="Inicio" aria-current="true"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" /></svg></a>
      <a href="#caracteristicas" data-rail="1" aria-label="Características"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" /></svg></a>
      <a href="#beneficios" data-rail="2" aria-label="Beneficios"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 20v-6M12 20V8M20 20V4" /></svg></a>
      <a href="#guias" data-rail="3" aria-label="Guías"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h11v18H6a2 2 0 0 1-2-2z" /><path d="M8 8h6M8 12h6" /></svg></a>
      <a href="#contacto" data-rail="4" aria-label="Contacto"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></a>
    </nav>
  )
}

function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="h1">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow a-rise" style={{ animationDelay: '.05s' }}>SOFTWARE EXCLUSIVO · MÉXICO Y LATAM</p>
          <h1 id="h1" className="h1">
            <span className="line"><span className="a-line" style={{ animationDelay: '.15s' }}>Convierte cada conversación</span></span>
            <span className="line"><span className="a-line accent" style={{ animationDelay: '.24s' }}>de WhatsApp <span className="underline-wrap">en datos<svg aria-hidden="true" viewBox="0 0 120 12" preserveAspectRatio="none"><path className="a-draw" d="M2 9c22-7 44 4 60-2 16-6 36 3 56-4" fill="none" stroke="#43C5FF" strokeWidth="4" strokeLinecap="round" pathLength="1" /></svg></span></span></span>
            <span className="line"><span className="a-line" style={{ animationDelay: '.33s' }}>que optimizan tus campañas</span></span>
          </h1>
          <p className="hero-sub a-rise" style={{ animationDelay: '.45s' }}>Trackea cada venta de WhatsApp con precisión. Alimenta tu pixel de Meta automáticamente y optimiza campañas que antes eran imposibles de medir.</p>
          <p className="hero-def a-rise" style={{ animationDelay: '.5s' }}>1to1AI es un software de atribución que trackea conversaciones de WhatsApp y las envía como eventos de conversión al Pixel de Meta y a la API de Conversiones.</p>
          <div className="hero-ctas a-rise" style={{ animationDelay: '.55s' }}>
            <a href="#contacto" className="btn">Solicitar acceso<span className="cir" aria-hidden="true">→</span></a>
            <a href="#como-funciona" className="btn-ghost">Ver cómo funciona</a>
          </div>
        </div>
        <div className="hero-visual a-rise" style={{ animationDelay: '.6s' }} role="img" aria-label="Conversación de WhatsApp donde cada respuesta del cliente dispara un evento al Pixel de Meta en tiempo real">
          <div className="blob" aria-hidden="true" />
          <div className="chat">
            <div className="chat-hd">
              <span className="avatar" aria-hidden="true">LR</span>
              <div className="who">
                <p className="nm">Laura · lead de ad_7231</p>
                <p className="st">en línea · atribuida ✓</p>
              </div>
              <span className="dot" aria-hidden="true" />
            </div>
            <div className="chat-bd">
              <div className="bub bub-in rv">Hola, vi su anuncio 👀 ¿tienen envío a Guadalajara?</div>
              <div className="bub bub-out rv" data-delay=".2s">¡Claro! Te comparto el formulario para cerrar tu pedido 📋</div>
              <div className="chip rv" data-delay=".4s"><span aria-hidden="true">▸</span>form.inteligente enviado</div>
              <div className="bub bub-in rv" data-delay=".6s">Listo, ya lo llené ✅</div>
              <div className="evt rv" data-delay=".8s"><span className="pin" aria-hidden="true" /><span className="k">evento: compra</span><span className="v">→ Pixel de Meta · CAPI 0.4s</span><span className="ok">✓✓</span></div>
              <div className="learn rv" data-delay="1s"><span>Meta aprende: ad_7231 vende</span><span>ROAS ▲</span></div>
            </div>
          </div>
          <p className="visual-note">Escenario ilustrativo. No es una conversación real de un cliente.</p>
        </div>
      </div>
      <div className="logstrip" aria-hidden="true">
        <div className="wrap logstrip-in">
          <p className="tag"><span className="pin" />ATTRIBUTION_LOG</p>
          <div id="liveLog" className="logrows">
            <p className="logrow on"><span className="ok">✓</span> evento: compra · atribuido → ad_7231 · CAPI 0.4s</p>
            <p className="logrow"><span className="ok">✓</span> evento: cita_agendada · atribuido → ad_1088 · CAPI 0.3s</p>
            <p className="logrow"><span className="ok">✓</span> evento: cotización · atribuido → ad_5512 · CAPI 0.5s</p>
            <p className="logrow"><span className="ok">✓</span> evento: compra · valor $1,890 MXN → Pixel de Meta</p>
          </div>
          <p className="qcount">registro simulado</p>
        </div>
      </div>
    </section>
  )
}

function Problema() {
  return (
    <section id="problema" className="dark" aria-labelledby="h-problema">
      <div className="blob-bg" aria-hidden="true" />
      <div className="wrap sec prob-grid">
        <div className="prob-copy">
          <div className="kicker rv"><span className="no">/02</span><span className="lbl">DIAGNÓSTICO</span><span className="fill" aria-hidden="true" /><span className="idx">02 — 10</span></div>
          <h2 id="h-problema" className="h2 rv" style={{ maxWidth: '16ch' }}>¿Cansado de campañas a ciegas?</h2>
          <p className="lead rv" style={{ maxWidth: '54ch' }}>Cuando una venta cierra por WhatsApp, Meta nunca se entera. Del otro lado del embudo, tu cuenta publicitaria pregunta — y nadie le responde.</p>
          <ul className="flaws">
            <li className="rv"><span className="fno" aria-hidden="true">F-01</span><p><strong>Vendes por WhatsApp pero Meta no sabe qué funciona.</strong> La venta ocurre fuera del alcance del pixel.</p></li>
            <li className="rv" data-delay=".07s"><span className="fno" aria-hidden="true">F-02</span><p><strong>Tus campañas no se optimizan:</strong> sin eventos de conversión, el algoritmo persigue clics, no ventas.</p></li>
            <li className="rv" data-delay=".14s"><span className="fno" aria-hidden="true">F-03</span><p><strong>Pierdes tiempo preguntando "¿cómo nos conociste?"</strong> La memoria del cliente no es atribución.</p></li>
            <li className="rv" data-delay=".21s"><span className="fno" aria-hidden="true">F-04</span><p><strong>Tu pixel está muerto y tu CPL se va al cielo:</strong> pagas audiencias frías que Meta no puede refinar.</p></li>
          </ul>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }} role="img" aria-label="Conversación donde la cuenta publicitaria pregunta qué anuncio generó la venta y nunca recibe respuesta">
          <div className="ghost rv">
            <div className="chat-hd">
              <span className="avatar" aria-hidden="true">M</span>
              <div className="who">
                <p className="nm">Meta Ads · tu cuenta</p>
                <p className="st">esperando señal…</p>
              </div>
            </div>
            <div className="chat-bd">
              <div className="bub bub-in rv">¿Qué anuncio generó esta venta? 🤔</div>
              <div className="bub bub-in rv" data-delay=".2s">¿Hubo conversión? ¿Le asigno más presupuesto?</div>
              <div className="bub bub-in rv" data-delay=".4s">¿Hola…?</div>
              <div className="typing rv" data-delay=".6s" aria-hidden="true"><span /><span /><span /></div>
              <p className="foot-note rv" data-delay=".8s">✕ sin respuesta — el pixel nunca se enteró · CPL ▲</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="h-proceso">
      <div className="wrap sec proc">
        <div className="kicker rv"><span className="no">/03</span><span className="lbl">CÓMO FUNCIONA</span><span className="fill" aria-hidden="true" /><span className="idx">03 — 10</span></div>
        <h2 id="h-proceso" className="h2 rv" style={{ maxWidth: '20ch' }}>Trackea cada venta como si fuera en tu sitio web</h2>
        <p className="lead rv" style={{ marginBottom: 56 }}>El proceso completo toma cuatro pasos: se define un evento personalizado, se comparte un formulario inteligente por WhatsApp, cada respuesta alimenta el Pixel de Meta vía API de Conversiones en tiempo real, y las campañas comienzan a optimizarse hacia ventas reales. El recorrido técnico completo está en la guía <Link href="/como-trackear-ventas-whatsapp-meta-ads">cómo trackear ventas de WhatsApp en Meta Ads</Link>.</p>
        <div className="timeline">
          <svg aria-hidden="true" viewBox="0 0 4 100" preserveAspectRatio="none">
            <path data-scrollpath="1" d="M2,0 C-7,18 11,34 2,50 C-6,64 9,84 2,100" fill="none" stroke="#0B9EFD" strokeWidth="2" vectorEffect="non-scaling-stroke" pathLength="1" />
          </svg>
          <ol className="steps">
            <li className="rv"><span className="node" aria-hidden="true" />
              <article className="step-card"><p className="n">01</p><h3 className="h3">Crea tu evento personalizado</h3><p>Define qué quieres trackear: compra, cotización, cita agendada.</p></article></li>
            <li className="rv"><span className="node" aria-hidden="true" />
              <article className="step-card"><p className="n">02</p><h3 className="h3">Comparte tu formulario inteligente</h3><p>Envíalo por WhatsApp, email o donde vendas. Sin fricción para el cliente.</p></article></li>
            <li className="rv"><span className="node" aria-hidden="true" />
              <article className="step-card"><p className="n">03</p><h3 className="h3">Pixel alimentado automáticamente</h3><p>Cada respuesta envía eventos al Pixel y a CAPI en tiempo real.</p></article></li>
            <li className="rv"><span className="node" aria-hidden="true" />
              <article className="step-card step-final"><p className="n">04</p><h3 className="h3">Campañas que se optimizan solas</h3><p>Meta ahora sabe qué anuncios generan ventas reales — y les asigna el presupuesto.</p></article></li>
          </ol>
        </div>
      </div>
    </section>
  )
}

function Caracteristicas() {
  return (
    <section id="caracteristicas" className="light" aria-labelledby="h-feat">
      <div className="wrap sec">
        <div className="kicker rv"><span className="no">/04</span><span className="lbl">CARACTERÍSTICAS</span><span className="fill" aria-hidden="true" /><span className="idx">04 — 10</span></div>
        <h2 id="h-feat" className="h2 rv" style={{ maxWidth: '20ch', marginBottom: 48 }}>Todo lo que necesitas para optimizar</h2>
        <div className="grid-feat">
          <div className="card rv">
            <p className="code" aria-hidden="true"><span className="c">▸</span>evento → Pixel/CAPI ✓ 0.4s</p>
            <h3 className="h3">Eventos de atribución automáticos</h3>
            <p>Cada conversación se convierte en un evento de conversión sin trabajo manual.</p>
          </div>
          <div className="card rv" data-delay=".07s">
            <p className="code" aria-hidden="true"><span className="c">▸</span>optimizar: ventas_reales ▲</p>
            <h3 className="h3">Optimización real para WhatsApp</h3>
            <p>Meta optimiza hacia ventas cerradas por chat, no hacia clics en el anuncio.</p>
          </div>
          <div className="card rv" data-delay=".14s">
            <p className="code" aria-hidden="true"><span className="c">▸</span>ai.form → dato_correcto ✓</p>
            <h3 className="h3">IA que potencia tus ventas</h3>
            <p>Los formularios se adaptan a cada conversación para capturar el dato correcto.</p>
          </div>
          <div className="card rv" data-delay=".21s">
            <p className="code" aria-hidden="true"><span className="c">▸</span><span className="strike">"¿cómo nos conociste?"</span> obsoleto</p>
            <h3 className="h3">Adiós a los preguntones</h3>
            <p>Nadie vuelve a preguntar "¿cómo nos conociste?": la atribución ya está hecha.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Beneficios() {
  const mkt = ['Datos precisos de conversión, evento por evento', 'Campañas que realmente se optimizan', 'Menor CPL y mayor ROAS', 'Reportes en tiempo real']
  const vts = ['Formularios listos para enviar', 'Sin preguntas incómodas al cliente', 'Proceso de venta más fluido', 'Más conversiones al final del embudo']
  return (
    <section id="beneficios" aria-labelledby="h-benef">
      <div className="wrap sec">
        <div className="kicker rv"><span className="no">/05</span><span className="lbl">BENEFICIOS</span><span className="fill" aria-hidden="true" /><span className="idx">05 — 10</span></div>
        <h2 id="h-benef" className="h2 rv" style={{ maxWidth: '20ch' }}>Un dato preciso le sirve a dos equipos</h2>
        <p className="lead rv" style={{ marginBottom: 48 }}>Marketing recupera la atribución que WhatsApp le quitaba; ventas deja de hacer trabajo de encuestador. El mismo evento de conversión alimenta los reportes de ambos.</p>
        <div className="grid-benef">
          <article className="benef rv">
            <p className="tag">PARA MARKETING</p>
            <ul>{mkt.map((t) => <li key={t}><Check /><span>{t}</span></li>)}</ul>
          </article>
          <article className="benef rv" data-delay=".1s">
            <p className="tag">PARA VENTAS</p>
            <ul>{vts.map((t) => <li key={t}><Check /><span>{t}</span></li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  )
}

function AntesDespues() {
  return (
    <section id="antes-despues" className="light" aria-labelledby="h-avd">
      <div className="wrap sec">
        <div className="kicker rv"><span className="no">/06</span><span className="lbl">ANTES VS DESPUÉS</span><span className="fill" aria-hidden="true" /><span className="idx">06 — 10</span></div>
        <h2 id="h-avd" className="h2 rv" style={{ maxWidth: '22ch', textAlign: 'center', marginInline: 'auto' }}>La misma venta, dos destinos</h2>
        <p className="lead rv" style={{ maxWidth: '56ch', textAlign: 'center', margin: '0 auto 48px' }}>Mismo anuncio, mismo cliente, misma compra. La única diferencia es si el dato llega al pixel — o muere en el chat.</p>
        <div className="grid-avd">
          <div className="rv">
            <p className="avd-lbl" style={{ color: 'var(--ink)' }}>ANTES · SIN 1TO1AI</p>
            <div className="avd-card avd-before">
              <div className="bub bub-in">Hola, vi su anuncio ¿me mandan info?</div>
              <div className="bub bub-out">¡Claro! Aquí está el catálogo 📎</div>
              <div className="bub bub-in">Perfecto, lo compro 🎉</div>
              <div className="bub bub-out">Oye… ¿y cómo nos conociste? 😅</div>
              <div className="bub bub-in">Mmm no me acuerdo, ¿Facebook creo?</div>
              <p className="avd-note" style={{ color: 'var(--ink)' }}>✕ venta invisible para Meta · el pixel no aprendió nada</p>
            </div>
            <ul className="avd-list">
              <li><span className="mk" aria-hidden="true">✕</span>Meta no se entera de nada → las campañas no mejoran</li>
              <li><span className="mk" aria-hidden="true">✕</span>Gastas en lo que no funciona</li>
            </ul>
          </div>
          <div className="rv" data-delay=".15s">
            <p className="avd-lbl" style={{ color: 'var(--blue)' }}>DESPUÉS · CON 1TO1AI</p>
            <div className="avd-card avd-after">
              <div className="bub bub-in">Hola, vi su anuncio ¿me mandan info?</div>
              <div className="bub bub-out">¡Claro! Llena esto y cerramos tu pedido 📋</div>
              <div className="bub bub-in">Listo, comprado ✅</div>
              <div className="evt"><span className="pin" aria-hidden="true" /><span className="k">evento: compra</span><span className="v">→ Pixel · ad_7231 ✓✓</span></div>
              <div className="learn"><span>Meta reasigna presupuesto a ad_7231</span><span>ROI ▲</span></div>
              <p className="avd-note" style={{ color: 'var(--blue)' }}>✓ pixel_encendido — señal completa · nadie preguntó nada</p>
            </div>
            <ul className="avd-list good">
              <li><span className="mk" aria-hidden="true">✓</span>Meta optimiza hacia ventas reales</li>
              <li><span className="mk" aria-hidden="true">✓</span>El ROI se dispara</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// El HTML servido lleva ya la cifra final: el contador de JS solo la reanima.
// Antes se renderizaba "0.0" y el crawler veía ceros.
function Metricas() {
  const stats = [
    { count: '4.2', decimals: '1', shown: '4.2', suffix: 'x', lbl: 'ROAS' },
    { count: '1247', shown: '1,247', lbl: 'CONVERSIONES', delay: '.07s' },
    { count: '3891', shown: '3,891', lbl: 'LEADS ATRIBUIDOS', delay: '.14s' },
    { count: '43', shown: '43', prefix: '−', suffix: '%', lbl: 'CPL', delay: '.21s' },
  ]
  return (
    <section id="metricas" aria-labelledby="h-metricas">
      <h2 id="h-metricas" className="sr-only">Métricas de la cuenta de ejemplo</h2>
      <div className="stats-band">
        <div className="wrap">
          <div className="stats">
            {stats.map((s) => (
              <div className="stat rv" data-delay={s.delay} key={s.lbl}>
                <p className="num">
                  {s.prefix}
                  <span data-count={s.count} data-decimals={s.decimals}>{s.shown}</span>
                  {s.suffix}
                </p>
                <p className="lbl">{s.lbl}</p>
              </div>
            ))}
          </div>
          <p className="stats-note rv">
            Cifras de una cuenta de ejemplo construida con fines ilustrativos: no corresponden a
            resultados de clientes reales ni constituyen una promesa de desempeño. Cómo se calcula
            cada una: <Link href="/medir-roas-campanas-whatsapp">guía de medición de ROAS</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}

function Guias() {
  return (
    <section id="guias" aria-labelledby="h-guias">
      <div className="wrap sec">
        <div className="kicker rv"><span className="no">/08</span><span className="lbl">GUÍAS</span><span className="fill" aria-hidden="true" /><span className="idx">08 — 10</span></div>
        <h2 id="h-guias" className="h2 rv" style={{ maxWidth: '22ch' }}>Cómo funciona la atribución de WhatsApp, en detalle</h2>
        <p className="lead rv" style={{ marginBottom: 44 }}>Cinco guías técnicas sobre el problema que resuelve 1to1AI: identificadores de clic, API de Conversiones, deduplicación de eventos y medición de retorno. Escritas para quien va a implementarlo, no para quien va a comprarlo.</p>
        {/* El <a> envuelve solo el título: ese es el anchor que ve Google, y coincide
            con la consulta objetivo del destino. El resto de la tarjeta sigue siendo
            clicable mediante .guia-t a::after, sin diluir el anchor. */}
        <ul className="grid-guias">
          {ARTICLES.map((a, i) => (
            <li className="rv guia-card" data-delay={`${i * 0.06}s`} key={a.slug}>
              <p className="guia-k">{a.kicker}</p>
              <p className="guia-t h3"><Link href={`/${a.slug}`}>{a.h1}</Link></p>
              {/* `hook`, no `description`: la description es la meta description de la
                  guía y también salía en /guias, con lo que el mismo texto vivía en tres
                  URLs y hacía de /guias un duplicado del 70 % de esta sección. */}
              <p className="guia-d">{a.hook}</p>
              <p className="guia-go" aria-hidden="true">Leer la guía →</p>
            </li>
          ))}
        </ul>
        <p className="guias-more rv">
          <Link href="/guias">Ver el índice completo de guías de atribución de WhatsApp</Link>
        </p>
      </div>
    </section>
  )
}

function Faq() {
  const faqs = HOME_FAQ
  const gloss = GLOSSARY
  return (
    <section id="faq" className="light" aria-labelledby="h-faq">
      <div className="wrap sec">
        <div className="kicker rv"><span className="no">/09</span><span className="lbl">PREGUNTAS FRECUENTES</span><span className="fill" aria-hidden="true" /><span className="idx">09 — 10</span></div>
        <h2 id="h-faq" className="h2 rv" style={{ maxWidth: '24ch', marginBottom: 44 }}>Lo que todo el mundo pregunta antes de medir WhatsApp</h2>
        <div className="faq-list rv">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>
                {f.a}
                {f.to && <> <Link href={`/${f.to}`} className="faq-more">Guía completa →</Link></>}
              </p>
            </details>
          ))}
        </div>
        <h2 className="sub-h rv">1to1AI frente a las alternativas</h2>
        <div className="tbl-wrap rv">
          <table className="tbl">
            <caption className="sr-only">Comparación de métodos de atribución para ventas por WhatsApp</caption>
            <thead>
              <tr><th scope="col">CRITERIO</th><th scope="col" className="hl">1TO1AI</th><th scope="col">UTMS MANUALES</th><th scope="col">"¿CÓMO NOS CONOCISTE?"</th><th scope="col">NO MEDIR</th></tr>
            </thead>
            <tbody>
              <tr><th scope="row">Precisión de atribución</th><td className="hl">Evento por evento, a nivel anuncio</td><td>Parcial; se pierde al saltar al chat</td><td>Baja; depende de la memoria del cliente</td><td>Nula</td></tr>
              <tr><th scope="row">Esfuerzo del equipo</th><td className="hl">Automático tras la configuración</td><td>Alto y constante</td><td>Una pregunta por cada venta</td><td>Ninguno</td></tr>
              <tr><th scope="row">Tiempo de implementación</th><td className="hl">1 día tras aprobación</td><td>Semanas de disciplina</td><td>Inmediato pero impreciso</td><td>—</td></tr>
              <tr><th scope="row">Qué aprende Meta</th><td className="hl">Ventas reales, con valor de conversión</td><td>Clics, no ventas</td><td>Nada — el dato nunca llega al pixel</td><td>Nada</td></tr>
              <tr><th scope="row">Mantenimiento y riesgo</th><td>Continuo: si un hash va mal normalizado, Meta acepta el evento y no lo atribuye, sin dar error</td><td>Alto, pero los fallos se ven</td><td>Ninguno</td><td>Ninguno</td></tr>
              <tr><th scope="row">Carga de cumplimiento</th><td>Alta: transfieres identificadores personales a un tercero y necesitas aviso de privacidad</td><td>Baja</td><td>Ninguna</td><td>Ninguna</td></tr>
            </tbody>
          </table>
        </div>
        <p className="lead rv" style={{ marginTop: 20, fontSize: 14.5 }}>Las dos últimas filas son las que 1to1AI pierde, y están aquí a propósito: una comparativa donde la opción propia gana todas las filas no informa de nada. El desglose completo —incluido el quinto método, los reportes nativos de Meta, que ya te dan atribución a nivel de anuncio sin montar nada— está en <Link href="/atribucion-whatsapp-vs-utms">atribución de WhatsApp vs UTMs</Link>.</p>
        <h2 className="sub-h rv">Glosario</h2>
        <dl className="gloss rv">
          {gloss.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
        </dl>
      </div>
    </section>
  )
}

function Cierre() {
  return (
    <section id="cierre" className="dark cierre" aria-labelledby="h-cierre">
      <div className="blob-bg" aria-hidden="true" />
      <div className="wrap sec" style={{ position: 'relative' }}>
        <p className="pretitle rv"><span className="pin" aria-hidden="true" />tu pixel está esperando señal…</p>
        <h2 id="h-cierre" className="h2 rv">Deja de vender a ciegas.<br />Empieza a optimizar de verdad.</h2>
        <p className="lead rv">Cada día sin datos es presupuesto que Meta reparte a ciegas. La solicitud toma dos minutos.</p>
        <a href="#contacto" className="btn btn-cyan rv">Solicitar acceso<span aria-hidden="true">→</span></a>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <div className="page">
      <Behaviors />
      <SiteHeader home />
      <Rail />
      <main id="contenido">
        <Hero />
        <Problema />
        <ComoFunciona />
        <Caracteristicas />
        <Beneficios />
        <AntesDespues />
        <Metricas />
        <Guias />
        <Faq />
        <Contacto />
        <Cierre />
      </main>
      <SiteFooter home />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
    </div>
  )
}
