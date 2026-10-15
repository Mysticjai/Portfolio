import { PORTFOLIO_DATA } from '../data/portfolioData'
import { Trophy, Code, AlertCircle } from 'lucide-react'

export const Achievements = () => {
  const { creatorMilestone, achievements } = PORTFOLIO_DATA

  return (
    <section
      id="milestones"
      aria-label="Achievements and Creator Milestones"
      className="relative z-10 w-full bg-[#000000] px-6 py-28 sm:px-12 lg:px-24 border-t border-white/10 scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-[2px] w-8 bg-[#FF2020]" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2020]">
            05 // MILESTONES & BEYOND THE CODE
          </span>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="flex flex-col gap-3 mb-16 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F2F2F2]">
            LEADERSHIP, COMPETITIONS & REACH.
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Extracurricular achievements in strategic athletics, engineering hackathons, and digital audience creation.
          </p>
        </div>

        {/* Grid: 2 Achievement Cards + 1 Large Creator Milestone Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Compact Structured Achievement Timeline/Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {achievements.map((item, idx) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-white/10 bg-[#080808] p-8 transition-all duration-300 hover:border-[#FF2020]/40 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#FF2020]">
                    {idx === 0 ? <Trophy className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                    <span>{item.category}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/70">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#F2F2F2] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT: Creator Milestone Highlight Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#080808] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#FF2020]/50 transition-colors">
            {/* Background Red Glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#FF2020]/10 blur-3xl group-hover:bg-[#FF2020]/15 transition-all" />

            {/* Header with YouTube Icon */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF2020]">
                <svg className="h-4 w-4 fill-current text-[#FF2020]" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>{creatorMilestone.title}</span>
              </div>
              <span className="text-[10px] font-mono text-white/40">PAST MILESTONE</span>
            </div>

            {/* Oversized Metric Display */}
            <div className="my-8 flex flex-col gap-1 relative z-10">
              <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
                <span className="text-white">{creatorMilestone.metric}</span>
              </div>
              <span className="text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-[#FF2020] font-semibold">
                {creatorMilestone.label}
              </span>
              <span className="text-xs font-mono text-white/50 mt-1">
                {creatorMilestone.subLabel}
              </span>
            </div>

            {/* Disclosure Notice */}
            <div className="pt-6 border-t border-white/5 flex items-start gap-2.5 relative z-10">
              <AlertCircle className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
              <p className="text-[11px] font-mono text-white/40 leading-relaxed">
                {creatorMilestone.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Achievements
