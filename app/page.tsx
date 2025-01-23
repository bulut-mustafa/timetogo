
import Header from "@/components/main-page/main-header/header";
import { useAuth } from "@/context/auth-context";
import { auth ,app} from "@/firebase";
 
const Home = () => {
  const currentUser = auth.currentUser;
  console.log('Current User:', currentUser);
  // Show loading state if Firebase is initializing
  if (currentUser) {
    return (
      <main className="min-h-screen items-center">
        <Header />
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen items-center">
      <Header />
      {currentUser ? (
        <div>
          <h1>Welcome Back, {currentUser || 'User'}!</h1>
          <p>Here are your personalized items.</p>
        </div>
      ) : (
        <div>
          <h1>Welcome to Our Website!</h1>
          <p>Explore our general content.</p>
        </div>
      )}
    </main>
  );
};

export default Home;