import { useEffect, useState } from "react";
import api from "../../api"; // your axios instance
import Modal from "./Modal";
import styles from "../styles/ProjectsManager.module.css";

export default function PagesManager() {
  const [pages, setPages] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load all pages from backend
  const loadPages = async () => {
    try {
      const res = await api.get("/pages"); // You need a GET /pages route
      setPages(res.data);
    } catch (err) {
      console.error("Failed to load pages:", err);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const openModal = (page = null) => {
    if (page) {
      setEditingId(page.id);
      setForm({
        title: page.title,
        slug: page.slug,
        content: page.content,
      });
    } else {
      setEditingId(null);
      setForm({ title: "", slug: "", content: "" });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (editingId) {
        await api.put(`/pages/${form.slug}`, {
          title: form.title,
          content: form.content,
        });
      } else {
        await api.post("/pages", form); // POST /pages for new page
      }

      setModalOpen(false);
      setForm({ title: "", slug: "", content: "" });
      setEditingId(null);
      loadPages();
    } catch (err) {
      alert("Error saving page: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (page) => {
    if (!window.confirm(`Delete page "${page.title}"?`)) return;
    try {
      await api.delete(`/pages/${page.slug}`);
      loadPages();
    } catch (err) {
      alert("Error deleting page: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className={styles["cms-container"]}>
      <h2>Pages Manager</h2>
      <button
        className={`${styles["cms-button"]} ${styles["add-btn"]}`}
        onClick={() => openModal()}
      >
        Add New Page
      </button>

      <table className={styles["cms-table"]}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.slug}</td>
              <td>
                <button
                  className={`${styles["cms-button"]} ${styles["edit-btn"]}`}
                  onClick={() => openModal(p)}
                >
                  Edit
                </button>
                <button
                  className={`${styles["cms-button"]} ${styles["delete-btn"]}`}
                  onClick={() => remove(p)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h3>{editingId ? "Edit Page" : "Add New Page"}</h3>
        <form onSubmit={handleSave} className={styles["cms-form"]}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            placeholder="Slug [about, privacy, terms]"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
            disabled={editingId !== null} // prevent editing slug
          />
          <textarea
            placeholder="Content"
            rows={10}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update" : "Add"} Page
          </button>
        </form>
      </Modal>
    </div>
  );
}
