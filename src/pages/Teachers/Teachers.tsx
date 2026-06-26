import { 
  FaPlus, 
  FaSearch, 
  FaChevronDown, 
  FaFilter, 
  FaEllipsisV, 
  FaChevronLeft, 
  FaChevronRight, 
  FaSearchPlus, 
  FaCheckCircle, 
  FaAward, 
  FaExclamationTriangle 
} from "react-icons/fa";

const facultyData = [
  { id: "#TCH-442", name: "Dr. Emily Watson", email: "emily.watson@topgrade.edu", dept: "Science", courses: ["Biology 101", "Chemistry"], status: "In Class", isAvailable: false, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100" },
  { id: "#TCH-710", name: "Prof. Alan Turing", email: "alan.turing@topgrade.edu", dept: "Mathematics", courses: ["Calculus II", "Logics"], status: "Available", isAvailable: true, avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100" },
  { id: "#TCH-219", name: "Ms. Maria Gonzalez", email: "m.gonzalez@topgrade.edu", dept: "Humanities", courses: ["World History"], status: "In Class", isAvailable: false, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100" },
  { id: "#TCH-884", name: "Dr. Robert Carter", email: "r.carter@topgrade.edu", dept: "Science", courses: ["Physics I", "Astrophysics"], status: "Available", isAvailable: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" },
];

export default function Teachers() {
  return (
    <div className="space-y-6 max-w-[1440px] mx-auto">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black text-[#004ac6]">Faculty Directory</h2>
          <span className="px-2.5 py-0.5 bg-[#004ac6]/10 text-[#004ac6] rounded-full text-xs font-bold border border-[#004ac6]/20">
            128 Active Faculty
          </span>
        </div>
        <button className="px-5 py-2.5 bg-[#004ac6] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-[#004ac6]/10 hover:bg-[#2563eb] transition-all active:scale-95">
          <FaPlus />
          <span>Add New Teacher</span>
        </button>
      </div>

      {/* 2. Utility Control Filtering Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-6 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737686]" />
          <input 
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#c3c6d7] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20 transition-all text-[#0d1c2f]" 
            placeholder="Search by name, department, or staff ID..." 
            type="text"
          />
        </div>
        <div className="lg:col-span-3 relative">
          <select className="w-full pl-4 pr-10 py-3 bg-white border border-[#c3c6d7] rounded-2xl text-sm font-semibold text-[#434655] appearance-none focus:outline-none cursor-pointer">
            <option>All Departments</option>
            <option>Science</option>
            <option>Mathematics</option>
            <option>Humanities</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none text-xs" />
        </div>
        <div className="lg:col-span-3 relative">
          <select className="w-full pl-4 pr-10 py-3 bg-white border border-[#c3c6d7] rounded-2xl text-sm font-semibold text-[#434655] appearance-none focus:outline-none cursor-pointer">
            <option>Availability: All</option>
            <option>In Class</option>
            <option>Available</option>
            <option>On Leave</option>
          </select>
          <FaFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none text-xs" />
        </div>
      </div>

      {/* 3. Main Faculty Table Card Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d7]/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eff4ff]/50 border-b border-[#c3c6d7]/50">
                <th className="px-6 py-4 text-xs font-bold text-[#434655] uppercase tracking-wider">Teacher Profile</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655] uppercase tracking-wider">Staff ID</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655] uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655] uppercase tracking-wider">Assigned Courses</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/20">
              {facultyData.map((teacher, idx) => (
                <tr key={idx} className="hover:bg-[#f8f9ff] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img className="w-11 h-11 rounded-full object-cover border border-[#c3c6d7]/30" src={teacher.avatar} alt={teacher.name} />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#0d1c2f]">{teacher.name}</span>
                        <span className="text-xs text-[#434655]">{teacher.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#434655]">{teacher.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#0d1c2f]">{teacher.dept}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {teacher.courses.map((course, cIdx) => (
                        <span key={cIdx} className="px-2 py-0.5 bg-[#d3e4fe] text-[#38485d] rounded-full text-[10px] font-bold">
                          {course}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold border ${
                      teacher.isAvailable 
                        ? "bg-emerald-500/10 text-[#006242] border-emerald-500/20" 
                        : "bg-[#004ac6]/10 text-[#004ac6] border-[#004ac6]/20"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${teacher.isAvailable ? "bg-emerald-500" : "bg-[#004ac6] animate-pulse"}`}></span>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="hover:bg-[#eff4ff] rounded-full p-2 text-[#737686] transition-all">
                      <FaEllipsisV className="text-xs" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Sub-Footer Panel */}
        <div className="px-6 py-4 bg-[#f8f9ff] border-t border-[#c3c6d7]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-[#434655]">
            Showing <span className="font-bold text-[#0d1c2f]">1-4</span> of <span className="font-bold text-[#0d1c2f]">128</span> teachers
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#c3c6d7] text-[#737686] opacity-40" disabled>
              <FaChevronLeft className="text-xs" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#004ac6] text-white text-xs font-bold shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-xl text-xs font-bold text-[#0d1c2f] hover:bg-[#eff4ff] rounded-xl">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-xl text-xs font-bold text-[#0d1c2f] hover:bg-[#eff4ff] rounded-xl">3</button>
            <span className="px-1 text-[#737686] text-xs">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-xl text-xs font-bold text-[#0d1c2f] hover:bg-[#eff4ff] rounded-xl">32</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#c3c6d7] text-[#737686] hover:bg-[#eff4ff]">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bento Grid Extra Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#c3c6d7]/50 shadow-sm flex flex-col gap-2 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6]">
            <FaSearchPlus />
          </div>
          <div>
            <p className="text-[#434655] text-xs font-bold">Open Vacancies</p>
            <h4 className="text-2xl font-black text-[#0d1c2f] mt-1">12</h4>
          </div>
          <p className="text-[#006242] font-bold text-[11px] flex items-center gap-1">📈 <span>4 from last month</span></p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#c3c6d7]/50 shadow-sm flex flex-col gap-2 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#006242]">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-[#434655] text-xs font-bold">Average Rating</p>
            <h4 className="text-2xl font-black text-[#0d1c2f] mt-1">4.8/5</h4>
          </div>
          <p className="text-[#006242] font-bold text-[11px] flex items-center gap-1"><FaAward /> <span>Top 5% Faculty</span></p>
        </div>

        <div className="bg-[#004ac6] p-6 rounded-3xl shadow-lg flex flex-col gap-2 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
            ✨
          </div>
          <div>
            <p className="text-white/80 text-xs font-bold">Attendance Score</p>
            <h4 className="text-2xl font-black text-white mt-1">98.4%</h4>
          </div>
          <p className="text-white/60 text-[10px] leading-tight font-medium">Faculty reliability is at an all-time high.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#c3c6d7]/50 shadow-sm flex flex-col gap-2 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-[#ba1a1a]">
            <FaExclamationTriangle />
          </div>
          <div>
            <p className="text-[#434655] text-xs font-bold">Pending Approvals</p>
            <h4 className="text-2xl font-black text-[#0d1c2f] mt-1">07</h4>
          </div>
          <p className="text-[#ba1a1a] font-bold text-[11px] flex items-center gap-1">⚠️ <span>Requires action</span></p>
        </div>
      </div>

    </div>
  );
}