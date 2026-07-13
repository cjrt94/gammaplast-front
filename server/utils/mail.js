// Utilidades de correo (auto-importadas por Nitro en server/api).

// Escapa texto del usuario antes de interpolarlo en el HTML del correo (anti-inyección).
export function esc (v) {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Renderiza una tabla simple de "campo → valor" para el cuerpo del correo.
// `rows`: array de [label, value]; omite los vacíos. `message` va como bloque aparte.
export function renderLeadEmail ({ title, rows, message }) {
  const cells = rows
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(([label, v]) => `<tr>
      <td style="padding:6px 14px 6px 0;color:#686E72;font:600 13px/1.5 Arial,sans-serif;white-space:nowrap;vertical-align:top">${esc(label)}</td>
      <td style="padding:6px 0;color:#13191B;font:400 15px/1.5 Arial,sans-serif">${esc(v)}</td>
    </tr>`)
    .join('')

  const msgBlock = message
    ? `<p style="margin:18px 0 6px;color:#686E72;font:600 13px/1.5 Arial,sans-serif">Mensaje</p>
       <div style="white-space:pre-wrap;color:#13191B;font:400 15px/1.6 Arial,sans-serif;border-left:3px solid #00B140;padding:8px 14px;background:#F4F6F6;border-radius:4px">${esc(message)}</div>`
    : ''

  return `<div style="max-width:560px;margin:0 auto;padding:24px">
    <h2 style="margin:0 0 4px;color:#13191B;font:700 20px/1.2 Arial,sans-serif">${esc(title)}</h2>
    <p style="margin:0 0 18px;color:#0A7E33;font:600 12px/1.4 Arial,sans-serif">gammaplast.com.pe</p>
    <table style="border-collapse:collapse">${cells}</table>
    ${msgBlock}
  </div>`
}
