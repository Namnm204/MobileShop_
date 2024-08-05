// src/components/OrderDetail.tsx
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface CustomerInfo {
  username: string;
  email: string;
  phone?: string;
  city?: string;
  payment?: string;
}

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  oderNumber: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderDetailProps {
  order: Order;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (printRef.current) {
      const canvas = await html2canvas(printRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 size width in mm
      const pageHeight = 295; // A4 size height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${order.oderNumber}_Detail.pdf`);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="px-5" ref={printRef}>
        <h1 className="mb-4 mt-4">Chi Tiết Đơn Hàng</h1>
        <button
          className="btn btn-primary mt-4 mb-2"
          onClick={handleDownloadPDF}
        >
          Xuất PDF
        </button>
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Mã Đơn Hàng: {order.oderNumber}</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5>Thông Tin Khách Hàng</h5>
                <div className="mb-3">
                  <p>
                    <strong>Tên:</strong> {order.customerInfo.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.customerInfo.email}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong>{" "}
                    {order.customerInfo.phone || "Chưa cung cấp"}
                  </p>
                  <p>
                    <strong>Thành phố:</strong>{" "}
                    {order.customerInfo.city || "Chưa cung cấp"}
                  </p>
                  <p>
                    <strong>Phương thức thanh toán:</strong>{" "}
                    {order.customerInfo.payment || "N/A"}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <h5>Tổng Giá</h5>
                <p className="display-4">{order.totalPrice} Đ</p>
                <h5>Trạng Thái</h5>
                <span
                  className={`badge ${
                    order.status === "Pending"
                      ? "bg-warning"
                      : order.status === "Processing"
                      ? "bg-info"
                      : order.status === "Shipped"
                      ? "bg-primary"
                      : order.status === "Delivered"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h5>Danh Sách Sản Phẩm</h5>
              <ul className="list-group">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      Giá: {item.price} Đ
                      <br />
                      Số lượng: {item.quantity}
                    </div>
                    <span className="badge bg-secondary rounded-pill">
                      Tổng: {item.price * item.quantity} Đ
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
