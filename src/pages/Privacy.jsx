import { useEffect, useState } from "react";
import { getPage } from "../api.js";

export default function Privacy() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    getPage("privacy").then((res) => setPage(res.data));
  }, []);

  if (!page)
    return (
      <main className="main-top-margin">
        <div className="container py-5 text-center">Loading...</div>
      </main>
    );
  return (
    <main className="main-top-margin">
      <section className="about py-5">
        <div className="container">
          <h1>{page.title}</h1>
          <p style={{ whiteSpace: "pre-line" }}>{page.content}</p>
        </div>
      </section>
    </main>
  );
}
