import Banner from "./HomeLayout/banner";
import BestSeller from "./HomeLayout/BestSeller";
import DisCount from "./HomeLayout/DisCount";
import HomeLayout from "./HomeLayout/HomeLayout";
import Menu from "./HomeLayout/Menu";
import Products from "./HomeLayout/Products";

const HomeMain = () => {
  return (
    <HomeLayout>
      <Banner></Banner>
      {/* <Icon></Icon> */}
      <Menu></Menu>
      <Products></Products>
      {/* <SellIcon /> */}
      <DisCount />
      <BestSeller />
    </HomeLayout>
  );
};

export default HomeMain;
