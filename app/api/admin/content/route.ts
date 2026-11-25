import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { githubReady, readJson, writeJson } from "@/lib/github";
import type { Book, Post } from "@/lib/content";
import bundledPosts from "@/content/posts.json";
import bundledBooks from "@/content/books.json";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Brak dostępu." }, { status: 401 });
  if (!githubReady()) return NextResponse.json({ books: bundledBooks, posts: bundledPosts, readOnly: true });
  try {
    const [b, p] = await Promise.all([readJson<Book[]>("content/books.json"), readJson<Post[]>("content/posts.json")]);
    return NextResponse.json({ books: b.data, posts: p.data, readOnly: false });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Brak dostępu." }, { status: 401 });
  if (!githubReady()) return NextResponse.json({ error: "Brak GITHUB_TOKEN — zapis wyłączony." }, { status: 503 });
  const { books, posts } = (await req.json()) as { books?: Book[]; posts?: Post[] };
  try {
    if (books) await writeJson("content/books.json", books, "Projekt 52: aktualizacja z panelu");
    if (posts) await writeJson("content/posts.json", posts, "Blog: aktualizacja z panelu");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
