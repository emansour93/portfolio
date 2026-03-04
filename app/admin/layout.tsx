"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Don't check auth on the login page itself
    if (pathname === "/admin/login") {
      setChecked(true);
      return;
    }

    fetch("/api/admin/me")
      .then((res) => {
        if (!res.ok) router.replace("/admin/login");
        else setChecked(true);
      })
      .catch(() => router.replace("/admin/login"));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout");
    router.push("/admin/login");
  };

  // Don't render anything until auth is confirmed
  if (!checked) return null;

  // On login page, render children only (no sidebar)
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex-1 flex flex-col gap-4">
          <Link
            href="/admin/dashboard"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Dashboard
          </Link>
          <Link href="/admin/users" className="hover:bg-gray-700 p-2 rounded">
            Users
          </Link>
          <Link href="/admin/hero" className="hover:bg-gray-700 p-2 rounded">
            Hero Section
          </Link>
          <Link
            href="/admin/collections"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Collections
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 text-white p-2 rounded"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}
