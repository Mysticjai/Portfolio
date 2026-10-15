# Jai Avivesh — Personal Portfolio

Foundational project setup for Jai Avivesh's personal portfolio website.

## Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation & Scrolling:** [GSAP](https://gsap.com/) & [Lenis](https://lenis.darkroom.engineering/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Folder Structure

```text
├── public/
│   ├── frames/          # Extracted cinematic video sequence frames
│   ├── images/          # Static image assets
│   └── fonts/           # Custom font files
├── src/
│   ├── assets/          # Static source assets
│   ├── components/      # Reusable UI components
│   ├── sections/        # Page sections (e.g., Hero)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Shared utilities & animation helpers
│   │   └── animations.ts
│   ├── styles/          # Global styles & Tailwind entry
│   │   └── globals.css
│   ├── App.tsx          # Root application component
│   └── main.tsx         # Application entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```
