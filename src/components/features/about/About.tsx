import { AboutHero } from "./AboutHero";
import { MissionSection } from "./MissionSection";
import { TeamMember } from "./TeamMember";

export function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AboutHero
        title="About Our Company"
        description="Building amazing products with cutting-edge technology"
      />

      <MissionSection
        title="Our Mission & Values"
        mission="To deliver exceptional solutions that empower businesses and individuals to achieve their goals through innovative technology."
        vision="A world where technology seamlessly enhances every aspect of life, making it more efficient, connected, and meaningful."
        values={[
          "Innovation and Excellence",
          "Customer-Centric Approach",
          "Integrity and Transparency",
          "Collaboration and Teamwork",
          "Continuous Learning",
        ]}
      />

      <section className="py-12">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
          Meet Our Team
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TeamMember
            name="John Doe"
            role="CEO & Founder"
            bio="Passionate about building products that make a difference. 10+ years in tech leadership."
          />
          <TeamMember
            name="Jane Smith"
            role="CTO"
            bio="Full-stack architect with expertise in scalable systems and modern web technologies."
          />
          <TeamMember
            name="Mike Johnson"
            role="Lead Designer"
            bio="Creating beautiful, user-centered designs that deliver exceptional experiences."
          />
        </div>
      </section>
    </div>
  );
}
