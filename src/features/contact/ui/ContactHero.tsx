import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContactHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function ContactHero({
  title = "Get in Touch",
  description = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  className,
  ...props
}: ContactHeroProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className
      )}
      {...props}
    >
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
        {description}
      </p>
    </section>
  );
}
