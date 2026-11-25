import postsData from "@/content/posts.json";
import booksData from "@/content/books.json";

// Treści edytowane z panelu /admin (zapis do content/*.json w repozytorium).
export type Post = { slug: string; title: string; date: string; excerpt: string; body: string[]; category?: "ai" };
export type Book = { title: string; author: string; status: "czytam" | "przeczytana" | "w kolejce"; finished?: string; note?: string };

export const posts = (postsData as Post[]).slice().sort((a, b) => b.date.localeCompare(a.date));
export const books = booksData as Book[];

export const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
