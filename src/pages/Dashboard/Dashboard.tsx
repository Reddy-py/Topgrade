import { useState, useEffect } from "react";
import GlobalSearch from "../../components/GlobalSearch";
// ... keep your existing react-icons imports here ...

export default function Dashboard() {
  // New state to hold live backend information
  const [backendData, setBackendData] = useState<any>(null);

  useEffect(() => {
    // Request metadata from our local Node server
    fetch("https://topgrade-backend.onrender.com/api/crm-info")
      .then((res) => res.json())
      .then((data) => setBackendData(data))
      .catch((err) => console.error("Error connecting to Render backend:", err));
  }, []);

  // ... keep your existing metrics, performanceData, and activities arrays here ...

  return (
    <div className="space-y-6 p-1">
      
      {/* ─── NEW UNIFIED TOP NAVIGATION LAYER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#c3c6d7]/30 shadow-sm">
        {/* Render our Global Search Engine bar */}
        <GlobalSearch />

        {/* Live Admin Identity Display Badge */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="text-right">
            <p className="text-xs font-black text-[#0d1c2f]">
              {localStorage.getItem("topgrade_user_name") || "Administrator"}
            </p>
            <p className="text-[10px] font-bold text-[#004ac6] uppercase tracking-wider">
              {localStorage.getItem("topgrade_user_role")?.replace("_", " ") || "Super Admin"}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#004ac6] text-white flex items-center justify-center text-xs font-black uppercase shadow-sm">
            {(localStorage.getItem("topgrade_user_name") || "A").charAt(0)}
          </div>
        </div>
      </div>
      {/* ──────────────────────────────────────── */}

      {/* View Header */}
      <div>
        <h1 className="text-2xl font-black text-[#0d1c2f]">
          {backendData ? backendData.systemName : "Institutional Overview"}
        </h1>
        <p className="text-xs font-semibold text-[#434655]">
          System Status: <span className="text-emerald-600 font-black">{backendData ? backendData.status : "Connecting..."}</span> | Core DB: {backendData ? backendData.database : "Pending"}
        </p>
      </div>

      {/* ... keep the rest of your dashboard JSX cards, charts, and layout elements down here ... */}
    </div>
  );
}
