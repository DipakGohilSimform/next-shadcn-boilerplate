import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MissionSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  mission?: string;
  vision?: string;
  values?: string[];
}

export function MissionSection({
  title = "Our Mission",
  mission,
  vision,
  values = [],
  className,
  ...props
}: MissionSectionProps) {
  return (
    <section className={cn("space-y-8 py-12", className)} {...props}>
      <h2 className="text-center text-3xl font-bold tracking-tight">{title}</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mission && (
          <Card>
            <CardHeader>
              <CardTitle>Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mission}</p>
            </CardContent>
          </Card>
        )}

        {vision && (
          <Card>
            <CardHeader>
              <CardTitle>Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{vision}</p>
            </CardContent>
          </Card>
        )}

        {values.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                {values.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
