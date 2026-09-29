"use client";

import { useEffect, useState, useRef } from "react";
import { BarChart3, Users, Layers, Target } from "lucide-react";

const securityFeatures = [
  {
    icon: BarChart3,
    title: "Business before technology",
    description: "Every technology decision starts with the business outcome, not the platform.",
  },
  {
    icon: Users,
    title: "Adoption over deployment",
    description: "A system only creates value when people use it as part of how the business runs.",
  },
  {
    icon: Layers,
    title: "Systems that evolve",
    description: "Modular, connected architectures that adapt as your business, technology, and AI evolve.",
  },
  {
    icon: Target,
    title: "Impact over output",
    description: "Success is measured in adoption, efficiency, and business impact, not features shipped.",
  },
];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
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
    <section id="philosophy" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background accent removed */}
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3157D5]" />
            Philosophy
          </span>
          
          {/* Title — full width */}
          <h2 className={`text-4xl md:text-6xl lg:text-[5rem] xl:text-[6.5rem] 2xl:text-[112px] font-display tracking-tight leading-[0.95] mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <span className="block">Go-Live tells you</span>
            <span className="block">the technology works.</span>
            <span className="block text-muted-foreground">Adoption tells you</span>
            <span className="block text-muted-foreground">the transformation works.</span>
          </h2>
          
          {/* Description — below title */}
          <div className={`transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              We believe transformation doesn&rsquo;t happen when technology goes live. It happens when people adopt it,
              processes improve, and the business performs better.
            </p>
          </div>
        </div>

        {/* Feature cards — 2 x 2 */}
        <div>
          <div className="grid md:grid-cols-2 gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`group p-6 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.04] transition-all duration-500 cursor-default ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-foreground/20 transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
