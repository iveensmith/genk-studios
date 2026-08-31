// Ambient calligraphic flourishes behind the page.
// Colour comes from --flourish (gold in dark, warm near-black in light).
export function Backdrop() {
  return (
    <svg
      className="backdrop-flourish"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1216 -46c150 8 214 150 106 226-104 73-258 30-244-84 11-84 108-114 150-42 32 55-6 116-58 96-34-13-34-56-6-72" />
      <path d="M-64 432c142-72 234 40 194 132-36 82-146 66-126-38 14-70 88-72 104-16" />
      <path d="M-44 772c152-72 224 72 366 20 132-49 122-206-20-176-88 18-76 132 14 110 58-15 64-80 28-106" />
      <path d="M1512 726c-142-30-204 82-326 50-98-26-86-144 20-128 70 10 74 88 16 96" />
      <path d="M-32 96c102-62 224 4 202 106-14 70-112 74-112-10" />
      <path d="M1372 900c40-70-8-140-96-150" />
    </svg>
  )
}
