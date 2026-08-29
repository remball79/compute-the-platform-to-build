import { ContactForm } from "@/components/contact/contact-form";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";

export const metadata = {
  title: "Contact — COMPUTE",
  description: "Talk to the COMPUTE team about autonomous AI agents for distributed computing.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <section className="relative border-b border-foreground/10 px-6 pb-24 pt-36 lg:px-12 lg:pb-32 lg:pt-48">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div>
              <p className="mb-8 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">Get in touch</p>
              <h1 className="max-w-xl text-balance font-display text-6xl leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
                Let&apos;s build what&apos;s next.
              </h1>
              <p className="mt-8 max-w-md text-pretty text-base leading-7 text-muted-foreground">
                Have a complex workflow in mind? Tell us what you&apos;re trying to solve and we&apos;ll connect you with the right person.
              </p>

              <div className="mt-16 space-y-8 border-t border-foreground/10 pt-8">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">General inquiries</p>
                  <a className="text-lg text-foreground transition-colors hover:text-muted-foreground" href="mailto:hello@compute.ai">hello@compute.ai</a>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">For developers</p>
                  <a className="text-lg text-foreground transition-colors hover:text-muted-foreground" href="mailto:build@compute.ai">build@compute.ai</a>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
