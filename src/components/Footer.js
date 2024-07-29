import React from "react";

import "../css/footer.css";

const Footer = () => {
  return (    
    <footer className="bg-dark fixed-bottom">    
      <div className="container">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">
              Linkedin
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">
              GitHub
            </a>
          </li>
        </ul>
        <p className="text-center text-white">© Alkemy Challenge</p>
      </div>
      </footer>
  );
};

export default Footer;
