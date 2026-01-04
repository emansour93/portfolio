import { useEffect, useState } from "react";
import { getPage, updatePage } from "../api.js";

export default function AdminPageEditor({ slug }) {
  const [page, setPage] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getPage(slug)
      .then((res) => setPage(res.data))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePage(slug, page);
      alert("Page updated successfully!");
    } catch (err) {
      alert("Error updating page: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading page...</div>;

  return (
    <div className="container py-5">
      <h1>Edit {slug} Page</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={page.title}
          onChange={(e) => setPage({ ...page, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          rows={10}
          value={page.content}
          onChange={(e) => setPage({ ...page, content: e.target.value })}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
