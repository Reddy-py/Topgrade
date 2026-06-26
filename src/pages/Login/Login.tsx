import { useState } from "react";
import { FaSchool, FaEnvelope, FaLock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  // Authentication states
  const [email, setEmail] = useState("admin@topgrade.com");
  const [password, setPassword] = useState("admin123");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    // Mock Authentication Validation Routine
    setTimeout(() => {
      if (email.trim() === "admin@topgrade.com" && password === "admin123") {
        onLoginSuccess();
      } else {
        setErrorMessage("Invalid institutional credentials. Please look over the parameters below.");
        setIsLoading(false);
      }
    }, 800); // Mimic server response latency
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative Structural Background Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#eff4ff] -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#d0e1fb]/30 -z-10" />

      <div className="w-full max-w-md space-y-6">
        
        {/* Brand System Logo Block */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 bg-[#2563eb] rounded-xl flex items-center justify-center shadow-md shadow-[#004ac6]/10">
            <FaSchool className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#004ac6]">TopGrade CRM</h1>
            <p className="text-xs font-semibold text-[#434655]/80 uppercase tracking-wider">
              Institutional Administration &amp; Analytics Portal
            </p>
          </div>
        </div>

        {/* Authentication Card Panel */}
        <div className="bg-white rounded-2xl border border-[#c3c6d7]/40 shadow-xl shadow-[#0d1c2f]/5 p-8 relative">
          
          <div className="mb-6">
            <h2 className="text-xl font-black text-[#0d1c2f]">Welcome Back</h2>
            <p className="text-xs font-medium text-[#434655] mt-1">
              Sign in with your system-assigned workspace credentials.
            </p>
          </div>

          {/* Validation Failure Output Alert */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 animate-fadeIn">
              <FaExclamationCircle className="text-sm mt-0.5 flex-shrink-0" />
              <p className="text-[11px] font-bold leading-normal">{errorMessage}</p>
            </div>
          )}

          {/* Secure Form Processing Element */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wide mb-1.5">
                Corporate Email Address
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
                  placeholder="name@institution.com"
                  className="w-full rounded-xl border-[#c3c6d7] bg-[#eff4ff]/60 focus:bg-white focus:ring-2 focus:ring-[#004ac6] text-xs font-semibold text-[#0d1c2f] py-3 pl-11 pr-4 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wide">
                  Account Security Password
                </label>
                <button 
                  type="button"
                  onClick={() => alert("Please request a master override key from your local IT Systems Administrator.")}
                  className="text-[10px] font-bold text-[#004ac6] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
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
              className="w-full bg-[#004ac6] hover:bg-[#2563eb] disabled:bg-[#004ac6]/60 text-white font-bold text-xs rounded-xl py-3.5 transition-all shadow-sm transform active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Authenticate &amp; Access Portal</span>
              )}
            </button>
          </form>
        </div>

        {/* Sandbox Instruction Tooltip */}
        <div className="bg-[#eff4ff] border border-[#d0e1fb] rounded-xl p-4 flex items-start gap-3">
          <FaCheckCircle className="text-[#004ac6] text-sm mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[11px] font-bold text-[#004ac6] uppercase tracking-wider mb-0.5">
              Demo Access Sandbox Mode
            </p>
            <p className="text-[11px] text-[#434655] leading-relaxed font-medium">
              Pre-seeded values correspond to global administrative testing profiles. Click Authenticate directly to mount full site route maps safely.
            </p>
          </div>
        </div>

        {/* Legal System Footer */}
        <p className="text-center text-[10px] text-[#434655]/60 font-medium">
          © 2026 TopGrade CRM Framework. Secure Enterprise Session Encryption Active.
        </p>

      </div>
    </div>
  );
}