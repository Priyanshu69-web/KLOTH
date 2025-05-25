import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "../../styles/Footer.css"

function Footer() {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row gy-4">
          {/* Social Links */}
          <div className="col-md-4">
            <h5 className="text-warning mb-3">Stay Connected</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none d-flex align-items-center"
                >
                  <FontAwesomeIcon icon={faFacebook} className="me-2 fs-5" />
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none d-flex align-items-center"
                >
                  <FontAwesomeIcon icon={faTwitter} className="me-2 fs-5" />
                  Twitter
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none d-flex align-items-center"
                >
                  <FontAwesomeIcon icon={faInstagram} className="me-2 fs-5" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="col-md-4">
            <h5 className="text-warning mb-3">Useful Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-light text-decoration-none">Home</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-light text-decoration-none">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-light text-decoration-none">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h5 className="text-warning mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <FontAwesomeIcon icon={faPhone} className="me-2 text-white-50" />
                <a href="tel:+91-93181234" className="text-light text-decoration-none">+91-93181234</a>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <FontAwesomeIcon icon={faPhone} className="me-2 text-white-50" />
                <a href="tel:+91-963198765" className="text-light text-decoration-none">+91-963198765</a>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <FontAwesomeIcon icon={faEnvelope} className="me-2 text-white-50" />
                <a href="mailto:info@ecom.com" className="text-light text-decoration-none">info@ecom.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center mt-4 border-top border-secondary pt-3">
          <p className="mb-0 small">© 2025 E-Commerce Website. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
