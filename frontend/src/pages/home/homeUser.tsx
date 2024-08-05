import HomeLayout from "./HomeLayout/HomeLayout";
import ProfilePage from "./HomeLayout/User";

const HomeUser = () => {
  return (
    <div className="py-5 mt-5">
      <HomeLayout>
        <main className="py-5 mt-5">
          <ProfilePage />
        </main>
      </HomeLayout>
    </div>
  );
};

export default HomeUser;
