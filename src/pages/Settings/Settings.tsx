import { useState } from "react";
import { 
  FaSlidersH, 
  FaShieldAlt, 
  FaBell, 
  FaCode, 
  FaCogs, 
  FaAward, 
  FaEdit, 
  FaInfoCircle, 
  FaHistory, 
  FaSave
} from "react-icons/fa";

type TabType = "General" | "Security" | "Notifications" | "API";

interface RoleTier {
  id: string;
  name: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  scope: string;
}

const initialRoles: RoleTier[] = [
  { id: "r-1", name: "Administrator", badgeBg: "bg-blue-100 text-[#004ac6]", badgeText: "text-[#004ac6]", description: "Full System Access", scope: "Configuration, Financials, User Lifecycle" },
  { id: "r-2", name: "Registrar", badgeBg: "bg-emerald-100 text-[#006242]", badgeText: "text-[#006242]", description: "Academic Management", scope: "Enrollment, Grades, Course Catalogs" },
  { id: "r-3", name: "Instructor", badgeBg: "bg-slate-100 text-[#434655]", badgeText: "text-[#434655]", description: "Classroom Focus", scope: "Assignments, Attendance, Communication" },
  { id: "r-4", name: "Student", badgeBg: "bg-blue-50 text-slate-500", badgeText: "text-slate-500", description: "Standard Consumer", scope: "Profile, Course Content, Personal Grades" }
];

