import { useState, useMemo, useEffect } from "react";
import { 
  FaSearch, 
  FaChevronDown, 
  FaPlus, 
  FaEllipsisV, 
  FaBookmark, 
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaTrashAlt
} from "react-icons/fa";
import { supabase } from "../../utils/supabaseClient";

interface CourseRecord {
  code: string;
  title: string;
  instructor: string;
  enrolled: number;
  max: number;
  pct: number;
  status: "Open" | "Full";
  isFull: boolean;
  credits: number;
  syllabus: "Draft" | "Ready";
  avatar: string;
  department: string;
  description: string;
  isFeatured: boolean;
}

export default function Courses() {
  // Live Data Infrastructure
  const [courses, setCourses] = useState<CourseRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // New Course Creation Entry States
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    instructor: "Dr. Sarah Jenkins",
    max: 30,
    department: "Mathematics",
    credits: 4,
    syllabus: "Draft" as "Draft" | "Ready",
    description: "",
    isFeatured: false
  });

  // Filtering & Pagination Interface Configuration
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("Enrollment Status");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchLiveCourses();
  }, []);

  const fetchLiveCourses = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) throw error;

      const mapped: CourseRecord[] = (data || []).map((row) => {
        const pctValue = row.max_capacity > 0 ? Math.min(100, Math.round((row.enrolled / row.max_capacity) * 100)) : 0;
        return {
          code: row.code,
          title: row.title,
          instructor: row.instructor,
          enrolled: row.enrolled,
          max: row.max_capacity,
          pct: pctValue,
          status: row.enrolled >= row.max_capacity ? "Full" : "Open",
          isFull: row.enrolled >= row.max_capacity,
          credits: row.credits,
          syllabus: row.syllabus,
          avatar: row.avatar,
          department: row.department,
          description: row.description || "",
          isFeatured: row.is_featured
        };
      });

      setCourses(mapped);
    } catch (err) {
      console.error("Error synchronizing active course catalog catalogs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Action Routine: Provision New Record Row
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    const avatarMap: Record<string, string> = {
      "Dr. Sarah Jenkins": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100",
      "Prof. Michael Chen": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100",
      "Elena Rodriguez": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100",
      "Dr. Alan Turing": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
    };

    const payload = {
      code: formData.code.trim().toUpperCase(),
      title: formData.title.trim(),
      instructor: formData.instructor,
      enrolled: 0, // Starts fresh with zero enrollment allocations
      max_capacity: Number(formData.max),
      department: formData.department,
      status: "Open",
      credits: Number(formData.credits),
      syllabus: formData.syllabus,
      avatar: avatarMap[formData.instructor] || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100",
      description: formData.description.trim(),
      is_featured: formData.isFeatured
    };

    try {
      const { error } = await supabase.from("courses").insert([payload]);
      if (error) throw error;

      await fetchLiveCourses();
      setIsModalOpen(false);
      setFormData({
        code: "", title: "", instructor: "Dr. Sarah Jenkins", max: 30,
        department: "Mathematics", credits: 4, syllabus: "Draft", description: "", isFeatured: false
      });
    } catch (err) {
      alert("Failed to register and deploy new program listing metadata parameters.");
    }
  };

  // Action Routine: Revoke Course Entry
  const handleDeleteCourse = async (code: string) => {
    if (confirm(`Permanently terminate data listing access rules for ${code}?`)) {
      try {
        const { error } = await supabase.from("courses").delete().eq("code", code);
        if (error) throw error;
        setCourses(prev => prev.filter(c => c.code !== code));
        setActiveMenuId(null);
      } catch (err) {
        alert("Deletion failure occurred on database course nodes.");
      }
    }
  };

  // Client Data Pipeline Filtering Matrix
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch = 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = deptFilter === "All Departments" || c.department === deptFilter;
      
      let matchesStatus = true;
      if (statusFilter === "Open") matchesStatus = !c.isFull;
      if (statusFilter === "Full") matchesStatus = c.isFull;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [courses, searchTerm, deptFilter, statusFilter]);

  // Handle Standard Non-Featured Multi-page Array Splitting
  const standardCourses = useMemo(() => filteredCourses.filter(c => !c.isFeatured), [filteredCourses]);
  const featuredCourses = useMemo(() => filteredCourses.filter(c => c.isFeatured), [filteredCourses]);

  const paginatedStandard = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return standardCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [standardCourses, currentPage]);

  const totalPages = Math.ceil(standardCourses.length / itemsPerPage) || 1;

  return (
    <div className="p-1 max-w-[1440px] mx-auto w-full space-y-6">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#0d1c2f] tracking-tight">Course Catalog</h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="bg-[#2563eb]/10 text-[#004ac6] px-3 py-1 rounded-full text-xs font-bold">
              {courses.length} Active Programs
            </span>
            <span className="text-xs text-[#434655]/70 font-medium">Synced live with Supabase Engine</span>
          </div>
        </div>

        {/* Filters and Utilities Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[160px]">
            <select 
              value={deptFilter}
              onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }}
              className="w-full pl-3 pr-10 py-2 bg-white border border-[#c3c6d7] rounded-xl appearance-none text-xs font-bold text-[#434655] focus:outline-none cursor-pointer"
            >
              <option>All Departments</option>
              <option>Mathematics</option>
              <option>Computer Science</option>
              <option>Business</option>
              <option>Design</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none text-[10px]" />
          </div>

          <div className="relative min-w-[160px]">
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full pl-3 pr-10 py-2 bg-white border border-[#c3c6d7] rounded-xl appearance-none text-xs font-bold text-[#434655] focus:outline-none cursor-pointer"
            >
              <option>All Enrollment Statuses</option>
              <option value="Open">Open</option>
              <option value="Full">Full</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none text-[10px]" />
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#004ac6] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#2563eb] transition-all shadow-md shadow-[#004ac6]/10 active:scale-95"
          >
            <FaPlus />
            <span>Create Course</span>
          </button>
        </div>
      </div>

      {/* 2. Search Box Option Strip */}
      <div className="relative w-full max-w-xl">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737686] text-sm" />
        <input 
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#c3c6d7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20 transition-all text-[#0d1c2f]" 
          placeholder="Search programs, codes, or instructors..." 
          type="text"
        />
      </div>

      {/* 3. Catalog Modular Grid Structure Canvas Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <span className="w-8 h-8 border-4 border-[#004ac6]/20 border-t-[#004ac6] inline-block rounded-full animate-spin" />
          </div>
        ) : paginatedStandard.length > 0 || featuredCourses.length > 0 ? (
          <>
            {/* Standard Course Cards */}
            {paginatedStandard.map((course) => (
              <div key={course.code} className="bg-white rounded-2xl p-6 border border-[#c3c6d7]/40 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 group relative">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-[#004ac6] bg-[#dbe1ff] px-3 py-1 rounded-lg">
                    {course.code}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide ${
                    course.isFull ? "bg-red-100 text-[#ba1a1a]" : "bg-emerald-100 text-[#006242]"
                  }`}>
                    {course.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-[#0d1c2f] mb-1 group-hover:text-[#004ac6] transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <img className="w-6 h-6 rounded-full object-cover border" src={course.avatar} alt={course.instructor} />
                    <span className="text-xs font-semibold text-[#434655]">{course.instructor}</span>
                  </div>
                </div>

                <div className="space-y-1.5 mt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#434655]/80">Enrollment</span>
                    <span className="text-[#0d1c2f]">{course.enrolled} / {course.max} Enrolled</span>
                  </div>
                  <div className="h-2 w-full bg-[#f8f9ff] border border-[#c3c6d7]/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${course.isFull ? 'bg-[#ba1a1a]' : 'bg-[#004ac6]'}`} 
                      style={{ width: `${course.pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#c3c6d7]/30 mt-auto relative">
                  <div className="flex gap-2 items-center">
                    <span className="bg-[#eff4ff] text-[#434655] px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border">
                      Syllabus: {course.syllabus}
                    </span>
                    <span className="text-[11px] font-bold text-[#505f76] flex items-center gap-1">
                      <FaBookmark className="text-[9px] opacity-60" />
                      {course.credits} Credits
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => setActiveMenuId(activeMenuId === course.code ? null : course.code)}
                    className="text-[#737686] hover:text-[#0d1c2f] transition-colors p-1"
                  >
                    <FaEllipsisV className="text-xs" />
                  </button>

                  {activeMenuId === course.code && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                      <div className="absolute right-0 bottom-8 bg-white border border-[#c3c6d7]/40 shadow-xl rounded-xl py-1 w-32 text-left z-20">
                        <button 
                          onClick={() => handleDeleteCourse(course.code)}
                          className="w-full px-3 py-2 text-[11px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-all"
                        >
                          <FaTrashAlt /> <span>Delete Entry</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Featured Bento Row Layout Matrix Injection */}
            {featuredCourses.map((fCourse) => (
              <div key={fCourse.code} className="bg-[#e6eeff]/60 rounded-2xl p-6 border border-[#c3c6d7]/50 flex flex-col md:flex-row gap-6 lg:col-span-2 relative overflow-hidden group">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[11px] font-bold text-[#004ac6] bg-[#dbe1ff] px-3 py-1 rounded-lg">{fCourse.code}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide ${fCourse.isFull ? 'bg-red-100 text-[#ba1a1a]' : 'bg-emerald-100 text-[#006242]'}`}>{fCourse.status}</span>
                    </div>
                    <h3 className="text-lg font-black text-[#0d1c2f] mb-1.5 group-hover:text-[#004ac6] transition-colors cursor-pointer">
                      {fCourse.title}
                    </h3>
                    <p className="text-xs text-[#434655] leading-relaxed line-clamp-2">
                      {fCourse.description || "Exploration of system principles matching corporate operational structures."}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-4 justify-between">
                    <div className="flex items-center gap-2">
                      <img className="w-7 h-7 rounded-full object-cover border-2 border-white" src={fCourse.avatar} alt="Prof" />
                      <span className="text-xs font-bold text-[#434655]">{fCourse.instructor}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteCourse(fCourse.code)}
                      className="text-[#737686] hover:text-red-600 text-xs font-semibold flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                </div>

                <div className="md:w-48 bg-white rounded-xl p-4 flex flex-col justify-center border border-[#c3c6d7]/30 shadow-sm">
                  <div className="text-center mb-3">
                    <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Current Status</p>
                    <p className="text-3xl font-black text-[#004ac6] mt-0.5">{fCourse.pct}%</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-[#0d1c2f]">{fCourse.enrolled}/{fCourse.max} Filled</span>
                      <span className="text-[#505f76]">{fCourse.credits} Credits</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#f8f9ff] rounded-full overflow-hidden">
                      <div className={`h-full ${fCourse.isFull ? 'bg-red-600' : 'bg-[#004ac6]'}`} style={{ width: `${fCourse.pct}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="col-span-full text-center py-12 text-xs font-bold text-[#434655]">No course programs match your current filter selections.</div>
        )}
      </div>

      {/* 5. Pagination Control Footer */}
      <div className="pt-4 flex items-center justify-between border-t border-[#c3c6d7]/20">
        <p className="text-xs font-semibold text-[#434655]">
          Showing {standardCourses.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, standardCourses.length)} of {standardCourses.length} programs
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

      {/* Program Registration Entry Overlay Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#c3c6d7]/50 shadow-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-[#434655]/50 hover:text-[#0d1c2f]"><FaTimes /></button>
            <div className="mb-4">
              <h3 className="text-base font-black text-[#0d1c2f]">Create New Program</h3>
              <p className="text-[11px] font-medium text-[#434655]">Deploy updated course curriculum pathways into production.</p>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Code</label>
                  <input required type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} placeholder="CS-101" className="w-full text-xs font-semibold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2 px-3 focus:bg-white focus:ring-2 focus:ring-[#004ac6]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Course Title</label>
                  <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Intro to Algorithms" className="w-full text-xs font-semibold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2 px-3 focus:bg-white focus:ring-2 focus:ring-[#004ac6]" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Assigned Instructor</label>
                <select value={formData.instructor} onChange={(e) => setFormData({...formData, instructor: e.target.value})} className="w-full text-xs font-bold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2 px-3 focus:ring-2 focus:ring-[#004ac6]">
                  <option>Dr. Sarah Jenkins</option>
                  <option>Prof. Michael Chen</option>
                  <option>Elena Rodriguez</option>
                  <option>Dr. Alan Turing</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Department</label>
                  <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full text-xs font-bold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2 px-3 focus:ring-2 focus:ring-[#004ac6]">
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Credits</label>
                  <input type="number" min={1} max={5} value={formData.credits} onChange={(e) => setFormData({...formData, credits: Number(e.target.value)})} className="w-full text-xs font-semibold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2 px-3 focus:bg-white focus:ring-2 focus:ring-[#004ac6]" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Max Cap</label>
                  <input type="number" min={5} max={100} value={formData.max} onChange={(e) => setFormData({...formData, max: Number(e.target.value)})} className="w-full text-xs font-semibold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2 px-3 focus:bg-white focus:ring-2 focus:ring-[#004ac6]" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Description (Required for Feature Highlights)</label>
                <textarea rows={2} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Brief breakdown of core curriculum metrics..." className="w-full text-xs font-semibold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2 px-3 focus:bg-white focus:ring-2 focus:ring-[#004ac6]" />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="rounded text-[#004ac6] focus:ring-[#004ac6] w-4 h-4 cursor-pointer" />
                <label htmlFor="isFeatured" className="text-xs font-bold text-[#0d1c2f] cursor-pointer selection:bg-transparent">Promote as Featured Large Bento Card</label>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 rounded-xl border border-[#c3c6d7] text-[#434655] font-bold text-xs hover:bg-[#eff4ff]/40">Cancel</button>
                <button type="submit" className="px-4 py-2.5 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white font-bold text-xs shadow-sm">Save Program</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}