# Copilot Instructions

## 📋 PROJECT OVERVIEW

**Purpose**: Next.js 16 boilerplate with shadcn/ui, featuring a feature-based architecture where pages are thin wrappers around feature modules.

\*\*CriticaArchitecture Rules

1. **Feature-First Pages** (CRITICAL)

   ```tsx
   // ✅ CORRECT - app/contact/page.tsx
   import { Contact } from "@/components/features/contact";
   export default function ContactPage() {
     return <Contact />;
   }

   // ❌ WRONG - Never put logic directly in pages
   export default function ContactPage() {
     return (
       <div>
         <ContactForm />
         ...
       </div>
     ); // NO!
   }
   ```

2. **Component Organization**
   - `src/components/ui/` - shadcn/ui components ONLY (installed via `npx shadcn@latest add`)
   - `src/components/shared/` - Reusable cross-feature components (rare, usually use feature modules)
   - `src/components/features/{name}/` - Feature components (main container + subcomponents)
   - Feature-specific hooks can be placed in `src/hooks/`
   - Each feature exports a main component (e.g., `About`, `Contact`) containing all page logic

3. **TypeScript Strictness**
   - Never use `any` types - strict mode enabled
   - Export interfaces for all component props
   - Path aliases: `@/*` resolves to `src/*`

4. **Styling Rules**
   - Use semantic tokens ONLY: `bg-background`, `text-foreground`, `border-border`
   - Never hardcode colors: ❌ `bg-white`, ❌ `text-black`, ❌ `bg-[#fff]`
   - All tokens defined in `src/styles/global.css` with Tailwind v4 `@theme inline`
   - Use `cn()` from `@/lib/utils` for conditional classes

5. **Commands** (npm only - no yarn/pnpm/bun)
   - Dev: `npm run dev` (Turbopack-powered)
   - Build: `npm run build` (Turbopack)
   - Validate: `npm run type-check && npm run format && eck: `npm run type-check`
   - Format: `npm run format`
   - Lint: `npm run lint:fix`

**Key Points**:

- Feature folder = `src/components/features/{name}/` containing all feature components
- Main component holds all composition logic (layout, data, state)
- Subcomponents are implementation details (Hero, Form, Card sections, etc.)
- Pages only import and render the main feature component
- See `src/components/features/about/` and `src/components/features/contact/` as reference implementations

---

## 🎨 TAILWIND CSS V4 (CSS-FIRST)

**CRITICAL**: No `tailwind.config.ts` - configuration lives in CSS:

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* ... design tokens */
  --radius: 0.5rem;
}
```

**Usage Pattern**:

```tsx
// ✅ CORRECT - Semantic tokens
<div className="bg-background text-foreground border-border">
<Button className="bg-primary hover:bg-primary/90">

// ❌ WRONG - Hardcoded values
<div className="bg-white text-black border-gray-200">
<div className="bg-[#ffffff]">
```

**Dark Mode**: Automatic via CSS `prefers-color-scheme` (no JS needed)

---

## 🧩 SHADCN/UI COMPONENT PATTERN

**Reference: `src/components/ui/button.tsx`** (canonical example):

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "base-classes",
  { variants: { variant: {...}, size: {...} } }
);

export interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

export { Button, buttonVariants };
```

**Key Elements**:

- CVA for variants → `class-variance-authority`
- Export component + variants (for composition)
- `React.forwardRef` for ref access
- `asChild` prop via `@radix-ui/react-slot`
- `cn()` for className merging

---

## 📝 FORM STANDARDS (CRITICAL)

**ALWAYS use shadcn/ui Field components for ALL forms in the project:**

### Basic Form Layout (See: `src/components/features/contact/ContactForm.tsx`)

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            {/* Grid layout for responsive multi-column fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="firstName">First Name *</FieldLabel>
                <Input id="firstName" placeholder="John" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="lastName">Last Name *</FieldLabel>
                <Input id="lastName" placeholder="Doe" required />
              </Field>
            </div>

            {/* Full-width fields */}
            <Field>
              <FieldLabel htmlFor="email">Email *</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="message">Message *</FieldLabel>
              <Textarea
                id="message"
                placeholder="Your message..."
                className="min-h-[120px] resize-none"
                required
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        {/* Horizontal button layout */}
        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
```

### Advanced Form with Sections (Optional Components)

```tsx
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";

export function AdvancedForm() {
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Personal Information</FieldLegend>
          <FieldDescription>
            Please provide your contact details
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name *</FieldLabel>
              <Input id="name" required />
              <FieldDescription>Your full legal name</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Additional Details</FieldLegend>
          <FieldGroup>{/* More fields... */}</FieldGroup>
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
```

