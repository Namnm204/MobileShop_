import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useCart from "../hook/useCart";
import { useLocalStorage } from "../hook/useStorage";
import { Users } from "../interface/users";
import { Products } from "../interface/product";
import axios from "axios";

const OderPage = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Users>();

  const { data: cartData, calculateTotal } = useCart();

  const { mutate } = useMutation({
    mutationFn: async (oder: {
      userId: string;
      items: [];
      totalPrice: number;
      customerInfo: object;
    }) => {
      try {
        const { data } = await axios.post("http://localhost:8080/oders", oder);
        return data;
      } catch (error) {
        throw new Error("Dat hang that bai");
      }
    },
    onSuccess: () => {
      alert("dat hang thanh cong");
      window.location.href = "/";
    },
    onError: (error) => {
      alert("Dat hang that bai: " + error.message);
    },
  });

  const handleFormSubmit = async (data: object) => {
    mutate({
      userId,
      items: cartData?.products,
      totalPrice: calculateTotal(),
      customerInfo: data,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Order Details</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                  {errors.username && (
                    <div className="text-danger">{errors.username.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                    })}
                  />
                  {errors.phoneNumber && (
                    <div className="text-danger">
                      {errors.phoneNumber.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary w-100">
                    Confirm Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h4 className="mb-0">Cart Summary</h4>
            </div>
            <div className="card-body">
              {cartData?.products?.length ? (
                <ul className="list-group">
                  {cartData.products.map((item: Products) => (
                    <li
                      key={item._id || Math.random()}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{item.name}</strong>
                        <div>Price: ${item.price}</div>
                        <div>Quantity: {item.quantity}</div>
                        <div>Total: ${item.price * item.quantity}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No products in cart.</p>
              )}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Products:</strong>
                <span>{cartData?.products ? cartData.products.length : 0}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Total Price:</strong>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OderPage;
