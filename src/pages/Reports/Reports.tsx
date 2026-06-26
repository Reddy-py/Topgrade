import { useState } from "react";
import { 
  FaGraduationCap, 
  FaUserCheck, 
  FaCheckCircle, 
  FaUserMinus, 
  FaSearch, 
  FaChevronDown, 
  FaFileExport, 
  FaFileAlt, 
  FaChartLine, 
  FaDatabase, 
  FaReceipt, 
  FaExclamationTriangle, 
  FaEllipsisV, 
  FaChevronLeft, 
  FaChevronRight, 
  FaSync, 
  FaTimes, 
  FaInfoCircle,
  FaRegQuestionCircle
} from "react-icons/fa";

interface AcademicReport {
  id: string;
  name: string;
  category: "Academic" | "Attendance" | "Admissions" | "Finance";
  lastGenerated: string;
  fileSize: string;
  createdBy: string;
  initials: string;
  avatarBg: string;
  status: "Complete" | "Generating" | "Failed";
}

const initialReports: AcademicReport[] = [
  { id: "rep-1", name: "Mid-Term GPA Distribution", category: "Academic", lastGenerated: "Jun 12, 2026", fileSize: "2.4 MB", createdBy: "Jane Doe", initials: "JD", avatarBg: "bg-blue-100 text-blue-700", status: "Complete" },
  { id: "rep-2", name: "Faculty Attendance Audit", category: "Attendance", lastGenerated: "Jun 10, 2026", fileSize: "1.1 MB", createdBy: "Mark Smith", initials: "MS", avatarBg: "bg-indigo-100 text-indigo-700", status: "Complete" },
  { id: "rep-3", name: "Course Enrollment Projections", category: "Admissions", lastGenerated: "Jun 08, 2026", fileSize: "4.8 MB", createdBy: "Alex Rivera", initials: "AR", avatarBg: "bg-slate-200 text-slate-700", status: "Generating" },
  { id: "rep-4", name: "Tuition Fee Collection Recap", category: "Finance", lastGenerated: "Jun 05, 2026", fileSize: "0.9 MB", createdBy: "Sarah Lee", initials: "SL", avatarBg: "bg-emerald-100 text-emerald-700", status: "Complete" },
  { id: "rep-5", name: "High-Risk Retention Report", category: "Academic", lastGenerated: "Jun 02, 2026", fileSize: "--", createdBy: "Jane Doe", initials: "JD", avatarBg: "bg-blue-100 text-blue-700", status: "Failed" }
];

