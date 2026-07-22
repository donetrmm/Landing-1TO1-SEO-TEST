import fs from 'node:fs'

const { render } = await import('./dist-ssr/entry-server.js')
const template = fs.readFileSync('dist/index.html', 'utf8')
let html = template.replace('<!--app-html-->', render())

// Inline the extracted stylesheet so first paint needs no extra request.
html = html.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/, (tag, cssPath) => {
  const css = fs.readFileSync(`dist/${cssPath}`, 'utf8')
  return `<style>${css}</style>`
})

fs.writeFileSync('dist/index.html', html)
console.log('prerender: static markup injected, CSS inlined')
