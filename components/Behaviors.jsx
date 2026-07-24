'use client'

import { useEffect } from 'react'

export default function Behaviors() {
  useEffect(() => {
    const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups = []

    // reveal on scroll
    const rvs = [...document.querySelectorAll('.rv')]
    if (motion) {
      rvs.forEach((el) => { if (el.getBoundingClientRect().top > innerHeight * 0.92) el.classList.add('rv-hid') })
      const io = new IntersectionObserver((es) => {
        es.forEach((en) => {
          if (!en.isIntersecting) return
          const el = en.target
          io.unobserve(el)
          if (el.classList.contains('rv-hid')) {
            el.style.transitionDelay = el.dataset.delay || '0s'
            requestAnimationFrame(() => { el.classList.add('rv-in'); el.classList.remove('rv-hid') })
          }
        })
      }, { threshold: 0.12 })
      rvs.forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())
    }

    // metric counters — el HTML ya trae la cifra final; esto solo la reanima.
    const counters = [...document.querySelectorAll('[data-count]')]
    const fmt = (el, v) => {
      const dec = parseInt(el.dataset.decimals || '0', 10)
      el.textContent = v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })
    }
    const settle = (el) => fmt(el, parseFloat(el.dataset.count))
    const runCounter = (el) => {
      // En pestaña oculta requestAnimationFrame se estrangula y el contador se quedaría
      // congelado en una cifra baja: justo lo que vería un crawler que renderiza en
      // segundo plano. En ese caso no animamos, dejamos la cifra final.
      if (document.hidden) return settle(el)
      const target = parseFloat(el.dataset.count)
      const t0 = performance.now()
      const dur = 1400
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1)
        fmt(el, target * (1 - Math.pow(1 - p, 3)))
        if (p < 1) requestAnimationFrame(tick)
        else settle(el)
      }
      requestAnimationFrame(tick)
    }
    if (!motion) {
      counters.forEach(settle)
    } else {
      const ioCnt = new IntersectionObserver((es) => { es.forEach((en) => { if (en.isIntersecting) { runCounter(en.target); ioCnt.unobserve(en.target) } }) }, { threshold: 0.6 })
      counters.forEach((el) => ioCnt.observe(el))
      cleanups.push(() => ioCnt.disconnect())
      // Si la pestaña se oculta a mitad de la animación, fijamos la cifra final.
      const onHide = () => { if (document.hidden) counters.forEach(settle) }
      document.addEventListener('visibilitychange', onHide)
      cleanups.push(() => document.removeEventListener('visibilitychange', onHide))
    }

    // timeline draw on scroll
    const spaths = [...document.querySelectorAll('[data-scrollpath]')]
    if (!motion) {
      spaths.forEach((p) => { p.style.strokeDashoffset = '0' })
    } else {
      let ticking = false
      const onScroll = () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
          ticking = false
          spaths.forEach((p) => {
            const r = p.closest('svg').getBoundingClientRect()
            const prog = Math.min(Math.max((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.25), 0), 1)
            p.style.strokeDashoffset = String(1 - prog)
          })
        })
      }
      addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      cleanups.push(() => removeEventListener('scroll', onScroll))
    }

    // live log ticker (transform-only: contrast-safe)
    const logRows = [...document.querySelectorAll('#liveLog .logrow')]
    if (motion && logRows.length) {
      let cur = 0
      const timer = setInterval(() => {
        const prev = logRows[cur]
        cur = (cur + 1) % logRows.length
        const next = logRows[cur]
        prev.classList.remove('on'); prev.classList.add('off')
        next.style.transition = 'none'; next.classList.remove('off')
        requestAnimationFrame(() => { requestAnimationFrame(() => {
          next.style.transition = ''
          next.classList.add('on')
        }) })
        setTimeout(() => { prev.style.transition = 'none'; prev.classList.remove('off'); void prev.offsetHeight; prev.style.transition = '' }, 550)
      }, 2800)
      cleanups.push(() => clearInterval(timer))
    }

    // header shadow + scroll progress
    const hdr = document.getElementById('siteHeader')
    const prog = document.getElementById('scrollProgress')
    let hTick = false
    const onHdr = () => {
      if (hTick) return
      hTick = true
      requestAnimationFrame(() => {
        hTick = false
        const y = scrollY
        if (prog) {
          const max = document.documentElement.scrollHeight - innerHeight
          prog.style.transform = 'scaleX(' + (max > 0 ? y / max : 0).toFixed(4) + ')'
        }
        if (hdr) hdr.classList.toggle('scrolled', y > 8)
      })
    }
    addEventListener('scroll', onHdr, { passive: true })
    onHdr()
    cleanups.push(() => removeEventListener('scroll', onHdr))

    // rail + nav active section
    const pill = document.getElementById('railPill')
    const railLinks = [...document.querySelectorAll('[data-rail]')]
    const secIds = ['hero', 'caracteristicas', 'beneficios', 'guias', 'contacto']
    const ioRail = new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (!en.isIntersecting) return
        const i = secIds.indexOf(en.target.id)
        if (i < 0) return
        if (pill) pill.style.transform = 'translateY(' + i * 48 + 'px)'
        railLinks.forEach((a, j) => { if (j === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current') })
        document.querySelectorAll('#mainNav a').forEach((a) => {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true')
          else a.removeAttribute('aria-current')
        })
      })
    }, { rootMargin: '-40% 0px -55% 0px' })
    secIds.forEach((id) => { const s = document.getElementById(id); if (s) ioRail.observe(s) })
    cleanups.push(() => ioRail.disconnect())

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return null
}
