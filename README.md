# Next.js + Shadcn Boilerplate

A modern, production-ready Next.js boilerplate with shadcn/ui components, TypeScript, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Features

- ⚡ Next.js 15+ with App Router & Turbopack
- 🎨 Tailwind CSS v4 with design tokens
- 📦 shadcn/ui component library
- 🔷 TypeScript with strict mode
- 🧩 Atomic Design architecture
- 🎯 ESLint + Prettier + Husky
- 🌙 Dark mode ready

## Documentation

See [`.github/setup.md`](.github/setup.md) for comprehensive documentation.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linter
- `npm run format` - Format code
- `npm run type-check` - Check types

## Project Structure

```
src/
├── app/              # Next.js pages
├── components/       # React components
│   ├── atoms/       # shadcn/ui components
│   ├── molecules/   # Simple combinations
│   ├── organisms/   # Complex components
│   └── templates/   # Page layouts
├── hooks/           # Custom hooks
├── lib/             # Utilities
├── styles/          # Global styles
└── types/           # TypeScript types
```

## License

MIT
