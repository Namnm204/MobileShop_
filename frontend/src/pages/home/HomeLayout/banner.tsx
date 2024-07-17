import React from "react";

const Banner = () => {
  return (
    <div>
      <>
        {/* Modal Search Start */}
        <div
          className="modal fade"
          id="searchModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Search by keyword
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body d-flex align-items-center">
                <div className="input-group w-75 mx-auto d-flex">
                  <input
                    type="search"
                    className="form-control p-3"
                    placeholder="keywords"
                    aria-describedby="search-icon-1"
                  />
                  <span id="search-icon-1" className="input-group-text p-3">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Search End */}
        <>
          {/* Hero Start */}
          <div className="container-fluid py-5 mb-5 hero-header">
            <div className="container py-5">
              <div className="row g-5 align-items-center">
                <div className="col-md-12 col-lg-7">
                  <h4 className="mb-3 text-secondary">
                    Điên thoại chính hãng 100%
                  </h4>
                  <h1 className="mb-5 display-3 text-primary">
                    Iphone &amp; Oppo...
                  </h1>
                  <div className="position-relative mx-auto">
                    <input
                      className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                      type="number"
                      placeholder="Search"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
                      style={{ top: 0, right: "25%" }}
                    >
                      Submit Now
                    </button>
                  </div>
                </div>
                <div className="col-md-12 col-lg-5">
                  <div
                    id="carouselId"
                    className="carousel slide position-relative"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner" role="listbox">
                      <div className="carousel-item active rounded">
                        <img
                          src="../../../dist/img/iPhone-16-pro.jpg"
                          className="img-fluid w-100 h-100 bg-secondary rounded"
                          alt="First slide"
                        />
                        <a
                          href="#"
                          className="btn px-4 py-2 text-white rounded"
                        >
                          Fruites
                        </a>
                      </div>
                      <div className="carousel-item rounded">
                        <img
                          src="../../../dist/img/Apple-iPhone-16.jpg"
                          className="img-fluid w-100 h-100 rounded"
                          alt="Second slide"
                        />
                        <a
                          href="#"
                          className="btn px-4 py-2 text-white rounded"
                        >
                          Vesitables
                        </a>
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselId"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselId"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Hero End */}
        </>
      </>
    </div>
  );
};

export default Banner;
