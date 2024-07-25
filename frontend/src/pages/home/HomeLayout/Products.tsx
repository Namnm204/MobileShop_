import React, { useEffect, useState } from "react";
import { Products } from "../../../interface/product";
import { instace } from "../../../api";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState<Products[]>([]);
  //   const nav = useNavigate();
  const fetchProducts = async () => {
    const { data } = await instace.get(`/products`);
    setProducts(data.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {products.map((prd) => (
                        <div className="col-md-6 col-lg-4 col-xl-3">
                          <div className="rounded position-relative fruite-item">
                            <div className="fruite-imgg">
                              <img
                                src={prd.image}
                                className="img-fluid w-70 h-100 rounded-top"
                                alt=""
                              />
                            </div>
                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                              <Link
                                to={`/product/detail/${prd._id}`}
                                className="title"
                              >
                                {prd.name}
                              </Link>
                              <p>{prd.description}</p>
                              <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">
                                  {prd.price} Đ
                                </p>
                                <a
                                  href="#"
                                  className="btn border border-secondary rounded-pill px-3 text-primary"
                                >
                                  <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                                  Add to cart
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
