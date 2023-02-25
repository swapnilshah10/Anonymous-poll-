import React from "react";
import "./css/Footer.css";
let style = {
  color: "rgb(13, 12, 12)"
}
function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-left">
            <pre>
          <i className="fas fa-map-marker-alt"></i>123 Main St, Anytown USA,   
          <i className="fas fa-envelope"></i><a style={style} href="mailto:info@pollapp.com">info@pollapp.com,</a>
          <i className="fas fa-phone"></i><a style={style} href="tel:(555)-555-5555">(555)-555-5555</a>
          </pre>
        </div>
        <div className="footer-right">
          <a href="#">Contact Us</a>
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
