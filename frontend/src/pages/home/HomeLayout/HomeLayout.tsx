import React from "react";
import Header from "./header";
import Footer from "./Footer";

const HomeLayout = (props: any) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
