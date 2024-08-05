import HomeLayout from "./HomeLayout/HomeLayout";
import ShopPage from "./HomeLayout/ShopPage";

const HomeShop = () => {
  return (
    <div className="py-5 mt-5">
      <HomeLayout>
        <main className="py-5 mt-5">
          <ShopPage />
        </main>
      </HomeLayout>
    </div>
  );
};

export default HomeShop;
