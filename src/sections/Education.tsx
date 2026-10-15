import { PORTFOLIO_DATA } from '../data/portfolioData'
import { GraduationCap, MapPin, Calendar } from 'lucide-react'

export const Education = () => {
  const { education } = PORTFOLIO_DATA

  return (
    <section
      id="education"
      aria-label="Academic Education"
      className="relative z-10 w-full bg-[#080808] px-6 py-24 sm:px-12 lg:px-24 border-t border-white/10 scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-[2px] w-8 bg-[#FF2020]" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF2020]">
            06 // ACADEMIC FOUNDATION
          </span>
        </div>

        {/* Typographic Timeline Entry (Clean editorial structure, no giant decorative card) */}
        <div className="max-w-4xl py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF2020] block mb-2">
                Undergraduate Programme
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                {education.degree} &mdash; {education.branch}
              </h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/80">
              <Calendar className="h-3.5 w-3.5 text-[#FF2020]" />
              <span>{education.year}</span>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-sm font-mono text-white/60">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="h-4 w-4 text-[#FF2020]" />
              <span className="text-base text-white font-medium">{education.institution}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-[#FF2020]" />
              <span>{education.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
