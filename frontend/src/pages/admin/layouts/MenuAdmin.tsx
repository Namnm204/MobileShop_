import React from "react";
import { Link } from "react-router-dom";

const MenuAdmin = () => {
  return (
    <div>
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-light navbar-light">
          <a href="index.html" className="navbar-brand mx-4 mb-3">
            <h3 className="text-primary">
              <i className="fa fa-hashtag me-2" />
              ADMIN
            </h3>
          </a>
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
            <a href="form.html" className="nav-item nav-link">
              <i className="fa fa-keyboard me-2" />
              Forms
            </a>
            <a href="table.html" className="nav-item nav-link">
              <i className="fa fa-table me-2" />
              Tables
            </a>
            <a href="chart.html" className="nav-item nav-link">
              <i className="fa fa-chart-bar me-2" />
              Charts
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="far fa-file-alt me-2" />
                Pages
              </a>
              <div className="dropdown-menu bg-transparent border-0">
                <a href="signin.html" className="dropdown-item">
                  Sign In
                </a>
                <a href="signup.html" className="dropdown-item">
                  Sign Up
                </a>
                <a href="404.html" className="dropdown-item">
                  404 Error
                </a>
                <a href="blank.html" className="dropdown-item">
                  Blank Page
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MenuAdmin;
