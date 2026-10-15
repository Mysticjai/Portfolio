export const Hero = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#000000] px-6 text-center select-none">
      <div className="flex max-w-4xl flex-col items-center">
        {/* Subtle Accent Tag / Line */}
        <div className="mb-6 h-[2px] w-12 bg-[#FF2020] transition-all duration-300 sm:w-16" />

        {/* Name Header */}
        <h1 className="text-4xl font-extrabold tracking-tight text-[#F2F2F2] sm:text-6xl md:text-7xl lg:text-8xl">
          JAI AVIVESH
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-xs font-medium tracking-[0.2em] text-[#F2F2F2]/80 uppercase sm:mt-6 sm:text-sm md:text-base">
          AI/ML ENGINEER &middot; DEVELOPER &middot; CREATIVE TECHNOLOGIST
        </p>

        {/* Subtle decorative bottom accent */}
        <div className="mt-8 flex items-center space-x-2">
          <span className="h-1 w-1 rounded-full bg-[#FF2020]/40" />
          <span className="h-1 w-6 rounded-full bg-[#FF2020]" />
          <span className="h-1 w-1 rounded-full bg-[#FF2020]/40" />
        </div>
      </div>
    </section>
  )
}
