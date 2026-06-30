import { useState } from "react";
import { FaUserPlus, FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function StudentManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Complete data object mapped to your senior team's requirements
  const [studentForm, setStudentForm] = useState({
    studentName: "",
    photoUrl: "", // Text field placeholder for image URL paths
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Direct pipeline out to your deployed Render Express instance
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
      // Clear values upon valid transaction complete
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
    } catch (err: any) {
      setError(err.message || "Failed to connect to core backend API gateway.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      
      {/* Module Title Header */}
      <div className="border-b border-[#c3c6d7]/20 pb-4">
        <h1 className="text-xl font-black text-[#0d1c2f]">Student Management</h1>
        <p className="text-xs font-semibold text-[#434655]">Register, alter, and monitor student files tracking profile vectors natively.</p>
      </div>

      {/* Transaction Result Alerts */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold p-4 rounded-xl flex items-center gap-2">
          <FaCheckCircle /> Student record successfully processed and initialized in Supabase ledger!
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-4 rounded-xl flex items-center gap-2">
          <FaExclamationTriangle /> {error}
        </div>
      )}

      {/* Primary Data Input Form Layout */}
      <form onSubmit={handleSubmit} className="bg-white border border-[#c3c6d7]/30 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-black text-[#004ac6] uppercase tracking-wider pb-2 border-b border-[#c3c6d7]/10">
          <FaUserPlus /> Onboard Student Matrix Records
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Student Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Student Name</label>
            <input type="text" name="studentName" required value={studentForm.studentName} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="Ex: Rahul Kumar" />
          </div>

          {/* Photo URL / Token Path */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Photo URL Reference</label>
            <input type="text" name="photoUrl" value={studentForm.photoUrl} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="https://storage.com/avatar.jpg" />
          </div>

          {/* Status Select Box */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Academic Lifecycle Status</label>
            <select name="status" value={studentForm.status} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Gender */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Gender</label>
            <select name="gender" value={studentForm.gender} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* DOB */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Date of Birth</label>
            <input type="date" name="dateOfBirth" required value={studentForm.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" />
          </div>

          {/* Age */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Age</label>
            <input type="number" name="age" required value={studentForm.age} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="Ex: 8" />
          </div>

          {/* School Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Current School Affiliation</label>
            <input type="text" name="school" value={studentForm.school} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="Ex: St. Xavier's Academy" />
          </div>

          {/* Grade */}
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

          {/* Blood Group */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Blood Group Identifier</label>
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

        {/* Text Areas Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Medical Counter-Indications Notes</label>
            <textarea name="medicalNotes" rows={3} value={studentForm.medicalNotes} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6] resize-none" placeholder="Allergies, chronic constraints, emergency responses..." />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Special Needs Provisions</label>
            <textarea name="specialNeeds" rows={3} value={studentForm.specialNeeds} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6] resize-none" placeholder="Learning accommodations, structural assists needed..." />
          </div>
        </div>

        {/* Commit Action Button */}
        <button type="submit" disabled={isLoading} className="w-full bg-[#004ac6] text-white font-bold text-xs py-3 rounded-xl shadow-sm hover:bg-[#2563eb] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
          {isLoading ? (
            <><FaSpinner className="animate-spin" /> Committing Transaction Strings...</>
          ) : (
            "Save Student Profile Record"
          )}
        </button>
      </form>
    </div>
  );
}