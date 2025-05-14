import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <h3>About ShopNest</h3>
          <p>
            ShopNest is your one-stop online destination for top-quality products across
            fashion, electronics, home essentials, and more. Discover the latest trends,
            shop exclusive deals, and enjoy a seamless shopping experience from the comfort of your home.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/#about">About Us</a></li>
            <li><a href="/#contact">Contact</a></li>
            <li><a href="/#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 ShopNest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
