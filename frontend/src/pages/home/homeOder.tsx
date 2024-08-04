import OderPage from "../oder";
import HomeLayout from "./HomeLayout/HomeLayout";

const HomeOder = () => {
  return (
    <div className="py-5">
      <HomeLayout>
        <main className="py-5">
          <OderPage></OderPage>
        </main>
      </HomeLayout>
    </div>
  );
};

export default HomeOder;
