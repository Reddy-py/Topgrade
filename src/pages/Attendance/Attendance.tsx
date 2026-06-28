import { useState, useEffect, useMemo } from "react";
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
import { supabase } from "../../utils/supabaseClient";

interface StudentAttendance {
  id: string; // internal primary database UUID
  studentId: string; // e.g. #STU-8821
  name: string;
  email: string;
  section: string;
  time: string;
  status: "present" | "absent" | "late";
  avatar: string;
}

export default function Attendance() {
  const [students, setStudents] = useState<StudentAttendance[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("Mathematics II");
  const [isLoading, setIsLoading] = useState(true);

  // Constants fixed for historical consistency matching layout designs
  const targetDateISO = "2026-06-26";
  const formattedDisplayDate = "June 26, 2026";

  useEffect(() => {
    fetchAttendance();
  }, [selectedCourse]);

  const fetchAttendance = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("attendance_records")
        .select("*")
        .eq("course_name", selectedCourse)
        .eq("record_date", targetDateISO);

      if (error) throw error;

      const mapped: StudentAttendance[] = (data || []).map((row) => ({
        id: row.id,
        studentId: row.student_id,
        name: row.student_name,
        email: row.student_email,
        section: row.course_name + "-A",
        time: row.check_in_time,
        status: row.status as "present" | "absent" | "late",
        avatar: row.avatar_url
      }));

      setStudents(mapped);
    } catch (err) {
      console.error("Error connecting with the cloud data tables:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update Status directly on DB rows
  const handleStatusChange = async (id: string, newStatus: "present" | "absent" | "late") => {
    const targetStudent = students.find(s => s.id === id);
    if (!targetStudent) return;

    let updatedTime = targetStudent.time;
    if (newStatus === "present" || newStatus === "late") {
      updatedTime = targetStudent.time === "--:--" ? "08:00 AM" : targetStudent.time;
    } else {
      updatedTime = "--:--";
    }

    // Pessimistic client state render layout updates
    try {
      const { error } = await supabase
        .from("attendance_records")
        .update({ status: newStatus, check_in_time: updatedTime })
        .eq("id", id);

      if (error) throw error;

      setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus, time: updatedTime } : s));
    } catch (err) {
      alert("Cloud write operations failed. Reverting data state adjustments.");
    }
  };

  // Bulk Operations Utility Routine
  const handleBulkPresent = async () => {
    if (students.length === 0) return;
    try {
      const { error } = await supabase
        .from("attendance_records")
        .update({ status: "present", check_in_time: "08:00 AM" })
        .eq("course_name", selectedCourse)
        .eq("record_date", targetDateISO);

      if (error) throw error;
      
      setStudents(prev => prev.map(s => ({ ...s, status: "present", time: "08:00 AM" })));
    } catch (err) {
      alert("Failed to sign off batch processing pipelines.");
    }
  };

  // Live Aggregation Matrix Calculations 
  const stats = useMemo(() => {
    const total = students.length;
    if (total === 0) return { present: 0, absent: 0, late: 0, rate: "0.0" };

    const present = students.filter(s => s.status === "present").length;
    const late = students.filter(s => s.status === "late").length;
    const absent = students.filter(s => s.status === "absent").length;
    
    // Attendance rate = (Present + Late) / Total
    const rate = (((present + late) / total) * 100).toFixed(1);

    return { present, absent, late, rate };
  }, [students]);

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
          <span className="text-xs font-bold text-[#004ac6]">Today's Rate: {stats.rate}%</span>
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
            <p className="text-2xl font-black text-[#0d1c2f]">{isLoading ? "..." : stats.present}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border border-[#c3c6d7]/30 hover:border-red-500/30 transition-all">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-[#ba1a1a] text-lg">
            <FaTimesCircle />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Absent</p>
            <p className="text-2xl font-black text-[#0d1c2f]"> {isLoading ? "..." : stats.absent}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border border-[#c3c6d7]/30 hover:border-amber-500/30 transition-all">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-lg">
            <FaClock />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Tardy</p>
            <p className="text-2xl font-black text-[#0d1c2f]">{isLoading ? "..." : stats.late}</p>
          </div>
        </div>
      </section>

      {/* 3. Operational Strip Filter Row Controls */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#eff4ff] p-4 rounded-2xl border border-[#c3c6d7]/30">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" />
            <input 
              className="pl-9 pr-4 py-2 bg-white border border-[#c3c6d7] rounded-xl text-xs font-bold text-[#434655] focus:outline-none selection:bg-transparent cursor-default" 
              type="text" 
              readOnly 
              value={formattedDisplayDate}
            />
          </div>
          <div className="relative min-w-[180px]">
            <select 
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full appearance-none pl-3 pr-10 py-2 bg-white border border-[#c3c6d7] rounded-xl text-xs font-bold text-[#434655] focus:outline-none cursor-pointer"
            >
              <option value="Mathematics II">Mathematics II</option>
              <option value="Advanced Physics">Advanced Physics</option>
              <option value="Organic Chemistry">Organic Chemistry</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] text-[10px] pointer-events-none" />
          </div>
        </div>
        <button 
          onClick={handleBulkPresent}
          className="bg-[#004ac6] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md hover:bg-[#2563eb] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
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
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <span className="w-8 h-8 border-4 border-[#004ac6]/20 border-t-[#004ac6] inline-block rounded-full animate-spin" />
                  </td>
                </tr>
              ) : students.length > 0 ? (
                students.map((student) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-xs font-bold text-[#434655]">No student records registered for this specific course session.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-[#eff4ff] flex items-center justify-between border-t border-[#c3c6d7]/30">
          <span className="text-xs font-semibold text-[#434655]">Showing {students.length} of {students.length} Students</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-xl border border-[#c3c6d7] text-[#737686] bg-white hover:bg-[#eff4ff]">
              <FaChevronLeft className="text-xs" />
            </button>
            <button className="w-8 h-8 rounded-xl bg-[#004ac6] text-white text-xs font-bold shadow-sm">1</button>
            <button className="p-1.5 rounded-xl border border-[#c3c6d7] text-[#737686] bg-white hover:bg-[#eff4ff]">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}