import Header from "@/components/main-page/main-header/header";
import ClientOnlyHome from "@/components/main-page/home-items";
import SearchBack from "@/components/main-page/main-search/hero-images";

const Home = () => {
  return (
    <main className="min-h-screen items-center">
      <Header />
      <SearchBack />
      <ClientOnlyHome />
    </main>
  );
};

export default Home;
