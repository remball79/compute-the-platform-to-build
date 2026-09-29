"use client";

import { useEffect, useState, useRef } from "react";
import {
  ArrowLeftRight,
  BarChart3,
  Building2,
  Cloud,
  Globe,
  LayoutTemplate,
  Package,
  Plug,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { OrbitDiagram, type OrbitNode } from "@/components/landing/orbit-diagram";

const techCards = [
  { label: "EXPERIENCE", title: "Commerce", description: "Web · Mobile" },
  { label: "BUSINESS PLATFORMS", title: "ERP · CRM", description: "OMS · CMS" },
  { label: "INTEGRATION", title: "APIs", description: "Middleware · ETL" },
  { label: "DATA & CLOUD", title: "Analytics", description: "AI · Cloud" },
];

// group = index of the matching card in techCards
const orbitNodes: OrbitNode[] = [
  { label: "Web", icon: Globe, group: 0 },
  { label: "Mobile", icon: Smartphone, group: 0 },
  { label: "ERP", icon: Building2, group: 1 },
  { label: "CRM", icon: Users, group: 1 },
  { label: "OMS", icon: Package, group: 1 },
  { label: "CMS", icon: LayoutTemplate, group: 1 },
  { label: "APIs", icon: Plug, group: 2 },
  { label: "Middleware", icon: Workflow, group: 2 },
  { label: "ETL", icon: ArrowLeftRight, group: 2 },
  { label: "Analytics", icon: BarChart3, group: 3 },
  { label: "AI", icon: Sparkles, group: 3 },
  { label: "Cloud", icon: Cloud, group: 3 },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRegion, setActiveRegion] = useState(0);
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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setActiveRegion((prev) => (prev + 1) % techCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="infra" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          <div>
            <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3157D5]" />
              TECHNOLOGY ARCHITECTURE
            </span>

            <h2 className={`text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] 2xl:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              A Unified
              <br />
              <span className="text-muted-foreground">System.</span>
            </h2>

            <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
              We connect platforms, integrations, data, and cloud into one scalable technology ecosystem.
            </p>
          </div>

          <div className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <OrbitDiagram nodes={orbitNodes} logoSrc="/dimo-white.svg" activeGroup={activeRegion} />
          </div>
        </div>

        {/* Region list */}
        <div className={`mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          {techCards.map((card, index) => (
            <div
              key={card.title}
              className={`p-6 border transition-all duration-300 cursor-default ${
                activeRegion === index
                  ? "border-foreground/30 bg-foreground/[0.04]"
                  : "border-foreground/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full transition-colors ${
                  activeRegion === index ? "bg-[#3157D5]" : "bg-foreground/20"
                }`} />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {card.label}
                </span>
              </div>
              <span className="font-medium block mb-1">{card.title}</span>
              <span className="text-sm text-muted-foreground">{card.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
