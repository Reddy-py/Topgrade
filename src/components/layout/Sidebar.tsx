import { Link, useLocation } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaBook, 
  FaClipboardCheck, 
  FaMoneyBillWave, 
  FaChartBar, 
  FaCog,
  FaSignOutAlt 
} from "react-icons/fa";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const location = useLocation();

  // Navigation matrix configuration array
  const navItems = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Students", path: "/students", icon: <FaUserGraduate /> },
    { name: "Teachers", path: "/teachers", icon: <FaChalkboardTeacher /> },
    { name: "Courses", path: "/courses", icon: <FaBook /> },
    { name: "Attendance", path: "/attendance", icon: <FaClipboardCheck /> },
    { name: "Fees", path: "/fees", icon: <FaMoneyBillWave /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <aside className="w-64 fixed left-0 top-0 h-screen bg-white border-r border-[#c3c6d7]/40 p-4 flex flex-col justify-between z-20">
      <div className="space-y-6">
        
        {/* ─── SYSTEM BRAND LOGO HEADER (SQUARE WITH GRADIENT BACKDROP) ─── */}
        <div className="px-2 py-4 flex flex-col items-center justify-center border-b border-[#c3c6d7]/10 bg-[#f8f9ff]/40 rounded-xl mb-2">
          <div className="w-full aspect-square max-w-[160px] p-4 bg-gradient-to-br from-slate-50 to-[#eff4ff] border border-slate-900 rounded-2xl shadow-sm flex items-center justify-center mb-2">
            <img 
              src="/logo.png" 
              alt="Top Grade Learning Official Logo" 
              className="w-full h-auto object-contain drop-shadow-sm" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "./logo.png";
              }}
            />
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black tracking-widest text-[#004ac6] uppercase">Management Hub</p>
          </div>
        </div>
        
        {/* Navigation Links List */}
        <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-270px)] pr-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`text-xs font-bold p-2.5 rounded-xl flex items-center gap-3 transition-all ${
                  isActive 
                    ? "bg-[#004ac6] text-white shadow-sm shadow-[#004ac6]/20" 
                    : "text-[#434655] hover:bg-[#eff4ff] hover:text-[#004ac6]"
                }`}
              >
                <span className={`text-sm ${isActive ? "text-white" : "text-[#434655]/60"}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Persistent Logout Link Action Block */}
      <button 
        onClick={onLogout}
        className="w-full text-left text-xs font-bold text-red-600 p-2.5 hover:bg-red-50 rounded-xl transition-all flex items-center gap-3 mt-auto"
      >
        <FaSignOutAlt className="text-sm text-red-500/80" />
        <span>Terminate Session</span>
      </button>
    </aside>
  );
}