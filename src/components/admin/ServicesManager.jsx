import { useState, useEffect } from "react";
import api from "../../api";
import Modal from "./Modal";
import styles from "../styles/HeroManager.module.css";

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    display_order: 1,
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const loadServices = async () => {
    try {
      const res = await api.get("/services/admin");
      console.log(res.data); // check what backend returns
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load services:", err);
      setServices([]);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openModal = (service = null) => {
    if (service) {
      setEditingId(service.id);
      setForm(service);
    } else {
      setEditingId(null);
      setForm({ title: "", description: "", display_order: 1 });
      setFile(null);
    }
    setModalOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((k) => data.append(k, form[k]));
    if (file) data.append("image", file);

    if (editingId) await api.put(`/services/${editingId}`, data);
    else await api.post("/services", data);

    setModalOpen(false);
    setFile(null);
    loadServices();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete service?")) return;
    await api.delete(`/services/${id}`);
    loadServices();
  };
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className={styles["cms-container"]}>
      <h2>Services</h2>
      <button
        className={`${styles["cms-button"]} ${styles["add-btn"]}`}
        onClick={() => openModal()}
      >
        Add New Service
      </button>

      <table className={styles["cms-table"]}>
        <thead>
          <tr>
            <th>Order</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(services) &&
            services.map((s) => (
              <tr key={s.id}>
                <td>{s.display_order}</td>
                <td>
                  {s.image && (
                    <img src={`${API_BASE}/uploads/${s.image}`} width="80" />
                  )}
                </td>
                <td>{s.title}</td>
                <td>{s.description}</td>
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
        <h3>{editingId ? "Edit Service" : "Add Service"}</h3>
        <form onSubmit={submit}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Order"
            value={form.display_order}
            onChange={(e) =>
              setForm({ ...form, display_order: e.target.value })
            }
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">{editingId ? "Update" : "Add"} Service</button>
        </form>
      </Modal>
    </div>
  );
}
