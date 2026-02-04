import { FaPhoneAlt } from "react-icons/fa";

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+18503742784"
      className="floating-call-btn"
      aria-label="Call Now 850-374-2784"
    >
      <FaPhoneAlt />
      <span className="call-tooltip">Call Now: 850-374-2784</span>
    </a>
  );
}