**Form Component Structure:**

1. **FieldGroup** - Main container for grouping related fields (required)
2. **FieldSet** - Groups related fields within a section (required)
3. **Field** - Individual field container (required)
4. **FieldLabel** - Label for form inputs, connected via htmlFor/id (required)
5. **FieldLegend** - Section title, like `<legend>` (optional, for complex forms)
6. **FieldDescription** - Helper text for sections or fields (optional)
7. **FieldSeparator** - Visual separator between field groups (optional)

**Form Layout Patterns:**

```tsx
{
  /* Multi-column responsive layout */
}
<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
  <Field>
    <FieldLabel htmlFor="field1">Field 1 *</FieldLabel>
    <Input id="field1" required />
  </Field>
  <Field>
    <FieldLabel htmlFor="field2">Field 2 *</FieldLabel>
    <Input id="field2" required />
  </Field>
</div>;

{
  /* Full-width field */
}
<Field>
  <FieldLabel htmlFor="field3">Field 3 *</FieldLabel>
  <Input id="field3" required />
</Field>;

{
  /* Textarea with custom height */
}
<Field>
  <FieldLabel htmlFor="message">Message *</FieldLabel>
  <Textarea id="message" className="min-h-[120px] resize-none" required />
</Field>;

{
  /* Horizontal button group */
}
<Field orientation="horizontal">
  <Button type="submit">Submit</Button>
  <Button variant="outline" type="button">
    Cancel
  </Button>
</Field>;
```

Wrap all fields in `FieldGroup` → `FieldSet` → `FieldGroup` structure

- ✅ Mark required fields with asterisk in label text: "Name \*"
- ✅ Use grid layout for multi-column responsive forms: `grid grid-cols-1 gap-6 md:grid-cols-2`
- ✅ Use `orientation="horizontal"` for button groups
- ✅ Set `min-h-[120px] resize-none` on Textarea components
- ✅ Add `FieldLegend` and `FieldSeparator` for complex multi-section forms
- ✅ Use `FieldDescription` for inline help text below fields
- ❌ Never use plain `<div>` wrappers with custom spacing classes
- ❌ Never import `Label` directly - always use `FieldLabel` from field components
- ❌ Never create custom field wrapper components in `shared/`
- ❌ Never use `space-y-*` classes - field components handle spacing
- ✅ Use `orientation="horizontal"` for button groups
- ❌ Never use plain `<div>` wrappers with custom spacing
- ❌ Never import `Label` directly - use `FieldLabel` from field components
- ❌ Never create custom field wrapper components in `shared/`

---

## 📦 EXPORT PATTERNS

### Barrel Exports (CRITICAL: Alphabetical Order)

```tsx
// src/components/ui/index.ts (ACTUAL FILE)
export { Button, buttonVariants } from "./button";
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
export { Input } from "./input";
export { Label } from "./label";
```

**Rules:**

- ✅ Always alphabetical by primary export name
- ✅ Include all exports from the file (component + variants)
- ✅ One export statement per file
- ❌ Never add at random position

---

## 🔧 UTILITY FUNCTIONS

### The `cn()` Helper

```tsx
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage:**

```tsx
<div
  className={cn(
    "base-classes",
    condition && "conditional-classes",
    variant === "primary" && "primary-classes",
    className // Allow prop overrides
  )}
/>
```

---

## 🎨 CREATING ICONS

**Location**: `src/components/shared/icons/`

### Icon Component Pattern (Reference: `IconArrowLeft.tsx`)

```tsx
import type { SVGProps } from "react";

export function IconArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.97508 4.94165L2.91675 9.99998L7.97508 15.0583

### Creating Icons

1. Create file: `src/components/shared/icons/IconName.tsx`
2. Use SVGProps<SVGSVGElement> for type safety
3. Set width/height to "1em" and use "currentColor"
4. Export in `src/components/shared/icons/index.ts` using `export * from`"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0833 10H3.05835"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

**Icon Rules**:

- ✅ Use `SVGProps<SVGSVGElement>` for type safety
- ✅ Set `width="1em"` and `height="1em"` to scale with font size
- ✅ Use `currentColor` for `stroke` or `fill` to inherit text color
- ✅ Spread props with `{...props}` for className and other overrides
- ✅ Name icons with `Icon` prefix: `IconArrowLeft`, `IconSearch`, etc.
- ✅ Export in `src/components/shared/icons/index.ts` using `export * from`

**Icon Export Pattern**:

```tsx
// src/components/shared/icons/index.ts
export * from "./IconArrowLeft";
export * from "./IconSearch";
export * from "./IconUser";
```

