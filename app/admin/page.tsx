import { isAdmin, isConfigured } from "@/lib/auth";
import Login from "./Login";
import AdminApp from "./AdminApp";

export const dynamic = "force-dynamic";
export const metadata = { title: "Panel — akmiecik.pl", robots: { index: false, follow: false } };

export default async function Admin() {
  if (!isConfigured())
    return (
      <main className="flex min-h-screen items-center justify-center p-6 text-center">
        <p className="max-w-sm text-mist">Panel nie jest jeszcze skonfigurowany. Ustaw zmienną ADMIN_PASSWORD w Vercelu.</p>
      </main>
    );
  return (await isAdmin()) ? <AdminApp /> : <Login />;
}
