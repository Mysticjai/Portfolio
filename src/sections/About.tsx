import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'
import SectionMarker from '../components/SectionMarker'

export const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const markerRef = useRef<HTMLDivElement | null>(null)
  const portraitColRef = useRef<HTMLDivElement | null>(null)
  const portraitImgRef = useRef<HTMLImageElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const bioRef = useRef<HTMLDivElement | null>(null)
  const metaRef = useRef<HTMLDivElement | null>(null)
  const accentLineRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let mm: gsap.MatchMedia | null = null

    const ctx = gsap.context(() => {
      // ── Initial hidden states (set only in JS when motion is allowed) ─────
      gsap.set(markerRef.current, { opacity: 0, x: -18 })
      gsap.set(portraitColRef.current, { opacity: 0, y: 32, clipPath: 'inset(0 0 8% 0)' })
      gsap.set(headingRef.current, { opacity: 0, y: 36 })

      const bioParas = bioRef.current ? Array.from(bioRef.current.children) : []
      gsap.set(bioParas, { opacity: 0, y: 20 })
      gsap.set(metaRef.current, { opacity: 0, y: 14 })
      if (accentLineRef.current) gsap.set(accentLineRef.current, { scaleX: 0, transformOrigin: 'left center' })

      // ── Entrance timeline (once: true prevents replay jumps on scroll back)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      })

      // 1. Section marker slides in
      tl.to(markerRef.current, { opacity: 1, x: 0, duration: 0.55 })

      // 2. Portrait glides in with bottom clip opening
      .to(portraitColRef.current, {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.1,
      }, '-=0.35')

      // 3. "ABOUT ME" masked heading slides up from mask
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.75,
      }, '-=0.8')

      // 4. Bio paragraphs stagger
      .to(bioParas, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.12,
      }, '-=0.5')

      // 5. Thin red accent line draws and metadata line fades in
      .to(accentLineRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '-=0.3')
      .to(metaRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')

      // ── Subtle portrait parallax on desktop (scrub-linked, naturally reversible)
      mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to(portraitImgRef.current, {
          y: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      })
    }, section)

    return () => {
      ctx.revert()
      if (mm) mm.revert()
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About Jai Avivesh"
      className="relative z-10 w-full min-h-screen bg-[#080808] text-[#F2F2F2] px-6 py-28 sm:px-12 lg:px-20 xl:px-24 border-t border-white/5 scroll-mt-24 overflow-hidden"
    >
      {/* Restrained scarlet ambient glow — very diffuse, far left */}
      <div className="pointer-events-none absolute -left-28 top-1/3 h-[500px] w-[500px] rounded-full bg-[#FF2020]/[0.09] blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Marker */}
        <div ref={markerRef} style={{ willChange: 'transform, opacity' }}>
          <SectionMarker number="01" className="mb-10 sm:mb-14" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: LARGE CINEMATIC PORTRAIT ── */}
          <div
            ref={portraitColRef}
            className="lg:col-span-6 relative h-[80vh] min-h-[520px] overflow-hidden"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Very faint diffuse scarlet glow */}
            <div className="pointer-events-none absolute top-[20%] left-[10%] h-48 w-48 rounded-full bg-[#FF2020]/10 blur-[90px]" />

            <img
              ref={portraitImgRef}
              src="/ezgif-frame-041-Photoroom.png"
              alt="Jai Avivesh — Portrait"
              className="absolute top-0 select-none filter contrast-[1.08] brightness-[0.97]"
              style={{
                width: '210%',
                maxWidth: 'none',
                marginLeft: '-70%',
                objectFit: 'contain',
                willChange: 'transform',
              }}
              loading="eager"
            />

            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
            {/* Right edge fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#080808] to-transparent hidden lg:block" />
          </div>

          {/* ── RIGHT: EDITORIAL CONTENT ── */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:pl-4">
            {/* Masked heading container */}
            <div className="overflow-hidden mb-8">
              <h2
                ref={headingRef}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F2F2F2] uppercase"
                style={{ willChange: 'transform, opacity' }}
              >
                ABOUT ME
              </h2>
            </div>

            <div
              ref={bioRef}
              className="space-y-6 text-base sm:text-lg text-[#F2F2F2]/85 font-light leading-relaxed"
            >
              <p className="text-[#F2F2F2]/90" style={{ willChange: 'transform, opacity' }}>
                I&apos;m a second-year B.Tech student specializing in Computer Science and Artificial
                Intelligence &amp; Machine Learning at JK Lakshmipat University in Jaipur. I&apos;m
                passionate about bridging the gap between technology and design, combining programming
                logic with creative thinking to explore new ways of solving problems.
              </p>
              <p style={{ willChange: 'transform, opacity' }}>
                My interests span artificial intelligence, web and app development, backend systems, and
                immersive 3D web experiences. Alongside programming in Python, C, C++, and Java, I explore
                frontend development with React and JavaScript and creative tools such as Figma, Adobe
                Premiere Pro, and After Effects.
              </p>
              <p style={{ willChange: 'transform, opacity' }}>
                I&apos;m currently strengthening my Python, machine learning, and data structures and
                algorithms foundations. My goal is to develop intelligent, user-centric solutions that
                combine technical depth with thoughtful visual design.
              </p>
            </div>

            <div
              ref={metaRef}
              className="mt-10 pt-6 border-t border-white/10 flex items-center gap-2.5 text-xs font-mono tracking-widest text-white/50 uppercase"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Thin red accent line */}
              <span
                ref={accentLineRef}
                className="h-px w-8 bg-[#FF2020] inline-block"
                style={{ display: 'inline-block' }}
              />
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF2020] animate-pulse" />
              <span>B.TECH CSE (AI/ML) &middot; JAIPUR, INDIA</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
