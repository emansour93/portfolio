"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setSuccess("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Nav />

      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Contact Us
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && <p className="text-center text-sm mt-2">{success}</p>}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
