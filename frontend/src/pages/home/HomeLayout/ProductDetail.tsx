import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instace } from "../../../api";
import { useLocalStorage } from "../../../hook/useStorage";
import { Products } from "../../../interface/product";

const ProductDetail = () => {
  const { id } = useParams();
  const [p, setP] = useState<Products>({});
  const fetchProducts = async () => {
    const { data } = await instace.get(`products/${id}`);
    setP(data.products || data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleChange = (event: string) => {
    const value = Math.max(Number(event.target.value) || 1, 1);
    setQuantity(value);
  };
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const queryClient = useQueryClient();
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
      alert("thêm vào giỏ hành thành công");
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
  });
  return (
    <div className="container py-5  mt-5">
      <h1 className="display-4 text-center mt-5"></h1>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm rounded">
            <img
              src={p.image}
              className="card-img-top rounded"
              alt={p.name}
              style={{ objectFit: "cover", height: "50%", maxHeight: "500px" }}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded p-4">
            <h4 className="card-title mb-3">{p.name}</h4>
            <h5 className="card-subtitle mb-3 text-primary">{p.price} Đ</h5>
            <div className="d-flex mb-4">
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className={`fa fa-star ${index < 4 ? "text-secondary" : ""}`}
                />
              ))}
            </div>
            <p className="card-text mb-4">{p.description}</p>

            <div className="input-group mb-4" style={{ maxWidth: "200px" }}>
              <button
                className="btn btn-outline-secondary"
                onClick={handleDecrement}
              >
                <i className="fa fa-minus" />
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={quantity}
                onChange={handleChange}
              />
              <button
                className="btn btn-outline-secondary"
                onClick={handleIncrement}
              >
                <i className="fa fa-plus" />
              </button>
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={() => mutate({ productId: p._id, quantity })}
            >
              <i className="fa fa-shopping-bag me-2" />
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="card mt-5 border-0 shadow-sm rounded">
        <div className="card-header bg-light border-bottom">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-toggle="tab"
                href="#description"
              >
                Description
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body tab-content">
          <div className="tab-pane fade show active" id="description">
            <p>{p.description}</p>
            <div className="row g-4">
              <div className="col-sm-6">
                <div className="p-3 border rounded">
                  <p className="mb-0">Chip: 1</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 border rounded">
                  <p className="mb-0">Ram: Agro Farm</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 border rounded">
                  <p className="mb-0">Dung lượng: Organic</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 border rounded">
                  <p className="mb-0">Pin: Healthy</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 border rounded">
                  <p className="mb-0">Số lượng: 250 Kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form className="mt-5">
        <h4 className="mb-4">Leave a Reply</h4>
        <div className="row">
          <div className="col-lg-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your Name *"
            />
          </div>
          <div className="col-lg-6 mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Your Email *"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductDetail;
