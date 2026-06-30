import { useState, useEffect } from "react";
import { 
  FaUserPlus, 
  FaSpinner, 
  FaUsers, 
  FaUserCheck, 
  FaUserXmark, 
  FaGraduationCap, 
  FaXmark,
  FaChevronRight
} from "react-icons/fa6";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export default function StudentManagement() {
  // UI View Controls
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Live Ledger State Vectors
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    completed: 0
  });

  // Complete Form Registration Schema State
  const [studentForm, setStudentForm] = useState({
    studentName: "",
    photoUrl: "",
    gender: "Male",
    dateOfBirth: "",
    age: "",
    school: "",
    gradeLevel: "Grade 1",
    bloodGroup: "A+",
    medicalNotes: "",
    specialNeeds: "",
    status: "Active"
  });

  // Pull existing records and count lifecycle distribution streams
  const fetchStudentsData = async () => {
    try {
      const response = await fetch("https://topgrade-backend.onrender.com/api/students/list");
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        setStudentsList(data.data);
        
        // Compute precise real-time summary indicators
        const counts = data.data.reduce((acc: any, curr: any) => {
          acc.total += 1;
          if (curr.status === "Active") acc.active += 1;
          if (curr.status === "Inactive") acc.inactive += 1;
          if (curr.status === "Completed") acc.completed += 1;
          return acc;
        }, { total: 0, active: 0, inactive: 0, completed: 0 });
        
        setSummary(counts);
      }
    } catch (err) {
      console.error("Database sync failure reading ledger vectors:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("https://topgrade-backend.onrender.com/api/students/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentForm),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to commit student profile to database cluster.");
      }

      setSuccess(true);
      setShowAddForm(false); // Collapse form section upon successful enrollment
      
      // Clear form inputs
      setStudentForm({
        studentName: "",
        photoUrl: "",
        gender: "Male",
        dateOfBirth: "",
        age: "",
        school: "",
        gradeLevel: "Grade 1",
        bloodGroup: "A+",
        medicalNotes: "",
        specialNeeds: "",
        status: "Active"
      });

      // Instantly trigger re-fetch to sync indicators and table entries
      fetchStudentsData();
    } catch (err: any) {
      setError(err.message || "Failed to connect to core backend API gateway.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      
      {/* ─── MODULE TOP HEADER ROW ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c3c6d7]/20 pb-4">
        <div>
          <h1 className="text-xl font-black text-[#0d1c2f]">Student Management</h1>
          <p className="text-xs font-semibold text-[#434655]">Register, monitor, and audit live student profiles across active streams.</p>
        </div>
        
        {/* Toggle Onboard Form Action Button */}
        <button 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setSuccess(false);
            setError("");
          }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-2 ${
            showAddForm ? 'bg-[#434655] text-white' : 'bg-[#004ac6] hover:bg-[#2563eb] text-white'
          }`}
        >
          {showAddForm ? (
            <><FaXmark /> Close Onboarding Panel</>
          ) : (
            <><FaUserPlus /> Add Student</>
          )}
        </button>
      </div>

      {/* ─── LIVE MANAGEMENT LIFECYCLE WIDGET MATRIX ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/30 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-[#737686] uppercase tracking-wider">Total Enrolled</p>
            <p className="text-xl font-black text-[#0d1c2f]">{summary.total}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-sm"><FaUsers /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/30 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Active Status</p>
            <p className="text-xl font-black text-emerald-600">{summary.active}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50/50 text-emerald-600 flex items-center justify-center text-sm"><FaUserCheck /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/30 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-rose-600 uppercase tracking-wider">Inactive Status</p>
            <p className="text-xl font-black text-rose-600">{summary.inactive}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center text-sm"><FaUserXmark /></div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/30 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-purple-600 uppercase tracking-wider">Completed Stream</p>
            <p className="text-xl font-black text-purple-600">{summary.completed}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-sm"><FaGraduationCap /></div>
        </div>
      </div>

      {/* Operation Status Feedback Indicators */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold p-4 rounded-xl flex items-center gap-2">
          <FaCheckCircle /> Student matrix file successfully synced and created in Supabase!
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-4 rounded-xl flex items-center gap-2">
          <FaExclamationTriangle /> {error}
        </div>
      )}

      {/* ─── DROPDOWN ONBOARD STUDENT REGISTRATION FORM ─── */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-[#c3c6d7]/40 rounded-2xl p-6 space-y-6 shadow-md transition-all animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-black text-[#004ac6] uppercase tracking-wider pb-2 border-b border-[#c3c6d7]/10">
            <FaUserPlus /> Onboard Student Matrix Records
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Student Name</label>
              <input type="text" name="studentName" required value={studentForm.studentName} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="Ex: Rahul Kumar" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Photo URL Reference</label>
              <input type="text" name="photoUrl" value={studentForm.photoUrl} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="https://storage.com/avatar.jpg" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Lifecycle Status</label>
              <select name="status" value={studentForm.status} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Gender</label>
              <select name="gender" value={studentForm.gender} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Date of Birth</label>
              <input type="date" name="dateOfBirth" required value={studentForm.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Age</label>
              <input type="number" name="age" required value={studentForm.age} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="Ex: 8" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Current School Affiliation</label>
              <input type="text" name="school" value={studentForm.school} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="Ex: Public Academy" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Grade Level</label>
              <select name="gradeLevel" value={studentForm.gradeLevel} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]">
                <option value="Kindergarten">Kindergarten</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Blood Group</label>
              <select name="bloodGroup" value={studentForm.bloodGroup} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]">
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Medical Notes</label>
              <textarea name="medicalNotes" rows={3} value={studentForm.medicalNotes} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6] resize-none" placeholder="Medical constraints or alerts..." />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Special Needs Provisions</label>
              <textarea name="specialNeeds" rows={3} value={studentForm.specialNeeds} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6] resize-none" placeholder="Accommodations requested..." />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-[#004ac6] text-white font-bold text-xs py-3 rounded-xl shadow-sm hover:bg-[#2563eb] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {isLoading ? <><FaSpinner className="animate-spin" /> Storing Profile...</> : "Save Student Profile Record"}
          </button>
        </form>
      )}

      {/* ─── SYSTEM LEDGER STUDENTS DATA TABLE ─── */}
      <div className="bg-white border border-[#c3c6d7]/30 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#c3c6d7]/10 bg-[#f8f9ff]">
          <h2 className="text-xs font-black text-[#0d1c2f] uppercase tracking-wider">Active Student Registries</h2>
        </div>

        <div className="overflow-x-auto">
          {isFetching ? (
            <div className="text-center py-12 text-xs font-bold text-[#434655]/60 flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin text-[#004ac6]" /> Synchronizing with Supabase registries...
            </div>
          ) : studentsList.length === 0 ? (
            <div className="text-center py-12 text-xs font-bold text-[#434655]/60">
              No registered student profiles exist inside this database slice yet.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9ff] border-b border-[#c3c6d7]/20">
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Identifier</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Student Name</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Stream / Grade</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Age/Gender</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Status Badge</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3c6d7]/10">
                {studentsList.map((student) => (
                  <tr key={student.id} className="hover:bg-[#f8f9ff]/40 transition-colors">
                    <td className="p-4 text-xs font-bold text-[#004ac6]">{student.student_id_code}</td>
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#004ac6] text-white font-black text-[10px] flex items-center justify-center shadow-sm uppercase overflow-hidden">
                        {student.photo_url ? (
                          <img src={student.photo_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          student.name.charAt(0)
                        )}
                      </div>
                      <span className="text-xs font-black text-[#0d1c2f]">{student.name}</span>
                    </td>
                    <td className="p-4 text-xs font-semibold text-[#434655]">{student.grade_level}</td>
                    <td className="p-4 text-xs font-semibold text-[#434655]">{student.age} Yrs / {student.gender}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        student.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                        student.status === "Inactive" ? "bg-rose-50 text-rose-700 border border-rose-200" :
                        "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-xs font-bold text-[#434655] hover:text-[#004ac6] inline-flex items-center gap-1">
                        Profile <FaChevronRight className="text-[10px]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
}