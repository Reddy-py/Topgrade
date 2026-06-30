import { useState, useEffect } from "react";
import { 
  FaUserPlus, FaSpinner, FaCheck, FaTriangleExclamation,
  FaUsers, FaUserCheck, FaUserXmark, FaGraduationCap, FaXmark,
  FaChevronRight, FaUser, FaPeopleRoof, FaSchool, FaFileLines, FaEye, FaPenToSquare
} from "react-icons/fa6";

export default function StudentManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("student");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Tracking targets for database operations
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [summary, setSummary] = useState({ total: 0, active: 0, inactive: 0, completed: 0 });

  const initialFormState = {
    studentName: "", photoUrl: "", gender: "Male", dateOfBirth: "", age: "", 
    school: "", gradeLevel: "Grade 1", bloodGroup: "A+", medicalNotes: "", specialNeeds: "", status: "Active",
    fatherName: "", motherName: "", guardian: "", phone: "", whatsapp: "", 
    email: "", occupation: "", emergencyContact: "", relationship: "", address: "",
    admissionDate: "", program: "", teacher: "", weeklyClasses: "", 
    courseDuration: "", startDate: "", endDate: "", feePlan: "", discount: "", scholarship: "", operationalNotes: "",
    docBirthCertificate: false, docPhoto: false, docIdProof: false, docSchoolId: false, docMedicalCertificate: false, docAgreement: false
  };

  const [studentForm, setStudentForm] = useState(initialFormState);

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

  const startEditing = (student: any) => {
    setEditingStudentId(student.id);
    setStudentForm({
      studentName: student.name || "",
      photoUrl: student.photo_url || "",
      gender: student.gender || "Male",
      dateOfBirth: student.dob || "",
      age: student.age ? student.age.toString() : "",
      school: student.school || "",
      gradeLevel: student.grade_level || "Grade 1",
      bloodGroup: student.blood_group || "A+",
      medicalNotes: student.medical_notes || "",
      specialNeeds: student.special_needs || "",
      status: student.status || "Active",
      fatherName: student.father_name || "",
      motherName: student.mother_name || "",
      guardian: student.guardian || "",
      phone: student.phone || "",
      whatsapp: student.whatsapp || "",
      email: student.email || "",
      occupation: student.occupation || "",
      emergencyContact: student.emergency_contact || "",
      relationship: student.relationship || "",
      address: student.address || "",
      admissionDate: student.admission_date || "",
      program: student.program || "",
      teacher: student.teacher || "",
      weeklyClasses: student.weekly_classes ? student.weekly_classes.toString() : "",
      courseDuration: student.course_duration || "",
      startDate: student.start_date || "",
      endDate: student.end_date || "",
      feePlan: student.fee_plan || "",
      discount: student.discount || "",
      scholarship: student.scholarship || "",
      operationalNotes: student.operational_notes || "",
      docBirthCertificate: !!student.doc_birth_certificate,
      docPhoto: !!student.doc_photo,
      docIdProof: !!student.doc_id_proof,
      docSchoolId: !!student.doc_school_id,
      docMedicalCertificate: !!student.doc_medical_certificate,
      docAgreement: !!student.doc_agreement
    });
    setActiveTab("student");
    setShowAddForm(true);
    setSelectedStudent(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    const endpoint = editingStudentId 
      ? `https://topgrade-backend.onrender.com/api/students/edit/${editingStudentId}`
      : "https://topgrade-backend.onrender.com/api/students/add";
    
    const method = editingStudentId ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentForm),
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Failed to save record entry.");

      setSuccess(true);
      setShowAddForm(false);
      setEditingStudentId(null);
      setStudentForm(initialFormState);
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
          onClick={() => { 
            if (showAddForm) {
              setEditingStudentId(null);
              setStudentForm(initialFormState);
            }
            setShowAddForm(!showAddForm); 
            setSuccess(false); 
            setError(""); 
          }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-2 ${
            showAddForm ? 'bg-[#434655] text-white' : 'bg-[#004ac6] hover:bg-[#2563eb] text-white'
          }`}
        >
          {showAddForm ? <><FaXmark /> Cancel Workflow</> : <><FaUserPlus /> Add Student</>}
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

      {success && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold p-4 rounded-xl flex items-center gap-2"><FaCheck /> Ledger updated successfully!</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-4 rounded-xl flex items-center gap-2"><FaTriangleExclamation /> {error}</div>}

      {/* ─── ADD/EDIT WORKFLOW TABBED FORM ─── */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-[#c3c6d7]/40 rounded-2xl p-6 space-y-6 shadow-md animate-fadeIn">
          <div className="flex border-b border-[#c3c6d7]/20 gap-2 pb-px overflow-x-auto">
            {[
              { id: "student", label: "Student Info", icon: <FaUser /> },
              { id: "parent", label: "Parent Details", icon: <FaPeopleRoof /> },
              { id: "enrollment", label: "Enrollment Specs", icon: <FaSchool /> },
              { id: "documents", label: "Documents Ledger", icon: <FaFileLines /> }
            ].map(tab => (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`px-4 py-2.5 font-black text-[11px] uppercase tracking-wider rounded-t-xl transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                activeTab === tab.id ? 'border-[#004ac6] text-[#004ac6] bg-[#f8f9ff]' : 'border-transparent text-[#737686] hover:text-[#0d1c2f]'
              }`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "student" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Student Name *</label><input type="text" name="studentName" required value={studentForm.studentName} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Photo URL path</label><input type="text" name="photoUrl" value={studentForm.photoUrl} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Lifecycle Status</label><select name="status" value={studentForm.status} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none"><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Completed">Completed</option></select></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Gender</label><select name="gender" value={studentForm.gender} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none"><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Date of Birth *</label><input type="date" name="dateOfBirth" required value={studentForm.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Age *</label><input type="number" name="age" required value={studentForm.age} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">School</label><input type="text" name="school" value={studentForm.school} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Grade Level</label><input type="text" name="gradeLevel" value={studentForm.gradeLevel} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Blood Group</label><select name="bloodGroup" value={studentForm.bloodGroup} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none"><option value="A+">A+</option><option value="B+">B+</option><option value="O+">O+</option><option value="AB+">AB+</option><option value="Negative">Negative/Other</option></select></div>
              <div className="space-y-1 md:col-span-3"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Medical Notes</label><textarea name="medicalNotes" value={studentForm.medicalNotes} onChange={handleChange} rows={2} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none resize-none" /></div>
              <div className="space-y-1 md:col-span-3"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Special Needs Provisions</label><textarea name="specialNeeds" value={studentForm.specialNeeds} onChange={handleChange} rows={2} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none resize-none" /></div>
            </div>
          )}

          {activeTab === "parent" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Father Name</label><input type="text" name="fatherName" value={studentForm.fatherName} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Mother Name</label><input type="text" name="motherName" value={studentForm.motherName} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Primary Phone</label><input type="text" name="phone" value={studentForm.phone} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">WhatsApp Line</label><input type="text" name="whatsapp" value={studentForm.whatsapp} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Email Profile</label><input type="email" name="email" value={studentForm.email} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1 md:col-span-3"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Residential Mapping Address</label><input type="text" name="address" value={studentForm.address} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
            </div>
          )}

          {activeTab === "enrollment" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Target Program Vector</label><input type="text" name="program" value={studentForm.program} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Assigned Fee Plan</label><input type="text" name="feePlan" value={studentForm.feePlan} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Scholarship Metrics</label><input type="text" name="scholarship" value={studentForm.scholarship} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none" /></div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn p-2 bg-[#f8f9ff] rounded-xl border border-[#c3c6d7]/20">
              {[
                { name: "docBirthCertificate", label: "Birth Certificate Verified" },
                { name: "docPhoto", label: "Passport Profile Photograph" },
                { name: "docIdProof", label: "Government Verified Identity" },
                { name: "docSchoolId", label: "School ID Verification Records" },
                { name: "docMedicalCertificate", label: "Medical Fitness Certificate" },
                { name: "docAgreement", label: "Signed Management Agreements" }
              ].map(doc => (
                <label key={doc.name} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#c3c6d7]/10 cursor-pointer shadow-sm hover:border-[#004ac6]/40 transition-all select-none">
                  <input type="checkbox" name={doc.name} checked={(studentForm as any)[doc.name]} onChange={handleChange} className="w-4 h-4 rounded text-[#004ac6] border-[#c3c6d7]/60 focus:ring-[#004ac6]" />
                  <span className="text-xs font-black text-[#0d1c2f]">{doc.label}</span>
                </label>
              ))}
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full bg-[#004ac6] text-white font-bold text-xs py-3 rounded-xl hover:bg-[#2563eb] transition-all flex items-center justify-center gap-2 shadow-md">
            {isLoading ? <><FaSpinner className="animate-spin" /> Committing Matrix Elements...</> : editingStudentId ? "Update Student Profile Ledger" : "Onboard Student Profile Record"}
          </button>
        </form>
      )}

      {/* ─── SYSTEM LEDGER TABLE MATRIX DISPLAY ─── */}
      <div className="bg-white border border-[#c3c6d7]/30 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#c3c6d7]/10 bg-[#f8f9ff]"><h2 className="text-xs font-black text-[#0d1c2f] uppercase tracking-wider">Active Student Registries</h2></div>
        <div className="overflow-x-auto">
          {isFetching ? (
            <div className="text-center py-12 text-xs font-bold text-[#434655]/60 flex items-center justify-center gap-2"><FaSpinner className="animate-spin text-[#004ac6]" /> Running database index synchronization...</div>
          ) : studentsList.length === 0 ? (
            <div className="text-center py-12 text-xs font-bold text-[#434655]/60">No student profiles discovered inside this cluster node.</div>
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
                    <td className="p-4 text-xs font-bold text-[#004ac6]">{student.student_id || `TG-STU-${student.id}`}</td>
                    <td className="p-4 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#004ac6] text-white flex items-center justify-center text-[10px] font-black uppercase">
                        {student.name ? student.name.charAt(0) : "S"}
                      </div>
                      <span className="text-xs font-black text-[#0d1c2f]">{student.name}</span>
                    </td>
                    <td className="p-4 text-xs font-semibold text-[#434655]">{student.grade_level || "Core Standard"}</td>
                    <td className="p-4 text-xs font-bold text-[#434655]">{student.phone || "None Listed"}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-full ${
                        student.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                      }`}>{student.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => setSelectedStudent(student)} className="px-3 py-1.5 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-[11px] font-black text-[#0d1c2f] inline-flex items-center gap-1.5 shadow-sm hover:bg-[#004ac6] hover:text-white transition-all">
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

      {/* ─── DETAIL VIEW MODAL SHEET ─── */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-[#0d1c2f]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-4xl border border-[#c3c6d7]/40 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-[#c3c6d7]/10 flex items-center justify-between bg-[#f8f9ff]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#004ac6] text-white flex items-center justify-center text-xs font-black">{selectedStudent.name?.charAt(0)}</div>
                <div>
                  <h3 className="text-sm font-black text-[#0d1c2f]">{selectedStudent.name}</h3>
                  <p className="text-[10px] font-bold text-[#004ac6] uppercase tracking-wider">System ID Code: {selectedStudent.student_id || `TG-STU-${selectedStudent.id}`}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startEditing(selectedStudent)} className="px-3 py-1.5 bg-[#004ac6] text-white rounded-xl text-[11px] font-black hover:bg-[#2563eb] transition-all flex items-center gap-1.5 shadow-sm">
                  <FaPenToSquare /> Modify File
                </button>
                <button onClick={() => setSelectedStudent(null)} className="w-8 h-8 rounded-xl bg-white border border-[#c3c6d7]/40 flex items-center justify-center text-xs text-[#434655] hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"><FaXmark /></button>
              </div>
            </div>

            <div className="p-6 space-y-6 text-xs font-semibold text-[#434655]">
              <div>
                <h4 className="text-[10px] font-black text-[#004ac6] uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b pb-1"><FaUser /> Core Student Matrix</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><p className="text-[9px] text-[#737686] uppercase">Gender</p><p className="text-[#0d1c2f] font-bold mt-0.5">{selectedStudent.gender}</p></div>
                  <div><p className="text-[9px] text-[#737686] uppercase">Date of Birth</p><p className="text-[#0d1c2f] font-bold mt-0.5">{selectedStudent.dob}</p></div>
                  <div><p className="text-[9px] text-[#737686] uppercase">Age Bracket</p><p className="text-[#0d1c2f] font-bold mt-0.5">{selectedStudent.age} Years</p></div>
                  <div><p className="text-[9px] text-[#737686] uppercase">School Affiliation</p><p className="text-[#0d1c2f] font-bold mt-0.5">{selectedStudent.school || "N/A"}</p></div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-[#004ac6] uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b pb-1"><FaPeopleRoof /> Parent & Guardian Infrastructure</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><p className="text-[9px] text-[#737686] uppercase">Father Name</p><p className="text-[#0d1c2f] font-bold mt-0.5">{selectedStudent.father_name || "Unspecified"}</p></div>
                  <div><p className="text-[9px] text-[#737686] uppercase">Mother Name</p><p className="text-[#0d1c2f] font-bold mt-0.5">{selectedStudent.mother_name || "Unspecified"}</p></div>
                  <div><p className="text-[9px] text-[#737686] uppercase">Primary Contact Phone</p><p className="text-[#004ac6] font-black mt-0.5">{selectedStudent.phone || "Not Listed"}</p></div>
                  <div><p className="text-[9px] text-[#737686] uppercase">WhatsApp Stream</p><p className="text-[#0d1c2f] font-bold mt-0.5">{selectedStudent.whatsapp || "Not Routed"}</p></div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-[#004ac6] uppercase tracking-wider mb-3 flex items-center gap-1.5 border-b pb-1"><FaFileLines /> Internal Compliance Files</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[
                    { key: "doc_birth_certificate", label: "Birth Certificate Verified" },
                    { key: "doc_photo", label: "Passport Profile Photograph" },
                    { key: "doc_id_proof", label: "Government Verified Identity" },
                    { key: "doc_school_id", label: "School ID Verification Records" },
                    { key: "doc_medical_certificate", label: "Medical Fitness Certificate" },
                    { key: "doc_agreement", label: "Signed Management Agreements" }
                  ].map(doc => (
                    <div key={doc.key} className={`p-2.5 rounded-xl border flex items-center gap-2 ${selectedStudent[doc.key] ? 'bg-emerald-50/60 border-emerald-200 text-emerald-700' : 'bg-rose-50/60 border-rose-100 text-rose-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${selectedStudent[doc.key] ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <span className="text-[11px] font-black">{doc.label}</span>
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