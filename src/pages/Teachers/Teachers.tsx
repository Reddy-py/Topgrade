import { useState, useMemo, useEffect } from "react";
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
  FaExclamationTriangle,
  FaTimes,
  FaTrashAlt,
  FaEnvelope
} from "react-icons/fa";
import { supabase } from "../../utils/supabaseClient";

interface TeacherRecord {
  id: string;
  name: string;
  email: string;
  dept: string;
  courses: string[];
  status: "Available" | "In Class" | "On Leave";
  isAvailable: boolean;
  avatar: string;
}

export default function Teachers() {
  // Live Infrastructure Data States
  const [teachers, setTeachers] = useState<TeacherRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Form Entry States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dept: "Science",
    status: "Available" as "Available" | "In Class" | "On Leave",
    rawCourses: ""
  });

  // Client Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("Availability: All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 1. Initial Resource Fetch Cycle
  useEffect(() => {
    fetchLiveTeachers();
  }, []);

  const fetchLiveTeachers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("teachers").select("*");
      if (error) throw error;

      const mapped: TeacherRecord[] = (data || []).map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        dept: row.dept,
        courses: row.courses || [],
        status: row.status,
        isAvailable: row.is_available,
        avatar: row.avatar
      }));
      setTeachers(mapped);
    } catch (err) {
      console.error("Error connecting to faculty roster metrics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Action Routine: Provision New Record
  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    const uniqueId = `TCH-${Math.floor(100 + Math.random() * 900)}`;
    
    // Parse comma separated strings into a structural array cleanly
    const coursesArray = formData.rawCourses
      .split(",")
      .map(c => c.trim())
      .filter(c => c.length > 0);

    const payload = {
      id: uniqueId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      dept: formData.dept,
      courses: coursesArray,
      status: formData.status,
      is_available: formData.status === "Available",
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?q=80&w=100`
    };

    try {
      const { error } = await supabase.from("teachers").insert([payload]);
      if (error) throw error;

      await fetchLiveTeachers();
      setIsModalOpen(false);
      setFormData({ name: "", email: "", dept: "Science", status: "Available", rawCourses: "" });
    } catch (err) {
      alert("Failed to securely append teacher record profiles.");
    }
  };

  // 3. Action Routine: Revoke Database Entry
  const handleDeleteTeacher = async (id: string, name: string) => {
    if (confirm(`Remove and revoke system profile clearance access for ${name}?`)) {
      try {
        const { error } = await supabase.from("teachers").delete().eq("id", id);
        if (error) throw error;
        setTeachers(prev => prev.filter(t => t.id !== id));
        setActiveMenuId(null);
      } catch (err) {
        alert("Deletion failure occurred on production rows.");
      }
    }
  };

  // Filter Pipeline Processing Grid Matrix
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchesSearch = 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = deptFilter === "All Departments" || t.dept === deptFilter;
      
      let matchesStatus = true;
      if (statusFilter !== "Availability: All") {
        matchesStatus = t.status === statusFilter;
      }

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [teachers, searchTerm, deptFilter, statusFilter]);

  // Live Multi-page Pagination Calculus
  const paginatedTeachers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTeachers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTeachers, currentPage]);

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage) || 1;

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto p-1">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black text-[#004ac6]">Faculty Directory</h2>
          <span className="px-2.5 py-0.5 bg-[#004ac6]/10 text-[#004ac6] rounded-full text-xs font-bold border border-[#004ac6]/20">
            {teachers.length} Active Faculty
          </span>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-[#004ac6] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-[#004ac6]/10 hover:bg-[#2563eb] transition-all active:scale-95"
        >
          <FaPlus />
          <span>Add New Teacher</span>
        </button>
      </div>

      {/* 2. Filter Strip Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-6 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737686]" />
          <input 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#c3c6d7] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20 transition-all text-[#0d1c2f]" 
            placeholder="Search by name, department, or staff ID..." 
            type="text"
          />
        </div>
        <div className="lg:col-span-3 relative">
          <select 
            value={deptFilter}
            onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }}
            className="w-full pl-4 pr-10 py-3 bg-white border border-[#c3c6d7] rounded-2xl text-sm font-semibold text-[#434655] appearance-none focus:outline-none cursor-pointer"
          >
            <option>All Departments</option>
            <option>Science</option>
            <option>Mathematics</option>
            <option>Humanities</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none text-xs" />
        </div>
        <div className="lg:col-span-3 relative">
          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="w-full pl-4 pr-10 py-3 bg-white border border-[#c3c6d7] rounded-2xl text-sm font-semibold text-[#434655] appearance-none focus:outline-none cursor-pointer"
          >
            <option>Availability: All</option>
            <option>In Class</option>
            <option>Available</option>
            <option>On Leave</option>
          </select>
          <FaFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none text-xs" />
        </div>
      </div>

      {/* 3. Main Ledger Table Card */}
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <span className="w-6 h-6 border-2 border-[#004ac6]/30 border-t-[#004ac6] inline-block rounded-full animate-spin" />
                  </td>
                </tr>
              ) : paginatedTeachers.length > 0 ? (
                paginatedTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-[#f8f9ff] transition-colors">
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
                          : teacher.status === "On Leave" 
                            ? "bg-red-500/10 text-red-700 border-red-500/20"
                            : "bg-[#004ac6]/10 text-[#004ac6] border-[#004ac6]/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          teacher.isAvailable ? "bg-emerald-500" : teacher.status === "On Leave" ? "bg-red-500" : "bg-[#004ac6] animate-pulse"
                        }`} />
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === teacher.id ? null : teacher.id)}
                        className="hover:bg-[#eff4ff] rounded-full p-2 text-[#737686] transition-all"
                      >
                        <FaEllipsisV className="text-xs" />
                      </button>

                      {activeMenuId === teacher.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                          <div className="absolute right-6 top-12 bg-white border border-[#c3c6d7]/40 shadow-xl rounded-xl py-1.5 w-40 text-left z-20">
                            <button 
                              onClick={() => { window.location.href = `mailto:${teacher.email}`; setActiveMenuId(null); }}
                              className="w-full px-3.5 py-2 text-[11px] font-bold text-[#434655] hover:bg-[#eff4ff] hover:text-[#004ac6] flex items-center gap-2 transition-all"
                            >
                              <FaEnvelope /> <span>Email Staff</span>
                            </button>
                            <hr className="border-[#c3c6d7]/20 my-1" />
                            <button 
                              onClick={() => handleDeleteTeacher(teacher.id, teacher.name)}
                              className="w-full px-3.5 py-2 text-[11px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-all"
                            >
                              <FaTrashAlt /> <span>Remove Access</span>
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-xs font-bold text-[#434655]">No faculty match criteria parameters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Footer */}
        <div className="px-6 py-4 bg-[#f8f9ff] border-t border-[#c3c6d7]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-[#434655]">
            Showing <span className="font-bold text-[#0d1c2f]">
              {filteredTeachers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredTeachers.length)}
            </span> of <span className="font-bold text-[#0d1c2f]">{filteredTeachers.length}</span> results
          </p>
          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#c3c6d7] text-[#737686] disabled:opacity-30"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <span className="text-xs font-bold text-[#0d1c2f] px-2">Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#c3c6d7] text-[#737686] disabled:opacity-30"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Extra Analytics Matrix Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#c3c6d7]/50 shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6]"><FaSearchPlus /></div>
          <div>
            <p className="text-[#434655] text-xs font-bold">Open Vacancies</p>
            <h4 className="text-2xl font-black text-[#0d1c2f] mt-1">12</h4>
          </div>
          <p className="text-[#006242] font-bold text-[11px]">📈 4 from last month</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#c3c6d7]/50 shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#006242]"><FaCheckCircle /></div>
          <div>
            <p className="text-[#434655] text-xs font-bold">Average Rating</p>
            <h4 className="text-2xl font-black text-[#0d1c2f] mt-1">4.8/5</h4>
          </div>
          <p className="text-[#006242] font-bold text-[11px] flex items-center gap-1"><FaAward /> <span>Top 5% Faculty</span></p>
        </div>
        <div className="bg-[#004ac6] p-6 rounded-3xl shadow-lg flex flex-col gap-2 relative overflow-hidden group">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">✨</div>
          <div>
            <p className="text-white/80 text-xs font-bold">Attendance Score</p>
            <h4 className="text-2xl font-black text-white mt-1">98.4%</h4>
          </div>
          <p className="text-white/60 text-[10px] font-medium">Faculty reliability all-time high</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#c3c6d7]/50 shadow-sm flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-[#ba1a1a]"><FaExclamationTriangle /></div>
          <div>
            <p className="text-[#434655] text-xs font-bold">Pending Approvals</p>
            <h4 className="text-2xl font-black text-[#0d1c2f] mt-1">07</h4>
          </div>
          <p className="text-[#ba1a1a] font-bold text-[11px]">⚠️ Requires action</p>
        </div>
      </div>

      {/* Account Provision Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#c3c6d7]/50 shadow-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-[#434655]/50 hover:text-[#0d1c2f]"><FaTimes /></button>
            <div className="mb-4">
              <h3 className="text-base font-black text-[#0d1c2f]">Add Teacher Record</h3>
              <p className="text-[11px] font-medium text-[#434655]">Provision corporate educational clearance profiles.</p>
            </div>
            <form onSubmit={handleCreateTeacher} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Full Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Dr. Emily Watson" className="w-full text-xs font-semibold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2.5 px-3 focus:bg-white focus:ring-2 focus:ring-[#004ac6] transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="username@topgrade.edu" className="w-full text-xs font-semibold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2.5 px-3 focus:bg-white focus:ring-2 focus:ring-[#004ac6] transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Department</label>
                  <select value={formData.dept} onChange={(e) => setFormData({...formData, dept: e.target.value})} className="w-full text-xs font-bold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2.5 px-3 focus:ring-2 focus:ring-[#004ac6]">
                    <option>Science</option>
                    <option>Mathematics</option>
                    <option>Humanities</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Initial Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as any})} className="w-full text-xs font-bold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2.5 px-3 focus:ring-2 focus:ring-[#004ac6]">
                    <option value="Available">Available</option>
                    <option value="In Class">In Class</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Assigned Courses (Comma Separated)</label>
                <input type="text" value={formData.rawCourses} onChange={(e) => setFormData({...formData, rawCourses: e.target.value})} placeholder="e.g. Biology 101, Chemistry" className="w-full text-xs font-semibold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2.5 px-3 focus:bg-white focus:ring-2 focus:ring-[#004ac6] transition-all" />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 rounded-xl border border-[#c3c6d7] text-[#434655] font-bold text-xs hover:bg-[#eff4ff]/40">Cancel</button>
                <button type="submit" className="px-4 py-2.5 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white font-bold text-xs shadow-sm">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}