import { useEffect, useState } from "react";
import api from "../../api"; // axios instance
import Modal from "./Modal";
import styles from "../styles/ProjectsManager.module.css";

export default function SEOManager() {
  const [seoList, setSeoList] = useState([]); // list of SEO entries
  const [isModalOpen, setModalOpen] = useState(false);
  const [seoForm, setSeoForm] = useState({
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    og_title: "",
    og_description: "",
    og_image: "",
  });
  const [editingSlug, setEditingSlug] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load all SEO entries
  const loadSEO = async () => {
    try {
      const res = await api.get("/seo"); // GET all SEO entries
      setSeoList(res.data);
    } catch (err) {
      console.error("Failed to load SEO:", err);
    }
  };

  useEffect(() => {
    loadSEO();
  }, []);

  const openModal = (entry = null) => {
    if (entry) {
      setEditingSlug(entry.page_slug);
      setSeoForm(entry);
    } else {
      setEditingSlug(null);
      setSeoForm({
        page_slug: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        og_title: "",
        og_description: "",
        og_image: "",
      });
    }
    setModalOpen(true);
  };

  const saveSEO = async (e) => {
    e.preventDefault();
    if (!seoForm.page_slug || loading) return;
    setLoading(true);

    try {
      await api.put(`/seo/${seoForm.page_slug}`, seoForm);
      setModalOpen(false);
      setEditingSlug(null);
      setSeoForm({
        page_slug: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        og_title: "",
        og_description: "",
        og_image: "",
      });
      loadSEO();
    } catch (err) {
      console.error("Failed to save SEO:", err);
      alert("Error saving SEO");
    } finally {
      setLoading(false);
    }
  };

  const removeSEO = async (slug) => {
    if (!window.confirm(`Delete SEO for "${slug}"?`)) return;
    try {
      await api.delete(`/seo/${slug}`);
      loadSEO();
    } catch (err) {
      console.error("Failed to delete SEO:", err);
      alert("Error deleting SEO");
    }
  };

  return (
    <div className={styles["cms-container"]}>
      <h2>SEO Manager</h2>

      <button
        className={`${styles["cms-button"]} ${styles["add-btn"]}`}
        onClick={() => openModal()}
      >
        Add SEO for New Page
      </button>

      <table className={styles["cms-table"]}>
        <thead>
          <tr>
            <th>Page Slug</th>
            <th>Meta Title</th>
            <th>OG Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {seoList.map((s) => (
            <tr key={s.page_slug}>
              <td>{s.page_slug}</td>
              <td>{s.meta_title || "-"}</td>
              <td>{s.og_title || "-"}</td>
              <td>
                <button
                  className={`${styles["cms-button"]} ${styles["edit-btn"]}`}
                  onClick={() => openModal(s)}
                >
                  Edit
                </button>
                <button
                  className={`${styles["cms-button"]} ${styles["delete-btn"]}`}
                  onClick={() => removeSEO(s.page_slug)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h3>{editingSlug ? `Edit SEO for ${editingSlug}` : "Add SEO"}</h3>
        <form onSubmit={saveSEO} className={styles["cms-form"]}>
          <input
            placeholder="Page Slug"
            value={seoForm.page_slug}
            onChange={(e) =>
              setSeoForm({ ...seoForm, page_slug: e.target.value })
            }
            required
            disabled={!!editingSlug} // prevent changing slug while editing
          />
          <input
            placeholder="Meta Title"
            value={seoForm.meta_title}
            onChange={(e) =>
              setSeoForm({ ...seoForm, meta_title: e.target.value })
            }
          />
          <textarea
            placeholder="Meta Description"
            rows={3}
            value={seoForm.meta_description}
            onChange={(e) =>
              setSeoForm({ ...seoForm, meta_description: e.target.value })
            }
          />
          <input
            placeholder="Meta Keywords"
            value={seoForm.meta_keywords}
            onChange={(e) =>
              setSeoForm({ ...seoForm, meta_keywords: e.target.value })
            }
          />
          <input
            placeholder="OG Title"
            value={seoForm.og_title}
            onChange={(e) =>
              setSeoForm({ ...seoForm, og_title: e.target.value })
            }
          />
          <textarea
            placeholder="OG Description"
            rows={3}
            value={seoForm.og_description}
            onChange={(e) =>
              setSeoForm({ ...seoForm, og_description: e.target.value })
            }
          />
          <input
            placeholder="OG Image URL"
            value={seoForm.og_image}
            onChange={(e) =>
              setSeoForm({ ...seoForm, og_image: e.target.value })
            }
          />
          <button
            type="submit"
            className={`${styles["cms-button"]} ${styles["edit-btn"]}`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save SEO"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
