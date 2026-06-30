import { useState, useEffect } from "react";
import { 
  FaBookOpen, FaFolderPlus, FaSpinner, FaCircleCheck, FaTriangleExclamation, 
  FaXmark, FaChevronRight, FaEye, FaUsersGear, FaDollarSign, FaGraduationCap
} from "react-icons/fa6";

export default function CourseManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "Coding", // Defaults to standard stack preset
    description: "", ageGroup: "6-12 Years", duration: "3 Months",
    fee: "", maxStudents: "15", requiredTeacherSkills: "", courseMaterial: "", status: "Active"
  });

  const presetPrograms = [
    "Coding", "Math", "Robotics", "Reading", "3D Printing", "AI", "Chess", "Abacus"
  ];

  const fetchCourses = async () => {
    try {
      const res = await fetch("https://topgrade-backend.onrender.com/api/courses/list");
      const data = await res.json();
      if (data.success) setCoursesList(data.data);
    } catch (err) {
      console.error("Ledger reading structural break:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setSuccess(false); setError("");

    try {
      const res = await fetch("https://topgrade-backend.onrender.com/api/courses/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to catalog course.");

      setSuccess(true);
      setShowAddForm(false);
      setForm({ name: "Coding", description: "", ageGroup: "6-12 Years", duration: "3 Months", fee: "", maxStudents: "15", requiredTeacherSkills: "", courseMaterial: "", status: "Active" });
      fetchCourses();
    } catch (err: any) {
      setError(err.message || "Gateway API mismatch context.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      
      {/* ─── MODULE HEADER ROW ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c3c6d7]/20 pb-4">
        <div>
          <h1 className="text-xl font-black text-[#0d1c2f]">Curriculum & Course Framework</h1>
          <p className="text-xs font-semibold text-[#434655]">Provision active tracks, establish seat criteria, and configure standard pricing profiles.</p>
        </div>
        <button 
          onClick={() => { setShowAddForm(!showAddForm); setSuccess(false); setError(""); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 text-white ${
            showAddForm ? 'bg-[#434655]' : 'bg-[#004ac6] hover:bg-[#2563eb]'
          }`}
        >
          {showAddForm ? <><FaXmark /> Cancel Creation</> : <><FaFolderPlus /> Deploy Program</>}
        </button>
      </div>

      {success && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold p-4 rounded-xl flex items-center gap-2"><FaCircleCheck /> Program structure fully written into system catalogs.</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-4 rounded-xl flex items-center gap-2"><FaTriangleExclamation /> {error}</div>}

      {/* ─── PROVISION COURSE CONTROL PANEL ─── */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-[#c3c6d7]/40 rounded-2xl p-6 space-y-4 shadow-md animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Course Target Template</label>
              <select name="name" value={form.name} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]">
                {presetPrograms.map(p => <option key={p} value={p}>{p}</option>)}
                <option value="Custom Track">Custom Track (Define in Description)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Target Age Group Bracket</label>
              <input type="text" name="ageGroup" value={form.ageGroup} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" placeholder="Ex: 6-10 Years" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Timeline Duration</label>
              <input type="text" name="duration" value={form.duration} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" placeholder="Ex: 12 Weeks" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Fee Valuation ($ / INR) *</label>
              <input type="number" name="fee" required value={form.fee} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" placeholder="0.00" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Maximum Student Threshold</label>
              <input type="number" name="maxStudents" value={form.maxStudents} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Lifecycle Allocation</label>
              <select name="status" value={form.status} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none"><option value="Active">Active</option><option value="Inactive">Inactive</option></select>
            </div>

            <div className="space-y-1 md:col-span-3"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Description & Core Focus</label><textarea name="description" value={form.description} onChange={handleInputChange} rows={2} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none resize-none" placeholder="Elaborate curriculum blueprints..." /></div>
            <div className="space-y-1 md:col-span-3"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Required Faculty Prerequisites / Skills</label><input type="text" name="requiredTeacherSkills" value={form.requiredTeacherSkills} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" placeholder="Ex: Basic Python, Pygame library vectors" /></div>
            <div className="space-y-1 md:col-span-3"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Allocated Course Materials & Resources</label><input type="text" name="courseMaterial" value={form.courseMaterial} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" placeholder="Ex: Kit Box v1, Textbook Vol 3 Link" /></div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-[#004ac6] text-white font-bold text-xs py-3 rounded-xl hover:bg-[#2563eb] transition-all flex items-center justify-center gap-2">
            {isLoading ? <><FaSpinner className="animate-spin" /> Structuring Elements...</> : "Commit New Course Stream"}
          </button>
        </form>
      )}

      {/* ─── SYSTEM LEDGER MATRIX DISPLAY ─── */}
      <div className="bg-white border border-[#c3c6d7]/30 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#c3c6d7]/10 bg-[#f8f9ff]"><h2 className="text-xs font-black text-[#0d1c2f] uppercase tracking-wider">Active Curriculum Catalogs</h2></div>
        <div className="overflow-x-auto">
          {isFetching ? (
            <div className="text-center py-12 text-xs font-bold text-[#434655]/60 flex items-center justify-center gap-2"><FaSpinner className="animate-spin text-[#004ac6]" /> Building active syllabus indexes...</div>
          ) : coursesList.length === 0 ? (
            <div className="text-center py-12 text-xs font-bold text-[#434655]/60">No curriculum profiles defined inside this database branch.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9ff] border-b border-[#c3c6d7]/20">
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Course ID</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Program Scope</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Age Group Matrix</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Base Cost / Fee</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Seat Capacity</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider text-right">Action Map</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3c6d7]/10">
                {coursesList.map((course) => (
                  <tr key={course.id} className="hover:bg-[#f8f9ff]/40 transition-colors">
                    <td className="p-4 text-xs font-bold text-[#004ac6]">{course.course_code}</td>
                    <td className="p-4 text-xs font-black text-[#0d1c2f]">{course.name}</td>
                    <td className="p-4 text-xs font-semibold text-[#434655]">{course.age_group}</td>
                    <td className="p-4 text-xs font-black text-emerald-700">${course.fee}</td>
                    <td className="p-4 text-xs font-bold text-[#434655]">{course.max_students} Max Seats</td>
                    <td className="p-4 text-right">
                      <button onClick={() => setSelectedCourse(course)} className="px-3 py-1.5 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-[11px] font-black text-[#0d1c2f] inline-flex items-center gap-1.5 shadow-sm hover:bg-[#004ac6] hover:text-white transition-all">
                        <FaEye /> Full Blueprint <FaChevronRight className="text-[9px]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ─── BLUEPRINT COMPONENT VIEW SHEET MODAL ─── */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-[#0d1c2f]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-3xl border border-[#c3c6d7]/40 shadow-2xl flex flex-col">
            
            <div className="p-5 border-b border-[#c3c6d7]/10 flex items-center justify-between bg-[#f8f9ff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#004ac6] text-white flex items-center justify-center text-xs"><FaBookOpen /></div>
                <div>
                  <h3 className="text-sm font-black text-[#0d1c2f]">{selectedCourse.name} Profile Map</h3>
                  <p className="text-[10px] font-bold text-[#004ac6] uppercase tracking-wider">Course Reference Block: {selectedCourse.course_code}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCourse(null)} className="w-8 h-8 rounded-xl bg-white border border-[#c3c6d7]/40 flex items-center justify-center text-xs text-[#434655] hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-sm"><FaXmark /></button>
            </div>

            <div className="p-6 space-y-5 text-xs font-semibold text-[#434655]">
              <div className="bg-[#f8f9ff] p-4 rounded-xl border border-[#c3c6d7]/20">
                <p className="text-[9px] uppercase tracking-wide font-black text-[#737686] mb-0.5">Description Framework</p>
                <p className="text-[#0d1c2f] leading-relaxed">{selectedCourse.description || "No core descriptive overview listed for this target program node."}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686] flex items-center gap-1"><FaUsersGear /> Age Bracket</p><p className="text-[#0d1c2f] font-bold mt-0.5">{selectedCourse.age_group}</p></div>
                <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Timeline Duration</p><p className="text-[#0d1c2f] font-bold mt-0.5">{selectedCourse.duration}</p></div>
                <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686] flex items-center gap-1"><FaDollarSign /> Base Rate Cost</p><p className="text-emerald-700 font-black mt-0.5">${selectedCourse.fee}</p></div>
                <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Max Classroom Threshold</p><p className="text-[#0d1c2f] font-bold mt-0.5">{selectedCourse.max_students} Enrollment Seats</p></div>
              </div>

              <div className="border-t border-[#c3c6d7]/10 pt-4 space-y-3">
                <div>
                  <p className="text-[9px] uppercase tracking-wide font-black text-[#737686] flex items-center gap-1"><FaGraduationCap /> Desired Instructor Core Skills</p>
                  <p className="text-[#0d1c2f] font-bold mt-0.5">{selectedCourse.required_teacher_skills || "All General Faculty Approved"}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Approved Study Material / Kits</p>
                  <p className="text-[#004ac6] font-bold mt-0.5">{selectedCourse.course_material || "Standard digital syllabus link references"}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}