import { useId } from 'react'
import { boardGeometry } from './boardGeometry.js'

export function ChaosBorders({ size, regions, sketch = false }) {
  const id = useId().replace(/:/g, '')
  const geometry = boardGeometry[size], cells = geometry.cells
  // Shared axes align adjoining edges across the hand-drawn tile geometry.
  const x = Array.from({ length: size + 1 }, (_, c) => c === 0 ? cells[0].x : c === size ? cells[size - 1].x + cells[size - 1].width : (cells[c - 1].x + cells[c - 1].width + cells[c].x) / 2)
  const y = Array.from({ length: size + 1 }, (_, r) => r === 0 ? cells[0].y : r === size ? cells[(size - 1) * size].y + cells[(size - 1) * size].height : (cells[(r - 1) * size].y + cells[(r - 1) * size].height + cells[r * size].y) / 2)
  const widths = x.map((_, c) => c === 0 || c === size ? 4.5 : Math.max(4.5, ...Array.from({ length: size }, (_, r) => cells[r * size + c].x - cells[r * size + c - 1].x - cells[r * size + c - 1].width + 0.75)))
  const heights = y.map((_, r) => r === 0 || r === size ? 4.5 : Math.max(4.5, ...Array.from({ length: size }, (_, c) => cells[r * size + c].y - cells[(r - 1) * size + c].y - cells[(r - 1) * size + c].height + 0.75)))
  const shapes = []
  const rectangle = (left, top, right, bottom) => shapes.push(`M${left} ${top}H${right}V${bottom}H${left}Z`)
  for (let r = 0; r <= size; r++) for (let c = 0; c < size; c++) {
    if (r > 0 && r < size && regions[(r - 1) * size + c] === regions[r * size + c]) continue
    rectangle(x[c] - widths[c] / 2, y[r] - heights[r] / 2, x[c + 1] + widths[c + 1] / 2, y[r] + heights[r] / 2)
  }
  for (let c = 0; c <= size; c++) for (let r = 0; r < size; r++) {
    if (c > 0 && c < size && regions[r * size + c - 1] === regions[r * size + c]) continue
    rectangle(x[c] - widths[c] / 2, y[r] - heights[r] / 2, x[c] + widths[c] / 2, y[r + 1] + heights[r + 1] / 2)
  }
  return <svg aria-hidden="true" viewBox={`0 0 ${geometry.width} ${geometry.height}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '400px', zIndex: 2, pointerEvents: 'none' }}>
    <defs>
      <clipPath id={`${id}-bounds`}><rect x={x[0] - 2.25} y={y[0] - 2.25} width={x[size] - x[0] + 4.5} height={y[size] - y[0] + 4.5} /></clipPath>
      {/* Apply after the graphite filter so neither widening nor roughness enters a tile. */}
      <mask id={`${id}-gutters`} maskUnits="userSpaceOnUse" x="0" y="0" width={geometry.width} height={geometry.height} style={{ maskType: 'luminance' }}>
        <rect width={geometry.width} height={geometry.height} fill="white" />
        {cells.map((cell, index) => <rect key={index} x={cell.x - 0.5} y={cell.y - 0.5} width={cell.width + 1} height={cell.height + 1} fill="black" />)}
      </mask>
      <filter id={`${id}-graphite`} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.48" numOctaves="3" seed="17" result="grain" />
        <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="rough" />
        {sketch ? (
          <feComposite in="rough" in2="SourceAlpha" operator="in" />
        ) : <>
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0.35 0 0 0 0 0.33 0 0 0 0 0.30 0 0 0 0.65 -0.12" result="pencil" />
          <feComposite in="pencil" in2="rough" operator="in" result="texture" />
          <feBlend in="rough" in2="texture" mode="screen" />
        </>}
      </filter>
    </defs>
    <g clipPath={`url(#${id}-bounds)`} mask={`url(#${id}-gutters)`}>
      <g filter={`url(#${id}-graphite)`}>
        <path d={shapes.join(' ')} fill={sketch ? '#c37a67' : '#080706'} fillRule="nonzero" mask={`url(#${id}-gutters)`} />
      </g>
    </g>
  </svg>
}
