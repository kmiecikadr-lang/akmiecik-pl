import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import type { Book, Post } from "@/lib/content";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Msg = { role: "user" | "assistant"; content: string };

const MODEL = process.env.AI_MODEL || "claude-sonnet-5-5";

const system = (today: string) => `Jesteś asystentem Adriana Kmiecika, który prowadzi jego stronę akmiecik.pl: Projekt 52 (52 książki w rok) i bloga.
Dzisiaj jest ${today}. Odpowiadasz po polsku, krótko i konkretnie.

Zasady:
- Zawsze odpowiadasz przez narzędzie "odpowiedz". Pole "reply" to Twoja wiadomość do Adriana.
- Gdy Adrian chce coś zmienić (dodać książkę, oznaczyć jako przeczytaną, napisać lub poprawić wpis), zwróć PEŁNĄ, zaktualizowaną listę w polu "books" i/lub "posts". Nie zwracaj listy, której nie zmieniasz.
- Nie usuwaj niczego, o co Adrian nie prosił. Zachowaj kolejność istniejących pozycji.
- Nigdy nie wymyślaj wniosków z książek, opinii ani faktów z życia Adriana. Jeśli czegoś brakuje (np. wniosków po książce), dopytaj w "reply" i nie zwracaj zmian.
- Notatka do książki ("note"): 1–3 zdania na podstawie słów Adriana, w pierwszej osobie.
- Statusy książek: "czytam", "przeczytana", "w kolejce". Przeczytana ma "finished" (RRRR-MM-DD). Zwykle tylko jedna książka ma status "czytam".
- Jeśli nie znasz autora książki na pewno, zapytaj zamiast zgadywać.
- Wpisy: slug małymi literami bez polskich znaków, słowa łączone myślnikiem; date RRRR-MM-DD; excerpt jedno zdanie; body to tablica krótkich akapitów. Wpisy o AI mają "category": "ai".
- Styl wpisów: pierwsza osoba, rzeczowo i po ludzku, bez reklamowych frazesów i bez przesadnych emocji. Pisz na podstawie tego, co przekazał Adrian.
- Po oznaczeniu książki jako przeczytanej możesz zaproponować krótki wpis na bloga — ale stwórz go dopiero, gdy Adrian się zgodzi.
- W "reply" napisz krótko, co zmieniasz. Adrian zatwierdzi zmiany przyciskiem przed publikacją.`;

const bookSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    author: { type: "string" },
    status: { type: "string", enum: ["czytam", "przeczytana", "w kolejce"] },
    finished: { type: "string" },
    note: { type: "string" },
  },
  required: ["title", "author", "status"],
};

const postSchema = {
  type: "object",
  properties: {
    slug: { type: "string" },
    title: { type: "string" },
    date: { type: "string" },
    excerpt: { type: "string" },
    body: { type: "array", items: { type: "string" } },
    category: { type: "string", enum: ["ai"] },
  },
  required: ["slug", "title", "date", "excerpt", "body"],
};

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Brak dostępu." }, { status: 401 });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ error: "Asystent nie jest jeszcze skonfigurowany (brak ANTHROPIC_API_KEY)." }, { status: 503 });

  const { messages, books, posts } = (await req.json()) as { messages: Msg[]; books: Book[]; posts: Post[] };
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Warsaw" });
  const context = `Aktualny stan strony (JSON):\nKSIĄŻKI: ${JSON.stringify(books)}\nWPISY: ${JSON.stringify(posts)}`;

  const apiMessages = messages.slice(-20).map((m, i, arr) =>
    i === arr.length - 1 && m.role === "user" ? { role: m.role, content: `${context}\n\n---\n${m.content}` } : m,
  );

  const r = await fetch(`${process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com"}/v1/messages`, {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4000,
      system: system(today),
      messages: apiMessages,
      tools: [
        {
          name: "odpowiedz",
          description: "Odpowiedź dla Adriana i ewentualne zaktualizowane listy książek lub wpisów.",
          input_schema: {
            type: "object",
            properties: {
              reply: { type: "string" },
              books: { type: "array", items: bookSchema },
              posts: { type: "array", items: postSchema },
            },
            required: ["reply"],
          },
        },
      ],
      tool_choice: { type: "tool", name: "odpowiedz" },
    }),
  });

  if (!r.ok) {
    const t = await r.text();
    return NextResponse.json({ error: `Błąd AI (${r.status}): ${t.slice(0, 200)}` }, { status: 502 });
  }
  const j = await r.json();
  const tool = (j.content || []).find((c: { type: string }) => c.type === "tool_use");
  if (!tool) return NextResponse.json({ error: "Asystent nie zwrócił odpowiedzi." }, { status: 502 });
  return NextResponse.json(tool.input);
}
