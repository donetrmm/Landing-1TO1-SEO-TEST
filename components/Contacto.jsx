'use client'

import { useRef } from 'react'

export default function Contacto() {
  const statusRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const status = statusRef.current
    let firstBad = null
    form.querySelectorAll('[required]').forEach((field) => {
      const wrap = field.closest('.field')
      const err = wrap.querySelector('.err')
      if (!field.checkValidity()) {
        if (err) err.textContent = '! ' + (field.dataset.msg || 'Este campo es obligatorio.')
        wrap.classList.add('bad')
        field.setAttribute('aria-invalid', 'true')
        if (!firstBad) firstBad = field
      } else {
        if (err) err.textContent = ''
        wrap.classList.remove('bad')
        field.removeAttribute('aria-invalid')
      }
    })
    if (firstBad) {
      status.textContent = '! Revisa los campos marcados: falta información o el formato no es válido.'
      firstBad.focus()
      return
    }
    status.textContent = '✓ Solicitud recibida. Revisamos tu información y te contactamos en 24–48 h al email que dejaste.'
    form.querySelector('button[type="submit"]').disabled = true
  }
  return (
    <section id="contacto" aria-labelledby="h-form">
      <div className="wrap sec grid-form">
        <div>
          <div className="kicker rv"><span className="no">/10</span><span className="lbl">ACCESO POR SOLICITUD</span><span className="fill" aria-hidden="true" /><span className="idx">10 — 10</span></div>
          <h2 id="h-form" className="h2 rv" style={{ maxWidth: '16ch' }}>Solicita acceso a 1to1AI</h2>
          <p className="lead rv" style={{ maxWidth: '52ch', marginBottom: 28 }}>1to1AI es software exclusivo: cada solicitud se revisa en 24–48 horas y el acceso se aprueba solo para empresas con más de 500 leads mensuales. Si calificas, un especialista te contacta para configurar tu primer evento personalizado.</p>
          <ul className="req-list rv">
            <li><span className="n" aria-hidden="true">01</span><span>Revisión de la solicitud en 24–48 h</span></li>
            <li><span className="n" aria-hidden="true">02</span><span>Requisito: más de 500 leads mensuales</span></li>
            <li><span className="n" aria-hidden="true">03</span><span>Configuración el mismo día de la aprobación</span></li>
          </ul>
        </div>
        <form id="accessForm" className="form rv" noValidate onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="f-nombre">Nombre completo</label>
              <input id="f-nombre" name="nombre" type="text" required autoComplete="name" data-msg="Escribe tu nombre completo." />
              <p className="err" />
            </div>
            <div className="field">
              <label htmlFor="f-email">Email corporativo</label>
              <input id="f-email" name="email" type="email" required autoComplete="email" data-msg="Escribe un email válido, por ejemplo nombre@tuempresa.com." />
              <p className="err" />
            </div>
            <div className="field">
              <label htmlFor="f-empresa">Empresa</label>
              <input id="f-empresa" name="empresa" type="text" required autoComplete="organization" data-msg="Indica el nombre de tu empresa." />
              <p className="err" />
            </div>
            <div className="field">
              <label htmlFor="f-tel">Teléfono con WhatsApp</label>
              <input id="f-tel" name="telefono" type="tel" required autoComplete="tel" data-msg="Escribe un teléfono con WhatsApp, con lada, por ejemplo +52 55 1234 5678." />
              <p className="err" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-leads">Leads mensuales aproximados</label>
            <select id="f-leads" name="leads" required data-msg="Selecciona tu volumen de leads mensuales." defaultValue="">
              <option value="">Selecciona un rango</option>
              <option value="500-1000">500 – 1,000</option>
              <option value="1000-5000">1,000 – 5,000</option>
              <option value="5000-20000">5,000 – 20,000</option>
              <option value="20000+">Más de 20,000</option>
              <option value="menos-500">Menos de 500 (aún no califico)</option>
            </select>
            <p className="err" />
          </div>
          <div className="field">
            <label htmlFor="f-motivo">¿Por qué quieres medir tus ventas de WhatsApp?</label>
            <textarea id="f-motivo" name="motivo" rows="4" required data-msg="Cuéntanos brevemente qué campañas quieres optimizar." />
            <p className="err" />
          </div>
          <button type="submit" className="btn" style={{ justifyContent: 'center' }}>Enviar solicitud →</button>
          <p ref={statusRef} id="formStatus" className="form-status" role="status" aria-live="polite" />
          <p className="form-note">Revisamos cada solicitud en 24–48 h. Solo aprobamos empresas con más de 500 leads mensuales.</p>
        </form>
      </div>
    </section>
  )
}
