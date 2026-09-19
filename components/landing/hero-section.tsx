"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatedDotGridCanvas } from "@/components/landing/animated-dot-grid";

const words = ["connect", "automate", "scale"];

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const STAGGER = 45;      // ms between each letter
  const DURATION = 500;    // blur+opacity fade duration per letter
  const GRADIENT_HOLD = STAGGER * letters.length + DURATION + 200;

  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  );
  const [showGradient, setShowGradient] = useState(true);
  const framesRef = useRef<number[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // reset
    framesRef.current.forEach(cancelAnimationFrame);
    timersRef.current.forEach(clearTimeout);
    framesRef.current = [];
    timersRef.current = [];

    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setShowGradient(true);

    // stagger each letter
    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setLetterStates(prev => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (progress < 1) {
            const id = requestAnimationFrame(tick);
            framesRef.current.push(id);
          }
        };
        const id = requestAnimationFrame(tick);
        framesRef.current.push(id);
      }, i * STAGGER);
      timersRef.current.push(t);
    });

    // remove gradient once all letters are settled
    const gt = setTimeout(() => setShowGradient(false), GRADIENT_HOLD);
    timersRef.current.push(gt);

    return () => {
      framesRef.current.forEach(cancelAnimationFrame);
      timersRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  // gradient colours cycling across letter positions
  const gradientColors = ["#203A84", "#3157D5", "#4E6FD0", "#1FB7D8", "#2FAF9A", "#70B637", "#86D94A"];

  return (
    <>
      {letters.map((char, i) => {
        const colorIndex = (i / Math.max(letters.length - 1, 1)) * (gradientColors.length - 1);
        const lower = Math.floor(colorIndex);
        const upper = Math.min(lower + 1, gradientColors.length - 1);
        const t = colorIndex - lower;

        // lerp hex colours
        const hex2rgb = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return [r, g, b];
        };
        const [r1, g1, b1] = hex2rgb(gradientColors[lower]);
        const [r2, g2, b2] = hex2rgb(gradientColors[upper]);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: letterStates[i]?.opacity ?? 0,
              filter: `blur(${letterStates[i]?.blur ?? 20}px)`,
              color: showGradient ? `rgb(${r},${g},${b})` : "white",
              transition: "color 0.4s ease",
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
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
              <span className="block whitespace-normal sm:whitespace-nowrap">We build intelligent</span>
            <span className="block whitespace-normal sm:whitespace-nowrap">systems that{" "}
              <span className="relative inline-block">
                <BlurWord word={words[wordIndex]} trigger={wordIndex} />
              </span>
            </span>
          </h1>
        </div>

        {/* Supporting subcopy */}
        <div
          className={`mb-10 sm:mb-12 transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl sm:text-base lg:text-lg font-normal text-white/50 max-w-[46ch] leading-relaxed">
            We engineer and integrate AI, data, commerce, and enterprise platforms into scalable, connected digital systems.
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
            { value: "100+", label: "Digital projects delivered" },
            { value: "90%", label: "Repeat business" },
            { value: "15+ years", label: "Technology experience" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2 text-center sm:text-left">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-display text-white whitespace-nowrap [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]">{stat.value}</span>
              <span className="text-xs text-white leading-tight [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}

    </section>
  );
}