export default function Settings() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>("General");

  // Form Configuration States
  const [institutionName, setInstitutionName] = useState("St. Edwards International Academy");
  const [currency, setCurrency] = useState("USD");
  const [academicTerm, setAcademicTerm] = useState("Fall Semester 2026");
  const [allowSelfEnrollment, setAllowSelfEnrollment] = useState(true);
  const [enforce2FA, setEnforce2FA] = useState(false);

  const handleSave = () => {
    alert("Configurations committed to system profile successfully.");
  };

  const handleDiscard = () => {
    setInstitutionName("St. Edwards International Academy");
    setCurrency("USD");
    setAcademicTerm("Fall Semester 2026");
    setAllowSelfEnrollment(true);
    setEnforce2FA(false);
  };

  return (
    <div className="p-1 space-y-6 max-w-[1440px] w-full mx-auto relative pb-28">
      
      {/* 1. Sub-Navigation Tabs Row */}
      <nav className="flex border-b border-[#c3c6d7]/40 gap-8">
        <button 
          onClick={() => setActiveTab("General")}
          className={`pb-4 border-b-2 font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all ${
            activeTab === "General" ? "border-[#004ac6] text-[#004ac6]" : "border-transparent text-[#434655] hover:text-[#004ac6]"
          }`}
        >
          <FaSlidersH className="text-sm" /> 
          <span>General Configuration</span>
        </button>
        <button 
          onClick={() => setActiveTab("Security")}
          className={`pb-4 border-b-2 font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all ${
            activeTab === "Security" ? "border-[#004ac6] text-[#004ac6]" : "border-transparent text-[#434655] hover:text-[#004ac6]"
          }`}
        >
          <FaShieldAlt className="text-sm" /> 
          <span>Security &amp; Access</span>
        </button>
        <button 
          onClick={() => setActiveTab("Notifications")}
          className={`pb-4 border-b-2 font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all ${
            activeTab === "Notifications" ? "border-[#004ac6] text-[#004ac6]" : "border-transparent text-[#434655] hover:text-[#004ac6]"
          }`}
        >
          <FaBell className="text-sm" /> 
          <span>Notifications</span>
        </button>
        <button 
          onClick={() => setActiveTab("API")}
          className={`pb-4 border-b-2 font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all ${
            activeTab === "API" ? "border-[#004ac6] text-[#004ac6]" : "border-transparent text-[#434655] hover:text-[#004ac6]"
          }`}
        >
          <FaCode className="text-sm" /> 
          <span>Integrations &amp; API</span>
        </button>
      </nav>

      {/* 2. Content Layout Blueprint Layout Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column Canvas: General Preferences Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-[#c3c6d7]/30 p-6">
          <div className="flex items-center gap-2 mb-6">
            <FaCogs className="text-[#004ac6] text-lg" />
            <h3 className="text-lg font-black text-[#0d1c2f]">Core Environment Profile</h3>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-[#434655] uppercase tracking-wide mb-1.5">Institution Branding Target</label>
                <input 
                  className="w-full rounded-xl border-[#c3c6d7] bg-[#eff4ff] focus:ring-2 focus:ring-[#004ac6] text-xs font-semibold text-[#0d1c2f] py-3 px-4 transition-all" 
                  type="text" 
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#434655] uppercase tracking-wide mb-1.5">Default Academic Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border-[#c3c6d7] bg-[#eff4ff] focus:ring-2 focus:ring-[#004ac6] text-xs font-semibold text-[#434655] py-3 px-4 cursor-pointer transition-all"
                >
                  <option value="USD">USD - US Dollar ($)</option>
                  <option value="GBP">GBP - British Pound (£)</option>
                  <option value="EUR">EUR - Euro (€)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#434655] uppercase tracking-wide mb-1.5">Active Calendar Lifecycle</label>
                <select 
                  value={academicTerm}
                  onChange={(e) => setAcademicTerm(e.target.value)}
                  className="w-full rounded-xl border-[#c3c6d7] bg-[#eff4ff] focus:ring-2 focus:ring-[#004ac6] text-xs font-semibold text-[#434655] py-3 px-4 cursor-pointer transition-all"
                >
                  <option value="Fall Semester 2026">Fall Semester 2026</option>
                  <option value="Winter Intensive 2026">Winter Intensive 2026</option>
                  <option value="Spring Term 2027">Spring Term 2027</option>
                </select>
              </div>
            </div>

            <hr className="border-[#c3c6d7]/30 my-6" />

            {/* System Automation Control Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#eff4ff]/40 hover:bg-[#eff4ff]/80 border border-[#c3c6d7]/10 rounded-xl transition-colors">
                <div>
                  <p className="text-xs font-bold text-[#0d1c2f]">Allow Student Self-Enrollment</p>
                  <p className="text-[11px] font-medium text-[#434655]">Students can register into elective catalogs directly.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setAllowSelfEnrollment(!allowSelfEnrollment)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 cursor-pointer ${
                    allowSelfEnrollment ? "bg-[#004ac6]" : "bg-slate-300"
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm transform ${
                    allowSelfEnrollment ? "translate-x-5" : "translate-x-0"
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#eff4ff]/40 hover:bg-[#eff4ff]/80 border border-[#c3c6d7]/10 rounded-xl transition-colors">
                <div>
                  <p className="text-xs font-bold text-[#0d1c2f]">Enforce Dual-Factor Auth (2FA)</p>
                  <p className="text-[11px] font-medium text-[#434655]">Mandatory validation structure for Administrators.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setEnforce2FA(!enforce2FA)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-1 cursor-pointer ${
                    enforce2FA ? "bg-[#004ac6]" : "bg-slate-300"
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm transform ${
                    enforce2FA ? "translate-x-5" : "translate-x-0"
                  }`} />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column Canvas: Role Matrix Framework & Hints */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d7]/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FaAward className="text-[#004ac6] text-lg" />
                <h3 className="text-lg font-black text-[#0d1c2f]">Role Context Boundaries</h3>
              </div>
              <button className="text-xs font-bold text-[#004ac6] hover:underline">Manage Rules</button>
            </div>

            <div className="space-y-4">
              {initialRoles.map((role) => (
                <div key={role.id} className="group border border-[#c3c6d7]/20 rounded-xl p-4 hover:border-[#004ac6]/40 transition-all bg-[#f8f9ff]/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase ${role.badgeBg}`}>
                      {role.name}
                    </span>
                    <button className="text-[#434655]/40 group-hover:text-[#004ac6] transition-colors">
                      <FaEdit className="text-xs" />
                    </button>
                  </div>
                  <p className="text-xs font-bold text-[#0d1c2f] mb-0.5">{role.description}</p>
                  <p className="text-[11px] text-[#434655] font-medium">{role.scope}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines Banner */}
          <div className="bg-[#eff4ff] rounded-2xl p-5 border border-[#d0e1fb] flex gap-4">
            <FaInfoCircle className="text-[#004ac6] text-lg mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#004ac6] mb-1">Configuration Scope Warning</p>
              <p className="text-[11px] text-[#434655] leading-relaxed font-medium">
                Altering base validation profiles drops current active sessions for non-admin accounts. Confirm targets line up with local enterprise compliance metrics before execution.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Persistent Fixed Commit Control Strip */}
      <footer className="fixed bottom-0 left-[280px] right-0 h-20 bg-white/95 backdrop-blur-md border-t border-[#c3c6d7]/50 flex items-center justify-between px-8 z-40 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2 text-[#434655]">
          <FaHistory className="text-xs" />
          <p className="text-xs font-medium italic">Environment sync stable: Active Session</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleDiscard}
            className="px-5 py-2.5 font-bold text-xs text-[#434655] hover:bg-[#eff4ff] rounded-xl transition-colors"
          >
            Discard Changes
          </button>
          <button 
            onClick={handleSave}
            className="bg-[#004ac6] hover:bg-[#2563eb] text-white px-6 py-2.5 font-bold text-xs rounded-xl shadow-sm active:scale-95 transition-all flex items-center gap-2"
          >
            <FaSave className="text-xs" /> 
            <span>Save Configurations</span>
          </button>
        </div>
      </footer>

    </div>
  );
}