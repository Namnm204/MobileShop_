import React from "react";
import AdminHeader from "./AdminHeader";
import MenuAdmin from "./MenuAdmin";

const AdminLayout = (props: any) => {
  return (
    <div>
      <AdminHeader />
      {props.children}
      <MenuAdmin />
    </div>
  );
};

export default AdminLayout;
