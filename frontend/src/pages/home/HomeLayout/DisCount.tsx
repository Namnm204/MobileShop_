import React from "react";

const DisCount = () => {
  return (
    <div>
      <>
        {/* Banner Section Start*/}
        <div className="container-fluid banner bg-secondary my-5">
          <div className="container py-5">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <div className="py-4">
                  <h1 className="display-3 text-white">Iphone 11</h1>
                  <p className="fw-normal display-3 text-dark mb-4">
                    giảm cực sâu
                  </p>
                  <p className="mb-4 text-dark">
                    Shop đang giảm giá iphone 11 với giá cực kì ưu dãi với những
                    phụ kiện đi kèm rất hấp dẫn
                  </p>
                  <a
                    href="#"
                    className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5"
                  >
                    Mua Ngay
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="position-relative">
                  <img
                    src="../../../dist/img/ip11.jpg"
                    className="img-fluid w-100 rounded"
                    alt=""
                  />
                  <div
                    className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute"
                    style={{ width: 140, height: 140, top: 0, left: 0 }}
                  >
                    <h1 style={{ fontSize: 100 }}>1</h1>
                    <div className="d-flex flex-column">
                      <span className="h2 mb-0">50$</span>
                      <span className="h4 text-muted mb-0"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner Section End */}
      </>
    </div>
  );
};

export default DisCount;
