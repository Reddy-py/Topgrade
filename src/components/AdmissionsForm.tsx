import { useState } from "react";
import { FaUserPlus, FaSpinner, FaCheckCircle } from "react-icons/fa";

export default function AdmissionsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Combined Form State
  const [formData, setFormData] = useState({
    // Parent Info
    fatherName: "",
    motherName: "",
    parentPhone: "",
    parentEmail: "",
    // Student Info
    studentName: "",
    dateOfBirth: "",
    gender: "Male",
    gradeLevel: "Grade 1",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Direct post connection to your live Render backend endpoint
      const response = await fetch("https://topgrade-backend.onrender.com/api/admissions/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Onboarding enrollment transaction failed.");
      }

      setSuccess(true);
      // Reset form fields
      setFormData({
        fatherName: "",
        motherName: "",
        parentPhone: "",
        parentEmail: "",
        studentName: "",
        dateOfBirth: "",
        gender: "Male",
        gradeLevel: "Grade 1",
      });
    } catch (err: any) {
      setError(err.message || "Network exception trying to reach core engine layers.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white border border-[#c3c6d7]/30 rounded-2xl shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-[#c3c6d7]/10 pb-4">
        <div className="w-10 h-10 bg-[#004ac6]/10 text-[#004ac6] rounded-xl flex items-center justify-center text-lg">
          <FaUserPlus />
        </div>
        <div>
          <h2 className="text-lg font-black text-[#0d1c2f]">New Student Admissions</h2>
          <p className="text-xs font-semibold text-[#434655]">Register a new family entity directly into core database ledgers.</p>
        </div>
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold p-4 rounded-xl flex items-center gap-2">
          <FaCheckCircle /> Family enrollment successfully processed and indexed!
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-4 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: PRIMARY PARENT DATA */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-[#004ac6] uppercase tracking-wider">1. Parent / Guardian Records</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Father's Full Name</label>
              <input type="text" name="fatherName" required value={formData.fatherName} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="John Doe" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Mother's Full Name</label>
              <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="Jane Doe" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Contact Phone Number</label>
              <input type="tel" name="parentPhone" required value={formData.parentPhone} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Email Address</label>
              <input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="parents@example.com" />
            </div>
          </div>
        </div>

        {/* SECTION 2: STUDENT DATA */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-[#004ac6] uppercase tracking-wider">2. Student Allocation Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Student Full Name</label>
              <input type="text" name="studentName" required value={formData.studentName} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" placeholder="Alex Doe" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Date of Birth</label>
              <input type="date" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#434655] uppercase tracking-wider">Academic Grade Stream</label>
              <select name="gradeLevel" value={formData.gradeLevel} onChange={handleChange} className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium focus:outline-none focus:border-[#004ac6]">
                <option value="Kindergarten">Kindergarten</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#004ac6] text-white font-bold text-xs py-3 rounded-xl shadow-sm hover:bg-[#2563eb] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Executing Secure Database Onboarding...
            </>
          ) : (
            "Complete Admission Enrollment"
          )}
        </button>
      </form>
    </div>
  );
}