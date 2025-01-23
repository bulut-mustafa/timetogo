import { fetchUserData } from "../lib/firebaseActions/getUserInformations"; // Import the server-side logic
import Header from "@/components/main-header/header";



const Home = async () => {
  let name = "";
  let error = "";

  try {
    const userData = await fetchUserData(); // Fetch user data using the utility function
    name = userData.name;
  } catch (e) {
    error = e instanceof Error ? e.message : "Error fetching user data";
  }

  return (
    <main className="min-h-screen items-center">
      <Header />
      <div className="text-center mt-8">
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <h1>Welcome, {name}</h1> // Display the user's name if available
        )}
      </div>
    </main>
  );
};

export default Home;
