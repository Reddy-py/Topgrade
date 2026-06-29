import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize the client directly on the frontend using your public credentials
const SUPABASE_URL = "https://zznzmzwiewsnmykcbcni.supabase.co"; // Replace with your actual project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6bnptendpZXdzbm15a2NiY25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODg5NDEsImV4cCI6MjA5ODA2NDk0MX0._fQr1yqqa7eeW0DBYy51rcComrRfLS-K0niuqDQNf9E"; // Replace with your actual public anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ProfessionalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      // 1. Authenticate user credentials against Supabase Auth Core
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Authentication failed. No user found.");

      // 2. Fetch the corresponding profile role data from our Phase 1 table
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("role, full_name")
        .eq("id", authData.user.id)
        .single();

      if (profileError) throw new Error("Failed to retrieve assigned organizational permissions.");

      // 3. Store session metadata globally for route guard verification
      localStorage.setItem("topgrade_token", authData.session?.access_token || "");
      localStorage.setItem("topgrade_user_role", profile.role);
      localStorage.setItem("topgrade_user_name", profile.full_name);

      // 4. Divert dashboard routing depending on exact access clearances
      console.log(`Successfully logged in as ${profile.full_name} (${profile.role})`);
      
      if (profile.role === "accounts") {
        window.location.href = "/billing";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (err: any) {
      setErrorMessage(err.message || "Invalid database-registered credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#c3c6d7]/30 p-8 space-y-6">
        
        {/* Branding Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#004ac6] text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto shadow-md">
            TG
          </div>
          <h1 className="text-2xl font-black text-[#0d1c2f] tracking-tight">TopGrade CRM</h1>
          <p className="text-xs font-bold text-[#004ac6] uppercase tracking-wider">Live Authentication Portal</p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3 rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* Security Input Fields Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-black text-[#434655] uppercase tracking-wider">Registered Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@topgrade.edu"
              className="w-full px-4 py-2.5 bg-[#eff4ff] border border-[#c3c6d7]/40 rounded-xl text-sm font-medium text-[#0d1c2f] placeholder-[#737686]/60 focus:outline-none focus:border-[#004ac6] transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-black text-[#434655] uppercase tracking-wider">Security Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 bg-[#eff4ff] border border-[#c3c6d7]/40 rounded-xl text-sm font-medium text-[#0d1c2f] placeholder-[#737686]/60 focus:outline-none focus:border-[#004ac6] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#004ac6] text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-[#2563eb] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? "Verifying Access Ledger..." : "Verify Credentials"}
          </button>
        </form>
      </div>
    </div>
  );
}