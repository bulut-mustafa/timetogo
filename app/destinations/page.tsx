import ClientOnlyHome from "@/components/main-page/home-items";
import SearchBack from "@/components/main-page/main-search/hero-images";
import Header from "@/components/main-page/main-header/header";
const Home = () => {
  return (
    <div className="min-h-screen items-center">

      <Header />
      <SearchBack />
      <ClientOnlyHome />
    </div>
  );
};

export default Home;
