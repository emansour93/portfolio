"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" }); // send stored token cookie
        console.log("/api/admin/me status", res.status, "set-cookie header", res.headers.get("set-cookie"));
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("dashboard fetch failed", err);
        router.push("/admin/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout");
    router.push("/admin/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {user && (
        <p>
          Welcome, {user.name} ({user.email})
        </p>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
