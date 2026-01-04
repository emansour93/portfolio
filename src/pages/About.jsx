import { useEffect, useState } from "react";
import { getPage } from "../api.js";

export default function About() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    getPage("about").then((res) => setPage(res.data));
  }, []);

  if (!page)
    return <div className="container py-5 text-center">Loading...</div>;

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
