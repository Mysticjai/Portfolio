import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import SectionMarker from '../components/SectionMarker'
import { Code2, Database, Globe } from 'lucide-react'

// ── Per-card hover interaction via GSAP for silky control ────────────────────
function useCardHover(
  cardRef: React.RefObject<HTMLElement | null>,
  iconRef: React.RefObject<HTMLSpanElement | null>
) {
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const icon = iconRef.current

    const onEnter = () => {
      gsap.to(card, { y: -5, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
      if (icon) gsap.to(icon, { scale: 1.15, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
    }
    const onLeave = () => {
      gsap.to(card, { y: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
      if (icon) gsap.to(icon, { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [cardRef, iconRef])
}

// ── Individual project card component with its own ScrollTrigger ─────────────
interface CardProps {
  project: (typeof PORTFOLIO_DATA.projects)[number]
  idx: number
}

const ProjectCard = ({ project, idx }: CardProps) => {
  const cardRef = useRef<HTMLElement | null>(null)
  const iconRef = useRef<HTMLSpanElement | null>(null)

  useCardHover(
    cardRef as React.RefObject<HTMLElement | null>,
    iconRef as React.RefObject<HTMLSpanElement | null>
  )

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.set(card, { opacity: 0, y: 32, clipPath: 'inset(4% 0 0 0 round 16px)' })
    const techTags = Array.from(card.querySelectorAll<HTMLElement>('[data-tech-tag]'))
    gsap.set(techTags, { opacity: 0, x: -8 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 82%',
        once: true,
      },
      delay: idx * 0.12,
      defaults: { ease: 'power3.out' },
    })

    // Card body slides in with clipping boundary expanding to 16px rounded card
    tl.to(card, {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0 0 0 round 16px)',
      duration: 0.85,
    })
    // Tech tags slide in from left
    .to(techTags, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.05,
    }, '-=0.4')

    return () => tl.kill()
  }, [idx])

  return (
    <article
      ref={cardRef}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#000000] p-8 sm:p-10 transition-colors duration-300 hover:border-[#FF2020]/40 hover:shadow-2xl hover:shadow-[#FF2020]/5"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Card Top: Number & Status Badge */}
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <span className="text-xs font-mono text-white/30">
          BUILD // 0{idx + 1}
        </span>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF2020] animate-pulse" />
          <span className="text-white/80">{project.status}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="my-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FF2020] uppercase tracking-wider">
          <span ref={iconRef} className="inline-flex items-center justify-center">
            {idx === 0 && <Globe className="h-3.5 w-3.5" />}
            {idx === 1 && <Database className="h-3.5 w-3.5" />}
          </span>
          <span>{project.category}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#F2F2F2] transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm font-medium text-white/80 leading-relaxed">
          {project.purpose}
        </p>

        <p className="text-xs sm:text-sm text-white/55 font-light leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Card Footer: Tech Tags */}
      <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            data-tech-tag
            className="px-2.5 py-1 rounded-sm text-[11px] font-mono bg-white/[0.03] text-white/60 border border-white/5 group-hover:border-white/10 transition-colors"
            style={{ willChange: 'transform, opacity' }}
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  )
}

// ── Main Section ──────────────────────────────────────────────────────────────
export const SelectedWorks = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const markerRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)
  const accentLineRef = useRef<HTMLDivElement | null>(null)
  const bannerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.set(markerRef.current, { opacity: 0, x: -18 })
      gsap.set(headingRef.current, { opacity: 0, y: 36 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 14 })
      if (accentLineRef.current) gsap.set(accentLineRef.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(bannerRef.current, { opacity: 0, y: 22 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      })

      tl.to(markerRef.current, { opacity: 1, x: 0, duration: 0.55 })
        .to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.75,
        }, '-=0.25')
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.55 }, '-=0.5')
        .to(accentLineRef.current, { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, '-=0.3')

      // Banner (R&D pipeline) fades in when scrolled into view
      const bannerTl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 85%',
          once: true,
        },
      })
      bannerTl.to(bannerRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="works"
      ref={sectionRef}
      aria-label="Selected Works and Projects"
      className="relative z-10 w-full bg-[#080808] px-6 py-28 sm:px-12 lg:px-24 border-t border-white/5 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Marker */}
        <div ref={markerRef} style={{ willChange: 'transform, opacity' }}>
          <SectionMarker number="03" className="mb-8" />
        </div>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-4">
          <div className="max-w-3xl">
            <div className="overflow-hidden">
              <h2
                ref={headingRef}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F2F2F2] uppercase"
                style={{ willChange: 'transform, opacity' }}
              >
                THINGS I&apos;VE BEEN BUILDING
              </h2>
            </div>
            <p
              ref={subtitleRef}
              className="mt-3 text-sm sm:text-base text-white/60 font-light leading-relaxed"
              style={{ willChange: 'transform, opacity' }}
            >
              Curated software implementations, academic database systems, and interactive web architecture.
            </p>
          </div>
          <div className="text-xs font-mono text-white/40 shrink-0">
            [ HONEST STATUS VERIFIED ]
          </div>
        </div>

        {/* Thin red accent line */}
        <div
          ref={accentLineRef}
          className="h-px w-16 bg-[#FF2020] mb-14"
          style={{ willChange: 'transform' }}
        />

        {/* Project Cards — each card has its own ScrollTrigger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>

        {/* R&D Pipeline Banner */}
        <div
          ref={bannerRef}
          className="mt-10 relative rounded-2xl border border-dashed border-white/15 bg-white/[0.015] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#FF2020]">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-white/40 uppercase tracking-wider">PIPELINE // UPCOMING</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-white/50">
                  R&amp;D IN PROGRESS
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white/80">
                More Projects In Active Development
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/50 font-light max-w-2xl leading-relaxed">
                Active problem-solving and software prototypes in machine learning, distributed backend architectures, and creative coding will be published here upon rigorous completion.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-[11px] font-mono text-white/40 flex items-center gap-2 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF2020] animate-pulse" />
            <span>Honest engineering portfolio &mdash; No fabricated builds.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SelectedWorks
