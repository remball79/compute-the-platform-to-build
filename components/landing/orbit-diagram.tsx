"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

export type OrbitNode = { label: string; icon: LucideIcon; group?: number };

type OrbitDiagramProps = {
  nodes: OrbitNode[];
  logoSrc: string;
  activeGroup?: number;
  className?: string;
};

const VIEW = 1000;
const CENTER = VIEW / 2;
const RADIUS = 360;
const BEND = 38;
const DURATIONS = [5.5, 6.4, 7.3, 8.2];

// Chevron mark inside /dimo-white.svg, measured on a 1575x293 render of the logo.
const MARK = { x: 4, y: 15, w: 322, h: 272, fullW: 1575, fullH: 293 };

function wireGeometry(index: number, total: number) {
  const angle = (index * 2 * Math.PI) / total;
  const ux = Math.sin(angle);
  const uy = -Math.cos(angle);
  const x = CENTER + RADIUS * ux;
  const y = CENTER + RADIUS * uy;
  const side = index % 2 === 0 ? 1 : -1;
  const cx = CENTER + (RADIUS / 2) * ux + side * BEND * -uy;
  const cy = CENTER + (RADIUS / 2) * uy + side * BEND * ux;
  const dur = DURATIONS[index % DURATIONS.length];
  const delay = (((index * 5) % total) / total) * dur;
  return {
    left: `${((x / VIEW) * 100).toFixed(2)}%`,
    top: `${((y / VIEW) * 100).toFixed(2)}%`,
    path: `M ${CENTER} ${CENTER} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`,
    dur,
    delay,
    arrival: delay + dur / 2,
  };
}

export function OrbitDiagram({ nodes, logoSrc, activeGroup, className = "" }: OrbitDiagramProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (inView && !reduced) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [inView, reduced]);

  const wires = nodes.map((_, i) => wireGeometry(i, nodes.length));
  const hasActive = activeGroup !== undefined;
  const isActive = (i: number) => hasActive && nodes[i].group === activeGroup;

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

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="absolute inset-0 h-full w-full text-foreground"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="orbit-wire" gradientUnits="userSpaceOnUse" cx={CENTER} cy={CENTER} r={RADIUS}>
            <stop offset="0%" stopColor="#3157D5" stopOpacity="0.08" />
            <stop offset="55%" stopColor="#4E6FD0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1FB7D8" stopOpacity="0.65" />
          </radialGradient>
          <radialGradient id="orbit-pulse-in">
            <stop offset="0%" stopColor="#E6FBFF" stopOpacity="1" />
            <stop offset="40%" stopColor="#1FB7D8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1FB7D8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbit-pulse-out">
            <stop offset="0%" stopColor="#EEF2FF" stopOpacity="1" />
            <stop offset="40%" stopColor="#4E6FD0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4E6FD0" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle
          className="orbit-spin"
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 8"
          opacity="0.18"
        />

        {wires.map((wire, i) => (
          <g key={nodes[i].label}>
            <path d={wire.path} fill="none" stroke="url(#orbit-wire)" strokeWidth="2" strokeLinecap="round" />
            <path
              className="orbit-wire-active"
              d={wire.path}
              fill="none"
              stroke="#1FB7D8"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ strokeOpacity: isActive(i) ? 0.75 : 0 }}
            />
            <path
              className="orbit-flow"
              d={wire.path}
              fill="none"
              stroke="#1FB7D8"
              strokeOpacity="0.25"
              strokeWidth="7"
              strokeLinecap="round"
              style={{ animationDuration: `${wire.dur}s`, animationDelay: `${wire.delay.toFixed(2)}s` }}
            />
            <path
              className="orbit-flow"
              d={wire.path}
              fill="none"
              stroke="#1FB7D8"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ animationDuration: `${wire.dur}s`, animationDelay: `${wire.delay.toFixed(2)}s` }}
            />
            {!reduced && (
              <>
                <circle r="6.5" fill="url(#orbit-pulse-in)" opacity="0">
                  <set attributeName="opacity" to="1" begin={`${wire.delay.toFixed(2)}s`} />
                  <animateMotion
                    dur={`${wire.dur}s`}
                    begin={`${wire.delay.toFixed(2)}s`}
                    repeatCount="indefinite"
                    path={wire.path}
                    keyPoints="1;0"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                  />
                </circle>
                <circle r="6.5" fill="url(#orbit-pulse-out)" opacity="0">
                  <set attributeName="opacity" to="1" begin={`${wire.arrival.toFixed(2)}s`} />
                  <animateMotion
                    dur={`${wire.dur}s`}
                    begin={`${wire.arrival.toFixed(2)}s`}
                    repeatCount="indefinite"
                    path={wire.path}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                  />
                </circle>
              </>
            )}
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
        const wire = wires[i];
        const Icon = node.icon;
        const timing = { animationDuration: `${wire.dur}s`, animationDelay: `${wire.arrival.toFixed(2)}s` };
        return (
          <div
            key={node.label}
            className="absolute z-10 h-[11%] w-[11%] -translate-x-1/2 -translate-y-1/2"
            style={{ left: wire.left, top: wire.top }}
          >
            <div className="orbit-float relative h-full w-full" style={{ animationDelay: `${(i * 0.4).toFixed(1)}s` }}>
              <span className="orbit-aura pointer-events-none absolute -inset-[40%]" style={timing} />
              <span className="orbit-core pointer-events-none absolute -inset-[15%]" style={timing} />
              <div
                className={`relative flex h-full w-full items-center justify-center rounded-2xl bg-white transition-[opacity,scale,box-shadow] duration-500 ${
                  isActive(i)
                    ? "scale-110 shadow-[0_0_0_2px_rgba(31,183,216,0.9),0_0_28px_rgba(31,183,216,0.55)]"
                    : "shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)]"
                }`}
                style={{ opacity: hasActive && !isActive(i) ? 0.78 : 1 }}
              >
                <Icon className="h-1/2 w-1/2 text-neutral-900" strokeWidth={1.75} />
              </div>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .orbit-spin {
          transform-origin: center;
          animation: orbit-spin 60s linear infinite;
          animation-play-state: var(--orbit-play, running);
        }
        .orbit-wire-active {
          transition: stroke-opacity 0.5s ease;
        }
        .orbit-flow {
          stroke-dasharray: 60 600;
          animation-name: orbit-flow-dash;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          animation-iteration-count: infinite;
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

        @keyframes orbit-spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbit-flow-dash {
          0% {
            stroke-dashoffset: 660;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
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
          .orbit-spin,
          .orbit-float,
          .orbit-glow,
          .orbit-hub-pulse,
          .orbit-aura,
          .orbit-core {
            animation: none;
          }
          .orbit-flow {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
