import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger } from '../lib/animations'
import { ChevronDown, Sparkles } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

const TOTAL_FRAMES = 240
const FRAME_BASE_PATH = '/frames/ezgif-frame-'
const FRAME_EXTENSION = '.jpg'

const getFrameSrc = (index: number): string => {
  const paddedIndex = String(index + 1).padStart(3, '0')
  return `${FRAME_BASE_PATH}${paddedIndex}${FRAME_EXTENSION}`
}

export const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const heroContentRef = useRef<HTMLDivElement | null>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null)

  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)
  const [loadError, setLoadError] = useState(false)

  // Preloaded HTMLImageElement references
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null))
  const currentFrameRef = useRef<number>(0)
  const isComponentMounted = useRef<boolean>(true)

  // Find the exact loaded frame, or the nearest available frame to prevent blank frames
  const getClosestLoadedFrame = useCallback((targetIndex: number): HTMLImageElement | null => {
    const frames = framesRef.current
    if (frames[targetIndex]) return frames[targetIndex]

    // Search closest available loaded frame radiating outwards
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset
      if (prev >= 0 && frames[prev]) return frames[prev]
      const next = targetIndex + offset
      if (next < TOTAL_FRAMES && frames[next]) return frames[next]
    }
    return null
  }, [])

  // Draw current frame onto canvas with cover aspect ratio & DPR scaling
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = getClosestLoadedFrame(frameIndex)
    if (!img) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    if (width === 0 || height === 0) return

    const pixelWidth = Math.round(width * dpr)
    const pixelHeight = Math.round(height * dpr)

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const imgWidth = img.naturalWidth || 1920
    const imgHeight = img.naturalHeight || 1080
    const imgRatio = imgWidth / imgHeight
    const screenRatio = width / height

    let drawW = width
    let drawH = height
    let offX = 0
    let offY = 0

    if (screenRatio > imgRatio) {
      drawW = width
      drawH = width / imgRatio
      offY = (height - drawH) / 2
    } else {
      drawH = height
      drawW = height * imgRatio
      offX = (width - drawW) / 2
    }

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)
    ctx.drawImage(img, offX, offY, drawW, drawH)
  }, [getClosestLoadedFrame])

  // Progressive Frame Loading
  useEffect(() => {
    isComponentMounted.current = true

    // 1. Immediately preload and decode the first frame
    const firstImg = new Image()
    firstImg.src = getFrameSrc(0)

    const handleFirstFrameLoad = async () => {
      if (!isComponentMounted.current) return
      try {
        if ('decode' in firstImg) {
          await firstImg.decode()
        }
      } catch {
        // Continue even if decode fails
      }
      framesRef.current[0] = firstImg
      setFirstFrameLoaded(true)
      setLoadedCount(1)
      drawFrame(0)

      // Refresh ScrollTrigger once the first frame is painted
      ScrollTrigger.refresh()
    }

    firstImg.onload = handleFirstFrameLoad
    firstImg.onerror = () => {
      if (isComponentMounted.current) {
        setLoadError(true)
      }
    }

    // 2. Progressive loading queue for remaining frames
    // Prioritize key milestones (every 6th frame) for instant scrub coverage
    const priorityIndices: number[] = []
    const standardIndices: number[] = []

    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (i % 6 === 0) {
        priorityIndices.push(i)
      } else {
        standardIndices.push(i)
      }
    }

    const loadQueue = [...priorityIndices, ...standardIndices]
    const CONCURRENCY_LIMIT = 6
    let currentIndexInQueue = 0
    let activeDownloads = 0

    const loadNext = () => {
      if (!isComponentMounted.current || currentIndexInQueue >= loadQueue.length) return

      while (activeDownloads < CONCURRENCY_LIMIT && currentIndexInQueue < loadQueue.length) {
        const frameIndex = loadQueue[currentIndexInQueue]
        currentIndexInQueue++
        activeDownloads++

        const img = new Image()
        img.src = getFrameSrc(frameIndex)

        const onComplete = async () => {
          if (!isComponentMounted.current) return
          try {
            if ('decode' in img) {
              await img.decode()
            }
          } catch {
            // Ignore decode failures
          }
          framesRef.current[frameIndex] = img
          setLoadedCount((prev) => prev + 1)
          activeDownloads--

          if (currentFrameRef.current === frameIndex) {
            drawFrame(frameIndex)
          }

          loadNext()
        }

        img.onload = onComplete
        img.onerror = () => {
          activeDownloads--
          loadNext()
        }
      }
    }

    loadNext()

    return () => {
      isComponentMounted.current = false
    }
  }, [drawFrame])

  // Handle window resizing & refresh triggers
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current)
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [drawFrame])

  // Master ScrollTrigger Orchestration
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Initial state: hero content starts hidden until scroll climax
    gsap.set(heroContentRef.current, { opacity: 0, y: 45, pointerEvents: 'none' })

    let scrollTriggerInstance: ScrollTrigger | null = null

    if (!prefersReducedMotion) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=2800', // Pinned scrub scroll distance
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress

          // -----------------------------------------------------------------
          // 1. CINEMATIC PORTRAIT FRAME ANIMATION (Progress 0.00 -> 0.85)
          // -----------------------------------------------------------------
          // Advance smoothly across all 240 frames
          const canvasProgress = Math.min(1, progress / 0.82)
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(canvasProgress * TOTAL_FRAMES)
          )

          currentFrameRef.current = frameIndex
          drawFrame(frameIndex)

          // -----------------------------------------------------------------
          // 2. JAI AVIVESH NAME & HERO REVEAL (Progress 0.50 -> 0.85)
          // -----------------------------------------------------------------
          if (heroContentRef.current) {
            if (progress < 0.48) {
              gsap.set(heroContentRef.current, {
                opacity: 0,
                y: 45,
                pointerEvents: 'none',
              })
            } else if (progress <= 0.82) {
              const t = (progress - 0.48) / 0.34
              gsap.set(heroContentRef.current, {
                opacity: t,
                y: 45 * (1 - t),
                pointerEvents: t < 0.3 ? 'none' : 'auto',
              })
            } else {
              gsap.set(heroContentRef.current, {
                opacity: 1,
                y: 0,
                pointerEvents: 'auto',
              })
            }
          }

          // -----------------------------------------------------------------
          // 3. SCROLL INDICATOR DYNAMICS
          // -----------------------------------------------------------------
          if (scrollIndicatorRef.current) {
            if (progress < 0.12) {
              gsap.set(scrollIndicatorRef.current, {
                opacity: 1 - progress * 8.3,
                pointerEvents: 'none',
              })
            } else if (progress > 0.88) {
              const appear = Math.min(1, (progress - 0.88) * 8.3)
              gsap.set(scrollIndicatorRef.current, {
                opacity: appear,
                pointerEvents: 'none',
              })
            } else {
              gsap.set(scrollIndicatorRef.current, {
                opacity: 0,
                pointerEvents: 'none',
              })
            }
          }
        },
      })
    } else {
      // Reduced motion fallback: show climax frame & hero content immediately
      drawFrame(TOTAL_FRAMES - 1)
      if (heroContentRef.current) {
        gsap.set(heroContentRef.current, { opacity: 1, y: 0, pointerEvents: 'auto' })
      }
    }

    // Refresh triggers once fonts are fully rendered
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh()
      })
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill()
      }
    }
  }, [drawFrame])

  const loadingPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100)

  return (
    <div
      id="intro"
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-[#000000] text-[#F2F2F2] z-10"
    >
      {/* ------------------------------------------------------------------ */}
      {/* 240-FRAME SCROLL-SCRUBBED CINEMATIC CANVAS                         */}
      {/* ------------------------------------------------------------------ */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* Static Fallback for No-JS or initial load failure */}
      <noscript>
        <img
          src="/frames/ezgif-frame-240.jpg"
          alt="Jai Avivesh Portrait"
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
      </noscript>

      {loadError && (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
          <img
            src="/frames/ezgif-frame-240.jpg"
            alt="Jai Avivesh Portrait"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Subtle Cinematic Vignette (Preserves face contrast and frame clarity) */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/10 to-black/60" />

      {/* Top Left Status Cue */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[11px] font-mono text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF2020] animate-pulse" />
          <span className="tracking-widest uppercase">JA // CINEMATIC ENGINE</span>
        </div>
      </div>

      {/* Preloading Buffer Indicator (Fades when ready) */}
      {firstFrameLoaded && loadingPercentage < 100 && (
        <div className="absolute top-6 right-20 sm:right-24 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-mono text-white/60 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF2020] animate-pulse" />
          <span>BUFFERING {loadingPercentage}%</span>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* JAI AVIVESH NAME & HERO REVEAL (Reveals during scroll climax)       */}
      {/* ------------------------------------------------------------------ */}
      <div
        ref={heroContentRef}
        id="identity"
        className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-30 px-6 sm:px-12 lg:px-20 select-none pointer-events-none"
      >
        <div className="mx-auto max-w-7xl">
          {/* Subtle Accent Line & Headline */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-10 sm:w-16 bg-[#FF2020]" />
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#FF2020]">
              <Sparkles className="h-3.5 w-3.5" /> {PORTFOLIO_DATA.headline}
            </span>
          </div>

          {/* Oversized Name */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-[#F2F2F2] uppercase leading-[0.9]">
            {PORTFOLIO_DATA.name}
          </h1>

          {/* Supporting Subtitle */}
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base font-mono tracking-[0.2em] sm:tracking-[0.25em] text-[#F2F2F2]/80 uppercase">
            {PORTFOLIO_DATA.supportingLabel}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* BOTTOM SCROLL INDICATOR                                            */}
      {/* ------------------------------------------------------------------ */}
      <div
        ref={scrollIndicatorRef}
        className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 text-center select-none"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
          Scroll To Explore
        </span>
        <div className="flex h-5 w-3 items-start justify-center rounded-full border border-white/30 p-0.5">
          <span className="h-1 w-1 rounded-full bg-[#FF2020] animate-bounce" />
        </div>
        <ChevronDown className="h-3 w-3 text-white/40 animate-pulse" />
      </div>
    </div>
  )
}

export default CinematicHero
