import React from "react";
import { Link } from "react-router-dom";
import Buscador from "./Buscador";

const Header = (props) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">PeliculApp</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/listado" className="nav-link">Listado</Link>
              </li>
              <li className="nav-item">
                <Link to="/favoritos" className="nav-link">Favoritos</Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <span className="text-success">
                  {
                    props.favorites.length > 0 && <>Peliculas en Favoritos: {props.favorites.length}</>
                  }                  
                </span>
              </li>
            </ul>
          </div>
          <Buscador />       
        </div>
      </nav>
    </header>
  );
};

export default Header;
