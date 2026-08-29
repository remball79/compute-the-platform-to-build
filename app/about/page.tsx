import { ArrowUpRight, Cpu, Network, ShieldCheck } from "lucide-react";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";

export const metadata = {
  title: "About — COMPUTE",
  description: "Learn how COMPUTE is building the operating layer for autonomous AI agents.",
};

const principles = [
  {
    icon: Cpu,
    label: "Agents first",
    title: "Software that acts, not just answers.",
    copy: "We are building a new class of infrastructure for agents that can reason through complex work, make decisions, and keep moving.",
  },
  {
    icon: Network,
    label: "Distributed by design",
    title: "More capability, everywhere.",
    copy: "Our platform connects intelligence to the compute it needs, turning a fragmented world of resources into one responsive execution layer.",
  },
  {
    icon: ShieldCheck,
    label: "Trust is a feature",
    title: "Autonomy with accountability.",
    copy: "Every action is observable, permissioned, and designed to earn confidence from the teams putting agents into production.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      <section className="relative border-b border-foreground/10 px-6 pb-24 pt-36 lg:px-12 lg:pb-32 lg:pt-48">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-24">
            <div>
              <p className="mb-8 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">About COMPUTE</p>
              <h1 className="max-w-4xl text-balance font-display text-6xl leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
                The next interface to compute.
              </h1>
            </div>
            <div className="max-w-md lg:pb-2">
              <p className="text-pretty text-lg leading-8 text-muted-foreground">
                COMPUTE exists to make autonomous software useful in the real world. We give AI agents the infrastructure to take on meaningful work, with the clarity and control teams need to trust them.
              </p>
              <a href="#principles" className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:text-muted-foreground">
                What we believe <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="principles" className="border-b border-foreground/10 px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex flex-col gap-6 border-b border-foreground/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">Our principles</p>
              <h2 className="max-w-2xl text-balance font-display text-4xl tracking-tight text-foreground sm:text-5xl">Built for the work ahead.</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">A point of view on what intelligent infrastructure should make possible.</p>
          </div>

          <div className="grid gap-px overflow-hidden border border-foreground/10 bg-foreground/10 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <article key={principle.label} className="bg-background p-8 lg:p-10">
                  <Icon className="mb-16 h-6 w-6 text-foreground" strokeWidth={1.5} aria-hidden="true" />
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{principle.label}</p>
                  <h3 className="text-balance font-display text-2xl leading-tight text-foreground">{principle.title}</h3>
                  <p className="mt-5 text-sm leading-6 text-muted-foreground">{principle.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">Why now</p>
          <div>
            <p className="max-w-4xl text-balance font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              The most important work is still waiting for a better way to get done.
            </p>
            <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground">
              The world has no shortage of software or intelligence. What it lacks is a dependable bridge between the two. COMPUTE is that bridge: an operating layer where agents can coordinate, execute, and improve across the systems that matter.
            </p>
            <a href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background transition-opacity hover:opacity-80">
              Start a conversation <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
