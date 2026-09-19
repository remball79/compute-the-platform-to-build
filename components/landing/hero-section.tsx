"use client";

import { useEffect, useState } from "react";
import { AnimatedDotGridCanvas } from "@/components/landing/animated-dot-grid";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  return (
    <section className="relative min-h-[100svh] sm:min-h-screen flex flex-col justify-center items-center sm:items-start overflow-hidden bg-black">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <AnimatedDotGridCanvas />
        {/* Subtle overlay to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,transparent_35%,rgba(0,0,0,0.55)_75%,rgba(0,0,0,0.88)_100%)]" />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 pb-0 sm:py-32 lg:py-40">
        <div className="lg:max-w-[55%] text-left">
        {/* Eyebrow */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-white/[0.05] bg-white/[0.05] px-3 py-2.5 text-[10px] font-medium leading-[1.2] text-white sm:px-4 sm:py-3 sm:text-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3157D5]" />
            Modern Engineering for Business Transformation
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-7 sm:mb-12">
          <h1
            className={`text-left text-[3.375rem] sm:text-[clamp(2rem,6vw,7rem)] font-display leading-[0.9] tracking-tight text-white transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          >
              <span className="block whitespace-normal sm:whitespace-nowrap">We connect the systems</span>
            <span className="block whitespace-normal sm:whitespace-nowrap">that run your business.</span>
          </h1>
        </div>

        {/* Supporting subcopy */}
        <div
          className={`mb-10 sm:mb-12 transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl sm:text-base lg:text-lg font-normal text-white/70 max-w-[46ch] leading-relaxed">
            Dimotek integrates AI, data, commerce, and enterprise platforms so information moves reliably across your operation and teams spend less time fixing disconnected workflows.
          </p>
        </div>
        </div>
      </div>
      
      {/* Stats — 3 metrics static, no auto-scroll */}
      <div
        className={`relative mt-2 pb-10 sm:mt-0 sm:pb-0 sm:absolute sm:bottom-12 sm:left-0 sm:right-0 px-6 lg:px-12 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative max-w-[1400px] mx-auto grid grid-cols-3 gap-x-4 gap-y-6 justify-items-center sm:justify-items-start sm:flex sm:items-start sm:gap-10 lg:gap-20">
          {[
            { value: "100+", label: "Digital projects delivered", mobileLabel: "Projects delivered" },
            { value: "90%", label: "Repeat business" },
            { value: "15+ years", label: "Technology experience" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2 text-center sm:text-left">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-display text-white whitespace-nowrap [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]">{stat.value}</span>
              <span className="text-xs text-white leading-tight [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]">
                {"mobileLabel" in stat ? (
                  <>
                    <span className="sm:hidden">{stat.mobileLabel}</span>
                    <span className="hidden sm:inline">{stat.label}</span>
                  </>
                ) : (
                  stat.label
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}

    </section>
  );
}
