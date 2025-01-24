
import Header from "@/components/main-page/main-header/header";
import ClientOnlyHome from "@/components/main-page/home-items";
import SearchBack from "@/components/main-page/main-search/hero-images";
import SearchBar from "@/components/main-page/main-search/search";
const Home =() => {
  

  // Show loading state while fetching user information
  

  // Render based on whether a user is authenticated or not
  return (
    <main className="min-h-screen items-center">
      {/* Render Header without user state initially */}
      <Header />
      <SearchBack/>
      <SearchBar/>
      {/* Render client-side logic that updates the header dynamically */}
      <ClientOnlyHome />
      {/* Display server-side data */}

    </main>
  );
};

export default Home;