**Usage**:

```tsx
import { IconArrowLeft } from "@/components/shared/icons";

<IconArrowLeft className="text-primary" />
<IconArrowLeft className="h-6 w-6" /> {/* Override size */}
```

---

## 🚀 DEVELOPMENT WORKFLOW

### Adding shadcn/ui Components

```bash
# Components install to src/components/ui/ automatically
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add field      # For form layouts
npx shadcn@latest add textarea   # For multi-line text inputs

# Update barrel export in src/components/ui/index.ts (alphabetically)
```

### Creating Shared Components

1. Create file: `src/components/shared/SearchBox.tsx`
2. Import from ui: `import { Button } from '@/components/ui/button'`
3. Export interface and component
4. Add to `src/components/shared/index.ts` (alphabetically)

### Creating Feature Components

1. Create feature folder: `src/components/features/{feature-name}/`
2. Create component: `src/components/features/{feature-name}/ComponentName.tsx`
3. Import from ui: `import { Button } from '@/components/ui/button'`
4. Export in `src/components/features/{feature-name}/index.ts` (alphabetically)

### Pre-commit Validation

```bash
npm run format        # Auto-format with Prettier
npm run lint:fix      # Fix ESLint issues
npm run type-check    # Validate TypeScript (strict mode)
npm run build         # Ensure production build works
```

---

## ✅ PRE-COMMIT CHECKLIST

Before completing any task, verify:

- [ ] All colors use CSS variables (no hardcoded values)
- [ ] Component exports are alphabetically ordered
- [ ] TypeScript types are properly defined
- [ ] `cn()` utility is used for className merging
- [ ] Component follows established patterns
- [ ] All interactive states are implemented
- [ ] No console errors or TypeScript warnings
- [ ] Barrel exports updated in `index.ts`

---

## 🚫 COMMON MISTAKES TO AVOID

1. **❌ Hardcoding Colors**

   ```tsx
   <div className="bg-blue-500">  // WRONG
   <div className="bg-primary">   // CORRECT
   ```

2. **❌ Wrong Component Location**

   ```tsx
   // WRONG: Creating src/components/atoms/
   // CORRECT: Use src/components/ui/

   // WRONG: Creating custom components in ui/
   // CORRECT: Use src/components/shared/ for reusable components

   // WRONG: Creating shared components in features/
   // CORRECT: Use src/components/features/{name}/ for feature-specific components only
   ```

3. **❌ Random Export Order**

   ```tsx
   export { Input } from "./input";
   export { Button } from "./button"; // WRONG (not alphabetical)
   ```

4. **❌ Missing TypeScript Types**

   ```tsx
   function Component({ data }) {  // WRONG
   function Component({ data }: { data: DataType }) {  // CORRECT
   ```

5. **❌ Not Using cn() Utility**
   ```tsx
   className={`base ${condition ? 'extra' : ''}`}  // WRONG
   className={cn("base", condition && "extra")}    // CORRECT
   ```

---

## 📚 Rcomponents/shared/icons/IconArrowLeft.tsx` - SVG icon component pattern

- `src/EFERENCE EXAMPLES

### Gold Standard Components

- `src/components/ui/button.tsx` - Variant system with CVA
- `src/components/ui/card.tsx` - Composite component pattern
- `src/components/ui/field.tsx` - Form field components (ALWAYS use for forms)
- `src/components/features/contact/ContactForm.tsx` - Complete form implementation example
- `src/lib/utils.ts` - Utility function patterns

### Adding New Components Checklist

1. Create component file in appropriate directory
   - shadcn components → `src/components/ui/`
   - Reusable shared components → `src/components/shared/`
   - Feature-specific components → `src/components/features/{name}/`
2. Follow naming convention (kebab-case for ui/, PascalCase for shared/features)
3. Implement with TypeScript types
4. Use `cn()` for className merging
5. Export in alphabetical order from `index.ts`
6. Test all variants and states
7. Document complex logic with comments

---

## 🔄 UPDATING THIS FILE

**When adding new instructions:**

1. Read entire file first
2. Identify appropriate section
3. Preserve ALL existing content
4. Add new guidance in context
5. Update examples if needed
6. Maintain formatting consistency

**Never:**

- Remove existing instructions
- Override established patterns
- Add conflicting guidance

---

## 📞 SUPPORT & RESOURCES

- **Next.js Docs**: https://nextjs.org/docs
- **Shadcn/UI**: https://ui.shadcn.com
- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **Setup Documentation**: `.github/next-setup.prompt.md`

---

_Last Updated: December 23, 2025_
