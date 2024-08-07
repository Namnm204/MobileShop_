import React from "react";
import { Link } from "react-router-dom";
import { Products } from "../../interface/product";
interface Props {
  products: Products[];
  onRemove: (id: number | string) => void;
}

const Product = ({ products, onRemove }: Props) => {
  return (
    <div className="product">
      <h2>Product</h2>
      <Link to="/admin/product-add" className="btn btn-primary">
        Thêm sản phẩm
      </Link>
      <br />
      <br />
      <div className="row">
        <table
          className="table table-bodered table-striped text-center"
          border={2}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>
                  {
                    <img
                      src={item.image}
                      alt=""
                      style={{
                        width: "150px",
                        height: "150px",
                        margin: "10px",
                      }}
                    />
                  }
                </td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <Link
                    to={`/admin/product-edit/${item._id}`}
                    className="btn btn-warning mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => onRemove(item._id!)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
