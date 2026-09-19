"use client";

import { useEffect, useRef, useState } from "react";

type Solution = {
  title: string;
  description: string;
  image: string;
};

const solutions: Solution[] = [
  {
    title: "Microsoft 365",
    description:
      "We deploy and integrate Microsoft 365 so teams collaborate securely inside the tools they already use.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2813%29-OQ2DiR3ElVsUg8kTvTL1kC5A3Q6maM.png",
  },
  {
    title: "Odoo",
    description:
      "We implement and tailor Odoo to unify finance, inventory, sales, and operations in one flexible ERP.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png",
  },
  {
    title: "Alumio",
    description:
      "We connect your systems with Alumio, orchestrating APIs and data flows without point-to-point code.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2812%29-ng3RrNnsPMJ5CrtOjcPTmhHg01W11q.png",
  },
  {
    title: "Google Cloud Platform",
    description:
      "We architect and run workloads on Google Cloud, from data and AI pipelines to scalable infrastructure.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png",
  },
  {
    title: "VTEX",
    description:
      "We build and extend VTEX storefronts and integrations that scale from launch to enterprise operations.",
    image: "/images/bridge.png",
  },
];

function AccordionItem({
  solution,
  index,
  isActive,
  onSelect,
}: {
  solution: Solution;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const panelId = `solution-panel-${index}`;
  const headerId = `solution-header-${index}`;

  return (
    <div className={`border-t border-foreground/10 ${index === solutions.length - 1 ? "border-b" : ""}`}>
      <button
        id={headerId}
        type="button"
        onClick={onSelect}
        aria-expanded={isActive}
        aria-controls={panelId}
        className="w-full flex items-center gap-5 py-7 text-left group"
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
          {solution.title}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
            isActive ? "border-[#3157D5] text-[#3157D5]" : "border-foreground/20 text-foreground/40 group-hover:text-white"
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.2" />
            <line
              x1="6" y1="0" x2="6" y2="12"
              stroke="currentColor"
              strokeWidth="1.2"
              className={`origin-center transition-transform duration-300 ${isActive ? "scale-y-0" : "scale-y-100"}`}
            />
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
            className={`pb-6 pr-2 lg:pr-8 transition-opacity duration-300 ${isActive ? "opacity-100 delay-150" : "opacity-0"}`}
          >
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg lg:line-clamp-2">
              {solution.description}
            </p>

            {/* Image follows the active item on mobile/tablet, directly under its content */}
            <div className="lg:hidden mt-8 relative aspect-square w-full max-w-sm border border-foreground/10 bg-foreground/[0.02] p-6">
              <img
                src={solution.image || "/placeholder.svg"}
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

export function SolutionsSectionAccordion() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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
      id="solutions"
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
                Solutions
              </span>
              <h2
                className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Platforms
                <br />
                <span className="text-muted-foreground">we deliver</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p
                className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                We implement, integrate, and evolve the leading platforms behind modern operations, commerce, and cloud.
              </p>
            </div>
          </div>
        </div>

        {/* Two-column layout: accordion + fixed square visual */}
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 lg:items-stretch transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Left: accordion */}
          <div>
            {solutions.map((solution, index) => (
              <AccordionItem
                key={solution.title}
                solution={solution}
                index={index}
                isActive={activeIndex === index}
                onSelect={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Right: fixed square visual container, desktop only — image crossfades with active item */}
          <div className="hidden lg:block">
            <div className="relative h-full w-full border border-foreground/10 bg-foreground/[0.02] overflow-hidden">
              {solutions.map((solution, index) => (
                <img
                  key={solution.title}
                  src={solution.image || "/placeholder.svg"}
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
