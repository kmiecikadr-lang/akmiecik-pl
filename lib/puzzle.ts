import { Chess } from "chess.js";
import local from "@/content/puzzles.json";

export type Puzzle = { fen: string; solution: string[]; goal: string; rating?: number; url?: string };

const GOALS: Record<string, string> = {
  mateIn1: "Mat w 1 ruchu",
  mateIn2: "Mat w 2 ruchach",
  mateIn3: "Mat w 3 ruchach",
  mateIn4: "Mat w 4 ruchach",
  mateIn5: "Mat w 5 ruchach",
};

const legal = (c: Chess, uci: string) =>
  c.moves({ verbose: true }).some((m) => m.from + m.to + (m.promotion || "") === uci || (m.from + m.to === uci.slice(0, 4) && !uci[4]));

// Codzienne zadanie z Lichess; gdy niedostępne — zadanie z lokalnej puli, inne każdego dnia.
export async function getDailyPuzzle(): Promise<Puzzle> {
  try {
    const r = await fetch("https://lichess.org/api/puzzle/daily", { next: { revalidate: 3600 }, headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error(String(r.status));
    const j = await r.json();
    const solution: string[] = j.puzzle.solution;
    const c = new Chess();
    c.loadPgn(j.game.pgn);
    let fen = c.fen();
    if (!legal(c, solution[0])) {
      const h = c.history();
      const d = new Chess();
      h.slice(0, j.puzzle.initialPly + 1).forEach((m) => d.move(m));
      if (!legal(d, solution[0])) throw new Error("niezgodna pozycja");
      fen = d.fen();
    }
    const theme = (j.puzzle.themes as string[]).find((t) => GOALS[t]);
    return {
      fen,
      solution,
      goal: theme ? GOALS[theme] : "Znajdź najlepszy ruch",
      rating: j.puzzle.rating,
      url: `https://lichess.org/training/${j.puzzle.id}`,
    };
  } catch {
    const day = Math.floor(Date.now() / 86_400_000);
    return (local as Puzzle[])[day % local.length];
  }
}
