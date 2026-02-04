import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingCallButton from "./FloatingCallButton";

export default function MainLayout() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
      <Footer />
      <FloatingCallButton />
    </>
  );
}
