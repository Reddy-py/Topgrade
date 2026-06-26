import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Dashboard() {
  // Mock Metric Datasets
  const metrics = [
    { title: "Total Students", value: "1,248", change: "+12% this term", positive: true, icon: FaUserGraduate, color: "bg-blue-500" },
    { title: "Active Faculty", value: "84", change: "+3 new this month", positive: true, icon: FaChalkboardTeacher, color: "bg-emerald-500" },
    { title: "Active Courses", value: "42", change: "Stable", positive: true, isStable: true, icon: FaBookOpen, color: "bg-purple-500" },
    { title: "Outstanding Fees", value: "$8,420", change: "-18% from last month", positive: true, icon: FaWallet, color: "bg-amber-500" },
  ];

  // Mock Performance Metrics for Chart Layout
  const performanceData = [
    { label: "Jan/Feb", percentage: 65, grade: "B-" },
    { label: "Mar/Apr", percentage: 78, grade: "B+" },
    { label: "Mid-Term", percentage: 92, grade: "A" },
    { label: "May", percentage: 84, grade: "A-" },
    { label: "Current", percentage: 89, grade: "A" },
  ];

  // Recent Action Logs
  const activities = [
    { message: "Registrar added 14 new students to Calculus III", time: "12 mins ago", type: "system" },
    { message: "Invoice batch generated for Summer Quarter tuition", time: "1 hr ago", type: "finance" },
    { message: "Professor Vance updated mid-term attendance logs", time: "3 hrs ago", type: "academic" },
  ];

  return (
    <div className="space-y-6 p-1">
      {/* View Header */}
      <div>
        <h1 className="text-2xl font-black text-[#0d1c2f]">Institutional Overview</h1>
        <p className="text-xs font-semibold text-[#434655]">Real-time operational and academic metric monitoring dashboard.</p>
      </div>

      {/* KPI Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-[#c3c6d7]/40 p-5 shadow-sm hover:shadow-md transition-all flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-[#434655] uppercase tracking-wider">{item.title}</p>
                <h3 className="text-2xl font-black text-[#0d1c2f]">{item.value}</h3>
                <div className="flex items-center gap-1">
                  {!item.isStable && (
                    item.positive ? <FaArrowUp className="text-emerald-500 text-[10px]" /> : <FaArrowDown className="text-amber-500 text-[10px]" />
                  )}
                  <span className={`text-[10px] font-bold ${item.isStable ? "text-[#434655]/60" : "text-emerald-600"}`}>
                    {item.change}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white text-sm shadow-inner`}>
                <Icon />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Summary & Logs Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Analytics Chart Block */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#c3c6d7]/40 p-6 flex flex-col justify-between shadow-sm">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h2 className="text-base font-black text-[#0d1c2f]">Average Academic Achievement</h2>
              <p className="text-xs font-medium text-[#434655]">Historical grade tracking across all active enrollment sets.</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#004ac6] bg-[#eff4ff] px-2.5 py-1 rounded-md border border-[#d0e1fb]">
              Active Term
            </span>
          </div>

          {/* Pure HTML Chart Visual System */}
          <div className="h-48 flex items-end justify-between gap-4 pt-4 px-2 border-b border-[#c3c6d7]/40">
            {performanceData.map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[10px] font-black text-[#004ac6] opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 bg-[#eff4ff] px-1.5 py-0.5 rounded border border-[#d0e1fb]">
                  {bar.grade} ({bar.percentage}%)
                </span>
                <div 
                  style={{ height: `${bar.percentage}%` }}
                  className="w-full bg-gradient-to-t from-[#004ac6] to-[#2563eb] rounded-t-lg transition-all duration-500 group-hover:brightness-110 shadow-sm relative"
                />
                <span className="text-[10px] font-bold text-[#434655] pt-2 truncate max-w-full">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Feeds Container */}
        <div className="bg-white rounded-2xl border border-[#c3c6d7]/40 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black text-[#0d1c2f]">System Activity Logs</h2>
            <p className="text-xs font-medium text-[#434655] mb-4">Live security and internal audit streams.</p>
            
            <div className="space-y-4">
              {activities.map((act, idx) => (
                <div key={idx} className="flex gap-3 items-start p-2.5 rounded-xl hover:bg-[#eff4ff]/40 transition-all border border-transparent hover:border-[#c3c6d7]/20">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-[#004ac6] flex-shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-[#0d1c2f] leading-snug">{act.message}</p>
                    <span className="text-[10px] font-medium text-[#434655]/60 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => alert("Redirecting to unified audit ledger parameters...")}
            className="w-full text-center border border-[#c3c6d7]/60 hover:border-[#004ac6] hover:bg-[#eff4ff]/30 text-[#434655] hover:text-[#004ac6] text-[11px] font-bold py-2.5 rounded-xl transition-all mt-4"
          >
            Review Complete System Logs
          </button>
        </div>

      </div>
    </div>
  );
}