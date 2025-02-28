import { Route, Routes } from "react-router-dom";
import "./App.css";
import PriveVateRoute from "./component/PriveVateRoute";
import UserEdit from "./component/User";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminOder from "./pages/admin/AdminOder";
import AdminOderDetail from "./pages/admin/AdminOderDetail";
import MainAdmin from "./pages/admin/AdminPage";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminUsers from "./pages/admin/AdminUser";
import AddEditProduct from "./pages/admin/layouts/Add-EditProduct";
import AddEditCategory from "./pages/admin/layouts/AddEditCategory";
import HomeCart from "./pages/home/homeCart";
import HomeDetail from "./pages/home/HomeDetail";
import Car from "./pages/home/HomeLayout/car";
import Checkout from "./pages/home/HomeLayout/checkout";
import Contact from "./pages/home/HomeLayout/Contact";
import HomeMain from "./pages/home/HomeMain";
import HomeOder from "./pages/home/homeOder";
import HomeShop from "./pages/home/homeShop";
import HomeUser from "./pages/home/homeUser";
import GTHome from "./pages/home/IntroduceHome";
import LoginHome from "./pages/home/LoginHome";
import RegisterHome from "./pages/home/RegisterHome";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeMain />}></Route>
        <Route path="/product/detail/:id" element={<HomeDetail />}></Route>
        {/* Private route admin */}
        <Route path="/admin" element={<PriveVateRoute allowedRole="admin" />}>
          <Route path="/admin" element={<MainAdmin />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/product-add" element={<AddEditProduct />} />
          <Route path="/admin/product-edit/:_id" element={<AddEditProduct />} />
          <Route path="/admin/category" element={<AdminCategory />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/user-edit/:id" element={<UserEdit />} />
          <Route path="/admin/category-add" element={<AddEditCategory />} />
          <Route path="/admin/oders" element={<AdminOder />} />
          <Route path="/admin/oders/:id" element={<AdminOderDetail />} />
          <Route
            path="/admin/category-edit/:_id"
            element={<AddEditCategory />}
          />
        </Route>
        <Route path="/register" element={<RegisterHome />} />
        <Route path="/login" element={<LoginHome />} />
        <Route path="/cart" element={<HomeCart />} />
        <Route path="/oder" element={<HomeOder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/introduce" element={<GTHome />} />
        <Route path="/car" element={<Car />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shop" element={<HomeShop />} />
        <Route path="/user/:id" element={<HomeUser />} />
      </Routes>
    </>
  );
}

export default App;
