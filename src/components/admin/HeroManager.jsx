import { useEffect, useState } from "react";
import api from "../../api";
import Modal from "./Modal";
import styles from "../styles/HeroManager.module.css";

export default function HeroManager() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [slides, setSlides] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    button1_text: "",
    button1_link: "",
    display_order: 1,
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const loadSlides = async () => {
    const res = await api.get("/hero-slides/admin");
    setSlides(res.data);
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const openModal = (slide = null) => {
    if (slide) {
      setEditingId(slide.id);
      setForm(slide);
    } else {
      setEditingId(null);
      setForm({
        title: "",
        subtitle: "",
        button1_text: "",
        button1_link: "",
        display_order: 1,
      });
    }
    setModalOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((k) => data.append(k, form[k]));
    if (file) data.append("image", file);

    if (editingId) await api.put(`/hero-slides/${editingId}`, data);
    else await api.post("/hero-slides", data);

    setModalOpen(false);
    setFile(null);
    loadSlides();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete slide?")) return;
    await api.delete(`/hero-slides/${id}`);
    loadSlides();
  };

  return (
    <div className={styles["cms-container"]}>
      <h2>Hero Slides</h2>
      <button
        className={`${styles["cms-button"]} ${styles["add-btn"]}`}
        onClick={() => openModal()}
      >
        Add New Slide
      </button>

      <table className={styles["cms-table"]}>
        <thead>
          <tr>
            <th>Order</th>
            <th>Image</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slides.map((s) => (
            <tr key={s.id}>
              <td>{s.display_order}</td>
              <td>
                <img
                  src={`${API_BASE}/uploads/${s.image}`}
                  width="80"
                  alt={s.title}
                />
              </td>
              <td>{s.title}</td>
              <td>
                <button
                  className={`${styles["cms-button"]} ${styles["edit-btn"]}`}
                  onClick={() => openModal(s)}
                >
                  Edit
                </button>
                <button
                  className={`${styles["cms-button"]} ${styles["delete-btn"]}`}
                  onClick={() => remove(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h3>{editingId ? "Edit Slide" : "Add Slide"}</h3>
        <form onSubmit={submit}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            required
          />
          <input
            placeholder="Button Text"
            value={form.button1_text}
            onChange={(e) => setForm({ ...form, button1_text: e.target.value })}
          />
          <input
            placeholder="Button Link"
            value={form.button1_link}
            onChange={(e) => setForm({ ...form, button1_link: e.target.value })}
          />
          <input
            type="number"
            placeholder="Order"
            value={form.display_order}
            onChange={
              (e) =>
                setForm({ ...form, display_order: parseInt(e.target.value) }) // convert to number
            }
          />
          {file || form.image ? (
            <div style={{ marginBottom: "10px" }}>
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : `${API_BASE}/uploads/${form.image}`
                }
                alt="Preview"
                style={{
                  width: "150px",
                  borderRadius: "5px",
                  objectFit: "cover",
                }}
              />
            </div>
          ) : null}

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <button type="submit">{editingId ? "Update" : "Add"} Slide</button>
        </form>
      </Modal>
    </div>
  );
}
