import { useState, useMemo, useEffect } from "react";
import { 
  FaUserPlus, 
  FaSearch, 
  FaSlidersH, 
  FaChevronDown, 
  FaChevronUp, 
  FaEllipsisV, 
  FaEnvelope, 
  FaTrashAlt, 
  FaEye,
  FaTimes,
  FaTimesCircle
} from "react-icons/fa";
import { supabase } from "../../utils/supabaseClient";

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  cohort: string;
  gpa: number;
  status: "Active" | "Probation" | "Suspended";
  dateEnrolled: string;
}

type SortKey = "name" | "gpa" | "id" | "dateEnrolled";
type SortOrder = "asc" | "desc";

export default function Students() {
  // Central Data Pool States
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Structural Interactive Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cohort: "Computer Science (Y1)",
    gpa: "4.00",
    status: "Active" as "Active" | "Probation" | "Suspended"
  });

  // Query UI Controls Filter Matrix States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // 1. Core Lifecycle Effect - Fetch Production Records from Supabase
  useEffect(() => {
    fetchLiveStudents();
  }, []);

  const fetchLiveStudents = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*");

      if (error) throw error;

      // Map snake_case database rows cleanly back onto UI camelCase parameters
      const mappedRecords: StudentRecord[] = (data || []).map((row: any) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        cohort: row.cohort,
        gpa: parseFloat(row.gpa),
        status: row.status,
        dateEnrolled: row.date_enrolled
      }));

      setStudents(mappedRecords);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to fetch student metrics from database.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Action Engine Routine - Provision New Student Record Matrix
  const handleCreateStudent = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Auto-Generate structured serial profile index token key string
    const uniqueId = `STU-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentLocalDateString = new Date().toISOString().split("T")[0];

    const targetPayload = {
      id: uniqueId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      cohort: formData.cohort,
      gpa: parseFloat(formData.gpa),
      status: formData.status,
      date_enrolled: currentLocalDateString
    };

    try {
      const { error } = await supabase
        .from("students")
        .insert([targetPayload]);

      if (error) throw error;

      // Instantly refresh UI client view ledger parameters locally 
      await fetchLiveStudents();
      setIsModalOpen(false);
      setFormData({ name: "", email: "", cohort: "Computer Science (Y1)", gpa: "4.00", status: "Active" });
    } catch (err: any) {
      setErrorMessage(err.message || "Database execution constraints error occurred.");
    }
  };

  // 3. Action Engine Routine - Wipe and Revoke Records from Matrix Table
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Completely wipe and revoke profile data metrics for ${name} (${id})?`)) {
      setErrorMessage(null);
      try {
        const { error } = await supabase
          .from("students")
          .delete()
          .eq("id", id);

        if (error) throw error;

        setStudents(prev => prev.filter(s => s.id !== id));
        setActiveMenuId(null);
      } catch (err: any) {
        setErrorMessage(err.message || "Unable to update schema structure entries.");
      }
    }
  };

  // Sorting Handler Toggle Trigger Action
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Filter & Search Evaluation Memoized Pipeline
  const filteredAndSortedStudents = useMemo(() => {
    return students
      .filter((student) => {
        const matchesSearch = 
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "All" || student.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [students, searchTerm, statusFilter, sortKey, sortOrder]);

  return (
    <div className="space-y-6 p-1 relative">
      
      {/* Action Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0d1c2f]">Student Registry</h1>
          <p className="text-xs font-semibold text-[#434655]">Manage academic lifecycles, core documentation profiles, and live GPA performance indexes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#004ac6] hover:bg-[#2563eb] text-white text-xs font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all self-start sm:self-auto shadow-sm active:scale-95"
        >
          <FaUserPlus />
          <span>Provision Student</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-700 text-xs font-bold">
          <FaTimesCircle className="flex-shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Query Filter Control Matrix Bar */}
      <div className="bg-white rounded-2xl border border-[#c3c6d7]/40 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#434655]/40 text-xs">
            <FaSearch />
          </span>
          <input 
            type="text"
            placeholder="Search by index parameter, full name, or communication vector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border-[#c3c6d7] bg-[#eff4ff]/30 focus:bg-white focus:ring-2 focus:ring-[#004ac6] text-xs font-semibold text-[#0d1c2f] py-2.5 pl-10 pr-4 transition-all placeholder:text-[#434655]/40"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs font-bold text-[#434655]">
            <FaSlidersH className="text-[#004ac6]" />
            <span>Lifecycle:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border-[#c3c6d7] bg-[#eff4ff]/40 text-xs font-bold text-[#0d1c2f] py-2 pl-3 pr-8 cursor-pointer focus:ring-2 focus:ring-[#004ac6] transition-all"
          >
            <option value="All">All Profiles</option>
            <option value="Active">Active Standing</option>
            <option value="Probation">Academic Probation</option>
            <option value="Suspended">Suspended Bounds</option>
          </select>
        </div>
      </div>

      {/* Main Ledger Content Canvas */}
      <div className="bg-white rounded-2xl border border-[#c3c6d7]/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eff4ff]/60 border-b border-[#c3c6d7]/30">
                <th onClick={() => handleSort("id")} className="px-6 py-3.5 text-[10px] font-black text-[#434655] uppercase tracking-wider cursor-pointer hover:bg-[#eff4ff] transition-colors select-none">
                  <div className="flex items-center gap-1.5">
                    <span>Student ID</span>
                    {sortKey === "id" && (sortOrder === "asc" ? <FaChevronUp /> : <FaChevronDown />)}
                  </div>
                </th>
                <th onClick={() => handleSort("name")} className="px-6 py-3.5 text-[10px] font-black text-[#434655] uppercase tracking-wider cursor-pointer hover:bg-[#eff4ff] transition-colors select-none">
                  <div className="flex items-center gap-1.5">
                    <span>Identity Profile</span>
                    {sortKey === "name" && (sortOrder === "asc" ? <FaChevronUp /> : <FaChevronDown />)}
                  </div>
                </th>
                <th className="px-6 py-3.5 text-[10px] font-black text-[#434655] uppercase tracking-wider select-none">Cohort Allocation</th>
                <th onClick={() => handleSort("gpa")} className="px-6 py-3.5 text-[10px] font-black text-[#434655] uppercase tracking-wider cursor-pointer hover:bg-[#eff4ff] transition-colors select-none">
                  <div className="flex items-center gap-1.5">
                    <span>Performance GPA</span>
                    {sortKey === "gpa" && (sortOrder === "asc" ? <FaChevronUp /> : <FaChevronDown />)}
                  </div>
                </th>
                <th className="px-6 py-3.5 text-[10px] font-black text-[#434655] uppercase tracking-wider select-none">Status State</th>
                <th className="px-6 py-3.5 text-[10px] font-black text-[#434655] uppercase tracking-wider text-right select-none">Context Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/20">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <span className="w-6 h-6 border-2 border-[#004ac6]/30 border-t-[#004ac6] inline-block rounded-full animate-spin" />
                    <p className="text-[11px] font-bold text-[#434655] mt-2">Querying live database ledger profiles...</p>
                  </td>
                </tr>
              ) : filteredAndSortedStudents.length > 0 ? (
                filteredAndSortedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-[#eff4ff]/20 transition-all group">
                    <td className="px-6 py-4 text-xs font-black text-[#004ac6]">{student.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-xs font-bold text-[#0d1c2f]">{student.name}</p>
                        <p className="text-[11px] text-[#434655]/70 font-medium">{student.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-[#434655]">{student.cohort}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold ${student.gpa >= 3.5 ? "text-emerald-600" : student.gpa < 2.5 ? "text-amber-600" : "text-[#0d1c2f]"}`}>
                        {student.gpa.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                        student.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                        student.status === "Probation" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                        "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === student.id ? null : student.id)}
                        className="text-[#434655]/40 hover:text-[#0d1c2f] p-1.5 rounded-lg hover:bg-[#eff4ff] transition-all"
                      >
                        <FaEllipsisV className="text-xs" />
                      </button>

                      {activeMenuId === student.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                          <div className="absolute right-6 top-12 bg-white border border-[#c3c6d7]/40 shadow-xl rounded-xl py-1.5 w-40 text-left z-20">
                            <button 
                              onClick={() => { alert(`Displaying detailed analytics snapshot dashboard configuration for ${student.name}`); setActiveMenuId(null); }}
                              className="w-full px-3.5 py-2 text-[11px] font-bold text-[#434655] hover:bg-[#eff4ff] hover:text-[#004ac6] flex items-center gap-2 transition-all"
                            >
                              <FaEye /> <span>Inspect Index</span>
                            </button>
                            <button 
                              onClick={() => { window.location.href = `mailto:${student.email}`; setActiveMenuId(null); }}
                              className="w-full px-3.5 py-2 text-[11px] font-bold text-[#434655] hover:bg-[#eff4ff] hover:text-[#004ac6] flex items-center gap-2 transition-all"
                            >
                              <FaEnvelope /> <span>Dispatch Mail</span>
                            </button>
                            <hr className="border-[#c3c6d7]/20 my-1" />
                            <button 
                              onClick={() => handleDelete(student.id, student.name)}
                              className="w-full px-3.5 py-2 text-[11px] font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-all"
                            >
                              <FaTrashAlt /> <span>Revoke Profile</span>
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 bg-[#f8f9ff]/40">
                    <p className="text-xs font-bold text-[#434655]">No student records match your query.</p>
                    <p className="text-[11px] text-[#434655]/60 font-medium mt-0.5">Modify the filter toggles or searching string parameters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Overlay Creation Modal Container */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#c3c6d7]/50 shadow-2xl max-w-md w-full p-6 animate-fadeIn relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-[#434655]/50 hover:text-[#0d1c2f] transition-colors"
            >
              <FaTimes />
            </button>
            
            <div className="mb-4">
              <h3 className="text-base font-black text-[#0d1c2f]">Provision Academic Account</h3>
              <p className="text-[11px] font-medium text-[#434655]">Inject unique data metrics profile token cleanly into core servers.</p>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Student Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Jane Doe"
                  className="w-full text-xs font-semibold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2.5 px-3 focus:bg-white focus:ring-2 focus:ring-[#004ac6] transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Communication Vector (Email)</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="j.doe@university.edu"
                  className="w-full text-xs font-semibold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2.5 px-3 focus:bg-white focus:ring-2 focus:ring-[#004ac6] transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Cohort Selection Stream</label>
                <select 
                  value={formData.cohort}
                  onChange={(e) => setFormData({...formData, cohort: e.target.value})}
                  className="w-full text-xs font-bold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2.5 px-3 cursor-pointer focus:ring-2 focus:ring-[#004ac6] transition-all"
                >
                  <option value="Computer Science (Y1)">Computer Science (Y1)</option>
                  <option value="Computer Science (Y3)">Computer Science (Y3)</option>
                  <option value="Fine Arts (Y1)">Fine Arts (Y1)</option>
                  <option value="Advanced Mathematics (Y2)">Advanced Mathematics (Y2)</option>
                  <option value="Quantum Physics (Y2)">Quantum Physics (Y2)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Calculated GPA Matrix</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0.00"
                    max="4.00"
                    required
                    value={formData.gpa}
                    onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                    placeholder="3.50"
                    className="w-full text-xs font-semibold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2.5 px-3 focus:bg-white focus:ring-2 focus:ring-[#004ac6] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#434655] uppercase tracking-wider mb-1">Current Lifecycle Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full text-xs font-bold rounded-xl border-[#c3c6d7] bg-[#eff4ff]/20 py-2.5 px-3 cursor-pointer focus:ring-2 focus:ring-[#004ac6] transition-all"
                  >
                    <option value="Active">Active Standing</option>
                    <option value="Probation">Probation Bounds</option>
                    <option value="Suspended">Suspended State</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#c3c6d7] text-[#434655] font-bold text-xs hover:bg-[#eff4ff]/40 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2.5 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white font-bold text-xs transition-all shadow-sm"
                >
                  Commit System Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}