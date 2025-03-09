import ClientOnlyHome from "@/components/main-page/home-items";
import SearchBack from "@/components/main-page/main-search/hero-images";

const LandingPage = () => {
  return (
    <main className="min-h-screen items-center">
      <SearchBack />
      <ClientOnlyHome />
    </main>
  );
};

export default LandingPage;
