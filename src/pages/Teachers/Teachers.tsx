import { useState, useEffect } from "react";
import { 
  FaUserTie, FaUserPlus, FaSpinner, FaCircleCheck, FaTriangleExclamation, 
  FaXmark, FaChevronRight, FaFileLines, FaCalendarDays, FaGraduationCap,
  FaChalkboardUser, FaClock, FaEye
} from "react-icons/fa6";

export default function TeacherManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // profile | availability | assignments | documents
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null); // Interactive view target
  const [teachersList, setTeachersList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Form State Layout Mapping requested inputs
  const [form, setForm] = useState({
    name: "", photoUrl: "", phone: "", email: "", qualification: "", experience: "", 
    specialization: "", joiningDate: "", salary: "",
    availabilityDays: [] as string[],
    availabilitySlots: [] as string[],
    assignedStudents: "0", assignedCourses: "0", assignedSchedules: "0",
    docResume: false, docIdProof: false, docCertificates: false, docContract: false
  });

  const fetchTeachers = async () => {
    try {
      const res = await fetch("https://topgrade-backend.onrender.com/api/teachers/list");
      const data = await res.json();
      if (data.success) setTeachersList(data.data);
    } catch (err) {
      console.error("Error reading teachers cluster:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchTeachers(); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setForm({ ...form, [name]: checked });
  };

  const toggleAvailabilityDay = (day: string) => {
    const current = [...form.availabilityDays];
    const index = current.indexOf(day);
    if (index > -1) current.splice(index, 1);
    else current.push(day);
    setForm({ ...form, availabilityDays: current });
  };

  const toggleAvailabilitySlot = (slot: string) => {
    const current = [...form.availabilitySlots];
    const index = current.indexOf(slot);
    if (index > -1) current.splice(index, 1);
    else current.push(slot);
    setForm({ ...form, availabilitySlots: current });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setSuccess(false); setError("");

    try {
      const res = await fetch("https://topgrade-backend.onrender.com/api/teachers/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to add profile");

      setSuccess(true);
      setShowAddForm(false);
      // Reset Form State
      setForm({
        name: "", photoUrl: "", phone: "", email: "", qualification: "", experience: "",
        specialization: "", joiningDate: "", salary: "", availabilityDays: [], availabilitySlots: [],
        assignedStudents: "0", assignedCourses: "0", assignedSchedules: "0",
        docResume: false, docIdProof: false, docCertificates: false, docContract: false
      });
      fetchTeachers();
    } catch (err: any) {
      setError(err.message || "Backend fault context.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      
      {/* ─── TITLE FRAMEWORK ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c3c6d7]/20 pb-4">
        <div>
          <h1 className="text-xl font-black text-[#0d1c2f]">Faculty & Teacher Management</h1>
          <p className="text-xs font-semibold text-[#434655]">Orchestrate institutional mentors, track shift availabilities, and supervise schedules.</p>
        </div>
        <button 
          onClick={() => { setShowAddForm(!showAddForm); setSuccess(false); setError(""); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 text-white ${
            showAddForm ? 'bg-[#434655]' : 'bg-[#004ac6] hover:bg-[#2563eb]'
          }`}
        >
          {showAddForm ? <><FaXmark /> Close Onboarding</> : <><FaUserPlus /> Add Teacher</>}
        </button>
      </div>

      {success && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold p-4 rounded-xl flex items-center gap-2"><FaCircleCheck /> Teacher profile successfully linked into database matrices.</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-4 rounded-xl flex items-center gap-2"><FaTriangleExclamation /> {error}</div>}

      {/* ─── DROPDOWN ONBOARD TEACHER TAB FORM ─── */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-[#c3c6d7]/40 rounded-2xl p-6 space-y-6 shadow-md animate-fadeIn">
          <div className="flex border-b border-[#c3c6d7]/20 gap-2 pb-px overflow-x-auto">
            {[
              { id: "profile", label: "Teacher Profile", icon: <FaUserTie /> },
              { id: "availability", label: "Availability Constraints", icon: <FaCalendarDays /> },
              { id: "assignments", label: "Assign Core Targets", icon: <FaGraduationCap /> },
              { id: "documents", label: "Documents Verification", icon: <FaFileLines /> }
            ].map(tab => (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`px-4 py-2.5 font-black text-[11px] uppercase tracking-wider rounded-t-xl border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id ? 'border-[#004ac6] text-[#004ac6] bg-[#f8f9ff]' : 'border-transparent text-[#737686]'
              }`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: TEACHER PROFILE */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Full Name *</label><input type="text" name="name" required value={form.name} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Photo URL Path</label><input type="text" name="photoUrl" value={form.photoUrl} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Phone Line</label><input type="text" name="phone" value={form.phone} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Email Address</label><input type="email" name="email" value={form.email} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Highest Qualification</label><input type="text" name="qualification" value={form.qualification} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" placeholder="Ex: M.Sc in Mathematics" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Total Experience</label><input type="text" name="experience" value={form.experience} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" placeholder="Ex: 5 Years" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Core Specialization</label><input type="text" name="specialization" value={form.specialization} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" placeholder="Ex: Calculus, Trigonometry" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Joining Date</label><input type="date" name="joiningDate" value={form.joiningDate} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Salary Structure (Monthly)</label><input type="text" name="salary" value={form.salary} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" placeholder="Ex: $4,500" /></div>
            </div>
          )}

          {/* TAB 2: AVAILABILITY MATRIX */}
          {activeTab === "availability" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider block">Operational Working Days Selection</label>
                <div className="flex flex-wrap gap-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                    <button key={day} type="button" onClick={() => toggleAvailabilityDay(day)} className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all ${
                      form.availabilityDays.includes(day) ? 'bg-[#004ac6] border-[#004ac6] text-white' : 'bg-[#f8f9ff] text-[#434655] border-[#c3c6d7]/40'
                    }`}>{day}</button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider block">Daily Active Shifts Availability</label>
                <div className="flex gap-3">
                  {["Morning", "Afternoon", "Evening"].map(slot => (
                    <button key={slot} type="button" onClick={() => toggleAvailabilitySlot(slot)} className={`px-4 py-2 rounded-xl font-bold text-xs border transition-all ${
                      form.availabilitySlots.includes(slot) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-[#f8f9ff] text-[#434655] border-[#c3c6d7]/40'
                    }`}>{slot}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ASSIGNMENTS COUNTERS */}
          {activeTab === "assignments" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Assign Active Students Count</label><input type="number" name="assignedStudents" value={form.assignedStudents} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Assign Target Courses Count</label><input type="number" name="assignedCourses" value={form.assignedCourses} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Assigned Active Schedules Count</label><input type="number" name="assignedSchedules" value={form.assignedSchedules} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
            </div>
          )}

          {/* TAB 4: COMPLIANCE DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
              {[
                { id: "docResume", label: "Professional Resume / CV" },
                { id: "docIdProof", label: "National Identity Proof" },
                { id: "docCertificates", label: "Educational Certificates" },
                { id: "docContract", label: "Signed Employment Contract" }
              ].map(doc => (
                <label key={doc.id} className="flex items-center gap-3 bg-[#f8f9ff] p-4 rounded-xl border border-[#c3c6d7]/30 cursor-pointer select-none">
                  <input type="checkbox" checked={(form as any)[doc.id]} onChange={(e) => handleCheckboxChange(doc.id, e.target.checked)} className="w-4 h-4 text-[#004ac6] border-[#c3c6d7]/60 accent-[#004ac6]" />
                  <span className="text-xs font-black text-[#0d1c2f]">{doc.label}</span>
                </label>
              ))}
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full bg-[#004ac6] text-white font-bold text-xs py-3 rounded-xl hover:bg-[#2563eb] transition-all flex items-center justify-center gap-2">
            {isLoading ? <><FaSpinner className="animate-spin" /> Recording Faculty...</> : "Commit Teacher To Core Ledger"}
          </button>
        </form>
      )}

      {/* ─── LEDGER DATA TABLE DISPLAY ─── */}
      <div className="bg-white border border-[#c3c6d7]/30 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#c3c6d7]/10 bg-[#f8f9ff]"><h2 className="text-xs font-black text-[#0d1c2f] uppercase tracking-wider">Registered Institution Instructors</h2></div>
        <div className="overflow-x-auto">
          {isFetching ? (
            <div className="text-center py-12 text-xs font-bold text-[#434655]/60 flex items-center justify-center gap-2"><FaSpinner className="animate-spin text-[#004ac6]" /> Gathering active faculty maps...</div>
          ) : teachersList.length === 0 ? (
            <div className="text-center py-12 text-xs font-bold text-[#434655]/60">No faculty records found inside current database cluster.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9ff] border-b border-[#c3c6d7]/20">
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Faculty ID</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Instructor Profile</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Specialization</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Allocations (S / C / Sch)</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3c6d7]/10">
                {teachersList.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-[#f8f9ff]/40 transition-colors">
                    <td className="p-4 text-xs font-bold text-[#004ac6]">{teacher.teacher_id_code}</td>
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center uppercase overflow-hidden">
                        {teacher.photo_url ? <img src={teacher.photo_url} alt="" className="w-full h-full object-cover" /> : teacher.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#0d1c2f]">{teacher.name}</p>
                        <p className="text-[10px] text-[#434655]">{teacher.email || "No email"}</p>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-semibold text-[#434655]">{teacher.specialization || "General Faculty"}</td>
                    <td className="p-4 text-xs font-bold text-[#0d1c2f]">
                      {teacher.assigned_students_count} Std / {teacher.assigned_courses_count} Crs / {teacher.assigned_schedules_count} Sch
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => setSelectedTeacher(teacher)} className="px-3 py-1.5 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-[11px] font-black text-[#0d1c2f] inline-flex items-center gap-1.5 shadow-sm hover:bg-indigo-600 hover:text-white transition-all">
                        <FaEye /> Dashboard & Profile <FaChevronRight className="text-[9px]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ─── SLIDEOUT FACULTY PROFILE AND LIVE DASHBOARD MODAL LAYER ─── */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-[#0d1c2f]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto border border-[#c3c6d7]/40 shadow-2xl flex flex-col">
            
            <div className="p-5 border-b border-[#c3c6d7]/10 flex items-center justify-between bg-[#f8f9ff]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white text-sm font-black flex items-center justify-center uppercase">{selectedTeacher.name.charAt(0)}</div>
                <div>
                  <h3 className="text-sm font-black text-[#0d1c2f]">{selectedTeacher.name} — Workspace</h3>
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Faculty Module Profile Node: {selectedTeacher.teacher_id_code}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTeacher(null)} className="w-8 h-8 rounded-xl bg-white border border-[#c3c6d7]/40 flex items-center justify-center text-xs text-[#434655] hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-sm"><FaXmark /></button>
            </div>

            <div className="p-6 space-y-8 overflow-y-auto">
              
              {/* VIRTUAL TEACHER DASHBOARD PANEL LAYOUT */}
              <div className="bg-[#f8f9ff] border border-indigo-600/20 rounded-2xl p-5 space-y-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-[#c3c6d7]/20 pb-2">
                  <h4 className="text-xs font-black text-[#0d1c2f] uppercase tracking-wider flex items-center gap-2"><FaChalkboardUser className="text-indigo-600" /> Live Teacher Performance Dashboard Frame</h4>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full uppercase tracking-wider">Active Stream</span>
                </div>
                
                {/* Virtual Dashboard Counters requested by senior system metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded-xl border border-[#c3c6d7]/20 shadow-sm">
                    <p className="text-[9px] font-black text-[#737686] uppercase tracking-wider">Today's Classes</p>
                    <p className="text-base font-black text-[#0d1c2f]">3 Sessions Scheduled</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#c3c6d7]/20 shadow-sm">
                    <p className="text-[9px] font-black text-[#737686] uppercase tracking-wider">Total Active Students</p>
                    <p className="text-base font-black text-[#004ac6]">{selectedTeacher.assigned_students_count} Active Profiles</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#c3c6d7]/20 shadow-sm">
                    <p className="text-[9px] font-black text-amber-600 uppercase tracking-wider">Attendance Pending</p>
                    <p className="text-base font-black text-amber-600">1 Batch Session Alert</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#c3c6d7]/20 shadow-sm">
                    <p className="text-[9px] font-black text-purple-600 uppercase tracking-wider">Upcoming Sessions</p>
                    <p className="text-base font-black text-purple-600">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
              </div>

              {/* BIO BIOGRAPHICAL DOSSIER SPLIT */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black text-[#0d1c2f] uppercase tracking-wider border-b border-[#c3c6d7]/10 pb-1 flex items-center gap-1.5"><FaUserTie /> Biographical Profile</h5>
                  <div className="space-y-2 text-xs font-semibold text-[#434655]">
                    <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Contact Phone</p><p className="text-[#0d1c2f]">{selectedTeacher.phone || "Not Listed"}</p></div>
                    <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Email Profile</p><p className="text-[#0d1c2f]">{selectedTeacher.email || "Not Listed"}</p></div>
                    <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Faculty Qualification</p><p className="text-[#0d1c2f]">{selectedTeacher.qualification || "Not Stated"}</p></div>
                    <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Experience Level / Specialization</p><p className="text-[#0d1c2f]">{selectedTeacher.experience || "0 Yrs"} ({selectedTeacher.specialization || "General Scope"})</p></div>
                    <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Joining Date / Current Salary</p><p className="text-[#0d1c2f]">{selectedTeacher.joining_date || "Pending"} | <span className="text-emerald-700 font-black">{selectedTeacher.salary || "N/A"}</span></p></div>
                  </div>
                </div>

                {/* SHIFT SCHEDULE AVAILABILITY BADGES DISPLAY */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black text-[#0d1c2f] uppercase tracking-wider border-b border-[#c3c6d7]/10 pb-1 flex items-center gap-1.5"><FaCalendarDays /> Shift Availabilities</h5>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-wide font-black text-[#737686] mb-1">Approved Days Block</p>
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(selectedTeacher.availability_days) && selectedTeacher.availability_days.map((d: string) => (
                          <span key={d} className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-[10px] rounded-md">{d}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wide font-black text-[#737686] mb-1">Operational Shift Blocks</p>
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(selectedTeacher.availability_slots) && selectedTeacher.availability_slots.map((s: string) => (
                          <span key={s} className="px-2 py-0.5 bg-purple-50 border border-purple-100 text-purple-700 font-bold text-[10px] rounded-md flex items-center gap-1"><FaClock className="text-[8px]" /> {s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* DOCUMENTS CLEARANCE CHECKS */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black text-[#0d1c2f] uppercase tracking-wider border-b border-[#c3c6d7]/10 pb-1 flex items-center gap-1.5"><FaFileLines /> Verification Files Compliance</h5>
                  <div className="space-y-1.5">
                    {[
                      { flag: selectedTeacher.doc_resume, label: "Professional Curriculum Vitae" },
                      { flag: selectedTeacher.doc_id_proof, label: "Identity Verification Files" },
                      { flag: selectedTeacher.doc_certificates, label: "Educational Degree Validation" },
                      { flag: selectedTeacher.doc_contract, label: "Active Signed Employment Contract" }
                    ].map((doc, idx) => (
                      <div key={idx} className={`p-2 rounded-xl border text-[10px] font-black flex items-center justify-between ${
                        doc.flag ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
                      }`}>
                        <span>{doc.label}</span>
                        <span>{doc.flag ? "Verified" : "Missing / Needed"}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
            </div>
          </div>
        </div>
      )}

    </div>
  );
}