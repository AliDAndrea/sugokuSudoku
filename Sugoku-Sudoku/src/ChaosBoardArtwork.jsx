import { useId } from 'react'
import { boardGeometry } from './boardGeometry.js'
import { gridColorsForPlayers } from './chaosSudoku.js'

// Reuse the traced tile shapes so the sketch lines up with input and highlights.
export function ChaosBoardArtwork({ size, regions, colored = true, playerColors = [] }) {
  const id = useId().replace(/:/g, '')
  const geometry = boardGeometry[size]
  const regionColors = gridColorsForPlayers(playerColors)
  const left = Math.min(...geometry.cells.map((cell) => cell.x)) - 3
  const top = Math.min(...geometry.cells.map((cell) => cell.y)) - 3
  const right = Math.max(...geometry.cells.map((cell) => cell.x + cell.width)) + 3
  const bottom = Math.max(...geometry.cells.map((cell) => cell.y + cell.height)) + 3
  return <svg aria-hidden="true" viewBox={`0 0 ${geometry.width} ${geometry.height}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '400px', pointerEvents: 'none' }}>
    <defs>
      <filter id={`${id}-paper`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="29" result="grain" />
        <feColorMatrix in="grain" type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope="0.09" /></feComponentTransfer>
        <feBlend in="SourceGraphic" mode="multiply" />
      </filter>
      <filter id={`${id}-pencil`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.42" numOctaves="3" seed="8" result="grain" />
        <feDisplacementMap in="SourceGraphic" in2="grain" scale="0.85" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <rect x={left} y={top} width={right - left} height={bottom - top} fill="#c37a67" />
    <g filter={colored ? `url(#${id}-paper)` : undefined}>
      {geometry.cells.map((cell, index) => <path key={index} transform={`translate(${cell.x} ${cell.y})`} d={cell.path} fill={colored ? regionColors[regions[index]] : '#a96054'} />)}
    </g>
    <g fill="none" stroke="#000000" strokeWidth="1.1" strokeLinejoin="round" filter={`url(#${id}-pencil)`}>
      {geometry.cells.map((cell, index) => <path key={index} transform={`translate(${cell.x} ${cell.y})`} d={cell.path} />)}
    </g>
    <g fill="none" stroke="#000000" strokeWidth="0.45" opacity="0.55">
      {geometry.cells.map((cell, index) => <path key={index} transform={`translate(${cell.x + 0.6} ${cell.y - 0.4})`} d={cell.path} />)}
    </g>
  </svg>
}
