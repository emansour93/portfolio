import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Overlay div to capture clicks outside the sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 900,
          }}
        />
      )}

      {/* Main content */}
      <div
        style={{
          marginLeft: sidebarOpen ? 220 : 0,
          width: "100%",
          transition: "margin-left 0.3s",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
