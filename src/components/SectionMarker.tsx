import React from 'react'

interface SectionMarkerProps {
  number: string
  className?: string
}

export const SectionMarker: React.FC<SectionMarkerProps> = ({ number, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Thin scarlet horizontal line */}
      <span className="h-[2px] w-8 sm:w-10 bg-[#FF2020]" />

      {/* Sequential Section Number only (No descriptive wording) */}
      <span className="font-mono text-xs tracking-widest text-[#FF2020] font-semibold">
        {number}
      </span>

      {/* Subtle abstract technical drawing accents */}
      <svg
        width="32"
        height="10"
        viewBox="0 0 32 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white/25 ml-1"
      >
        <line x1="0" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1="16" y1="2" x2="16" y2="8" stroke="currentColor" strokeWidth="0.8" />
        <line x1="20" y1="5" x2="28" y2="5" stroke="#FF2020" strokeWidth="0.8" strokeOpacity="0.6" />
      </svg>
    </div>
  )
}

export default SectionMarker
