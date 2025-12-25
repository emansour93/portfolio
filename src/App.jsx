import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import ServicesPage from "./pages/ServicesPage";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import AdminLayout from "./components/admin/AdminLayout";
import HeroManager from "./components/admin/HeroManager";
import ServicesManager from "./components/admin/ServicesManager";
import ProjectsManager from "./components/admin/ProjectsManager";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route element={<AdminLayout />}>
          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/hero"
            element={
              <ProtectedRoute>
                <HeroManager />
                <ServicesManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ServicesManager"
            element={
              <ProtectedRoute>
                <ServicesManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ProjectsManager"
            element={
              <ProtectedRoute>
                <ProjectsManager />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
