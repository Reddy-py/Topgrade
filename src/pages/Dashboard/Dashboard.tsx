import { useState, useEffect } from "react";
import GlobalSearch from "../../components/GlobalSearch";
import { 
  FaUserGraduate, FaCalendarCheck, FaClipboardList, FaDollarSign, FaChartLine, 
  FaUserPlus, FaChalkboardUser, FaBook, FaCakeCandles, FaClockRotateLeft, 
  FaBell, FaCalendar, FaWallet, FaFileInvoice, FaEnvelope
} from "react-icons/fa6";

export default function Dashboard() {
  const [backendData, setBackendData] = useState<any>(null);
  
  const [metrics, setMetrics] = useState({
    totalStudents: 0, todayClasses: 0, todayAttendance: "0%", pendingFees: "$0",
    monthlyRevenue: "$0", newAdmissions: 0, teachersAvailable: 0, activeCourses: 0,
    upcomingBirthdays: 0, upcomingRenewals: 0,
  });

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // 1. Fetch live metrics from base configuration layer
    fetch("https://topgrade-backend.onrender.com/api/crm-info")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
        const syncedAt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        setNotifications([
          { message: `${data.systemName || "Institution"} system matrix mapped natively.`, timestamp: syncedAt },
          ...(data.status ? [{ message: `System cluster tracking: ${data.status}`, timestamp: syncedAt }] : []),
        ]);

        if (data.liveMetrics) {
          setMetrics(prev => ({ ...prev, ...data.liveMetrics }));
        }

        // 2. Cascade execution flow to fetch live records for precise student analytics synchronization
        return fetch("https://topgrade-backend.onrender.com/api/students/list");
      })
      .then((res) => res?.json())
      .then((studentData) => {
        if (studentData && studentData.success && Array.isArray(studentData.data)) {
          const actualTotal = studentData.data.length;
          const actualActive = studentData.data.filter((s: any) => s.status === "Active").length;
          
          setMetrics(prev => ({
            ...prev,
            totalStudents: actualTotal,
            newAdmissions: actualActive // Directly links fresh active tracks
          }));
        }
      })
      .catch((err) => {
        console.error("Operational ledger parsing interruption:", err);
        setNotifications([{ message: "Security gateway link fallback activated.", timestamp: "Active" }]);
      });
  }, []);

  const handleQuickAction = (actionName: string) => {
    console.log(`Command trigger target parameter evaluated: ${actionName}`);
    alert(`Redirecting execution window context to module: ${actionName}`);
  };

  return (
    <div className="space-y-6 p-1 max-w-[1600px] mx-auto">
      
      {/* ─── UNIFIED TOP NAVIGATION LAYER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#c3c6d7]/30 shadow-sm">
        <GlobalSearch />
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="text-right">
            <p className="text-xs font-black text-[#0d1c2f]">{localStorage.getItem("topgrade_user_name") || "Administrator"}</p>
            <p className="text-[10px] font-bold text-[#004ac6] uppercase tracking-wider">{localStorage.getItem("topgrade_user_role")?.replace("_", " ") || "Super Admin"}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#004ac6] text-white flex items-center justify-center text-xs font-black uppercase shadow-sm">
            {(localStorage.getItem("topgrade_user_name") || "A").charAt(0)}
          </div>
        </div>
      </div>

      {/* View Header Core Metadata Displays */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#c3c6d7]/10 pb-4">
        <div>
          <h1 className="text-2xl font-black text-[#0d1c2f]">{backendData ? backendData.systemName : "Top Grade Learning Center"}</h1>
          <p className="text-xs font-semibold text-[#434655]">
            System Status: <span className="text-emerald-600 font-black">{backendData ? backendData.status : "Operational"}</span> | Cluster DB: Connected
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#434655] bg-white px-3 py-1.5 rounded-xl border border-[#c3c6d7]/30 shadow-sm self-start sm:self-auto">
          <FaCalendar className="text-[#004ac6]" />
          <span>Live Operations Workspace</span>
        </div>
      </div>

      {/* ─── WIDGET COUNTER LEVERAGE GRID ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/20 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-[#737686] uppercase tracking-wider">Total Students</p>
            <p className="text-xl font-black text-[#0d1c2f]">{metrics.totalStudents}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-sm"><FaUserGraduate /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/20 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-[#737686] uppercase tracking-wider">Today's Classes</p>
            <p className="text-xl font-black text-[#0d1c2f]">{metrics.todayClasses}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-sm"><FaCalendarCheck /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/20 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-[#737686] uppercase tracking-wider">Today's Attendance</p>
            <p className="text-xl font-black text-[#0d1c2f]">{metrics.todayAttendance}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm"><FaClipboardList /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/20 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-[#737686] uppercase tracking-wider">Pending Fees</p>
            <p className="text-xl font-black text-rose-600">{metrics.pendingFees}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center text-sm"><FaDollarSign /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/20 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-[#737686] uppercase tracking-wider">Monthly Revenue</p>
            <p className="text-xl font-black text-emerald-600">{metrics.monthlyRevenue}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm"><FaChartLine /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/20 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-[#737686] uppercase tracking-wider">New Admissions</p>
            <p className="text-xl font-black text-[#0d1c2f]">{metrics.newAdmissions}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center text-sm"><FaUserPlus /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/20 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-[#737686] uppercase tracking-wider">Teachers Online</p>
            <p className="text-xl font-black text-[#0d1c2f]">{metrics.teachersAvailable}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-sm"><FaChalkboardUser /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/20 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-[#737686] uppercase tracking-wider">Active Courses</p>
            <p className="text-xl font-black text-[#0d1c2f]">{metrics.activeCourses}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center text-sm"><FaBook /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/20 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-[#737686] uppercase tracking-wider">Birthdays (30d)</p>
            <p className="text-xl font-black text-[#0d1c2f]">{metrics.upcomingBirthdays}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center text-sm"><FaCakeCandles /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/20 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-[#737686] uppercase tracking-wider">Renewals Due</p>
            <p className="text-xl font-black text-amber-600">{metrics.upcomingRenewals}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-sm"><FaClockRotateLeft /></div>
        </div>

      </div>

      {/* ─── TWO-COLUMN OPERATIONAL LAYOUT SPLIT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#c3c6d7]/30 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-black text-[#0d1c2f] uppercase tracking-wider">System Command Quick Actions</h3>
              <p className="text-xs text-[#434655]">Direct interface links for core educational management workflows.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button onClick={() => handleQuickAction("Add Student")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9ff] border border-[#c3c6d7]/20 rounded-xl hover:border-[#004ac6] hover:bg-[#004ac6]/5 transition-all group text-center gap-2">
                <FaUserPlus className="text-lg text-[#004ac6] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-black text-[#0d1c2f]">Add Student</span>
              </button>
              <button onClick={() => handleQuickAction("Receive Payment")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9ff] border border-[#c3c6d7]/20 rounded-xl hover:border-emerald-600 hover:bg-emerald-50/50 transition-all group text-center gap-2">
                <FaWallet className="text-lg text-emerald-600 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-black text-[#0d1c2f]">Receive Payment</span>
              </button>
              <button onClick={() => handleQuickAction("Mark Attendance")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9ff] border border-[#c3c6d7]/20 rounded-xl hover:border-purple-600 hover:bg-purple-50/50 transition-all group text-center gap-2">
                <FaClipboardList className="text-lg text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-black text-[#0d1c2f]">Mark Attendance</span>
              </button>
              <button onClick={() => handleQuickAction("Add Teacher")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9ff] border border-[#c3c6d7]/20 rounded-xl hover:border-amber-600 hover:bg-amber-50/50 transition-all group text-center gap-2">
                <FaChalkboardUser className="text-lg text-amber-600 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-black text-[#0d1c2f]">Add Teacher</span>
              </button>
              <button onClick={() => handleQuickAction("Create Schedule")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9ff] border border-[#c3c6d7]/20 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-all group text-center gap-2">
                <FaCalendarCheck className="text-lg text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-black text-[#0d1c2f]">Create Schedule</span>
              </button>
              <button onClick={() => handleQuickAction("Generate Report")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9ff] border border-[#c3c6d7]/20 rounded-xl hover:border-indigo-600 hover:bg-indigo-50/50 transition-all group text-center gap-2">
                <FaFileInvoice className="text-lg text-indigo-600 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-black text-[#0d1c2f]">Generate Report</span>
              </button>
            </div>

            <button onClick={() => handleQuickAction("Send Email")} className="w-full py-2.5 bg-[#0d1c2f] hover:bg-[#004ac6] text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
              <FaEnvelope /> Broadcast System Notification / Email Communications
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-[#c3c6d7]/30 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#c3c6d7]/10 pb-3">
              <h3 className="text-xs font-black text-[#0d1c2f] uppercase tracking-wider flex items-center gap-2">
                <FaBell className="text-amber-500" /> Notifications Feed
              </h3>
              <span className="text-[9px] font-bold px-2 py-0.5 bg-[#eff4ff] text-[#004ac6] rounded-full">Live Realtime</span>
            </div>
            
            <ul className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notif, idx) => (
                  <li key={idx} className="p-3 bg-[#f8f9ff] rounded-xl border border-[#c3c6d7]/20 flex flex-col gap-1">
                    <p className="text-xs font-medium text-[#0d1c2f]">{notif.message}</p>
                    <span className="text-[9px] font-bold text-[#434655]/60 self-end">{notif.timestamp}</span>
                  </li>
                ))
              ) : (
                <div className="text-center py-12 text-xs font-bold text-[#434655]/60">
                  No notifications recorded in this active branch cache context.
                </div>
              )}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}