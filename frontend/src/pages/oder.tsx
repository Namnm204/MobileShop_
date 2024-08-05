import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useCart from "../hook/useCart";
import { useLocalStorage } from "../hook/useStorage";
import { Products } from "../interface/product";
import axios from "axios";
import { useState, useEffect } from "react";
import QRCode from "qrcode.react"; // Thư viện tạo QR Code

interface OderFormData {
  username?: string;
  email: string;
  phone?: string;
  payment?: string;
  city?: string;
  bankAccountNumber?: string;
}

const OderPage = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<OderFormData>();

  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(30);

  const { data: cartData, calculateTotal } = useCart();

  const { mutate } = useMutation({
    mutationFn: async (oder: {
      userId: string;
      items: Products[];
      totalPrice: number;
      customerInfo: OderFormData;
    }) => {
      try {
        const { data } = await axios.post("http://localhost:8080/oders", oder);
        return data;
      } catch (error) {
        throw new Error("Đặt hàng thất bại");
      }
    },
    onSuccess: () => {
      alert("Đặt hàng thành công");
      window.location.href = "/";
    },
    onError: (error) => {
      alert("Đặt hàng thất bại: " + error.message);
    },
  });

  const handleFormSubmit = async (data: OderFormData) => {
    mutate({
      userId,
      items: cartData?.products || [],
      totalPrice: calculateTotal(),
      customerInfo: data,
    });
  };

  const paymentMethodValue = watch("payment");

  useEffect(() => {
    if (paymentMethod === "Bank Transfer") {
      setShowQRCode(true);
      setCountdown(30);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowQRCode(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setShowQRCode(false);
    }
  }, [paymentMethod]);

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
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username")}
                  />
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
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    {...register("phone")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="payment" className="form-label">
                    Payment Method
                  </label>
                  <select
                    className="form-control"
                    id="payment"
                    {...register("payment")}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">Phương thức thanh toán</option>
                    <option value="Cash on Delivery">
                      Thanh Toán khi nhận hàng
                    </option>
                    <option value="Bank Transfer">Ngân hàng</option>
                  </select>
                </div>
                {paymentMethod === "Bank Transfer" && (
                  <div className="mb-3">
                    {showQRCode && (
                      <div className="text-center">
                        <QRCode
                          value="https://example.com/qr-code"
                          size={256}
                        />
                        <p>QR sẽ hết hạn sau {countdown}</p>
                      </div>
                    )}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    {...register("city")}
                  />
                </div>
                {paymentMethod === "Bank Transfer" && (
                  <div className="mb-3">
                    <label htmlFor="bankAccountNumber" className="form-label">
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="bankAccountNumber"
                      {...register("bankAccountNumber")}
                    />
                  </div>
                )}
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
