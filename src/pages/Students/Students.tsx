import { useState, useMemo } from "react";
import { 
  FaUserPlus, 
  FaSearch, 
  FaSlidersH, 
  FaChevronDown, 
  FaChevronUp, 
  FaEllipsisV, 
  FaEnvelope, 
  FaTrashAlt, 
  FaEye 
} from "react-icons/fa";

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  cohort: string;
  gpa: number;
  status: "Active" | "Probation" | "Suspended";
  dateEnrolled: string;
}

const initialStudents: StudentRecord[] = [
  { id: "STU-9081", name: "Jane Doe", email: "j.doe@st-edwards.edu", cohort: "Computer Science (Y3)", gpa: 3.84, status: "Active", dateEnrolled: "2024-09-01" },
  { id: "STU-4431", name: "Leo Martinez", email: "l.martinez@st-edwards.edu", cohort: "Fine Arts (Y1)", gpa: 3.12, status: "Active", dateEnrolled: "2026-02-15" },
  { id: "STU-1029", name: "Marcus Vance", email: "m.vance@st-edwards.edu", cohort: "Advanced Mathematics (Y2)", gpa: 2.45, status: "Probation", dateEnrolled: "2025-01-10" },
  { id: "STU-8842", name: "Sarah Jenkins", email: "s.jenkins@st-edwards.edu", cohort: "English Literature (Y4)", gpa: 3.91, status: "Active", dateEnrolled: "2023-09-01" },
  { id: "STU-6551", name: "Alex Wong", email: "a.wong@st-edwards.edu", cohort: "Quantum Physics (Y2)", gpa: 1.98, status: "Suspended", dateEnrolled: "2025-09-01" }
];

type SortKey = "name" | "gpa" | "id" | "dateEnrolled";
type SortOrder = "asc" | "desc";

export default function Students() {
  // Central Data & Interaction States
  const [students, setStudents] = useState<StudentRecord[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Sorting Handler Action
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Filter & Search Evaluation Chain
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

  // Quick Action Routine Mimics
  const handleDelete = (id: string) => {
    if (confirm(`Revoke and delete system profile workspace access for ${id}?`)) {
      setStudents(students.filter(s => s.id !== id));
      setActiveMenuId(null);
    }
  };

  return (
    <div className="space-y-6 p-1 relative">
      
      {/* Action Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0d1c2f]">Student Registry</h1>
          <p className="text-xs font-semibold text-[#434655]">Manage academic lifecycles, core documentation profiles, and GPA performance indexes.</p>
        </div>
        <button 
          onClick={() => alert("Launching modal context system framework for profiling new records...")}
          className="bg-[#004ac6] hover:bg-[#2563eb] text-white text-xs font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all self-start sm:self-auto shadow-sm active:scale-95"
        >
          <FaUserPlus />
          <span>Provision Student</span>
        </button>
      </div>

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
              {filteredAndSortedStudents.length > 0 ? (
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

                      {/* Dropdown Micro Context Menu Layout Container */}
                      {activeMenuId === student.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                          <div className="absolute right-6 top-12 bg-white border border-[#c3c6d7]/40 shadow-xl rounded-xl py-1.5 w-40 text-left z-20 animate-fadeIn">
                            <button 
                              onClick={() => { alert(`Displaying secure interface ledger access for ${student.name}`); setActiveMenuId(null); }}
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
                              onClick={() => handleDelete(student.id)}
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
    </div>
  );
}