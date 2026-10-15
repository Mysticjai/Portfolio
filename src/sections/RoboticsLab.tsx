import { Cpu, Bot, Activity } from 'lucide-react'
import BackgroundPaths from '../components/kokonutui/background-paths'

export const RoboticsLab = () => {
  return (
    <section
      id="lab"
      aria-label="The Lab - Robotics and Creative Technology"
      className="relative z-10 w-full overflow-hidden bg-[#050608] border-t border-white/10 scroll-mt-28"
    >
      <BackgroundPaths
        className="w-full min-h-[640px] sm:min-h-[720px] bg-[#050608] text-[#FF2020] py-28 sm:py-36 px-6 sm:px-12 lg:px-24 flex flex-col justify-center items-center"
        count={32}
        spread={0.5}
        angle={-12}
        speed={0.4}
        interactive={true}
      >
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-8 pointer-events-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#FF2020] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF2020] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF2020]" />
            </span>
            <span>04 // THE LAB &bull; PHYSICAL COMPUTING</span>
          </div>

          {/* Dominant Main Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] max-w-3xl">
            CURIOUS ABOUT WHAT HAPPENS WHEN SOFTWARE MEETS THE PHYSICAL WORLD.
          </h2>

          {/* Short Narrative Paragraph (Interest & Exploration, not claiming finished commercial robotics) */}
          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl">
            Fascinated by the intersection of algorithmic intelligence, real-time telemetry, and physical actuators. My focus is on exploring how machine learning and sensory logic can drive responsive kinematics and autonomous machines.
          </p>

          {/* Status Sub-Block */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 text-xs font-mono">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 border border-white/10 text-white/80 backdrop-blur-md">
              <Bot className="h-4 w-4 text-[#FF2020]" />
              <span>KINEMATICS & SENSORY LOGIC</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 border border-white/10 text-white/80 backdrop-blur-md">
              <Cpu className="h-4 w-4 text-[#FF2020]" />
              <span>EMBEDDED INTELLIGENCE</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 border border-white/10 text-white/80 backdrop-blur-md">
              <Activity className="h-4 w-4 text-[#FF2020]" />
              <span>R&D STAGE &bull; COMING SOON</span>
            </div>
          </div>
        </div>
      </BackgroundPaths>
    </section>
  )
}

export default RoboticsLab
