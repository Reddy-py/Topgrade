import { useState } from "react";
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaCalendarAlt, 
  FaChevronDown, 
  FaUserCheck, 
  FaChevronLeft, 
  FaChevronRight 
} from "react-icons/fa";

interface StudentAttendance {
  id: string;
  name: string;
  email: string;
  studentId: string;
  section: string;
  time: string;
  status: "present" | "absent" | "late";
  avatar: string;
}

const initialStudents: StudentAttendance[] = [
  { id: "1", name: "Elena Rodriguez", email: "elena.r@topgrade.edu", studentId: "#STU-8821", section: "Mathematics II-A", time: "08:05 AM", status: "present", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100" },
  { id: "2", name: "Marcus Chen", email: "m.chen@topgrade.edu", studentId: "#STU-4512", section: "Mathematics II-A", time: "--:--", status: "absent", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100" },
  { id: "3", name: "Julian Vance", email: "j.vance@topgrade.edu", studentId: "#STU-9903", section: "Mathematics II-A", time: "08:14 AM", status: "late", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100" },
  { id: "4", name: "Sarah Kim", email: "s.kim@topgrade.edu", studentId: "#STU-1267", section: "Mathematics II-A", time: "07:55 AM", status: "present", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" },
  { id: "5", name: "David Okafor", email: "d.okafor@topgrade.edu", studentId: "#STU-7734", section: "Mathematics II-A", time: "08:02 AM", status: "present", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" }
];

export default function Attendance() {
  const [students, setStudents] = useState<StudentAttendance[]>(initialStudents);

  const handleStatusChange = (id: string, newStatus: "present" | "absent" | "late") => {
    setStudents(prev => prev.map(student => {
      if (student.id === id) {
        let updatedTime = student.time;
        if (newStatus === "present" || newStatus === "late") {
          updatedTime = student.time === "--:--" ? "08:00 AM" : student.time;
        } else {
          updatedTime = "--:--";
        }
        return { ...student, status: newStatus, time: updatedTime };
      }
      return student;
    }));
  };

  return (
    <div className="p-1 max-w-[1440px] mx-auto space-y-6">
      
      {/* 1. Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0d1c2f] tracking-tight">Attendance Tracker</h1>
          <p className="text-sm font-medium text-[#434655]">Manage daily student participation and academic presence.</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-[#2563eb]/10 px-4 py-1.5 rounded-full border border-[#004ac6]/20">
          <span className="w-2 h-2 rounded-full bg-[#004ac6] animate-pulse"></span>
          <span className="text-xs font-bold text-[#004ac6]">Today's Rate: 94.2%</span>
        </div>
      </header>

      {/* 2. KPI Grid Dashboard Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border border-[#c3c6d7]/30 hover:border-[#004ac6]/30 transition-all">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-lg">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Present</p>
            <p className="text-2xl font-black text-[#0d1c2f]">2,308</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border border-[#c3c6d7]/30 hover:border-red-500/30 transition-all">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-[#ba1a1a] text-lg">
            <FaTimesCircle />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Absent</p>
            <p className="text-2xl font-black text-[#0d1c2f]">142</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border border-[#c3c6d7]/30 hover:border-amber-500/30 transition-all">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-lg">
            <FaClock />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Tardy</p>
            <p className="text-2xl font-black text-[#0d1c2f]">32</p>
          </div>
        </div>
      </section>

      {/* 3. Operational Strip Filter Row Controls */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#eff4ff] p-4 rounded-2xl border border-[#c3c6d7]/30">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" />
            <input 
              className="pl-9 pr-4 py-2 bg-white border border-[#c3c6d7] rounded-xl text-xs font-bold text-[#434655] focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20" 
              type="text" 
              readOnly 
              value="June 26, 2026"
            />
          </div>
          <div className="relative min-w-[180px]">
            <select className="w-full appearance-none pl-3 pr-10 py-2 bg-white border border-[#c3c6d7] rounded-xl text-xs font-bold text-[#434655] focus:outline-none cursor-pointer">
              <option>Mathematics II</option>
              <option>Advanced Physics</option>
              <option>Organic Chemistry</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] text-[10px]" />
          </div>
        </div>
        <button className="bg-[#004ac6] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md hover:bg-[#2563eb] active:scale-95 transition-all flex items-center justify-center gap-2">
          <FaUserCheck />
          <span>Mark Bulk Attendance</span>
        </button>
      </section>

      {/* 4. Attendance Main Core Grid Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d7]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#eff4ff] border-b border-[#c3c6d7]/30">
              <tr>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Course Section</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Check-In Time</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider text-right">Status Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/20">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-[#f8f9ff] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img className="w-9 h-9 rounded-full object-cover border" src={student.avatar} alt={student.name} />
                      <div>
                        <p className="text-sm font-bold text-[#0d1c2f]">{student.name}</p>
                        <p className="text-xs text-[#434655]/70">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-[#434655]">{student.studentId}</td>
                  <td className="px-6 py-4 text-xs font-bold text-[#0d1c2f]">{student.section}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-[#434655]">{student.time}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-1.5 bg-[#eff4ff] p-1 rounded-xl border">
                      <button 
                        onClick={() => handleStatusChange(student.id, "present")}
                        className={`p-1.5 rounded-lg text-sm transition-all ${
                          student.status === "present" ? "bg-emerald-500 text-white shadow-sm" : "text-[#737686] hover:text-emerald-600"
                        }`}
                        title="Mark Present"
                      >
                        <FaCheckCircle />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(student.id, "absent")}
                        className={`p-1.5 rounded-lg text-sm transition-all ${
                          student.status === "absent" ? "bg-red-500 text-white shadow-sm" : "text-[#737686] hover:text-red-600"
                        }`}
                        title="Mark Absent"
                      >
                        <FaTimesCircle />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(student.id, "late")}
                        className={`p-1.5 rounded-lg text-sm transition-all ${
                          student.status === "late" ? "bg-amber-500 text-white shadow-sm" : "text-[#737686] hover:text-amber-500"
                        }`}
                        title="Mark Late"
                      >
                        <FaClock />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-[#eff4ff] flex items-center justify-between border-t border-[#c3c6d7]/30">
          <span className="text-xs font-semibold text-[#434655]">Showing 5 of 32 Students</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-xl border border-[#c3c6d7] text-[#737686] bg-white hover:bg-[#eff4ff]">
              <FaChevronLeft className="text-xs" />
            </button>
            <button className="w-8 h-8 rounded-xl bg-[#004ac6] text-white text-xs font-bold shadow-sm">1</button>
            <button className="w-8 h-8 rounded-xl bg-white border border-[#c3c6d7] text-xs font-bold text-[#434655] hover:bg-[#eff4ff]">2</button>
            <button className="p-1.5 rounded-xl border border-[#c3c6d7] text-[#737686] bg-white hover:bg-[#eff4ff]">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}