"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discover",
    subtitle: "your requirements",
    description: "We map your systems, workflows, and business goals to define exactly what needs to be built.",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "the architecture",
    description: "We architect the solution — data model, integrations, and user experience — before a line of code ships.",
  },
  {
    number: "03",
    title: "Build",
    subtitle: "& integrate",
    description: "We engineer and integrate: web, mobile, AI agents, and the platforms that connect them.",
  },
  {
    number: "04",
    title: "Launch",
    subtitle: "& hand off",
    description: "We deploy, test, and hand off with documentation your team can actually use.",
  },
  {
    number: "05",
    title: "Scale",
    subtitle: "& support",
    description: "We monitor, iterate, and extend the system as your business grows.",
  },
];

function useInView<T extends Element>(threshold: number) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

export function HowItWorksSection() {
  const [sectionRef, sectionVisible] = useInView<HTMLElement>(0.1);
  const [timelineRef, timelineVisible] = useInView<HTMLOListElement>(0.3);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <div className={`transition-all duration-1000 ${sectionVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-8">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3157D5]" />
              Process
            </span>
          </div>

          <h2 className={`text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] 2xl:text-[7.5rem] font-display tracking-tight leading-[0.85] transition-all duration-1000 delay-100 ${
            sectionVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}>
            <span className="block lg:inline">Define.</span>{" "}
            <span className="block lg:inline text-white/30">Deploy.</span>{" "}
            <span className="block lg:inline text-white/10">Scale.</span>
          </h2>
        </div>

        {/* Timeline — vertical stepper on mobile, five columns on desktop */}
        <ol ref={timelineRef} className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10 lg:hidden">
            <span
              className={`block h-full w-full origin-top bg-gradient-to-b from-[#3157D5] to-[#1FB7D8] transition-all duration-[1400ms] ease-out ${
                timelineVisible ? "scale-y-100" : "scale-y-0"
              }`}
            />
          </span>
          <span aria-hidden="true" className="absolute left-0 right-0 top-[5px] hidden h-px bg-white/10 lg:block">
            <span
              className={`block h-full w-full origin-left bg-gradient-to-r from-[#3157D5] to-[#1FB7D8] transition-all duration-[1400ms] ease-out ${
                timelineVisible ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </span>

          {steps.map((step, index) => (
            <li key={step.number} className="relative pl-9 lg:pl-0 lg:pt-12">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-3 h-[11px] w-[11px] rounded-full border border-[#3157D5] transition-all duration-500 lg:top-0 ${
                  timelineVisible ? "scale-100 bg-[#3157D5] opacity-100" : "scale-50 bg-[oklch(0.09_0.01_260)] opacity-0"
                }`}
                style={{ transitionDelay: `${index * 350}ms` }}
              />

              <div
                className={`transition-all duration-700 ${timelineVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: `${index * 150 + 200}ms` }}
              >
                <span className="mb-4 block font-display text-3xl text-[#3157D5] lg:mb-6 lg:text-4xl">{step.number}</span>
                <h3 className="mb-1 font-display text-2xl lg:text-3xl">{step.title}</h3>
                <span className="mb-4 block font-display text-lg text-white/50 lg:text-xl">{step.subtitle}</span>
                <p className="max-w-md leading-relaxed text-white/70 lg:max-w-none">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
