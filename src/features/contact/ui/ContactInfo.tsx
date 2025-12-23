import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ContactInfoItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface ContactInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: ContactInfoItem[];
}

const defaultItems: ContactInfoItem[] = [
  {
    label: "Email",
    value: "contact@example.com",
  },
  {
    label: "Phone",
    value: "+1 (555) 123-4567",
  },
  {
    label: "Address",
    value: "123 Main St, Suite 100, City, State 12345",
  },
];

export function ContactInfo({
  items = defaultItems,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {item.label}
            </p>
            <p className="text-base">{item.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
