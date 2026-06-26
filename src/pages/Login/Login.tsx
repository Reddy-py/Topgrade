import { useState } from "react";
import { FaSchool, FaEnvelope, FaLock, FaExclamationCircle } from "react-icons/fa";
import { supabase } from "../../utils/supabaseClient"; // Make sure this path points correctly to your client file

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

type NewType = React.BaseSyntheticEvent;
  const handleSubmit = async (e: NewType) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // LIVE LIVE AUTH CALL TO SUPABASE
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
      } else if (data.user) {
        // If login passes completely, fire the state trigger to let the user in
        onLoginSuccess();
      }
    } catch (err) {
      setErrorMessage("An unexpected connection issue occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#eff4ff] -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#d0e1fb]/30 -z-10" />

      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 bg-[#2563eb] rounded-xl flex items-center justify-center shadow-md">
            <FaSchool className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#004ac6]">TopGrade CRM</h1>
            <p className="text-xs font-semibold text-[#434655]/80 uppercase tracking-wider">
              Live Authentication Portal
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#c3c6d7]/40 shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-black text-[#0d1c2f]">System Login</h2>
            <p className="text-xs font-medium text-[#434655] mt-1">
              Provide your database-registered user credentials.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700">
              <FaExclamationCircle className="text-sm mt-0.5 flex-shrink-0" />
              <p className="text-[11px] font-bold leading-normal">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wide mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#434655]/40 text-sm">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@topgrade.com"
                  className="w-full rounded-xl border-[#c3c6d7] bg-[#eff4ff]/60 focus:bg-white focus:ring-2 focus:ring-[#004ac6] text-xs font-semibold text-[#0d1c2f] py-3 pl-11 pr-4 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wide mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#434655]/40 text-sm">
                  <FaLock />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border-[#c3c6d7] bg-[#eff4ff]/60 focus:bg-white focus:ring-2 focus:ring-[#004ac6] text-xs font-semibold text-[#0d1c2f] py-3 pl-11 pr-4 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#004ac6] hover:bg-[#2563eb] disabled:bg-[#004ac6]/60 text-white font-bold text-xs rounded-xl py-3.5 transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Verify Credentials</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}