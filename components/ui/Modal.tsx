"use client";

import { ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { animateModalEntrance } from "@/lib/utils/gsapAnimations";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-xl",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      animateModalEntrance(modalRef.current);
      // Escape key listener
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Surface */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${maxWidth} rounded-2xl border border-white/10 bg-[#0d1222] p-6 text-slate-100 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-5">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-xs text-slate-400 font-medium">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
