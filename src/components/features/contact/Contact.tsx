import { ContactForm } from "./ContactForm";
import { ContactHero } from "./ContactHero";
import { ContactInfo } from "./ContactInfo";

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ContactHero
        title="Contact Us"
        description="Have a question or want to work together? We'd love to hear from you."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo
          items={[
            {
              label: "Email",
              value: "hello@company.com",
            },
            {
              label: "Phone",
              value: "+1 (555) 123-4567",
            },
            {
              label: "Office",
              value: "123 Business Ave, Suite 100\nSan Francisco, CA 94102",
            },
            {
              label: "Working Hours",
              value: "Monday - Friday: 9:00 AM - 6:00 PM PST",
            },
          ]}
        />
      </div>
    </div>
  );
}
