"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isReducedMotion } from "@/lib/utils/gsapAnimations";

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  glowColor?: string;
  trackColor?: string;
  showText?: boolean;
  sublabel?: string;
  className?: string;
}

export function ProgressRing({
  progress,
  size = 140,
  strokeWidth = 10,
  color = "#a855f7",
  glowColor = "rgba(168, 85, 247, 0.4)",
  trackColor = "rgba(255, 255, 255, 0.08)",
  showText = true,
  sublabel,
  className = "",
}: ProgressRingProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

  useEffect(() => {
    if (!circleRef.current) return;

    if (isReducedMotion()) {
      circleRef.current.style.strokeDashoffset = `${offset}`;
      if (textRef.current) textRef.current.innerText = `${Math.round(progress)}%`;
      return;
    }

    const ctx = gsap.context(() => {
      // Animate stroke offset
      gsap.fromTo(
        circleRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: offset,
          duration: 1.4,
          ease: "power2.out",
        }
      );

      // Animate inner number counter
      if (textRef.current) {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: progress,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            if (textRef.current) {
              textRef.current.innerText = `${Math.round(counter.val)}%`;
            }
          },
        });
      }
    });

    return () => ctx.revert();
  }, [offset, circumference, progress]);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90 transform"
        style={{ filter: `drop-shadow(0 0 12px ${glowColor})` }}
      >
        {/* Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Ring */}
        <circle
          ref={circleRef}
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-300"
        />
      </svg>

      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            ref={textRef}
            className="text-2xl font-bold tracking-tight text-white drop-shadow-md"
          >
            {Math.round(progress)}%
          </span>
          {sublabel && (
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
