import { useState, useEffect } from "react";
import GlobalSearch from "../../components/GlobalSearch";
import AdmissionsForm from "../../components/AdmissionsForm";
import { 
  FaUserGraduate, 
  FaUsers, 
  FaMoneyBillWave, 
  FaChartBar,
  FaBell,
  FaCalendarAlt
} from "react-icons/fa";

export default function Dashboard() {
  const [backendData, setBackendData] = useState<any>(null);
  const [liveActivities] = useState<any[]>([]);
  const [liveMetrics, setLiveMetrics] = useState({
    totalStudents: 0,
    activeParents: 0,
    grossFees: "$0",
  });

  useEffect(() => {
    // 1. Fetch system status from your Render server
    fetch("https://topgrade-backend.onrender.com/api/crm-info")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
        // If your crm-info endpoint begins passing down aggregated metrics, we bind them here:
        if (data.metrics) {
          setLiveMetrics({
            totalStudents: data.metrics.totalStudents || 0,
            activeParents: data.metrics.activeParents || 0,
            grossFees: data.metrics.grossFees || "$0",
          });
        }
      })
      .catch((err) => console.error("Error connecting to Render backend:", err));
  }, []);

  return (
    <div className="space-y-6 p-1 max-w-[1440px] mx-auto">
      
      {/* ─── UNIFIED TOP NAVIGATION LAYER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#c3c6d7]/30 shadow-sm">
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

      {/* View Header Core Metadata Displays */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#c3c6d7]/10 pb-4">
        <div>
          <h1 className="text-2xl font-black text-[#0d1c2f]">
            {backendData ? backendData.systemName : "Institutional Overview"}
          </h1>
          <p className="text-xs font-semibold text-[#434655]">
            System Status: <span className="text-emerald-600 font-black">{backendData ? backendData.status : "Connecting..."}</span> | Core DB: {backendData ? backendData.database : "Pending"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#434655] bg-white px-3 py-1.5 rounded-xl border border-[#c3c6d7]/30 shadow-sm self-start sm:self-auto">
          <FaCalendarAlt className="text-[#004ac6]" />
          <span>Active Operations Cycle</span>
        </div>
      </div>

      {/* Live Operational Metrics Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7]/30 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Total Enrolled Students</p>
            <p className="text-2xl font-black text-[#0d1c2f]">{liveMetrics.totalStudents}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center text-lg shadow-md">
            <FaUserGraduate />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7]/30 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Active Parent Profiles</p>
            <p className="text-2xl font-black text-[#0d1c2f]">{liveMetrics.activeParents}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-lg shadow-md">
            <FaUsers />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7]/30 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Gross Revenue Matrix</p>
            <p className="text-2xl font-black text-[#0d1c2f]">{liveMetrics.grossFees}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg shadow-md">
            <FaMoneyBillWave />
          </div>
        </div>
      </div>

      {/* Structural Operational Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Core Administrative Admissions Processing Form */}
        <div className="lg:col-span-2 space-y-6">
          <AdmissionsForm />
        </div>

        {/* Right Column: Real-time System Logs */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7]/30 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#c3c6d7]/10 pb-3">
              <h3 className="text-xs font-black text-[#0d1c2f] uppercase tracking-wider flex items-center gap-2">
                <FaBell className="text-amber-500" /> System Action Logs
              </h3>
              <span className="text-[9px] font-bold px-2 py-0.5 bg-[#eff4ff] text-[#004ac6] rounded-full">Live</span>
            </div>
            
            <ul className="space-y-3">
              {liveActivities.length > 0 ? (
                liveActivities.map((activity) => (
                  <li key={activity.id} className="p-3 bg-[#f8f9ff] rounded-xl border border-[#c3c6d7]/20 flex flex-col gap-1">
                    <p className="text-xs font-medium text-[#0d1c2f]">{activity.text}</p>
                    <span className="text-[9px] font-bold text-[#434655]/60 self-end">{activity.time}</span>
                  </li>
                ))
              ) : (
                <div className="text-center py-6 text-xs font-bold text-[#434655]/60">
                  Waiting for backend events...
                </div>
              )}
            </ul>
          </div>

          {/* Quick System Context Block */}
          <div className="bg-gradient-to-br from-[#0d1c2f] to-[#004ac6] p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
            <div className="absolute right-[-20px] bottom-[-20px] text-white/10 text-9xl pointer-events-none">
              <FaChartBar />
            </div>
            <div className="space-y-2 relative z-10">
              <p className="text-[9px] font-black uppercase tracking-widest text-blue-200">Security Clearance Scope</p>
              <h4 className="text-sm font-black tracking-tight">Active Engine Identity Verified</h4>
              <p className="text-[11px] font-medium text-blue-100/80 leading-relaxed">
                Database operations executed in this layout context directly address public database endpoints bound to your authenticated Supabase user token schema profiles.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}