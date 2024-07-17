import React from "react";
import HomeLayout from "./HomeLayout/HomeLayout";
import ProductDetail from "./HomeLayout/ProductDetail";

const HomeDetail = () => {
  return (
    <div>
      <HomeLayout>
        <ProductDetail></ProductDetail>
      </HomeLayout>
    </div>
  );
};

export default HomeDetail;
