import { useLenis } from './hooks/useLenis'
import GlowCursor from './components/GlowCursor'
import Navbar from './components/Navbar'
import { CinematicHero } from './sections/CinematicHero'
import About from './sections/About'
import Skills from './sections/Skills'
import SelectedWorks from './sections/SelectedWorks'
import Contact from './sections/Contact'

export default function App() {
  // Synchronized Lenis smooth scroll engine
  useLenis()

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-[#F2F2F2] selection:bg-[#FF2020] selection:text-white">
      {/* Global Fluid WebGL2 Glow Cursor in Scarlet Red */}
      <GlowCursor
        color="#FF2020"
        secondaryColor="#800A0A"
        intensity={1.2}
        trailWidth={2.8}
        glow={1.1}
        className="glow-cursor--fixed"
      />

      {/* Floating Navigation Pill */}
      <Navbar />

      {/* Sequential Narrative Sections (Home -> About -> Skills -> Works -> Contact) */}
      <main className="w-full flex flex-col">
        {/* 1. Cinematic Full-Motion Portrait Intro & Climax Name Reveal */}
        <CinematicHero />

        {/* 2. Editorial About Section (Integrated Large Portrait) */}
        <About />

        {/* 3. Skills (Clean & Compact) */}
        <Skills />

        {/* 4. Works / Projects */}
        <SelectedWorks />

        {/* 5. Contact (Clean Social Links) */}
        <Contact />
      </main>
    </div>
  )
}
