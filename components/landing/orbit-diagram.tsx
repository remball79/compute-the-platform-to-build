"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LogoImage } from "@/components/landing/logo-image";

export type OrbitNode = { label: string; logo: string; group?: number };

type OrbitDiagramProps = {
  nodes: OrbitNode[];
  logoSrc: string;
  activeGroup?: number;
  className?: string;
};

const VIEW = 1000;
const CENTER = VIEW / 2;
const HUB_RADIUS = 90;
const COMET_SPEED = 320; // viewBox units per second along an orbit

// One orbit per group (same order as the cards). Angles are degrees clockwise from the top,
// composed by hand rather than evenly spaced; tiles and hub tethers were checked not to overlap.
const ORBITS = [
  { radius: 185, angles: [35, 150, 275] },
  { radius: 267, angles: [92, 208, 322] },
  { radius: 349, angles: [12, 128, 246] },
  { radius: 430, angles: [62, 185, 305] },
];

// Chevron mark inside /dimo-white.svg, measured on a 1575x293 render of the logo.
const MARK = { x: 4, y: 15, w: 322, h: 272, fullW: 1575, fullH: 293 };

const orbitDuration = (radius: number) => (2 * Math.PI * radius) / COMET_SPEED;
const clampGroup = (group?: number) => Math.min(Math.max(group ?? 0, 0), ORBITS.length - 1);

function placeNodes(nodes: OrbitNode[]) {
  const totals: number[] = [];
  nodes.forEach((node) => {
    const g = clampGroup(node.group);
    totals[g] = (totals[g] ?? 0) + 1;
  });

  const seen: number[] = [];
  return nodes.map((node) => {
    const group = clampGroup(node.group);
    const index = seen[group] ?? 0;
    seen[group] = index + 1;

    const { radius, angles } = ORBITS[group];
    const deg = totals[group] === angles.length ? angles[index] : angles[0] + (index * 360) / totals[group];
    const rad = (deg * Math.PI) / 180;
    const x = CENTER + radius * Math.sin(rad);
    const y = CENTER - radius * Math.cos(rad);

    // The orbit comet starts at 3 o'clock and runs clockwise: find when it is over this node,
    // then delay the node glow so its peak (93% of the cycle) lands on that moment.
    const dur = orbitDuration(radius);
    const loop = ((((deg - 90) % 360) + 360) % 360) / 360;
    const passAt = ((((loop - 0.06) * dur) % dur) + dur) % dur;

    return {
      group,
      x,
      y,
      dur,
      glowDelay: passAt - 0.93 * dur,
      left: `${((x / VIEW) * 100).toFixed(2)}%`,
      top: `${((y / VIEW) * 100).toFixed(2)}%`,
    };
  });
}

function NodeMark({ label, logo }: { label: string; logo: string }) {
  return (
    <LogoImage
      label={label}
      src={logo}
      className="max-h-[58%] max-w-[62%] object-contain"
      fallbackClassName="px-1 text-center text-[clamp(7px,1.5vw,11px)] font-semibold leading-tight text-neutral-900"
    />
  );
}

