"use client";
import { useEffect, useState } from "react";

// Jedna wizyta na sesję przeglądarki; kolejne podstrony tylko odczytują stan.
export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let counted = false;
    try { counted = sessionStorage.getItem("ak_visit") === "1"; } catch {}
    fetch("/api/visits", { method: counted ? "GET" : "POST" })
      .then((r) => r.json())
      .then((j) => {
        if (typeof j.count === "number") {
          setCount(j.count);
          try { sessionStorage.setItem("ak_visit", "1"); } catch {}
        }
      })
      .catch(() => {});
  }, []);
  if (count === null) return null;
  return (
    <div className="mx-auto mt-6 flex max-w-6xl items-center justify-center gap-3 px-6 pb-8 text-sm text-mist">
      <span className="pulse-dot h-2 w-2 rounded-full bg-lime" />
      <span>
        Odwiedzin: <span className="font-display text-base font-bold text-white tabular-nums">{count.toLocaleString("pl-PL")}</span>
      </span>
    </div>
  );
}
