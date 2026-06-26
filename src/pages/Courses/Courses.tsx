import { 
  FaSearch, 
  FaChevronDown, 
  FaPlus, 
  FaEllipsisV, 
  FaBookmark, 
  FaChevronLeft 
} from "react-icons/fa";

const initialCourses = [
  { code: "MATH-302", title: "Advanced Calculus II", instructor: "Dr. Sarah Jenkins", enrolled: 24, max: 30, pct: 80, status: "Open", isFull: false, credits: 4, syllabus: "Ready", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100" },
  { code: "CS-101", title: "Intro to Algorithms", instructor: "Prof. Michael Chen", enrolled: 50, max: 50, pct: 100, status: "Full", isFull: true, credits: 3, syllabus: "Ready", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100" },
  { code: "DES-240", title: "Typography & UI Design", instructor: "Elena Rodriguez", enrolled: 12, max: 20, pct: 60, status: "Open", isFull: false, credits: 4, syllabus: "Draft", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" },
  { code: "PHYS-201", title: "Applied Physics", instructor: "Dr. Alan Turing", enrolled: 15, max: 35, pct: 42, status: "Open", isFull: false, credits: 4, syllabus: "Ready", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" },
];

export default function Courses() {
  return (
    <div className="p-1 max-w-[1440px] mx-auto w-full space-y-6">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#0d1c2f] tracking-tight">Course Catalog</h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="bg-[#2563eb]/10 text-[#004ac6] px-3 py-1 rounded-full text-xs font-bold">
              42 Active Programs
            </span>
            <span className="text-xs text-[#434655]/70 font-medium">Last updated 2 hours ago</span>
          </div>
        </div>

        {/* Filters and Utilities Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[160px]">
            <select className="w-full pl-3 pr-10 py-2 bg-white border border-[#c3c6d7] rounded-xl appearance-none text-xs font-bold text-[#434655] focus:outline-none cursor-pointer">
              <option>All Departments</option>
              <option>Mathematics</option>
              <option>Computer Science</option>
              <option>Business</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none text-[10px]" />
          </div>

          <div className="relative min-w-[160px]">
            <select className="w-full pl-3 pr-10 py-2 bg-white border border-[#c3c6d7] rounded-xl appearance-none text-xs font-bold text-[#434655] focus:outline-none cursor-pointer">
              <option>Enrollment Status</option>
              <option>Open</option>
              <option>Full</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none text-[10px]" />
          </div>

          <button className="bg-[#004ac6] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#2563eb] transition-all shadow-md shadow-[#004ac6]/10 active:scale-95">
            <FaPlus />
            <span>Create Course</span>
          </button>
        </div>
      </div>

      {/* 2. Global Inner App Search Utilities Option Strip */}
      <div className="relative w-full max-w-xl">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737686] text-sm" />
        <input 
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#c3c6d7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20 transition-all text-[#0d1c2f]" 
          placeholder="Search programs, codes, or instructors..." 
          type="text"
        />
      </div>

      {/* 3. Catalog Modular Grid Structure Canvas Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Render Standard Courses mapped cards */}
        {initialCourses.map((course, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-[#c3c6d7]/40 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 group">
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
              <h3 className="text-base font-black text-[#0d1c2f] mb-1 group-hover:text-[#004ac6] transition-colors cursor-pointer line-clamp-1">
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
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#c3c6d7]/30 mt-auto">
              <div className="flex gap-2 items-center">
                <span className="bg-[#eff4ff] text-[#434655] px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border">
                  Syllabus: {course.syllabus}
                </span>
                <span className="text-[11px] font-bold text-[#505f76] flex items-center gap-1">
                  <FaBookmark className="text-[9px] opacity-60" />
                  {course.credits} Credits
                </span>
              </div>
              <button className="text-[#737686] hover:text-[#0d1c2f] transition-colors p-1">
                <FaEllipsisV className="text-xs" />
              </button>
            </div>
          </div>
        ))}

        {/* 4. Large Feature Horizontal Bento Style Card (BUS-410) Layout Integration */}
        <div className="bg-[#e6eeff]/60 rounded-2xl p-6 border border-[#c3c6d7]/50 flex flex-col md:flex-row gap-6 lg:col-span-2 relative overflow-hidden group">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-bold text-[#004ac6] bg-[#dbe1ff] px-3 py-1 rounded-lg">BUS-410</span>
                <span className="bg-emerald-100 text-[#006242] px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide">Open</span>
              </div>
              <h3 className="text-lg font-black text-[#0d1c2f] mb-1.5 group-hover:text-[#004ac6] transition-colors cursor-pointer">
                International Business Ethics
              </h3>
              <p className="text-xs text-[#434655] leading-relaxed line-clamp-2">
                Exploration of global ethical standards in corporate governance and multi-national trade relations.
              </p>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 rounded-full object-cover border-2 border-white" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100" alt="Prof" />
                <div className="w-7 h-7 rounded-full border-2 border-white bg-[#d0e1fb] flex items-center justify-center text-[9px] font-bold text-[#0b1c30]">
                  +2
                </div>
              </div>
              <span className="text-xs font-bold text-[#434655]">Team Taught</span>
            </div>
          </div>

          <div className="md:w-48 bg-white rounded-xl p-4 flex flex-col justify-center border border-[#c3c6d7]/30 shadow-sm">
            <div className="text-center mb-3">
              <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Current Status</p>
              <p className="text-3xl font-black text-[#004ac6] mt-0.5">88%</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-[#0d1c2f]">18/20 Filled</span>
                <span className="text-[#006242]">Waitlist: 2</span>
              </div>
              <div className="h-1.5 w-full bg-[#f8f9ff] rounded-full overflow-hidden">
                <div className="h-full bg-[#004ac6] w-[88%]"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. Pagination Control Footer */}
      <div className="pt-4 flex items-center justify-between border-t border-[#c3c6d7]/20">
        <p className="text-xs font-semibold text-[#434655]">Showing 1-5 of 42 active programs</p>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-[#c3c6d7] text-[#737686] hover:bg-[#eff4ff]">
            <FaChevronLeft className="text-xs" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#004ac6] text-white text-xs font-bold">1</button>
        </div>
      </div>

    </div>
  );
}