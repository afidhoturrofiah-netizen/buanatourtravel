"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  easing?: string;
  as?: "div" | "section" | "article" | "main";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 700,
  easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  as: Component = "div",
  ...props
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const getInitialTransform = () => {
      switch (direction) {
        case "up":
          return `translateY(${distance}px)`;
        case "down":
          return `translateY(-${distance}px)`;
        case "left":
          return `translateX(${distance}px)`;
        case "right":
          return `translateX(-${distance}px)`;
        default:
          return `translateY(${distance}px)`;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    // Set initial state
    element.style.opacity = "0";
    element.style.transform = getInitialTransform();
    element.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [direction, distance, duration, easing, delay]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (isVisible) {
      element.style.opacity = "1";
      element.style.transform = "translate(0, 0)";
    }
  }, [isVisible, direction, distance]);

  return (
    <Component ref={ref} className={className} {...props}>
      {children}
    </Component>
  );
}
