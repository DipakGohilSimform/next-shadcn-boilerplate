export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary-foreground p-8">
      <main className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-bold text-white">
          Next.js + Shadcn Boilerplate
        </h1>
        <p className="max-w-2xl text-white/90">
          A modern Next.js boilerplate with shadcn/ui components, TypeScript,
          and Tailwind CSS.
        </p>
      </main>
    </div>
  );
}