export function OrbitDiagram({ nodes, logoSrc, activeGroup, className = "" }: OrbitDiagramProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const placed = placeNodes(nodes);
  const hasActive = activeGroup !== undefined;
  const isActiveGroup = (group: number) => hasActive && group === activeGroup;

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={`Dimotek connects ${nodes.map((node) => node.label).join(", ")}`}
      className={`orbit relative mx-auto aspect-square w-full max-w-[600px] ${className}`}
      style={{ "--orbit-play": inView ? "running" : "paused" } as CSSProperties}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3157D5]/20 blur-[100px]" />
      <div className="orbit-glow pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 rounded-full bg-[#1FB7D8]/15 blur-[80px]" />

      <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {ORBITS.map((orbit, group) => {
          const dur = orbitDuration(orbit.radius).toFixed(2);
          return (
            <g key={group} className={`orbit-track${isActiveGroup(group) ? " is-active" : ""}`}>
              <circle className="orbit-halo" cx={CENTER} cy={CENTER} r={orbit.radius} fill="none" />
              <circle className="orbit-line" cx={CENTER} cy={CENTER} r={orbit.radius} fill="none" />
              <g className="orbit-comet-wrap">
                <circle
                  className="orbit-comet orbit-comet-glow"
                  cx={CENTER}
                  cy={CENTER}
                  r={orbit.radius}
                  fill="none"
                  pathLength={100}
                  style={{ animationDuration: `${dur}s` }}
                />
                <circle
                  className="orbit-comet orbit-comet-core"
                  cx={CENTER}
                  cy={CENTER}
                  r={orbit.radius}
                  fill="none"
                  pathLength={100}
                  style={{ animationDuration: `${dur}s` }}
                />
              </g>
              <circle
                className="orbit-ripple"
                cx={CENTER}
                cy={CENTER}
                r={orbit.radius}
                fill="none"
                style={{ "--ripple-end": ((HUB_RADIUS + 12) / orbit.radius).toFixed(3) } as CSSProperties}
              />
            </g>
          );
        })}

        {placed.map((p, i) => (
          <g key={nodes[i].label} className={`orbit-tether${isActiveGroup(p.group) ? " is-active" : ""}`}>
            <line className="orbit-tether-base" x1={p.x} y1={p.y} x2={CENTER} y2={CENTER} />
            <line className="orbit-tether-flow" x1={p.x} y1={p.y} x2={CENTER} y2={CENTER} pathLength={100} />
          </g>
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 z-20 flex h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28%] border border-[#3157D5]/70 bg-[oklch(0.1_0.01_260)]">
        <div className="absolute inset-0 rounded-[28%] bg-gradient-to-br from-[#1FB7D8]/10 to-[#3157D5]/15" />
        <div className="orbit-hub-pulse absolute inset-0 rounded-[28%]" />
        <div className="relative w-[46%]" style={{ aspectRatio: `${MARK.w} / ${MARK.h}` }}>
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={logoSrc}
              alt=""
              className="absolute max-w-none"
              style={{
                width: `${(MARK.fullW / MARK.w) * 100}%`,
                left: `${(-MARK.x / MARK.w) * 100}%`,
                top: `${(-MARK.y / MARK.h) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {nodes.map((node, i) => {
        const p = placed[i];
        const active = isActiveGroup(p.group);
        const timing = { animationDuration: `${p.dur.toFixed(2)}s`, animationDelay: `${p.glowDelay.toFixed(2)}s` };
        return (
          <div
            key={node.label}
            className="absolute z-10 h-[11%] w-[11%] -translate-x-1/2 -translate-y-1/2"
            style={{ left: p.left, top: p.top }}
          >
            <div className="orbit-float relative h-full w-full" style={{ animationDelay: `${(i * 0.4).toFixed(1)}s` }}>
              <span
                className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                style={{ opacity: hasActive && !active ? 0.3 : 1 }}
              >
                <span className="orbit-aura pointer-events-none absolute -inset-[40%]" style={timing} />
                <span className="orbit-core pointer-events-none absolute -inset-[15%]" style={timing} />
              </span>
              <div
                className={`relative flex h-full w-full items-center justify-center rounded-2xl bg-white transition-[opacity,scale,box-shadow] duration-500 ${
                  active
                    ? "scale-110 shadow-[0_0_0_2px_rgba(31,183,216,0.9),0_0_28px_rgba(31,183,216,0.55)]"
                    : "shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)]"
                }`}
                style={{ opacity: hasActive && !active ? 0.78 : 1 }}
              >
                <NodeMark label={node.label} logo={node.logo} />
              </div>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .orbit-line {
          stroke: #4e6fd0;
          stroke-opacity: 0.22;
          stroke-width: 2.2;
          transition:
            stroke 0.7s ease,
            stroke-opacity 0.7s ease,
            stroke-width 0.7s ease;
        }
        .orbit-track.is-active .orbit-line {
          stroke: #1fb7d8;
          stroke-opacity: 0.6;
          stroke-width: 3;
        }
        .orbit-halo {
          stroke: #1fb7d8;
          stroke-width: 16;
          stroke-opacity: 0;
          transition: stroke-opacity 0.7s ease;
        }
        .orbit-track.is-active .orbit-halo {
          stroke-opacity: 0.09;
        }
        .orbit-comet-wrap {
          opacity: 0.16;
          transition: opacity 0.7s ease;
        }
        .orbit-track.is-active .orbit-comet-wrap {
          opacity: 1;
        }
        .orbit-comet {
          stroke: #1fb7d8;
          stroke-dasharray: 12 88;
          stroke-linecap: round;
          animation-name: orbit-comet;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: var(--orbit-play, running);
        }
        .orbit-comet-glow {
          stroke-opacity: 0.25;
          stroke-width: 10;
        }
        .orbit-comet-core {
          stroke-width: 3;
        }
        .orbit-ripple {
          stroke: #1fb7d8;
          stroke-width: 2;
          vector-effect: non-scaling-stroke;
          opacity: 0;
          transform-origin: 50% 50%;
        }
        .orbit-track.is-active .orbit-ripple {
          animation: orbit-ripple 3s cubic-bezier(0.3, 0, 0.2, 1) infinite;
          animation-play-state: var(--orbit-play, running);
        }
        .orbit-tether {
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .orbit-tether.is-active {
          opacity: 1;
        }
        .orbit-tether-base {
          stroke: #1fb7d8;
          stroke-opacity: 0.28;
          stroke-width: 2;
        }
        .orbit-tether-flow {
          stroke: #8fe3f5;
          stroke-width: 2.5;
          stroke-dasharray: 8 92;
          stroke-linecap: round;
        }
        .orbit-tether.is-active .orbit-tether-flow {
          animation: orbit-tether 1.6s linear infinite;
          animation-play-state: var(--orbit-play, running);
        }
        .orbit-float {
          animation: orbit-float 4s ease-in-out infinite;
          animation-play-state: var(--orbit-play, running);
        }
        .orbit-glow {
          transform: translate(-50%, -50%);
          animation: orbit-glow 5s ease-in-out infinite;
          animation-play-state: var(--orbit-play, running);
        }
        .orbit-hub-pulse {
          animation: orbit-hub-pulse 3s ease-in-out infinite;
          animation-play-state: var(--orbit-play, running);
        }
        .orbit-aura,
        .orbit-core {
          opacity: 0;
          border-radius: 50%;
          transform: scale(0.85);
          will-change: opacity, transform;
          animation-timing-function: cubic-bezier(0.33, 0, 0.3, 1);
          animation-iteration-count: infinite;
          animation-play-state: var(--orbit-play, running);
        }
        .orbit-aura {
          filter: blur(6px);
          background: radial-gradient(
            circle,
            rgba(31, 183, 216, 0.55) 0%,
            rgba(49, 87, 213, 0.35) 28%,
            rgba(49, 87, 213, 0.12) 50%,
            rgba(49, 87, 213, 0) 72%
          );
          animation-name: orbit-aura;
        }
        .orbit-core {
          background: radial-gradient(
            circle,
            rgba(230, 251, 255, 0.9) 0%,
            rgba(31, 183, 216, 0.6) 35%,
            rgba(31, 183, 216, 0) 70%
          );
          animation-name: orbit-core;
        }

        @keyframes orbit-comet {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -100;
          }
        }
        @keyframes orbit-ripple {
          0% {
            transform: scale(1);
            opacity: 0;
          }
          15% {
            opacity: 0.5;
          }
          100% {
            transform: scale(var(--ripple-end));
            opacity: 0;
          }
        }
        @keyframes orbit-tether {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -100;
          }
        }
        @keyframes orbit-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes orbit-glow {
          0%,
          100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.12);
          }
        }
        @keyframes orbit-hub-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(31, 183, 216, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(31, 183, 216, 0);
          }
        }
        @keyframes orbit-aura {
          0% {
            opacity: 0.8;
            transform: scale(1.05);
          }
          30% {
            opacity: 0;
            transform: scale(1.12);
          }
          70% {
            opacity: 0;
            transform: scale(0.85);
          }
          84% {
            opacity: 0.5;
            transform: scale(0.96);
          }
          93% {
            opacity: 1;
            transform: scale(1.02);
          }
          100% {
            opacity: 0.88;
            transform: scale(1.04);
          }
        }
        @keyframes orbit-core {
          0% {
            opacity: 0.7;
            transform: scale(1);
          }
          26% {
            opacity: 0;
            transform: scale(1.05);
          }
          74% {
            opacity: 0;
            transform: scale(0.8);
          }
          86% {
            opacity: 0.55;
            transform: scale(0.94);
          }
          93% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0.82;
            transform: scale(1.01);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-float,
          .orbit-glow,
          .orbit-hub-pulse,
          .orbit-aura,
          .orbit-core {
            animation: none;
          }
          .orbit-comet-wrap,
          .orbit-ripple,
          .orbit-tether-flow {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
