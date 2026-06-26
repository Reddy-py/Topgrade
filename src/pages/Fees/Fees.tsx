import { useState } from "react";
import { 
  FaWallet, 
  FaHourglassHalf, 
  FaExclamationTriangle, 
  FaSearch, 
  FaChevronDown, 
  FaPlusCircle, 
  FaEllipsisV,
  FaArrowUp,
  FaPiggyBank,

} from "react-icons/fa";
  

interface Invoice {
  id: string;
  studentName: string;
  initials: string;
  feeType: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

const initialInvoices: Invoice[] = [
  { id: "#INV-2026-001", studentName: "Jane Doe", initials: "JD", feeType: "Tuition", amount: 2500.00, dueDate: "Oct 12, 2026", status: "paid" },
  { id: "#INV-2026-042", studentName: "Marcus Smith", initials: "MS", feeType: "Lab", amount: 450.00, dueDate: "Sep 30, 2026", status: "overdue" },
  { id: "#INV-2026-088", studentName: "Alice Lu", initials: "AL", feeType: "Sports", amount: 125.00, dueDate: "Oct 25, 2026", status: "pending" },
  { id: "#INV-2026-112", studentName: "Robert Park", initials: "RP", feeType: "Tuition", amount: 2500.00, dueDate: "Oct 15, 2026", status: "paid" },
  { id: "#INV-2026-156", studentName: "Elena White", initials: "EW", feeType: "Lab", amount: 300.00, dueDate: "Sep 28, 2026", status: "overdue" }
];

export default function Fees() {
  const [invoices] = useState<Invoice[]>(initialInvoices);
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState("All Payment Methods");

  const filteredInvoices = invoices.filter(invoice => 
    invoice.studentName.toLowerCase().includes(search.toLowerCase()) ||
    invoice.id.toLowerCase().includes(search.toLowerCase()) ||
    invoice.feeType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-1 space-y-6 max-w-[1440px] w-full mx-auto">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#0d1c2f] tracking-tight">Fees &amp; Billing</h2>
          <p className="text-sm font-medium text-[#434655]">Manage student accounts, track payments, and generate financial reports.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#e6eeff] px-4 py-1.5 rounded-full border border-[#d5e3fd]">
          <span className="w-2 h-2 bg-[#004ac6] rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-[#38485d]">Fiscal Year: 2026</span>
        </div>
      </div>

      {/* 2. Financial Stats Bar (Bento Inspired) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Collected */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-[#c3c6d7]/30 border-l-4 border-[#006242] flex items-center justify-between hover:-translate-y-1 transition-all cursor-default">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Total Collected Balance</p>
            <h3 className="text-3xl font-black text-[#006242]">$342,800.00</h3>
            <div className="flex items-center gap-1 text-[#007d55] font-bold text-xs">
              <FaArrowUp className="text-xs" />
              <span>Received (FY 2026)</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#6ffbbe] flex items-center justify-center text-[#006242] text-xl">
            <FaWallet />
          </div>
        </div>

        {/* Card 2: Outstanding */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-[#c3c6d7]/30 border-l-4 border-[#004ac6] flex items-center justify-between hover:-translate-y-1 transition-all cursor-default">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Outstanding Invoices</p>
            <h3 className="text-3xl font-black text-[#004ac6]">$12,450.00</h3>
            <div className="flex items-center gap-1 text-[#434655] font-bold text-xs">
              <FaHourglassHalf className="text-xs text-[#004ac6]" />
              <span>Pending Processing</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#d0e1fb] flex items-center justify-center text-[#004ac6] text-xl">
            <FaHourglassHalf />
          </div>
        </div>

        {/* Card 3: Overdue */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-[#c3c6d7]/30 border-l-4 border-[#ba1a1a] flex items-center justify-between hover:-translate-y-1 transition-all cursor-default">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Overdue Accounts</p>
            <h3 className="text-3xl font-black text-[#ba1a1a]">4</h3>
            <div className="flex items-center gap-1 text-[#ba1a1a] font-bold text-xs">
              <FaExclamationTriangle className="text-xs" />
              <span>Action Required</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] text-xl">
            <FaExclamationTriangle />
          </div>
        </div>
      </div>

      {/* 3. Utility Search Strip Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-[#c3c6d7]/30">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737686]" />
            <input 
              className="w-full md:w-[400px] bg-[#f8f9ff] border border-[#c3c6d7] rounded-xl pl-11 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#004ac6]/20 focus:outline-none transition-all" 
              placeholder="Search invoices, student name, or ID..." 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <select 
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="w-full md:w-56 appearance-none bg-[#f8f9ff] border border-[#c3c6d7] rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-[#434655] focus:ring-2 focus:ring-[#004ac6]/20 focus:outline-none cursor-pointer"
            >
              <option>All Payment Methods</option>
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>Cash / Check</option>
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737686] text-xs pointer-events-none" />
          </div>
        </div>
        <button className="w-full md:w-auto bg-[#2563eb] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#004ac6] transition-all shadow-md active:scale-95">
          <FaPlusCircle />
          <span>Collect Fee / Create Invoice</span>
        </button>
      </div>

      {/* 4. Ledger Table Panel */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#c3c6d7]/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eff4ff] border-b border-[#c3c6d7]/30">
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Fee Type</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-[11px] font-bold text-[#434655] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/20">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-[#f8f9ff] transition-colors group">
                  <td className="px-6 py-4.5 text-sm font-bold text-[#004ac6]">{invoice.id}</td>
                  <td className="px-6 py-4.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#e6eeff] flex items-center justify-center text-[#004ac6] font-black text-xs">
                        {invoice.initials}
                      </div>
                      <span className="text-sm font-semibold text-[#0d1c2f]">{invoice.studentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4.5 text-sm text-[#434655]">{invoice.feeType}</td>
                  <td className="px-6 py-4.5 text-sm font-bold text-[#0d1c2f]">${invoice.amount.toFixed(2)}</td>
                  <td className={`px-6 py-4.5 text-sm ${invoice.status === "overdue" ? "text-[#ba1a1a] font-semibold" : "text-[#737686]"}`}>
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4.5">
                    {invoice.status === "paid" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Paid
                      </span>
                    )}
                    {invoice.status === "overdue" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-[#ba1a1a] border border-red-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>Overdue
                      </span>
                    )}
                    {invoice.status === "pending" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4.5 text-right">
                    <button className="p-2 text-[#737686] hover:text-[#004ac6] transition-colors">
                      <FaEllipsisV className="text-xs" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-[#eff4ff] flex items-center justify-between border-t border-[#c3c6d7]/30">
          <p className="text-xs font-semibold text-[#434655]">Showing {filteredInvoices.length} of 156 invoices</p>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 border border-[#c3c6d7] rounded-xl text-xs font-bold bg-white opacity-50 cursor-not-allowed">Previous</button>
            <button className="px-4 py-1.5 bg-[#004ac6] text-white rounded-xl text-xs font-bold hover:bg-[#2563eb]">Next</button>
          </div>
        </div>
      </div>

      {/* 5. Footer Mini Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-[#c3c6d7]/30 rounded-xl flex flex-col gap-1">
          <span className="text-[9px] text-[#737686] font-bold uppercase tracking-wider">Recent Transaction</span>
          <span className="text-sm font-black text-[#006242]">+$2,500.00</span>
          <span className="text-[10px] text-[#434655]">Jane Doe • Oct 12, 10:45 AM</span>
        </div>
        <div className="p-4 bg-white border border-[#c3c6d7]/30 rounded-xl flex flex-col gap-1">
          <span className="text-[9px] text-[#737686] font-bold uppercase tracking-wider">Next Payout</span>
          <span className="text-sm font-black text-[#0d1c2f]">$14,200.00</span>
          <span className="text-[10px] text-[#434655]">Scheduled • Oct 15, 2026</span>
        </div>
        <div className="p-4 bg-white border border-[#c3c6d7]/30 rounded-xl flex flex-col gap-1">
          <span className="text-[9px] text-[#737686] font-bold uppercase tracking-wider">Pending Deposits</span>
          <span className="text-sm font-black text-amber-600">38 Items</span>
          <span className="text-[10px] text-[#434655]">Awaiting bank verification</span>
        </div>
        <div className="p-4 bg-white border-2 border-[#2563eb]/20 rounded-xl flex flex-col gap-1">
          <span className="text-[9px] text-[#2563eb] font-bold uppercase tracking-wider">Billing Health</span>
          <span className="text-sm font-black text-[#006242] flex items-center gap-1">
            <FaPiggyBank /> 96.4% Efficient
          </span>
          <span className="text-[10px] text-[#434655]">↑ 2.1% from last month</span>
        </div>
      </div>

    </div>
  );
}