"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

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

export function SolutionsSectionAccordion() {
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
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
      setActiveIndex(api.selectedScrollSnap());
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

        {/* Solutions carousel — 2 visible on desktop, 1 (with peek) on mobile */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
            <CarouselContent className="-ml-4 lg:-ml-20">
              {solutions.map((solution, index) => (
                <CarouselItem key={solution.title} className="pl-4 lg:pl-20 basis-[85%] sm:basis-1/2">
                  <button
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    className={`relative block w-full aspect-[4/5] lg:aspect-[612/549] overflow-hidden text-left border bg-black transition-all duration-500 ${
                      activeIndex === index
                        ? "border-white/60"
                        : "border-white/25 hover:border-[#203A84]"
                    }`}
                  >
                    <img
                      src={solution.image || "/placeholder.svg"}
                      alt=""
                      aria-hidden="true"
                      className={`absolute inset-0 w-full h-full object-contain p-10 pb-40 transition-opacity duration-500 ${
                        activeIndex === index ? "opacity-100" : "opacity-60"
                      }`}
                    />

                    <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10 bg-gradient-to-t from-black via-black/85 to-transparent">
                      <div className="flex items-center gap-4 mb-4">
                        <span
                          className={`text-3xl font-display transition-colors duration-300 ${
                            activeIndex === index ? "text-[#3157D5]" : "text-white/20"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 h-px bg-white/10 overflow-hidden">
                          {activeIndex === index && (
                            <div key={activeIndex} className="h-full bg-[#3157D5]/50 animate-progress" />
                          )}
                        </div>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-display mb-2">{solution.title}</h3>
                      <p
                        className={`text-white/60 leading-relaxed transition-opacity duration-300 ${
                          activeIndex === index ? "opacity-100" : "opacity-60"
                        }`}
                      >
                        {solution.description}
                      </p>
                    </div>

                    <div
                      className={`absolute -bottom-px left-0 right-0 h-1 bg-[#3157D5] transition-transform duration-500 origin-left z-[2] ${
                        activeIndex === index ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Controls: dots + prev/next */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {solutions.map((solution, index) => (
                <button
                  key={solution.title}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to solution ${index + 1}: ${solution.title}`}
                  aria-current={activeIndex === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "w-6 bg-[#3157D5]" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                aria-label="Previous solution"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-[#3157D5] transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M9 2L3 7L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                aria-label="Next solution"
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
