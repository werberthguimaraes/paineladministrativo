import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logo from "./../../assets/inorte2.png";

export default function MenuLateral() {
  return (
    <ul
      style={{ position: "fixed", background: "#2e4f9e" }}
      className="navbar-nav  sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">
          <img width={180} src={logo} />
          <sup> 0.1.1</sup>
        </div>
      </a>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item">
        <Link className="nav-link" to="/">
          Dashboard
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Monitorar</div>

      <li className="nav-item">
        <Link className="nav-link" to="/contingencias">
          Contingências
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/terminais">
          Terminais
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/certificados">
          Certificados
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}
