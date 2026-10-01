// Reusable GSAP animation utilities (Plain functions, no classes)
import gsap from "gsap";

export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function animatePageEntrance(container: HTMLElement | null) {
  if (!container || isReducedMotion()) return null;

  const ctx = gsap.context(() => {
    gsap.from("[data-animate='header']", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.from("[data-animate='hero-card']", {
      opacity: 0,
      scale: 0.96,
      duration: 0.6,
      delay: 0.1,
      ease: "power3.out",
    });

    gsap.from("[data-animate='summary-card']", {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.5,
      delay: 0.2,
      ease: "power2.out",
    });

    gsap.from("[data-animate='category-card']", {
      opacity: 0,
      y: 24,
      stagger: 0.08,
      duration: 0.55,
      delay: 0.35,
      ease: "power2.out",
    });

    gsap.from("[data-animate='chart-card']", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.5,
      ease: "power2.out",
    });

    gsap.from("[data-animate='timeline-item']", {
      opacity: 0,
      x: -15,
      stagger: 0.07,
      duration: 0.45,
      delay: 0.6,
      ease: "power2.out",
    });
  }, container);

  return ctx;
}

export function animateCounter(
  element: HTMLElement | null,
  targetValue: number,
  duration = 1.2,
  suffix = ""
) {
  if (!element) return;
  if (isReducedMotion()) {
    element.innerText = `${targetValue}${suffix}`;
    return;
  }

  const obj = { val: 0 };
  gsap.to(obj, {
    val: targetValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.innerText = `${Math.round(obj.val)}${suffix}`;
    },
  });
}

export function animateCardHover(element: HTMLElement | null, enter: boolean) {
  if (!element || isReducedMotion()) return;
  gsap.to(element, {
    y: enter ? -4 : 0,
    duration: 0.25,
    ease: "power2.out",
  });
}

export function animateModalEntrance(element: HTMLElement | null) {
  if (!element || isReducedMotion()) return;
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.94, y: 15 },
    { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" }
  );
}

export function animatePulseGlow(element: HTMLElement | null) {
  if (!element || isReducedMotion()) return null;
  return gsap.to(element, {
    boxShadow: "0 0 25px rgba(168, 85, 247, 0.45)",
    repeat: -1,
    yoyo: true,
    duration: 2.2,
    ease: "sine.inOut",
  });
}
