import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import SectionMarker from '../components/SectionMarker'
import { Compass, Terminal } from 'lucide-react'

export const Skills = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const markerRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)
  const accentLineRef = useRef<HTMLDivElement | null>(null)
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])
  const interestsBadgeRef = useRef<HTMLDivElement | null>(null)
  const interestsTagsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // ── Initial hidden states ─────────────────────────────────────────────
      gsap.set(markerRef.current, { opacity: 0, x: -18 })
      gsap.set(headingRef.current, { opacity: 0, y: 32 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 14 })
      if (accentLineRef.current) gsap.set(accentLineRef.current, { scaleX: 0, transformOrigin: 'left center' })

      const cats = categoryRefs.current.filter(Boolean)
      cats.forEach((cat) => {
        if (!cat) return
        gsap.set(cat, { opacity: 0, y: 18 })
        const tags = Array.from(cat.querySelectorAll<HTMLElement>('[data-skill-tag]'))
        gsap.set(tags, { opacity: 0, y: 8, scale: 0.96 })
      })

      gsap.set(interestsBadgeRef.current, { opacity: 0, x: -16 })
      const interestTags = interestsTagsRef.current
        ? Array.from(interestsTagsRef.current.children)
        : []
      gsap.set(interestTags, { opacity: 0, y: 8 })

      // ── Entrance timeline (fast, crisp, no lag before text is readable) ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      })

      // 1. Section marker
      tl.to(markerRef.current, { opacity: 1, x: 0, duration: 0.4 })

      // 2. Main heading slides up from mask container + subtitle
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.55,
      }, '-=0.2')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.45 }, '-=0.35')

      // 3. Thin red accent line draws
      .to(accentLineRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.inOut',
      }, '-=0.3')

      // 4. Categories reveal in sequence
      .to(cats, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
      }, '-=0.25')

      // 5. Skill tags stagger across categories smoothly
      .to(
        section.querySelectorAll<HTMLElement>('[data-skill-tag]'),
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.025,
          ease: 'power2.out',
        },
        '-=0.3'
      )

      // 6. Areas of Interest
      .to(interestsBadgeRef.current, { opacity: 1, x: 0, duration: 0.4 }, '-=0.2')
      .to(interestTags, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: 'power2.out',
      }, '-=0.3')
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-label="Skills and Technical Arsenal"
      className="relative z-10 w-full bg-[#000000] px-6 py-28 sm:px-12 lg:px-24 border-t border-white/5 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Marker */}
        <div ref={markerRef} style={{ willChange: 'transform, opacity' }}>
          <SectionMarker number="02" className="mb-8" />
        </div>

        {/* Section Heading & Subtitle */}
        <div className="flex flex-col gap-3 mb-4 max-w-3xl">
          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F2F2F2] uppercase"
              style={{ willChange: 'transform, opacity' }}
            >
              WHAT I&apos;M EXPLORING
            </h2>
          </div>
          <p
            ref={subtitleRef}
            className="text-sm sm:text-base text-white/60 font-light leading-relaxed"
            style={{ willChange: 'transform, opacity' }}
          >
            Active languages, web frameworks, design systems, and core foundational domains currently being cultivated.
          </p>
        </div>

        {/* Thin red accent line */}
        <div
          ref={accentLineRef}
          className="h-px w-16 bg-[#FF2020] mb-14"
          style={{ willChange: 'transform' }}
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 mb-20">
          {PORTFOLIO_DATA.skills.map((category, idx) => (
            <div
              key={category.title}
              ref={(el) => { categoryRefs.current[idx] = el }}
              className="flex flex-col gap-4 pb-6 border-b border-white/10 group"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/60 group-hover:text-[#FF2020] transition-colors duration-200">
                  {category.title}
                </h3>
                <span className="text-[10px] font-mono text-white/30">
                  [{category.skills.length}]
                </span>
              </div>

              {/* Inline skill tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    data-skill-tag
                    className="inline-flex items-center px-3 py-1.5 rounded-sm text-xs font-mono bg-white/[0.03] text-[#F2F2F2]/80 border border-white/10 hover:border-[#FF2020]/50 hover:bg-[#FF2020]/10 hover:text-white transition-all duration-200 select-none cursor-default"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Areas of Interest Band */}
        <div className="pt-10 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div
            ref={interestsBadgeRef}
            className="flex items-center gap-3"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#FF2020]/30 bg-[#FF2020]/10 text-[#FF2020]">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-white">
                AREAS OF INTEREST
              </h3>
              <p className="text-xs text-white/50 font-mono">
                Active study, experimentation &amp; long-term development
              </p>
            </div>
          </div>

          <div ref={interestsTagsRef} className="flex flex-wrap gap-2.5 max-w-2xl">
            {PORTFOLIO_DATA.areasOfInterest.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] text-white/90 border border-white/10 hover:border-white/30 transition-colors"
                style={{ willChange: 'transform, opacity' }}
              >
                <Terminal className="h-3 w-3 text-[#FF2020]" />
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
