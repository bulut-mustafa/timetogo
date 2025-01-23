'use client'
import Header from "@/components/main-page/main-header/header";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { User as FirebaseUser } from "firebase/auth";

const Home = () => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase listener to detect authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false); // Stop loading once user is resolved
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  // Show loading state while fetching user information
  if (loading) {
    return (
      <main className="min-h-screen items-center">
        <Header currentUser={currentUser} />
        <p>Loading...</p>
      </main>
    );
  }

  // Render based on whether a user is authenticated or not
  return (
    <main className="min-h-screen items-center">
      <Header currentUser={currentUser} />
      {currentUser ? (
        <div>
          <h1>Welcome Back, {currentUser.email || "User"}!</h1>
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
