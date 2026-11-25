// Wpisy na blogu — najnowszy na górze. Akapity jako osobne elementy tablicy.
export type Post = { slug: string; title: string; date: string; excerpt: string; body: string[] };

export const posts: Post[] = [
  {
    slug: "projekt-52-start",
    title: "Projekt 52: rok, 52 książki",
    date: "2026-11-30",
    excerpt: "Jedna książka tygodniowo przez rok. Zaczynam od „12-tygodniowego roku”.",
    body: [
      "Mam w domu sporo książek o biznesie, sprzedaży i rozwoju. Czas je w końcu przeczytać — systematycznie, a nie „kiedyś”.",
      "Zasada jest prosta: jedna książka tygodniowo, 52 w rok. Po każdej krótka notatka: co z niej biorę do pracy i do życia.",
      "Na start „12-tygodniowy rok” — o planowaniu w krótkich cyklach zamiast rocznych postanowień. Pasuje idealnie, bo właśnie zaczynam swój pierwszy 12-tygodniowy plan.",
      "Postępy na bieżąco w zakładce Projekt 52.",
    ],
  },
];

// Projekt 52 — status: "czytam" albo "przeczytana"
export type Book = { title: string; author: string; status: "czytam" | "przeczytana"; finished?: string; note?: string };

export const books: Book[] = [
  { title: "12-tygodniowy rok", author: "Brian P. Moran, Michael Lennington", status: "czytam" },
];

export const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
