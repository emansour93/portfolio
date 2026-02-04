import { useState } from "react";
import { sendFreeEstimate } from "../api";

export default function FreeEstimate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    contactMethod: "",
    timeline: "",
    projectDetails: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await sendFreeEstimate(formData);
      if (res.status === 200) {
        setMessage("Thank you! We will contact you shortly.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          contactMethod: "",
          timeline: "",
          projectDetails: "",
        });
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-top-margin">
      <section className="contact py-5">
        <div className="container">
          <div className="free-estimate-page container py-5">
            <h1 className="mb-4 text-center">Request Your Free Estimate</h1>

            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}

            <form
              onSubmit={handleSubmit}
              className="estimate-form mx-auto"
              style={{ maxWidth: "600px" }}
            >
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label">Address / Location</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Contact Method */}
              <div className="mb-3">
                <label className="form-label d-block">
                  Best way to reach you *
                </label>
                {["Phone Call", "Text Message", "Email"].map((method) => (
                  <div className="form-check form-check-inline" key={method}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="contactMethod"
                      value={method}
                      onChange={handleChange}
                      required
                      checked={formData.contactMethod === method}
                    />
                    <label className="form-check-label">{method}</label>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="mb-3">
                <label className="form-label">What is your timeline? *</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1–2 weeks">1–2 weeks</option>
                  <option value="1 month">Within 1 month</option>
                  <option value="Flexible">Flexible / Not sure</option>
                </select>
              </div>

              {/* Project Details */}
              <div className="mb-3">
                <label className="form-label">Describe Your Project *</label>
                <textarea
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  required
                  className="form-control"
                  rows="4"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
