"use client";
import { useEffect, useState } from "react";

export default function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <span key={i} className="word-in inline-block text-lime">{words[i]}</span>
    </span>
  );
}
