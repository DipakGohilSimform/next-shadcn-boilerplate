import * as React from "react";
import { cn } from "@/lib/utils";

export interface AboutHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function AboutHero({
  title = "About Us",
  description = "Learn more about our mission and values",
  className,
  ...props
}: AboutHeroProps) {
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
