"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // ==========================
  // ALREADY LOGGED IN
  // ==========================

  useEffect(() => {

    const loggedIn =
      localStorage.getItem("admin-auth");

    if (loggedIn) {

      router.replace("/admin");

    }

  }, [router]);

  // ==========================
  // LOGIN
  // ==========================

  const handleLogin = () => {

    if (!email || !password) {

      alert("Please fill all fields.");

      return;

    }

    setLoading(true);

    const ADMIN_USERNAME = "admin";

    const ADMIN_PASSWORD = "123456";

    if (

      email === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD

    ) {

      localStorage.setItem(
        "admin-auth",
        "true"
      );

      router.replace("/admin");

    } else {

      alert("Invalid Username or Password.");

    }

    setLoading(false);

  };

  return (

    <main className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="w-full max-w-md border border-white/10 rounded-3xl bg-white/[0.03] p-8">

        <h1 className="text-4xl font-black text-white mb-2">

          Admin Login

        </h1>

        <p className="text-white/50 mb-8">

          Sign in to access the admin panel.

        </p>

        <div className="mb-6">

          <label className="block text-white/60 mb-3">

            Username

          </label>

          <input
            type="text"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        <div className="mb-8">

          <label className="block text-white/60 mb-3">

            Password

          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
        >

          {loading
            ? "Signing In..."
            : "Login"}

        </button>

      </div>

    </main>

  );

}