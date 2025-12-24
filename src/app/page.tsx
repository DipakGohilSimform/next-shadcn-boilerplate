import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <main className="flex flex-col items-center gap-8 text-center">
        <Image
          src="/images/next.png"
          alt="Next.js + Shadcn Logo"
          width={150}
          height={150}
        />
        <h1 className="text-4xl font-bold text-black">
          Next.js + Shadcn Boilerplate
        </h1>
        <p className="max-w-2xl text-black/90">
          A modern Next.js boilerplate with shadcn/ui components, TypeScript,
          and Tailwind CSS.
        </p>
      </main>
    </div>
  );
}
