import { useEffect, useState } from "react";
import api from "../../api";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await api.get("/images");
    setImages(res.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    await api.post("/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setTitle("");
    setFile(null);
    fetchImages();
  };
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className={styles["cms-container"]}>
      <h2>Dashboard</h2>
    </div>
  );
}
