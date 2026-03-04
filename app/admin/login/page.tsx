"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) return setError("Email and password are required");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ensure cookie from response is stored
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("login response", res.status, "set-cookie: ", res.headers.get("set-cookie"));
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        console.log("login OK, navigating");
        await router.push("/admin/dashboard");
        // this should log the new URL; if it doesn’t appear you never left
        console.log("after push", window.location.href);
        console.log("document.cookie after login", document.cookie);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-6"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
