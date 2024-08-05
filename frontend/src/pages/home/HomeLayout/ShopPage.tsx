import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { instace } from "../../../api";
import { useLocalStorage } from "../../../hook/useStorage";
import { Products } from "../../../interface/product";

const ShopPage = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const [products, setProducts] = useState<Products[]>([]);
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;

  const { mutate } = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const { data } = await axios.post(
        `http://localhost:8080/carts/addtocart`,
        {
          userId,
          productId,
          quantity,
        }
      );
      return data;
    },
    onSuccess: () => {
      alert("Thêm vào giỏ hàng thành công");
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
  });

  useEffect(() => {
    if (location.state && location.state.products) {
      console.log("Products from state:", location.state.products); // Debugging log
      setProducts(location.state.products);
    } else {
      const fetchProducts = async () => {
        const { data } = await instace.get(`/products`);
        setProducts(data.products);
      };
      fetchProducts();
    }
  }, [location.state]);

  return (
    <div>
      <div className="container-fluid fruite">
        <div className="container">
          <div className="tab-class text-center">
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {products.map((prd) => (
                        <div
                          className="col-md-6 col-lg-4 col-xl-3"
                          key={prd._id}
                        >
                          <div className="rounded position-relative fruite-item">
                            <div className="fruite-imgg">
                              <img
                                src={prd.image}
                                className="img-fluid rounded-top"
                                alt={prd.name}
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
                                <button
                                  className="btn border border-secondary rounded-pill px-3 text-primary"
                                  onClick={() =>
                                    mutate({ productId: prd._id, quantity: 1 })
                                  }
                                >
                                  <i className="fa fa-shopping-bag me-2 text-primary" />
                                  Add to cart
                                </button>
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

export default ShopPage;
