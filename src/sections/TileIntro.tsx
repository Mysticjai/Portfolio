import { ChevronDown, Sparkles } from 'lucide-react'
import RollingImageGallery from '../components/RollingImageGallery'

export const TileIntro = () => {
  const handleScrollToHero = () => {
    const heroEl = document.querySelector('#identity')
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="intro-standalone"
      aria-label="Opening Tile Gallery Intro"
      className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#080808] text-[#F2F2F2] pt-8 pb-10 px-4 sm:px-8 border-b border-white/10 overflow-hidden"
    >
      {/* Top Meta Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono tracking-widest text-white/50 pt-2 pb-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF2020] animate-pulse" />
          <span className="text-[#F2F2F2]/80 uppercase">00 // ARCHIVE & VISUAL LAB</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-white/40">
          <Sparkles className="h-3 w-3 text-[#FF2020]" />
          <span>INTERACTIVE 3D TILE EXPERIENCE</span>
        </div>
        <div className="text-right text-[11px] text-white/40">
          SEC // 01 OF 08
        </div>
      </div>

      {/* Main Tile Visual Frame */}
      <div className="w-full max-w-7xl mx-auto my-auto py-4 flex flex-col items-center">
        <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/90">
          <RollingImageGallery
            altText="Jai Avivesh - Interactive Rolling Tile Gallery"
            ariaLabel="Interactive 3D visual archive and tile gallery"
            onScrollCueClick={handleScrollToHero}
          />
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
        <div className="text-left text-xs font-mono text-white/40">
          <span className="text-white/70 font-medium">JAI AVIVESH</span> &mdash; PORTFOLIO ENGINE
        </div>

        <button
          type="button"
          onClick={handleScrollToHero}
          className="group flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <span>Scroll to Enter Portrait Hero</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5 group-hover:border-[#FF2020] group-hover:text-[#FF2020] transition-colors">
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          </div>
        </button>

        <div className="hidden sm:block text-right text-xs font-mono text-white/40">
          [ VEO CINEMATICS NEXT &darr; ]
        </div>
      </div>
    </section>
  )
}

export default TileIntro
