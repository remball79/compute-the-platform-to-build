"use client";

import { useEffect, useRef, useState } from "react";

type Capability = {
  title: string;
  description: string;
  coreCapabilities: string[];
  image: string;
};

const capabilities: Capability[] = [
  {
    title: "AI & Autonomous Systems",
    description:
      "We embed intelligent agents and enterprise RAG into core workflows, automating decisions.",
    coreCapabilities: ["Autonomous Agents & Automation", "Enterprise Knowledge & RAG", "Multi-Agent Orchestration"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2813%29-OQ2DiR3ElVsUg8kTvTL1kC5A3Q6maM.png",
  },
  {
    title: "Data Intelligence & Integration",
    description:
      "We architect interoperability layers, composable APIs, and unified pipelines connecting your enterprise systems.",
    coreCapabilities: ["System Interoperability & Integration", "Data Pipelines & Synchronization", "Composable & Event-Driven APIs"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png",
  },
  {
    title: "Software & Commerce Engineering",
    description:
      "We engineer scalable web, mobile, and composable commerce platforms built around real business operations.",
    coreCapabilities: ["Web & Mobile Platforms", "Headless & Composable Commerce", "Enterprise Applications & Portals"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2812%29-ng3RrNnsPMJ5CrtOjcPTmhHg01W11q.png",
  },
];

function CorePill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 h-[32.4px] rounded-full border border-foreground/15 bg-foreground/[0.04] px-4 text-sm leading-none text-foreground/80 whitespace-nowrap">
      <span className="w-1 h-1 rounded-full bg-foreground/50 shrink-0" />
      {label}
    </span>
  );
}

function AccordionItem({
  capability,
  index,
  isActive,
  onSelect,
}: {
  capability: Capability;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const panelId = `capability-panel-${index}`;
  const headerId = `capability-header-${index}`;

  return (
    <div className={`border-t border-foreground/10 ${index === capabilities.length - 1 ? "border-b" : ""}`}>
      <button
        id={headerId}
        type="button"
        onClick={onSelect}
        aria-expanded={isActive}
        aria-controls={panelId}
        className="w-full flex items-center gap-5 py-6 lg:py-7 text-left group"
      >
        <span
          className={`font-mono text-sm transition-colors duration-300 ${
            isActive ? "text-[#3157D5]" : "text-muted-foreground"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`flex-1 text-2xl lg:text-3xl font-display transition-colors duration-300 ${
            isActive ? "text-foreground" : "text-foreground/50 group-hover:text-foreground/80"
          }`}
        >
          {capability.title}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isActive ? "border-[#3157D5] text-[#3157D5] rotate-45" : "border-foreground/20 text-foreground/40"
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
        style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            className={`pb-8 pr-2 lg:pr-8 transition-opacity duration-300 ${isActive ? "opacity-100 delay-150" : "opacity-0"}`}
          >
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 lg:line-clamp-2">
              {capability.description}
            </p>
            <span className="block text-sm text-muted-foreground font-mono mb-3">Core capabilities</span>
            <div className="flex flex-wrap gap-2.5">
              {capability.coreCapabilities.map((item) => (
                <CorePill key={item} label={item} />
              ))}
            </div>

            {/* Image follows the active item on mobile/tablet, directly under its content */}
            <div className="lg:hidden mt-8 relative aspect-square w-full max-w-sm border border-foreground/10 bg-foreground/[0.02] p-6">
              <img
                src={capability.image || "/placeholder.svg"}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain p-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSectionAccordion() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="relative mb-16 lg:mb-24">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                Capabilities
              </span>
              <h2
                className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                What we
                <br />
                <span className="text-muted-foreground">build</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p
                className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                From AI and data to commerce, enterprise platforms, and cloud infrastructure, we design, integrate, and evolve the systems that drive modern businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Two-column layout: accordion + fixed square visual */}
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Left: accordion */}
          <div>
            {capabilities.map((capability, index) => (
              <AccordionItem
                key={capability.title}
                capability={capability}
                index={index}
                isActive={activeIndex === index}
                onSelect={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Right: fixed square visual container, desktop only — image crossfades with active item */}
          <div className="hidden lg:block sticky top-32">
            <div className="relative aspect-square w-full border border-foreground/10 bg-foreground/[0.02] overflow-hidden">
              {capabilities.map((capability, index) => (
                <img
                  key={capability.title}
                  src={capability.image || "/placeholder.svg"}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 w-full h-full object-contain p-12 transition-opacity duration-700 ease-in-out ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
