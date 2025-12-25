import { useEffect, useState } from "react";
import api from "../../api";
import Modal from "./Modal";
import styles from "../styles/ProjectsManager.module.css";

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    before_image: null,
    after_image: null,
  });
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects/admin"); // backend route for CMS
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openModal = (project = null) => {
    if (project) {
      setEditingId(project.id);
      setForm({
        title: project.title,
        category: project.category,
        before_image: project.before_image,
        after_image: project.after_image,
        featured: project.featured === 1, // convert 0/1 to boolean
      });
    } else {
      setEditingId(null);
      setForm({
        title: "",
        category: "",
        before_image: null,
        after_image: null,
        featured: false,
      });
      setBeforeFile(null);
      setAfterFile(null);
    }
    setModalOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent multiple clicks
    setLoading(true);

    const data = new FormData();
    data.append("title", form.title);
    data.append("category", form.category);
    data.append("featured", form.featured ? 1 : 0);
    if (beforeFile) data.append("before_image", beforeFile);
    if (afterFile) data.append("after_image", afterFile);

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, data);
      } else {
        await api.post("/projects", data);
      }

      // Reset form
      setModalOpen(false);
      setBeforeFile(null);
      setAfterFile(null);
      setForm({
        title: "",
        category: "",
        before_image: null,
        after_image: null,
        featured: false,
      });
      setEditingId(null);

      loadProjects(); // refresh list
    } catch (err) {
      console.error("Failed to save project:", err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      loadProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  return (
    <div className={styles["cms-container"]}>
      <h2>Projects</h2>
      <button
        className={`${styles["cms-button"]} ${styles["add-btn"]}`}
        onClick={() => openModal()}
      >
        Add New Project
      </button>

      <table className={styles["cms-table"]}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Before</th>
            <th>After</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>
                {p.before_image && (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${
                      p.before_image
                    }`}
                    width="80"
                    alt={`${p.title} before`}
                  />
                )}
              </td>
              <td>
                {p.after_image && (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${
                      p.after_image
                    }`}
                    width="80"
                    alt={`${p.title} after`}
                  />
                )}
              </td>
              <td>
                <button
                  className={`${styles["cms-button"]} ${styles["edit-btn"]}`}
                  onClick={() => openModal(p)}
                >
                  Edit
                </button>
                <button
                  className={`${styles["cms-button"]} ${styles["delete-btn"]}`}
                  onClick={() => remove(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h3>{editingId ? "Edit Project" : "Add Project"}</h3>
        <form onSubmit={submit} className={styles["cms-form"]}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            placeholder="Category/Description"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <label>
            Before Image
            <input
              type="file"
              onChange={(e) => setBeforeFile(e.target.files[0])}
            />
          </label>
          <label>
            After Image
            <input
              type="file"
              onChange={(e) => setAfterFile(e.target.files[0])}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update" : "Add"} Project
          </button>
        </form>
      </Modal>
    </div>
  );
}
