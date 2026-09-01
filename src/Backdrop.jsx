// Ambient calligraphic flourishes behind the page.
// Each curl is its own edge-anchored SVG so the set adapts to any
// viewport (a single slice'd SVG only showed its centre strip on mobile).
// Colour comes from --flourish (burnt orange in dark, near-black in light).
const curls = [
  { cls: 'bf-1', box: '0 0 200 220', d: 'M40 12c80 10 120 82 70 142-40 50-118 32-106-48 8-56 78-70 104-26 20 34-6 78-40 66' },
  { cls: 'bf-2', box: '0 0 240 180', d: 'M12 44C92-8 154 58 122 110c-24 40-100 30-90-40 6-40 62-36 74 6' },
  { cls: 'bf-3', box: '0 0 200 240', d: 'M160 20C60 8 20 92 62 152c34 48 112 40 110-40-2-52-52-74-78-24' },
  { cls: 'bf-4', box: '0 0 240 160', d: 'M10 122C82 40 132 132 202 90c40-24 30-72-10-62-30 8-22 62-70 74' },
  { cls: 'bf-5', box: '0 0 170 190', d: 'M32 20c82 12 112 84 62 148-30 38-84 18-74-40 6-32 60-30 74 6' },
]

export function Backdrop() {
  return (
    <div className="backdrop-flourish" aria-hidden="true">
      {curls.map((c) => (
        <svg key={c.cls} className={`bf ${c.cls}`} viewBox={c.box} focusable="false">
          <path d={c.d} />
        </svg>
      ))}
    </div>
  )
}
