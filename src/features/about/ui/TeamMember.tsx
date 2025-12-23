import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TeamMemberProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
}

export function TeamMember({
  name,
  role,
  bio,
  imageUrl,
  className,
  ...props
}: TeamMemberProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      {imageUrl && (
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardHeader>
      {bio && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{bio}</p>
        </CardContent>
      )}
    </Card>
  );
}
