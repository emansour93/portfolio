import { useEffect, useState } from "react";
import api from "../../api";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className={styles["cms-container"]}>
      <h2>Dashboard</h2>
    </div>
  );
}
