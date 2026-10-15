import { useEffect, useRef } from 'react'
import { gsap } from '../lib/animations'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import SectionMarker from '../components/SectionMarker'
import { Mail, ArrowUpRight } from 'lucide-react'

export const Contact = () => {
  const { contact, name } = PORTFOLIO_DATA

  const sectionRef = useRef<HTMLElement | null>(null)
  const markerRef = useRef<HTMLDivElement | null>(null)
  const headLine1Ref = useRef<HTMLSpanElement | null>(null)
  const headLine2Ref = useRef<HTMLSpanElement | null>(null)
  const paragraphRef = useRef<HTMLParagraphElement | null>(null)
  const accentLineRef = useRef<HTMLDivElement | null>(null)
  const linksRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // ── Initial hidden states ─────────────────────────────────────────────
      gsap.set(markerRef.current, { opacity: 0, x: -18 })

      // Heading lines start translated down inside their overflow-hidden wrappers
      gsap.set([headLine1Ref.current, headLine2Ref.current], {
        opacity: 0,
        y: 36,
      })

      gsap.set(paragraphRef.current, { opacity: 0, y: 16 })
      if (accentLineRef.current) gsap.set(accentLineRef.current, { scaleX: 0, transformOrigin: 'left center' })

      const links = linksRef.current ? Array.from(linksRef.current.children) : []
      gsap.set(links, { opacity: 0, y: 20 })
      gsap.set(footerRef.current, { opacity: 0, y: 12 })

      // ── Entrance timeline (crisp, responsive, no long wait) ───────────────
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

      // 2. Heading line 1 slides up from mask
      .to(headLine1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.55,
      }, '-=0.2')

      // 3. Heading line 2 slides up shortly after
      .to(headLine2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.55,
      }, '-=0.4')

      // 4. Accent line draws
      .to(accentLineRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.inOut',
      }, '-=0.3')

      // 5. Paragraph fades in
      .to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.45 }, '-=0.35')

      // 6. Social links stagger up quickly
      .to(links, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power2.out',
      }, '-=0.25')

      // 7. Footer fades in
      .to(footerRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')

      // ── Link hover interactions via GSAP ──────────────────────────────────
      const linkEls = links as HTMLElement[]
      linkEls.forEach((link) => {
        const icon = link.querySelector<HTMLElement>('[data-link-icon]')
        const arrow = link.querySelector<HTMLElement>('[data-link-arrow]')

        const onEnter = () => {
          gsap.to(link, { y: -3, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
          if (icon) gsap.to(icon, { scale: 1.1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
          if (arrow) gsap.to(arrow, { x: 2, y: -2, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
        }
        const onLeave = () => {
          gsap.to(link, { y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
          if (icon) gsap.to(icon, { scale: 1, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
          if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
        }

        link.addEventListener('mouseenter', onEnter)
        link.addEventListener('mouseleave', onLeave)
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Contact and Collaboration"
      className="relative z-10 w-full bg-[#000000] px-6 pt-28 pb-12 sm:px-12 lg:px-24 border-t border-white/5 scroll-mt-24 overflow-hidden"
    >
      {/* Restrained scarlet ambient glow */}
      <div className="pointer-events-none absolute right-10 bottom-24 h-[400px] w-[400px] rounded-full bg-[#FF2020]/[0.05] blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Marker */}
        <div ref={markerRef} style={{ willChange: 'transform, opacity' }}>
          <SectionMarker number="04" className="mb-10 sm:mb-12" />
        </div>

        {/* Heading — line by line masked reveals */}
        <div className="max-w-4xl mb-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F2F2F2] uppercase leading-[1.05]">
            <div className="overflow-hidden">
              <span
                ref={headLine1Ref}
                className="block"
                style={{ willChange: 'transform, opacity' }}
              >
                HAVE AN IDEA?
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                ref={headLine2Ref}
                className="block text-white/40"
                style={{ willChange: 'transform, opacity' }}
              >
                LET&apos;S MAKE IT REAL.
              </span>
            </div>
          </h2>

          {/* Thin red accent line */}
          <div
            ref={accentLineRef}
            className="h-px w-20 bg-[#FF2020] mt-6"
            style={{ willChange: 'transform' }}
          />

          <p
            ref={paragraphRef}
            className="mt-6 text-base sm:text-lg text-white/70 font-light max-w-2xl leading-relaxed"
            style={{ willChange: 'transform, opacity' }}
          >
            Have a project in mind, want to collaborate, or just want to talk about creative technology? Find me through the links below.
          </p>
        </div>

        {/* Social & Contact Links */}
        <div
          ref={linksRef}
          className="my-14 flex flex-wrap items-center gap-4 sm:gap-6"
        >
          {/* Email */}
          <a
            href={`mailto:${contact.email}`}
            aria-label="Send email to Jai Avivesh"
            className="group flex items-center gap-3.5 px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] text-white/90 hover:text-white hover:border-[#FF2020]/60 hover:bg-[#FF2020]/10 hover:shadow-lg hover:shadow-[#FF2020]/10 transition-colors duration-300"
            style={{ willChange: 'transform, opacity' }}
          >
            <div
              data-link-icon
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#FF2020] group-hover:border-[#FF2020] transition-colors"
              style={{ willChange: 'transform' }}
            >
              <Mail className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">EMAIL</span>
              <span className="text-sm font-mono font-medium">{contact.email}</span>
            </div>
            <span data-link-arrow className="inline-flex">
              <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-[#FF2020] transition-colors ml-1" />
            </span>
          </a>

          {/* GitHub */}
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Jai Avivesh's GitHub profile"
            className="group flex items-center gap-3.5 px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] text-white/90 hover:text-white hover:border-[#FF2020]/60 hover:bg-[#FF2020]/10 hover:shadow-lg hover:shadow-[#FF2020]/10 transition-colors duration-300"
            style={{ willChange: 'transform, opacity' }}
          >
            <div
              data-link-icon
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#FF2020] group-hover:border-[#FF2020] transition-colors"
              style={{ willChange: 'transform' }}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">GITHUB</span>
              <span className="text-sm font-mono font-medium">github.com/Mysticjai</span>
            </div>
            <span data-link-arrow className="inline-flex">
              <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-[#FF2020] transition-colors ml-1" />
            </span>
          </a>

          {/* Instagram */}
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Jai Avivesh's Instagram profile"
            className="group flex items-center gap-3.5 px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] text-white/90 hover:text-white hover:border-[#FF2020]/60 hover:bg-[#FF2020]/10 hover:shadow-lg hover:shadow-[#FF2020]/10 transition-colors duration-300"
            style={{ willChange: 'transform, opacity' }}
          >
            <div
              data-link-icon
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#FF2020] group-hover:border-[#FF2020] transition-colors"
              style={{ willChange: 'transform' }}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">INSTAGRAM</span>
              <span className="text-sm font-mono font-medium">@mystic_jai</span>
            </div>
            <span data-link-arrow className="inline-flex">
              <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-[#FF2020] transition-colors ml-1" />
            </span>
          </a>
        </div>

        {/* Minimal Footer */}
        <footer
          ref={footerRef}
          className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-white/40"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">{name}</span>
            <span>&bull;</span>
            <span>&copy; 2026. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#intro" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#works" className="hover:text-white transition-colors">Works</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-[11px] text-white/30">
            Digital Laboratory &bull; Scarlet &amp; Deep Black
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Contact
