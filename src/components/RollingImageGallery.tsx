import { useState, useRef, useEffect, useCallback, type FC, type MouseEvent } from 'react'
import { ArrowDownRight, Layers, Film } from 'lucide-react'

export interface TileItem {
  frame: string
  label: string
  tag: string
  stage: string
}

const AUTHENTIC_TILES: TileItem[] = [
  {
    frame: '/frames/ezgif-frame-015.jpg',
    label: 'FRAME // 015',
    tag: 'SILHOUETTE',
    stage: 'Latent Void',
  },
  {
    frame: '/frames/ezgif-frame-045.jpg',
    label: 'FRAME // 045',
    tag: 'EMERGENCE',
    stage: 'Shadow Angle',
  },
  {
    frame: '/frames/ezgif-frame-075.jpg',
    label: 'FRAME // 075',
    tag: 'ILLUMINATION',
    stage: 'Profile Edge',
  },
  {
    frame: '/frames/ezgif-frame-105.jpg',
    label: 'FRAME // 105',
    tag: 'ORIENTATION',
    stage: 'Face Reveal',
  },
  {
    frame: '/frames/ezgif-frame-140.jpg',
    label: 'FRAME // 140',
    tag: 'ALIGNMENT',
    stage: 'Frontal Vector',
  },
  {
    frame: '/frames/ezgif-frame-175.jpg',
    label: 'FRAME // 175',
    tag: 'ATMOSPHERE',
    stage: 'Scarlet Shift',
  },
  {
    frame: '/frames/ezgif-frame-205.jpg',
    label: 'FRAME // 205',
    tag: 'NEON APEX',
    stage: 'Triangle Ignite',
  },
  {
    frame: '/frames/ezgif-frame-240.jpg',
    label: 'FRAME // 240',
    tag: 'CLIMAX',
    stage: 'Final State',
  },
]

export interface RollingImageGalleryProps {
  className?: string
  altText?: string
  ariaLabel?: string
  onScrollCueClick?: () => void
}

export const RollingImageGallery: FC<RollingImageGalleryProps> = ({
  className = '',
  ariaLabel = 'Interactive 3D visual archive and authentic frame sequence gallery',
  onScrollCueClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [activeTile, setActiveTile] = useState<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const targetTiltRef = useRef({ x: 0, y: 0 })
  const currentTiltRef = useRef({ x: 0, y: 0 })

  // Smooth mouse tilt interpolation
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    targetTiltRef.current = {
      x: -y * 14, // Tilt up/down
      y: x * 18,  // Tilt left/right
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    targetTiltRef.current = { x: 0, y: 0 }
    setActiveTile(null)
  }, [])

  // Smooth lerp loop for organic 3D responsiveness
  useEffect(() => {
    let active = true

    const loop = () => {
      if (!active) return

      // Lerp tilt
      currentTiltRef.current.x += (targetTiltRef.current.x - currentTiltRef.current.x) * 0.08
      currentTiltRef.current.y += (targetTiltRef.current.y - currentTiltRef.current.y) * 0.08

      setTilt({
        x: Math.round(currentTiltRef.current.x * 100) / 100,
        y: Math.round(currentTiltRef.current.y * 100) / 100,
      })

      animationFrameRef.current = requestAnimationFrame(loop)
    }

    animationFrameRef.current = requestAnimationFrame(loop)

    return () => {
      active = false
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Subtle Ambient Red Glow in Background */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-[480px] w-[640px] rounded-full bg-[#FF2020]/10 blur-[130px] transition-all duration-700" />
      </div>

      {/* 3D Perspective Tile Matrix */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto my-auto px-4 sm:px-6 lg:px-8 py-2 transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Center HUD Eyebrow Badge */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md shadow-xl text-xs font-mono text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF2020] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF2020]" />
            </span>
            <span className="uppercase tracking-widest text-[11px] text-[#F2F2F2]">
              CINEMATIC ARCHIVE &middot; 240 SEQUENTIAL FRAMES
            </span>
          </div>
        </div>

        {/* Responsive Grid of Authentic Video Keyframes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {AUTHENTIC_TILES.map((tile, index) => {
            const isActive = activeTile === index

            return (
              <div
                key={tile.frame}
                onMouseEnter={() => setActiveTile(index)}
                onClick={() => {
                  setActiveTile(index)
                  onScrollCueClick?.()
                }}
                className={`group relative rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-[#FF2020] shadow-xl shadow-[#FF2020]/20 scale-[1.03] z-20'
                    : 'border-white/10 bg-[#000000]/80 hover:border-white/30'
                }`}
                style={{
                  transform: `translateZ(${isActive ? '35px' : '0px'})`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Frame Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={tile.frame}
                    alt={`Jai Avivesh ${tile.label}`}
                    className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                      isActive ? 'scale-110 contrast-110 brightness-105' : 'scale-100 opacity-85 group-hover:opacity-100'
                    }`}
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Top-Right Red Corner Pulse */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-white/60">
                      {tile.tag}
                    </span>
                  </div>
                </div>

                {/* Bottom Card Metadata */}
                <div className="p-2.5 sm:p-3 bg-[#0a0a0c]/90 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-white/90">
                      {tile.label}
                    </span>
                    <span className="text-[9px] font-mono text-white/40">
                      {tile.stage}
                    </span>
                  </div>

                  <ArrowDownRight className={`h-3.5 w-3.5 transition-colors ${
                    isActive ? 'text-[#FF2020]' : 'text-white/30 group-hover:text-white/60'
                  }`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Sub-label banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <Film className="h-3.5 w-3.5 text-[#FF2020]" />
            <span>EXTRACTED DIRECTLY FROM SOURCE MASTER VEO RENDER</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-white/30" />
            <span>HOVER TILES TO ENGAGE 3D PERSPECTIVE MATRIX</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RollingImageGallery
