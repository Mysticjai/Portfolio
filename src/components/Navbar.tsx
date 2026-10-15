import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavItem {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#intro' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Works', href: '#works' },
  { label: 'Contact', href: '#contact' },
]

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    const windowWithLenis = window as unknown as { lenis?: { scrollTo: (target: number | Element | string, opts?: { offset?: number; duration?: number }) => void } }

    if (href === '#intro') {
      if (windowWithLenis.lenis) {
        windowWithLenis.lenis.scrollTo(0, { duration: 1.2 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    const element = document.querySelector(href)
    if (element) {
      if (windowWithLenis.lenis) {
        windowWithLenis.lenis.scrollTo(element, { offset: -30, duration: 1.2 })
      } else {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="fixed top-5 right-5 sm:right-8 z-50">
      {/* Desktop Navigation Pill */}
      <nav
        aria-label="Main Navigation"
        className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0c0d12]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 transition-all hover:border-white/20"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleScrollTo(e, item.href)}
            className="text-xs font-mono tracking-wider uppercase text-neutral-400 hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-white/5 active:text-[#FF2020]"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="w-10 h-10 rounded-full bg-[#0c0d12]/90 backdrop-blur-md border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          {mobileMenuOpen ? (
            <X className="w-4 h-4 text-[#FF2020]" />
          ) : (
            <Menu className="w-4 h-4 text-white" />
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-[#0c0d12]/95 backdrop-blur-2xl border border-white/10 p-2.5 shadow-2xl shadow-black/90 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/10 px-3.5 py-2.5 rounded-xl transition-colors duration-150 active:text-[#FF2020]"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
