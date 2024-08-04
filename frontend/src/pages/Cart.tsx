import { ChangeEvent } from "react";
import useCart from "../hook/useCart";
import { Products } from "../interface/product";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    data,
    mutate,
    handleQuantityChange,
    calculateTotal,
    isLoading,
    isError,
  } = useCart();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng giá</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.products && Array.isArray(data.products) ? (
                data.products.length > 0 ? (
                  data.products.map((product: Products, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="border-2">{product.name}</td>
                      <td className="border-2">{product.price} $</td>
                      <td className="border-2 d-flex items-center justify-center px-2">
                        <button
                          className="py-1 px-3 rounded"
                          onClick={() =>
                            mutate({
                              action: "DECREMENT",
                              productId: product.productId,
                            })
                          }
                        >
                          -
                        </button>
                        <p className="mx-2">{product.quantity}</p>
                        <input
                          type="number"
                          className="border mx-3 w-12 text-center"
                          style={{ width: "50px" }}
                          onInput={(e) =>
                            handleQuantityChange(
                              product.productId,
                              e as ChangeEvent<HTMLInputElement>
                            )
                          }
                        />
                        <button
                          className="py-1 px-3 rounded"
                          onClick={() =>
                            mutate({
                              action: "INCREMENT",
                              productId: product.productId,
                            })
                          }
                        >
                          +
                        </button>
                      </td>

                      <td className="border-2">
                        {product.price * product.quantity} $
                      </td>
                      <td className="border-2">
                        <button className="btn btn-md rounded-circle bg-light border">
                          <i className="fa fa-times text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Không có sản phẩm trong giỏ hàng
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    Dữ liệu không hợp lệ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <p>Total: ${calculateTotal()}</p>
        </div>
        <div className="row py-3">
          <div className="col-md-6 text-end">
            <Link to="/oder">
              <button className="btn btn-md bg-primary text-white">
                Mua Hang
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
