import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function MenuLateral() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
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
          InoDash <sup>0.1.1</sup>
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

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
}
