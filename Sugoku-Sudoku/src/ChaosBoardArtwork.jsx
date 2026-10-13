import { useId } from 'react'
import classic6 from './figmages/Board6x6.png'
import classic9 from './figmages/Board9x9.png'
import { boardGeometry } from './boardGeometry.js'
import { gridColorsForPlayers } from './chaosSudoku.js'

// Reuse the traced tile shapes so the sketch lines up with input and highlights.
export function ChaosBoardArtwork({ size, regions, colored = true, playerColors = [], selected = null }) {
  const id = useId().replace(/:/g, '')
  const geometry = boardGeometry[size]
  const selectedRegion = selected === null ? null : regions[selected]
  const regionColors = gridColorsForPlayers(playerColors)
  const left = Math.min(...geometry.cells.map((cell) => cell.x)) - 3
  const top = Math.min(...geometry.cells.map((cell) => cell.y)) - 3
  const right = Math.max(...geometry.cells.map((cell) => cell.x + cell.width)) + 3
  const bottom = Math.max(...geometry.cells.map((cell) => cell.y + cell.height)) + 3
  return <svg aria-hidden="true" viewBox={`0 0 ${geometry.width} ${geometry.height}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '400px', pointerEvents: 'none' }}>
    <defs>
      <clipPath id={`${id}-tile-area`}>
        <rect x={left} y={top} width={right - left} height={bottom - top} />
      </clipPath>
      {/* Extract the original black pencil marks; discard its brown paper. */}
      <filter id={`${id}-classic-edges`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.508876 0 0 0 1" />
        <feComposite in2="SourceAlpha" operator="in" />
      </filter>
      <filter id={`${id}-muted`} colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values="0.4" />
      </filter>
      <filter id={`${id}-paper`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="29" result="grain" />
        <feColorMatrix in="grain" type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.09" /></feComponentTransfer>
        <feBlend in="SourceGraphic" mode="multiply" />
      </filter>
    </defs>
    <rect x={left} y={top} width={right - left} height={bottom - top} fill="#c37a67" />
    <g filter={colored ? `url(#${id}-paper)` : undefined}>
      {geometry.cells.map((cell, index) => <path key={index} transform={`translate(${cell.x} ${cell.y})`} d={cell.path} fill={colored ? regionColors[regions[index]] : '#a96054'} filter={colored && selectedRegion !== null && regions[index] !== selectedRegion ? `url(#${id}-muted)` : undefined} />)}
    </g>
    <g clipPath={`url(#${id}-tile-area)`}>
      <image href={size === 6 ? classic6 : classic9} width={geometry.width} height={geometry.height} preserveAspectRatio="none" filter={`url(#${id}-classic-edges)`} />
    </g>
  </svg>
}
