// Zapis treści do repozytorium na GitHubie — Vercel po każdym commicie sam przebudowuje stronę.
const REPO = process.env.GITHUB_REPO || "kmiecikadr-lang/akmiecik-pl";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const API = `https://api.github.com/repos/${REPO}/contents`;

const headers = () => ({
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
});

export const githubReady = () => Boolean(process.env.GITHUB_TOKEN);

export async function readJson<T>(path: string): Promise<{ data: T; sha: string }> {
  const r = await fetch(`${API}/${path}?ref=${BRANCH}`, { headers: headers(), cache: "no-store" });
  if (!r.ok) throw new Error(`GitHub ${r.status}: nie udało się odczytać ${path}`);
  const j = await r.json();
  return { data: JSON.parse(Buffer.from(j.content, "base64").toString("utf8")) as T, sha: j.sha };
}

export async function writeJson(path: string, data: unknown, message: string) {
  const { sha } = await readJson(path);
  const r = await fetch(`${API}/${path}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      message,
      branch: BRANCH,
      sha,
      content: Buffer.from(JSON.stringify(data, null, 2) + "\n", "utf8").toString("base64"),
    }),
  });
  if (!r.ok) throw new Error(`GitHub ${r.status}: nie udało się zapisać ${path}`);
}
