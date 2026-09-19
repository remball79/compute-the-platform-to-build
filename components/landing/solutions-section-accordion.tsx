"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

type Solution = {
  title: string;
  category?: string;
  description: string;
  image: string;
};

const solutions: Solution[] = [
  {
    title: "Microsoft 365",
    category: "Productivity & Collaboration Suite",
    description:
      "We deploy and integrate Microsoft 365 so teams collaborate securely inside the tools they already use.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2813%29-OQ2DiR3ElVsUg8kTvTL1kC5A3Q6maM.png",
  },
  {
    title: "Odoo",
    category: "ERP / Business Management",
    description:
      "We implement and tailor Odoo to unify finance, inventory, sales, and operations in one flexible ERP.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png",
  },
  {
    title: "Alumio",
    category: "Integration Platform / iPaaS",
    description:
      "We connect your systems with Alumio, orchestrating APIs and data flows without point-to-point code.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2812%29-ng3RrNnsPMJ5CrtOjcPTmhHg01W11q.png",
  },
  {
    title: "Google Cloud Platform",
    category: "Cloud Platform / Data & AI",
    description:
      "We architect and run workloads on Google Cloud, from data and AI pipelines to scalable infrastructure.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png",
  },
  {
    title: "VTEX",
    category: "Commerce Platform / eCommerce",
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
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3157D5]" />
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

        {/* Solutions carousel — one full-width card at a time */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
            <CarouselContent className="-ml-4">
              {solutions.map((solution, index) => (
                <CarouselItem key={solution.title} className="pl-4 basis-full">
                  <div className="grid h-full grid-rows-[1fr_auto] lg:grid-rows-1 lg:grid-cols-[42%_58%] lg:h-[549px] border border-white/25 bg-black overflow-hidden">
                    {/* Left: text (on top in mobile) */}
                    <div className="flex flex-col justify-center px-8 py-10 lg:p-14">
                      <span className="text-base lg:text-lg font-display text-[#3157D5] mb-5 lg:mb-6">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-3xl lg:text-5xl font-display mb-4">{solution.title}</h3>
                      {solution.category && (
                        <span className="text-base lg:text-[17px] font-mono text-white/40 mb-7 lg:mb-8">{solution.category}</span>
                      )}
                      <p className="text-lg lg:text-xl text-white/60 leading-[1.5] max-w-[450px]">
                        {solution.description}
                      </p>
                    </div>

                    {/* Right: padded image column, centered */}
                    <div className="flex items-center justify-center px-8 pb-10 md:px-12 md:pb-12 lg:px-14 lg:py-12">
                      <div className="w-full lg:w-[78%] aspect-video overflow-hidden">
                        <img
                          src={solution.image || "/placeholder.svg"}
                          alt=""
                          aria-hidden="true"
                          className="block w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
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
    </section>
  );
}