export default function Reports() {
  const [reports] = useState<AcademicReport[]>(initialReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [reportFilter, setReportFilter] = useState("All Types");
  const [termFilter, setTermFilter] = useState("Summer 2026");
  const [selectedReport, setSelectedReport] = useState<AcademicReport | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRowClick = (report: AcademicReport) => {
    setSelectedReport(report);
    setIsDrawerOpen(true);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = reportFilter === "All Types" || report.category === reportFilter;
    return matchesSearch && matchesType;
  });

  const getReportIcon = (category: string) => {
    switch (category) {
      case "Academic": return <FaFileAlt className="text-[#004ac6]" />;
      case "Attendance": return <FaChartLine className="text-[#004ac6]" />;
      case "Admissions": return <FaDatabase className="text-[#505f76]" />;
      case "Finance": return <FaReceipt className="text-[#004ac6]" />;
      default: return <FaFileAlt className="text-[#004ac6]" />;
    }
  };

  return (
    <div className="p-1 space-y-6 max-w-[1440px] w-full mx-auto relative">
      
      {/* 1. Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-black text-[#0d1c2f] tracking-tight">Reports &amp; Analytics</h2>
          <span className="px-4 py-1 bg-[#2563eb] text-white font-bold text-[11px] rounded-full tracking-wide">
            Reporting Cycle: Q2 2026
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-[#e6eeff] rounded-full text-[#434655] transition-colors" title="Refresh">
            <FaSync className="text-sm" />
          </button>
          <button className="p-2 hover:bg-[#e6eeff] rounded-full text-[#434655] transition-colors" title="Help">
            <FaRegQuestionCircle className="text-base" />
          </button>
        </div>
      </div>

      {/* 2. Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Average GPA */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#c3c6d7]/30 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="p-2.5 bg-[#004ac6]/10 text-[#004ac6] rounded-xl">
                <FaGraduationCap className="text-lg" />
              </span>
              <div className="flex items-center text-[#006242] font-bold text-xs">
                <FaChartLine className="mr-1 text-xs" />
                <span>+0.15</span>
              </div>
            </div>
            <p className="text-xs font-semibold text-[#434655] mb-1">Average GPA</p>
            <h3 className="text-3xl font-black text-[#0d1c2f]">
              3.62 <span className="text-lg font-normal text-[#434655]">GPA</span>
            </h3>
          </div>
        </div>

        {/* Card 2: Attendance Rate */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#c3c6d7]/30 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="p-2.5 bg-[#006242]/10 text-[#006242] rounded-xl">
                <FaUserCheck className="text-lg" />
              </span>
              <div className="px-2 py-0.5 bg-[#006242]/10 text-[#006242] rounded-full font-bold text-[10px] flex items-center">
                <span className="w-1.5 h-1.5 bg-[#006242] rounded-full mr-1.5"></span>
                Success
              </div>
            </div>
            <p className="text-xs font-semibold text-[#434655] mb-1">Attendance Rate</p>
            <h3 className="text-3xl font-black text-[#0d1c2f]">94.2%</h3>
          </div>
        </div>

        {/* Card 3: Course Completion */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#c3c6d7]/30 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="p-2.5 bg-[#505f76]/10 text-[#505f76] rounded-xl">
                <FaCheckCircle className="text-lg" />
              </span>
              <FaInfoCircle className="text-[#c3c6d7]" />
            </div>
            <p className="text-xs font-semibold text-[#434655] mb-1">Course Completion</p>
            <h3 className="text-3xl font-black text-[#0d1c2f] mb-3">89.6%</h3>
            <div className="w-full bg-[#e6eeff] h-2 rounded-full overflow-hidden">
              <div className="bg-[#004ac6] h-full rounded-full" style={{ width: "89.6%" }}></div>
            </div>
          </div>
        </div>

        {/* Card 4: Drop Rate */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#c3c6d7]/30 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="p-2.5 bg-[#ba1a1a]/10 text-[#ba1a1a] rounded-xl">
                <FaUserMinus className="text-lg" />
              </span>
              <div className="px-2 py-0.5 bg-[#c3c6d7]/30 text-[#434655] rounded-full font-bold text-[10px]">
                Stable
              </div>
            </div>
            <p className="text-xs font-semibold text-[#434655] mb-1">Drop Rate</p>
            <h3 className="text-3xl font-black text-[#0d1c2f]">0.8%</h3>
          </div>
        </div>
      </div>

      {/* 3. Filter Utility Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select 
              value={reportFilter}
              onChange={(e) => setReportFilter(e.target.value)}
              className="appearance-none bg-[#eff4ff] border border-[#c3c6d7] rounded-xl pl-4 pr-10 py-2.5 font-bold text-xs text-[#434655] focus:ring-2 focus:ring-[#004ac6] outline-none cursor-pointer transition-all"
            >
              <option value="All Types">Report Type: All Components</option>
              <option value="Academic">Academic Performance</option>
              <option value="Attendance">Attendance Summary</option>
              <option value="Admissions">Admissions &amp; Planning</option>
              <option value="Finance">Financial Audit</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#434655] text-[10px]" />
          </div>

          <div className="relative">
            <select 
              value={termFilter}
              onChange={(e) => setTermFilter(e.target.value)}
              className="appearance-none bg-[#eff4ff] border border-[#c3c6d7] rounded-xl pl-4 pr-10 py-2.5 font-bold text-xs text-[#434655] focus:ring-2 focus:ring-[#004ac6] outline-none cursor-pointer transition-all"
            >
              <option>Academic Term: Summer 2026</option>
              <option>Academic Term: Spring 2026</option>
              <option>Academic Term: Winter 2025</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#434655] text-[10px]" />
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#004ac6] text-white rounded-xl font-bold text-xs hover:bg-[#2563eb] shadow-sm active:scale-95 transition-all">
          <FaFileExport className="text-sm" />
          <span>Export Data (.CSV / .PDF)</span>
        </button>
      </div>

      {/* 4. Primary Metrics Analytics Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d7]/30 overflow-hidden">
        <div className="p-5 border-b border-[#c3c6d7]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h4 className="text-lg font-black text-[#0d1c2f]">Primary Metrics Analytics</h4>
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#434655] text-xs" />
            <input 
              className="w-full bg-[#eff4ff] border border-[#c3c6d7] rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-[#004ac6] outline-none transition-all" 
              placeholder="Search reports dynamically..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#eff4ff] border-b border-[#c3c6d7]/30">
              <tr className="bg-[#eff4ff] border-b border-[#c3c6d7]/30">
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Category</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Last Generated</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">File Size</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Created By</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/20">
              {filteredReports.map((report) => (
                <tr 
                  key={report.id} 
                  className="hover:bg-[#f8f9ff] transition-colors cursor-pointer group"
                  onClick={() => handleRowClick(report)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      {getReportIcon(report.category)}
                      <span className="text-xs font-bold text-[#0d1c2f] group-hover:text-[#004ac6] transition-colors">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-[#434655] font-semibold">{report.category}</td>
                  <td className="px-6 py-4 text-xs text-[#434655]">{report.lastGenerated}</td>
                  <td className="px-6 py-4 text-xs text-[#434655] font-medium">{report.fileSize}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black ${report.avatarBg}`}>
                        {report.initials}
                      </div>
                      <span className="text-xs font-semibold text-[#0d1c2f]">{report.createdBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {report.status === "Complete" && (
                      <span className="px-2.5 py-0.5 bg-[#006242]/10 text-[#006242] rounded-full font-bold text-[10px]">
                        Complete
                      </span>
                    )}
                    {report.status === "Generating" && (
                      <span className="px-2.5 py-0.5 bg-[#004ac6]/10 text-[#004ac6] rounded-full font-bold text-[10px] flex items-center w-fit">
                        <FaSync className="animate-spin mr-1 text-[9px]" />
                        Generating
                      </span>
                    )}
                    {report.status === "Failed" && (
                      <span className="px-2.5 py-0.5 bg-[#ba1a1a]/10 text-[#ba1a1a] rounded-full font-bold text-[10px]">
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button className="text-[#434655] hover:text-[#004ac6] transition-colors">
                      <FaEllipsisV className="text-xs" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Strip */}
        <div className="px-6 py-4 bg-[#eff4ff] border-t border-[#c3c6d7]/30 flex items-center justify-between">
          <p className="text-xs font-semibold text-[#434655]">Showing 1 to {filteredReports.length} of 24 reports</p>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-[#c3c6d7]/30 rounded-lg disabled:opacity-40 transition-colors" disabled>
              <FaChevronLeft className="text-xs text-[#434655]" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center bg-[#004ac6] text-white rounded-lg font-bold text-xs">1</button>
            <button className="w-7 h-7 flex items-center justify-center hover:bg-[#c3c6d7]/30 rounded-lg font-bold text-xs text-[#434655]">2</button>
            <button className="w-7 h-7 flex items-center justify-center hover:bg-[#c3c6d7]/30 rounded-lg font-bold text-xs text-[#434655]">3</button>
            <button className="p-2 hover:bg-[#c3c6d7]/30 rounded-lg transition-colors">
              <FaChevronRight className="text-xs text-[#434655]" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Right Drawer Detail Flyout Panel */}
      <div 
        className={`fixed right-0 top-0 h-screen bg-white border-l border-[#c3c6d7] shadow-2xl z-[60] transition-all duration-300 ease-in-out overflow-hidden ${
          isDrawerOpen ? "w-[400px]" : "w-0"
        }`}
      >
        {isDrawerOpen && selectedReport && (
          <div className="w-[400px] p-6 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-[#0d1c2f]">Report Insights</h3>
                <button 
                  className="p-2 hover:bg-[#eff4ff] rounded-full text-[#434655] transition-colors" 
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-[#eff4ff] p-4 rounded-xl">
                  <p className="text-xs font-bold text-[#434655] mb-2">{selectedReport.name}</p>
                  <div className="h-24 flex items-end gap-2 pb-1 border-b border-[#c3c6d7]">
                    <div className="bg-[#004ac6] flex-1 h-[40%] rounded-t"></div>
                    <div className="bg-[#004ac6] flex-1 h-[65%] rounded-t"></div>
                    <div className="bg-[#004ac6] flex-1 h-[90%] rounded-t"></div>
                    <div className="bg-[#004ac6] flex-1 h-[55%] rounded-t"></div>
                    <div className="bg-[#004ac6] flex-1 h-[30%] rounded-t"></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-[#434655] uppercase tracking-wider mb-3">Key Findings</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5 text-xs text-[#0d1c2f]">
                      <FaCheckCircle className="text-[#006242] mt-0.5 flex-shrink-0" />
                      <span>Performance metric maps consistent growth path (+0.15 index bump).</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-[#0d1c2f]">
                      <FaExclamationTriangle className="text-[#ba1a1a] mt-0.5 flex-shrink-0" />
                      <span>Audit logging recommends proactive monitoring for missing telemetry indicators.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#c3c6d7]">
              <button className="w-full py-3 bg-[#004ac6] text-white rounded-xl font-bold text-xs hover:bg-[#2563eb] shadow-md transition-all">
                Generate Advanced Insights
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}