"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Wrong password.");
      return;
    }

    router.push("/admin");
  };

  return (
    <div className= "min-h-screen flex items-center justify-center bg-[#0A2724] px-4" >
    <form onSubmit={ submit } className = "w-full max-w-sm rounded-2xl bg-white/10 border border-white/20 p-6" >
      <h1 className="text-white text-xl font-semibold mb-4" > Admin Login </h1>

        < label className = "text-white/80 text-sm" > Password </label>
          < input
  type = "password"
  value = { password }
  onChange = {(e) => setPassword(e.target.value)
}
className = "mt-2 w-full rounded-lg bg-white/10 border border-white/20 p-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
  />

  { error && <p className="text-red-200 text-sm mt-3" > { error } </p>}

<button
          type="submit"
className = "mt-5 w-full rounded-xl bg-[#D4AF37] py-2 font-semibold text-black hover:opacity-90"
  >
  Enter Admin
    </button>
    </form>
    </div>
  );
}
