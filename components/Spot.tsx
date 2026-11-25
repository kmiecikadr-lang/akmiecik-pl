"use client";
import { useRef } from "react";

export default function Spot({ children, className = "", href }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLElement>(null);
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  const cls = `spot group block rounded-3xl border border-white/10 bg-white/[.03] backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-lime/40 ${className}`;
  if (href)
    return <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} target="_blank" rel="noopener noreferrer" onMouseMove={move} className={cls}>{children}</a>;
  return <div ref={ref as React.RefObject<HTMLDivElement>} onMouseMove={move} className={cls}>{children}</div>;
}
