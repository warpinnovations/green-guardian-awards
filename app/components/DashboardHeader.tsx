"use client";

import { supabase } from "@/app/lib/supabaseClient";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUserData = async (user: any) => {
      if (!user) return;

      setEmail(user.email ?? "");

      const { data, error } = await supabase
        .from("evaluators")
        .select("name")
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn("Evaluator fetch error:", error.message);
        setName(user.email?.split("@")[0] ?? "User");
        return;
      }

      setName(data?.name ?? "User");
    };

    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      if (user) getUserData(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        getUserData(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A2724] backdrop-blur-md border-b-8 border-[#D4AF37]">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/asset-colored.png"
              alt="Green Guardian Awards"
              width={24}
              height={24}
              priority
            />
            <p className="font-alviona text-xl font-semibold text-[#eefaf5]">
              Green Guardian Awards
            </p>
          </div>

          <div className="flex items-center gap-3 text-white">
            <div className="text-right">
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-white/70">{email}</p>
            </div>
            <LogOut
              className="cursor-pointer opacity-80 hover:opacity-100"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
