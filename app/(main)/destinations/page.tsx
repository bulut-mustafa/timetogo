"use client"; 
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/main-page");
  }, [router]);

  return (
    <div className="min-h-screen items-center">
      <p>Redirecting...</p>
    </div>
  );
};

export default Home;
