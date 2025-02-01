'use client';

import React from "react";
import { useAuth } from "@/context/auth-context";
import Tag from "./tag";

const ClientOnlyHome = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // Optionally show a loading state
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome Back, {user.email || "User"}!</h1>
          <p>Here are your personalized items.</p>
        </div>
      ) : (
        <div>
          <h1>Welcome to Our Website!</h1>
          <p>Explore our general content.</p>
        </div>
      )}
    </div>
  );
};

export default ClientOnlyHome;
