// Contact.jsx
import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create the body of the email with the user's input
    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;

    // Open the mailto link
    window.location.href = `mailto:saarock4646@gmail.com?subject=New Message from ${formData.name}&body=${encodeURIComponent(emailBody)}`;

    // Reset the form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="sb-contact">
      <div className="sb-contact-overlay"></div>
      <div className="sb-contact-content">
        <h1 className="sb-contact-title">Contact Us</h1>
        <p className="sb-contact-subtitle">
          We'd love to hear from you! Drop us a message.
        </p>

        <div className="sb-contact-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
