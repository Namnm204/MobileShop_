import React from "react";
import { Link } from "react-router-dom";

const MenuAdmin = () => {
  return (
    <div>
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-light navbar-light">
          <Link to="/admin/products" className="navbar-brand mx-4 mb-3">
            <h3 className="text-primary">ADMIN</h3>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle"
                src="../../../../dist/img/anh hacker.jpg"
                alt=""
                style={{ width: 40, height: 40 }}
              />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Nhóm 10</h6>
              <span>Admin</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <a href="index.html" className="nav-item nav-link">
              <i className="fa fa-tachometer-alt me-2" />
              Dashboard
            </a>
            <Link to="/admin/products" className="nav-item nav-link">
              <i className="bi bi-kanban"></i>
              Product
            </Link>
            <Link to="/admin/category" className="nav-item nav-link">
              <i className="fa fa-th me-2" />
              Category
            </Link>
            <Link to="/admin/users" className="nav-item nav-link">
              <i className="fa fa-light fa-users" />
              User
            </Link>
            <a href="#" className="nav-item nav-link">
              <i className="fa fa-keyboard me-2" />
              Forms
            </a>
            <a href="#" className="nav-item nav-link">
              <i className="fa fa-table me-2" />
              Tables
            </a>
            <a href="#" className="nav-item nav-link">
              <i className="fa fa-chart-bar me-2" />
              Charts
            </a>
            <Link to="/" className="nav-item nav-link">
              <i className="fa fa-solid fa-house" />
              Home
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MenuAdmin;
