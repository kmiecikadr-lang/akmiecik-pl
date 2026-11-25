"use client";
import { useMemo, useRef, useState } from "react";
import { Chess, type Square } from "chess.js";
import { defaultPieces } from "react-chessboard";

// Kolory planszy i podświetleń jak na Lichess
const LIGHT = "#f0d9b5";
const DARK = "#b58863";
const FILES = "abcdefgh";

type Status = "play" | "wrong" | "solved";

export default function ChessPuzzle({ fen, solution }: { fen: string; solution: string[] }) {
  const game = useRef(new Chess(fen));
  const [pos, setPos] = useState(fen);
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<Square | null>(null);
  const [last, setLast] = useState<[string, string] | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("play");
  const [wrongSq, setWrongSq] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const side = useMemo(() => new Chess(fen).turn(), [fen]);
  const board = useMemo(() => new Chess(pos).board(), [pos]);
  const targets = useMemo(
    () => (sel ? new Chess(pos).moves({ square: sel, verbose: true }).map((m) => m.to as string) : []),
    [sel, pos],
  );

  const apply = (uci: string) => {
    game.current.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] || "q" });
    setPos(game.current.fen());
    setLast([uci.slice(0, 2), uci.slice(2, 4)]);
  };

  const opponent = (s: number) => {
    if (s >= solution.length || game.current.isCheckmate()) {
      setStatus("solved");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      apply(solution[s]);
      setStep(s + 1);
      setBusy(false);
    }, 450);
  };

  const tryMove = (from: Square, to: Square) => {
    const piece = game.current.get(from);
    const promo = piece?.type === "p" && (to[1] === "8" || to[1] === "1") ? solution[step]?.[4] || "q" : "";
    const uci = from + to + promo;
    const test = new Chess(game.current.fen());
    test.move({ from, to, promotion: promo || undefined });
    if (uci === solution[step] || uci.slice(0, 4) === solution[step]?.slice(0, 4) || test.isCheckmate()) {
      apply(uci);
      setHint(null);
      setStatus("play");
      if (test.isCheckmate()) return setStatus("solved");
      opponent(step + 1);
      setStep(step + 1);
    } else {
      setWrongSq(to);
      setStatus("wrong");
      setTimeout(() => setWrongSq(null), 600);
    }
  };

  const click = (sq: Square) => {
    if (status === "solved" || busy) return;
    if (sel && targets.includes(sq)) {
      tryMove(sel, sq);
      setSel(null);
      return;
    }
    const p = game.current.get(sq);
    setSel(p && p.color === game.current.turn() ? sq : null);
  };

  const reset = () => {
    game.current = new Chess(fen);
    setPos(fen);
    setStep(0);
    setSel(null);
    setLast(null);
    setHint(null);
    setStatus("play");
  };

  const reveal = () => {
    reset();
    setBusy(true);
    solution.forEach((u, i) =>
      setTimeout(() => {
        apply(u);
        if (i === solution.length - 1) {
          setBusy(false);
          setStatus("solved");
          setStep(solution.length);
        }
      }, 500 * (i + 1)),
    );
  };

  const ranks = side === "w" ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
  const files = side === "w" ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];

  return (
    <div className="w-full max-w-[440px]">
      <p className="mb-3 text-sm text-mist">
        Ruch mają <span className="font-semibold text-white">{side === "w" ? "białe" : "czarne"}</span>
      </p>
      <div className="grid grid-cols-8 overflow-hidden rounded-md shadow-2xl select-none">
        {ranks.map((r) =>
          files.map((f) => {
            const sq = (FILES[f] + (8 - r)) as Square;
            const p = board[r][f];
            const dark = (r + f) % 2 === 1;
            const isSel = sel === sq;
            const isLast = last?.includes(sq);
            const isTarget = targets.includes(sq);
            return (
              <button
                key={sq}
                onClick={() => click(sq)}
                aria-label={sq}
                className="relative flex aspect-square items-center justify-center"
                style={{ background: dark ? DARK : LIGHT }}
              >
                {(isLast || isSel) && <span className="absolute inset-0" style={{ background: isSel ? "rgba(20,85,30,.5)" : "rgba(155,199,0,.41)" }} />}
                {hint === sq && <span className="absolute inset-0 animate-pulse" style={{ background: "rgba(20,85,30,.6)" }} />}
                {wrongSq === sq && <span className="absolute inset-0 bg-red-500/60" />}
                {f === files[0] && <span className={`absolute top-0.5 left-1 text-[9px] font-semibold ${dark ? "text-[#f0d9b5]" : "text-[#b58863]"}`}>{8 - r}</span>}
                {r === ranks[7] && <span className={`absolute right-1 bottom-0 text-[9px] font-semibold ${dark ? "text-[#f0d9b5]" : "text-[#b58863]"}`}>{FILES[f]}</span>}
                {p && (
                  <span className="relative h-full w-full">
                    {defaultPieces[(p.color === "w" ? "w" : "b") + p.type.toUpperCase()]({ svgStyle: { width: "100%", height: "100%" } })}
                  </span>
                )}
                {isTarget && !p && <span className="absolute h-1/4 w-1/4 rounded-full" style={{ background: "rgba(20,85,30,.5)" }} />}
                {isTarget && p && <span className="pointer-events-none absolute inset-0 z-10 rounded-full border-[5px]" style={{ borderColor: "rgba(20,85,30,.5)" }} />}
              </button>
            );
          }),
        )}
      </div>
      <div className="mt-4 flex min-h-[44px] flex-wrap items-center gap-2">
        {status === "solved" ? (
          <>
            <p className="font-display text-xl font-bold text-lime">Brawo, rozwiązane! ♞</p>
            <button onClick={reset} className="ml-auto rounded-full border border-white/20 px-4 py-2 text-sm">Jeszcze raz</button>
          </>
        ) : (
          <>
            <p className={`text-sm ${status === "wrong" ? "text-red-400" : "text-mist"}`}>
              {status === "wrong" ? "Nie tym razem — spróbuj jeszcze." : step > 0 ? "Dobrze! Grasz dalej." : "Dotknij bierkę, potem pole."}
            </p>
            <div className="ml-auto flex gap-2">
              <button onClick={() => setHint(solution[step]?.slice(0, 2) ?? null)} disabled={busy} className="rounded-full border border-white/20 px-4 py-2 text-sm">Podpowiedź</button>
              <button onClick={reveal} disabled={busy} className="rounded-full border border-white/20 px-4 py-2 text-sm text-mist">Rozwiązanie</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
