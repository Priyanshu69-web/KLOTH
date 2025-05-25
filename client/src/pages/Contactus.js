import React from "react";
import Layout from "../commponets/Layouts/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
const Contactus = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <div className="container">
            <h2 className="text-center fw-bold mb-4">Get in Touch</h2>
            <p className="text-center text-muted mb-5">
              Have questions? We're here to help! Contact us via the form below, email, or phone.
            </p>
            <div className="row">
              {/* Contact Form */}
              <div className="col-md-6">
                <h4 className="mb-3">Send Us a Message</h4>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" placeholder="Enter your email" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="4" placeholder="Write your message" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary px-4">Send Message</button>
                </form>
              </div>

              <div className="col-md-6">
                <h4 className="mb-3">Contact Information</h4>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-primary" />
                    123 E-Commerce Street, City, Country
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faPhone} className="me-2 text-primary" />
                    +91-93181234 / +91-963198765
                  </li>
                  <li className="mb-3">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2 text-primary" />
                    info@ecom.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </Layout>
  );
};

export default Contactus;