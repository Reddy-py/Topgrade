import { useState, useEffect } from "react";
import { 
  FaUserPlus, 
  FaSpinner, 
  FaCheck, 
  FaTriangleExclamation,
  FaUsers, 
  FaUserCheck, 
  FaUserXmark, 
  FaGraduationCap, 
  FaXmark,
  FaChevronRight,
  FaUser,
  FaPeopleRoof,
  FaSchool,
  FaFileLines,
  FaEye
} from "react-icons/fa6";

export default function StudentManagement() {
  // UI View Controls
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("student"); // student | parent | enrollment | documents
  const [selectedStudent, setSelectedStudent] = useState<any>(null); // State for Profile View Modal
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Live Ledger State Vectors
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [summary, setSummary] = useState({ total: 0, active: 0, inactive: 0, completed: 0 });

  // Comprehensive Schema State mapped directly to your senior team requirements
  const [studentForm, setStudentForm] = useState({
    // Student Details
    studentName: "", photoUrl: "", gender: "Male", dateOfBirth: "", age: "", 
    school: "", gradeLevel: "Grade 1", bloodGroup: "A+", medicalNotes: "", specialNeeds: "", status: "Active",
    
    // Parent Details
    fatherName: "", motherName: "", guardian: "", phone: "", whatsapp: "", 
    email: "", occupation: "", emergencyContact: "", relationship: "", address: "",
    
    // Enrollment Specs
    admissionDate: "", program: "", teacher: "", weeklyClasses: "", 
    courseDuration: "", startDate: "", endDate: "", feePlan: "", discount: "", scholarship: "", operationalNotes: "",
    
    // Documents (Checkbox-Boolean Strings or Paths)
    docBirthCertificate: false, docPhoto: false, docIdProof: false, docSchoolId: false, docMedicalCertificate: false, docAgreement: false
  });

  const fetchStudentsData = async () => {
    try {
      const response = await fetch("https://topgrade-backend.onrender.com/api/students/list");
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setStudentsList(data.data);
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
      console.error("Database tracking loop error:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchStudentsData(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setStudentForm({ ...studentForm, [e.target.name]: value });
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
      if (!response.ok || !data.success) throw new Error(data.message || "Failed to commit record.");

      setSuccess(true);
      setShowAddForm(false);
      fetchStudentsData();
    } catch (err: any) {
      setError(err.message || "API Gateway connection fault.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      
      {/* ─── MODULE HEADER ROW ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c3c6d7]/20 pb-4">
        <div>
          <h1 className="text-xl font-black text-[#0d1c2f]">Professional Student Hub</h1>
          <p className="text-xs font-semibold text-[#434655]">Granular operational control lifecycle across administrative layers.</p>
        </div>
        
        <button 
          onClick={() => { setShowAddForm(!showAddForm); setSuccess(false); setError(""); }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-2 ${
            showAddForm ? 'bg-[#434655] text-white' : 'bg-[#004ac6] hover:bg-[#2563eb] text-white'
          }`}
        >
          {showAddForm ? <><FaXmark /> Cancel Onboarding</> : <><FaUserPlus /> Add Student</>}
        </button>
      </div>

      {/* ─── METRIC INDICATORS PANEL ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/30 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] font-black text-[#737686] uppercase tracking-wider">Total Matrix</p><p className="text-xl font-black text-[#0d1c2f]">{summary.total}</p></div>
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-sm"><FaUsers /></div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/30 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Active Stream</p><p className="text-xl font-black text-emerald-600">{summary.active}</p></div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50/50 text-emerald-600 flex items-center justify-center text-sm"><FaUserCheck /></div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/30 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] font-black text-rose-600 uppercase tracking-wider">Inactive Status</p><p className="text-xl font-black text-rose-600">{summary.inactive}</p></div>
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center text-sm"><FaUserXmark /></div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/30 shadow-sm flex items-center justify-between">
          <div><p className="text-[10px] font-black text-purple-600 uppercase tracking-wider">Completed Profile</p><p className="text-xl font-black text-purple-600">{summary.completed}</p></div>
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-sm"><FaGraduationCap /></div>
        </div>
      </div>

      {success && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold p-4 rounded-xl flex items-center gap-2"><FaCheck /> Transaction completed and stored!</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-4 rounded-xl flex items-center gap-2"><FaTriangleExclamation /> {error}</div>}

      {/* ─── ADD STUDENT TABBED WORKFLOW FORM ─── */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-[#c3c6d7]/40 rounded-2xl p-6 space-y-6 shadow-md animate-fadeIn">
          {/* Tab Navigation Switches */}
          <div className="flex border-b border-[#c3c6d7]/20 gap-2 pb-px overflow-x-auto">
            {[
              { id: "student", label: "Student Info", icon: <FaUser /> },
              { id: "parent", label: "Parent Details", icon: <FaPeopleRoof /> },
              { id: "enrollment", label: "Enrollment & Fees", icon: <FaSchool /> },
              { id: "documents", label: "Documents Ledger", icon: <FaFileLines /> }
            ].map(tab => (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`px-4 py-2.5 font-black text-[11px] uppercase tracking-wider rounded-t-xl transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                activeTab === tab.id ? 'border-[#004ac6] text-[#004ac6] bg-[#f8f9ff]' : 'border-transparent text-[#737686] hover:text-[#0d1c2f]'
              }`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: STUDENT MAIN DETAILS */}
          {activeTab === "student" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Student Name *</label><input type="text" name="studentName" required value={studentForm.studentName} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Photo URL path</label><input type="text" name="photoUrl" value={studentForm.photoUrl} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Lifecycle Status</label><select name="status" value={studentForm.status} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]"><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Completed">Completed</option></select></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Gender</label><select name="gender" value={studentForm.gender} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]"><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Date of Birth *</label><input type="date" name="dateOfBirth" required value={studentForm.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Age *</label><input type="number" name="age" required value={studentForm.age} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">School</label><input type="text" name="school" value={studentForm.school} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Grade Level</label><input type="text" name="gradeLevel" value={studentForm.gradeLevel} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Blood Group</label><select name="bloodGroup" value={studentForm.bloodGroup} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]"><option value="A+">A+</option><option value="B+">B+</option><option value="O+">O+</option><option value="AB+">AB+</option><option value="Negative">Negative/Other</option></select></div>
              <div className="space-y-1 md:col-span-3"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Medical Notes</label><textarea name="medicalNotes" value={studentForm.medicalNotes} onChange={handleChange} rows={2} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none resize-none" /></div>
              <div className="space-y-1 md:col-span-3"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Special Needs Provisions</label><textarea name="specialNeeds" value={studentForm.specialNeeds} onChange={handleChange} rows={2} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none resize-none" /></div>
            </div>
          )}

          {/* TAB 2: PARENT & FAMILY SYSTEM */}
          {activeTab === "parent" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Father Name</label><input type="text" name="fatherName" value={studentForm.fatherName} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Mother Name</label><input type="text" name="motherName" value={studentForm.motherName} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Designated Guardian</label><input type="text" name="guardian" value={studentForm.guardian} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Primary Phone</label><input type="text" name="phone" value={studentForm.phone} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">WhatsApp Line</label><input type="text" name="whatsapp" value={studentForm.whatsapp} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Email Profile</label><input type="email" name="email" value={studentForm.email} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Occupation</label><input type="text" name="occupation" value={studentForm.occupation} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Emergency Contact Name</label><input type="text" name="emergencyContact" value={studentForm.emergencyContact} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Relationship</label><input type="text" name="relationship" value={studentForm.relationship} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1 md:col-span-3"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Residential Address</label><textarea name="address" value={studentForm.address} onChange={handleChange} rows={2} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none resize-none" /></div>
            </div>
          )}

          {/* TAB 3: ENROLLMENT & FISCAL STRUCTURING */}
          {activeTab === "enrollment" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Admission Date</label><input type="date" name="admissionDate" value={studentForm.admissionDate} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Target Program</label><input type="text" name="program" value={studentForm.program} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Assigned Mentor/Teacher</label><input type="text" name="teacher" value={studentForm.teacher} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Weekly Classes Count</label><input type="number" name="weeklyClasses" value={studentForm.weeklyClasses} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Course Duration Metric</label><input type="text" name="courseDuration" value={studentForm.courseDuration} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" placeholder="Ex: 6 Months" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Start Date</label><input type="date" name="startDate" value={studentForm.startDate} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">End Date</label><input type="date" name="endDate" value={studentForm.endDate} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Fee Structure Plan</label><input type="text" name="feePlan" value={studentForm.feePlan} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" placeholder="Ex: Monthly Recurrent" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Allowed Discount (%)</label><input type="text" name="discount" value={studentForm.discount} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Scholarship Allocation</label><input type="text" name="scholarship" value={studentForm.scholarship} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1 md:col-span-2"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Internal Flow Notes</label><input type="text" name="operationalNotes" value={studentForm.operationalNotes} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
            </div>
          )}

          {/* TAB 4: COMPLIANCE DOCUMENTS TRACKING */}
          {activeTab === "documents" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-2 animate-fadeIn">
              {[
                { id: "docBirthCertificate", label: "Birth Certificate Submitted" },
                { id: "docPhoto", label: "Passport Sized Photograph" },
                { id: "docIdProof", label: "National ID / Aadhaar Proof" },
                { id: "docSchoolId", label: "Previous School ID Reference" },
                { id: "docMedicalCertificate", label: "Fitness / Medical Certificate" },
                { id: "docAgreement", label: "Signed Terms Agreement Statement" }
              ].map(doc => (
                <label key={doc.id} className="flex items-center gap-3 bg-[#f8f9ff] p-4 rounded-xl border border-[#c3c6d7]/30 cursor-pointer hover:bg-[#eff4ff] transition-colors select-none">
                  <input type="checkbox" name={doc.id} checked={(studentForm as any)[doc.id]} onChange={handleChange} className="w-4 h-4 rounded text-[#004ac6] border-[#c3c6d7]/60 accent-[#004ac6]" />
                  <span className="text-xs font-black text-[#0d1c2f]">{doc.label}</span>
                </label>
              ))}
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full bg-[#004ac6] text-white font-bold text-xs py-3 rounded-xl shadow-sm hover:bg-[#2563eb] flex items-center justify-center gap-2 disabled:opacity-50">
            {isLoading ? <><FaSpinner className="animate-spin" /> Writing Data Elements...</> : "Execute Full Institutional Enrollment"}
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
            <div className="text-center py-12 text-xs font-bold text-[#434655]/60 flex items-center justify-center gap-2"><FaSpinner className="animate-spin text-[#004ac6]" /> Fetching Supabase arrays...</div>
          ) : studentsList.length === 0 ? (
            <div className="text-center py-12 text-xs font-bold text-[#434655]/60">No profiles currently recorded.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9ff] border-b border-[#c3c6d7]/20">
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Identifier</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Student Profile</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Program/Grade</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Primary Phone</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider">Status</th>
                  <th className="p-4 text-[10px] font-black text-[#434655] uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3c6d7]/10">
                {studentsList.map((student) => (
                  <tr key={student.id} className="hover:bg-[#f8f9ff]/40 transition-colors">
                    <td className="p-4 text-xs font-bold text-[#004ac6]">{student.student_id_code}</td>
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#004ac6] text-white font-black text-[10px] flex items-center justify-center uppercase overflow-hidden">
                        {student.photo_url ? <img src={student.photo_url} alt="" className="w-full h-full object-cover" /> : student.name.charAt(0)}
                      </div>
                      <span className="text-xs font-black text-[#0d1c2f]">{student.name}</span>
                    </td>
                    <td className="p-4 text-xs font-semibold text-[#434655]">{student.grade_level || student.program || "Unassigned"}</td>
                    <td className="p-4 text-xs font-bold text-[#0d1c2f]">{student.phone || "None Listed"}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        student.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                        student.status === "Inactive" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}>{student.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => setSelectedStudent(student)} className="px-3 py-1.5 bg-[#f8f9ff] hover:bg-[#004ac6] hover:text-white border border-[#c3c6d7]/40 rounded-xl text-[11px] font-black text-[#0d1c2f] inline-flex items-center gap-1.5 transition-all shadow-sm">
                        <FaEye /> Profile Info <FaChevronRight className="text-[9px]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ─── PROFESSIONAL ACTION PROFILE SLIDEOUT MODAL LAYER ─── */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-[#0d1c2f]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-[#c3c6d7]/40 shadow-2xl flex flex-col">
            
            {/* Modal Title Row */}
            <div className="p-5 border-b border-[#c3c6d7]/10 flex items-center justify-between bg-[#f8f9ff]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#004ac6] text-white text-sm font-black flex items-center justify-center uppercase">{selectedStudent.name.charAt(0)}</div>
                <div>
                  <h3 className="text-sm font-black text-[#0d1c2f]">{selectedStudent.name}</h3>
                  <p className="text-[10px] font-bold text-[#004ac6] uppercase tracking-wider">System ID Code: {selectedStudent.student_id_code}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="w-8 h-8 rounded-xl bg-white border border-[#c3c6d7]/40 flex items-center justify-center text-xs text-[#434655] hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-sm"><FaXmark /></button>
            </div>

            {/* Modal Internal Content Area Grid Layout */}
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Data Category Split 1: Student Core Specs */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-[#004ac6] uppercase tracking-wider border-b border-[#c3c6d7]/10 pb-1 flex items-center gap-1.5"><FaUser /> Core Student Matrix</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-[#434655]">
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Gender</p><p className="text-[#0d1c2f]">{selectedStudent.gender}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Date of Birth</p><p className="text-[#0d1c2f]">{selectedStudent.dob || "Unspecified"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Age Bracket</p><p className="text-[#0d1c2f]">{selectedStudent.age} Years</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">School Affiliation</p><p className="text-[#0d1c2f]">{selectedStudent.school || "None Record"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Grade Level</p><p className="text-[#0d1c2f]">{selectedStudent.grade_level}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Blood Group</p><p className="text-[#0d1c2f]">{selectedStudent.blood_group || "Pending"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Medical Restrictions</p><p className="text-rose-600 font-black">{selectedStudent.medical_notes || "None Declared"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Special Needs Accommodate</p><p className="text-[#0d1c2f]">{selectedStudent.special_needs || "None Declared"}</p></div>
                </div>
              </div>

              {/* Data Category Split 2: Parent Information Ecosystem */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-[#004ac6] uppercase tracking-wider border-b border-[#c3c6d7]/10 pb-1 flex items-center gap-1.5"><FaPeopleRoof /> Parent & Guardian Infrastructure</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-[#434655]">
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Father Name</p><p className="text-[#0d1c2f]">{selectedStudent.father_name || "Unspecified"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Mother Name</p><p className="text-[#0d1c2f]">{selectedStudent.mother_name || "Unspecified"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Legal Guardian</p><p className="text-[#0d1c2f]">{selectedStudent.guardian || "Not Listed"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Contact Phone</p><p className="text-[#004ac6] font-black">{selectedStudent.phone || "Not Listed"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">WhatsApp Stream</p><p className="text-[#0d1c2f]">{selectedStudent.whatsapp || "Not Listed"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Email Profile Address</p><p className="text-[#0d1c2f]">{selectedStudent.email || "Not Listed"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Occupation</p><p className="text-[#0d1c2f]">{selectedStudent.occupation || "Not Listed"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Emergency Contact Spec</p><p className="text-[#0d1c2f]">{selectedStudent.emergency_contact || "Not Listed"} ({selectedStudent.relationship || "N/A"})</p></div>
                  <div className="sm:col-span-4"><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Residential Mapping Address</p><p className="text-[#0d1c2f]">{selectedStudent.address || "No Home Address Configured Inside Ledger Node"}</p></div>
                </div>
              </div>

              {/* Data Category Split 3: Enrollment Metrics */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-[#004ac6] uppercase tracking-wider border-b border-[#c3c6d7]/10 pb-1 flex items-center gap-1.5"><FaSchool /> Operational Program Enrollment Matrix</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-[#434655]">
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Admission Date</p><p className="text-[#0d1c2f]">{selectedStudent.admission_date || "N/A"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Target Program Vector</p><p className="text-[#0d1c2f]">{selectedStudent.program || "Core Standard"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Assigned Faculty Mentor</p><p className="text-[#0d1c2f]">{selectedStudent.teacher || "Unassigned"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Weekly Commit Count</p><p className="text-[#0d1c2f]">{selectedStudent.weekly_classes || "0"} Classes</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Course Duration Length</p><p className="text-[#0d1c2f]">{selectedStudent.course_duration || "Indefinite"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Lifecycle Timeline Bounds</p><p className="text-[#0d1c2f]">{selectedStudent.start_date || "Open"} to {selectedStudent.end_date || "Open"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Assigned Fee Structure Plan</p><p className="text-emerald-700 font-black">{selectedStudent.fee_plan || "Standard Plan"}</p></div>
                  <div><p className="text-[9px] uppercase tracking-wide font-black text-[#737686]">Discount / Scholarship Metrics</p><p className="text-[#0d1c2f]">{selectedStudent.discount || "0"}% / {selectedStudent.scholarship || "None Set"}</p></div>
                </div>
              </div>

              {/* Data Category Split 4: Verification Status Badging */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-[#004ac6] uppercase tracking-wider border-b border-[#c3c6d7]/10 pb-1 flex items-center gap-1.5"><FaFileLines /> Internal Compliance Files</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { flag: selectedStudent.doc_birth_certificate, label: "Birth Certificate Verified" },
                    { flag: selectedStudent.doc_photo, label: "Passport Profile Photograph" },
                    { flag: selectedStudent.doc_id_proof, label: "Government Verified Identity" },
                    { flag: selectedStudent.doc_school_id, label: "School ID Verification Records" },
                    { flag: selectedStudent.doc_medical_certificate, label: "Medical Fitness Certificate" },
                    { flag: selectedStudent.doc_agreement, label: "Signed Management Agreements" }
                  ].map((doc, idx) => (
                    <div key={idx} className={`p-2.5 rounded-xl border text-[11px] font-black flex items-center gap-2 ${
                      doc.flag ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current" /> {doc.label}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}