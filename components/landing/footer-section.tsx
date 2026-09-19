"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedDotGridCanvas } from "@/components/landing/animated-dot-grid";

const footerLinks = {
  Product: [
    { name: "Capabilities", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Integrations", href: "#integrations" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#", badge: "Hiring" },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#security" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Background animation (same as Hero) */}
      <div className="absolute inset-0 z-0">
        <AnimatedDotGridCanvas />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.7)_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Footer content — white text */}
      {/* Top line — full width */}
      <div className="relative z-10 w-full border-t border-white/10" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <img src="/dimo-white.svg" alt="Dimotek" className="h-7 w-auto" />
              </a>

              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm">
                We engineer and integrate AI, data, commerce, and enterprise platforms into scalable, connected digital systems.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-white mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-white text-black rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <p className="text-sm text-white/50">
            &copy; 2026 Dimotek. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
