"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

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

export function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoplayRef.current = setInterval(() => {
      api?.scrollNext();
    }, 6000);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveStep(api.selectedScrollSnap());
      startAutoplay();
    };
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [api, startAutoplay]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] text-white overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header — titre + image cerisier */}
        <div className="relative mb-0 lg:mb-0 grid lg:grid-cols-2 gap-4 lg:gap-12 items-end">
          {/* Titre colonne gauche */}
          <div className="overflow-hidden pb-0 lg:pb-32">
            <div className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-8">
                <span className="w-12 h-px bg-white/20" />
                Process
              </span>
            </div>

            <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.85] transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}>
              <span className="block">Define.</span>
              <span className="block text-white/30">Deploy.</span>
              <span className="block text-white/10">Scale.</span>
            </h2>
          </div>

          {/* Image cerisier — se colle en bas sur les blocs */}
          <div className={`relative h-[320px] lg:h-[640px] overflow-hidden transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tree-uAia6REvB137CQyHFCf0za3O6h2zKO.png"
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-full h-full object-contain object-bottom"
            />
            {/* Fade sur le bord gauche */}
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.09_0.01_260)] via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Steps carousel — 5 steps, 3 visible on desktop, 1 (with peek) on mobile */}
        <div className="mt-4">
          <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
            <CarouselContent className="-ml-4">
              {steps.map((step, index) => (
                <CarouselItem key={step.number} className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                  <button
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    className={`relative w-full h-full text-left p-8 lg:p-12 border-t border-l border-r transition-all duration-500 ${
                      activeStep === index
                        ? "bg-[#000000] border-t-white/60 border-l-white/60 border-r-white/60 border-b border-b-transparent"
                        : "bg-[#000000] border-b border-t-white/25 border-l-white/25 border-r-white/25 border-b-white/25 hover:border-t-[#203A84] hover:border-l-[#203A84] hover:border-r-[#203A84] hover:border-b-[#203A84]"
                    }`}
                  >
                    {/* Step number with animated line */}
                    <div className="flex items-center gap-4 mb-8">
                      <span className={`text-4xl font-display transition-colors duration-300 ${
                        activeStep === index ? "text-[#3157D5]" : "text-white/20"
                      }`}>
                        {step.number}
                      </span>
                      <div className="flex-1 h-px bg-white/10 overflow-hidden">
                        {activeStep === index && (
                          <div key={activeStep} className="h-full bg-[#3157D5]/50 animate-progress" />
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl lg:text-4xl font-display mb-2">
                      {step.title}
                    </h3>
                    <span className="text-xl text-white/40 font-display block mb-6">
                      {step.subtitle}
                    </span>

                    {/* Description */}
                    <p className={`text-white/60 leading-relaxed transition-opacity duration-300 ${
                      activeStep === index ? "opacity-100" : "opacity-60"
                    }`}>
                      {step.description}
                    </p>

                    {/* Active bottom accent — animated overlay, replaces the neutral border visually */}
                    <div className={`absolute -bottom-px left-0 right-0 h-1 bg-[#3157D5] transition-transform duration-500 origin-left z-[2] ${
                      activeStep === index ? "scale-x-100" : "scale-x-0"
                    }`} />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Controls: dots + prev/next */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to step ${index + 1}: ${step.title}`}
                  aria-current={activeStep === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeStep === index ? "w-6 bg-[#3157D5]" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                aria-label="Previous step"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-[#3157D5] transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M9 2L3 7L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                aria-label="Next step"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-[#3157D5] transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 2L11 7L5 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 6s linear forwards;
        }
      `}</style>
    </section>
  );
}
