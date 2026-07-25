// Bloque de fuentes al pie de cada guía. Todas las afirmaciones sobre el contrato de la
// plataforma deben poder contrastarse contra documentación de primera mano: sin esto, el
// contenido técnico es palabra del sitio contra la del lector.
//
// Los enlaces salen con rel="noopener" y target en blanco, SIN nofollow. Los llevaban al
// principio, y era un error: nofollow significa "no respaldo este destino", que es lo
// contrario de lo que hace una cita editorial a la documentación primaria del proveedor
// del que trata el artículo. Enlazar sin reservas a developers.facebook.com es señal de
// contexto temático, no un riesgo.
export default function Sources({ items }) {
  if (!items?.length) return null
  return (
    <section className="art-src" aria-labelledby="fuentes-h">
      <h2 id="fuentes-h" className="sub-h">Fuentes</h2>
      <p className="art-src-note">
        Documentación de primera mano. Meta cambia nombres de campo y comportamientos entre
        versiones de la API: si algo de esta guía no coincide con lo que ves, la fuente manda.
      </p>
      <ol className="src-list">
        {items.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener">{s.title}</a>
            <span className="src-host">{new URL(s.url).host}</span>
            {s.note && <span className="src-note">{s.note}</span>}
          </li>
        ))}
      </ol>
    </section>
  )
}
