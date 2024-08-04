import CartPage from "../Cart";
import HomeLayout from "./HomeLayout/HomeLayout";
import Menu from "./HomeLayout/Menu";

const HomeCart = () => {
  return (
    <div className="py-5">
      <HomeLayout>
        <main className="py-5">
          <CartPage></CartPage>
        </main>
      </HomeLayout>
    </div>
  );
};

export default HomeCart;
