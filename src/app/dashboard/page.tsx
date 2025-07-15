"use client";
import { LogoutButton } from "@/components/logout-button";
import { authStore } from "@/store/auth-store";
import { useState } from "react";

export default function DashboardRoute() {
  const [count, setCount] = useState(0);
  authStore.on("loggedIn", ({ user }) => {
    console.log("User logged in:", user);
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1>Dashboard</h1>
      <h2 className="text-2xl mb-4">
        Welcome, {authStore.getSnapshot().context.user?.username || "Guest"}!
      </h2>
      <LogoutButton />
    </div>
  );
}
