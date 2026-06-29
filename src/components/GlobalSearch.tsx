import { useState, useEffect, useRef } from "react";
import { FaSearch, FaUser, FaUsers, FaFileInvoice, FaSpinner } from "react-icons/fa";

interface SearchResults {
  students: any[];
  parents: any[];
  invoices: any[];
}

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const BACKEND_URL = "https://topgrade-backend.onrender.com";

  // Close dropdown if clicked outside component boundaries
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Trigger search requests when query string shifts
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults(null);
      setIsLoading(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/search/global?query=${encodeURIComponent(query)}`);
        const json = await response.json();
        if (json.success) {
          setResults(json.data);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Global search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 400); // 400ms debounce buffer to limit excessive server thrashing

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div ref={dropdownRef} className="relative w-full max-w-md z-50">
      {/* Search Input Box */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737686] text-xs" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search students, parents, invoices..."
          className="w-full pl-10 pr-10 py-2 bg-[#eff4ff] border border-[#c3c6d7]/40 rounded-xl text-xs font-medium text-[#0d1c2f] placeholder-[#737686]/60 focus:outline-none focus:border-[#004ac6] focus:bg-white transition-all"
        />
        {isLoading && (
          <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 text-[#004ac6] text-xs animate-spin" />
        )}
      </div>

      {/* Structured Dropdown Overlay */}
      {isOpen && results && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-[#c3c6d7]/30 max-h-[400px] overflow-y-auto p-4 space-y-4">
          
          {/* Segment: Students Row Results */}
          {results.students.length > 0 && (
            <div>
              <h4 className="text-[10px] font-black text-[#434655] uppercase tracking-wider flex items-center gap-1.5 mb-1.5 pb-1 border-b border-[#c3c6d7]/10">
                <FaUser className="text-[#004ac6]" /> Students
              </h4>
              <ul className="space-y-1">
                {results.students.map((s) => (
                  <li key={s.id} className="p-2 hover:bg-[#f8f9ff] rounded-lg cursor-pointer transition-colors flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0d1c2f]">{s.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[#eff4ff] text-[#434655] rounded-md font-bold">{s.student_id_code}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Segment: Parents Row Results */}
          {results.parents.length > 0 && (
            <div>
              <h4 className="text-[10px] font-black text-[#434655] uppercase tracking-wider flex items-center gap-1.5 mb-1.5 pb-1 border-b border-[#c3c6d7]/10">
                <FaUsers className="text-emerald-600" /> Parents
              </h4>
              <ul className="space-y-1">
                {results.parents.map((p) => (
                  <li key={p.id} className="p-2 hover:bg-[#f8f9ff] rounded-lg cursor-pointer transition-colors">
                    <p className="text-xs font-bold text-[#0d1c2f]">{p.father_name || p.mother_name || p.guardian_name}</p>
                    <p className="text-[10px] text-[#434655]/70">{p.phone} • {p.email || "No Email"}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Segment: Invoices Row Results */}
          {results.invoices.length > 0 && (
            <div>
              <h4 className="text-[10px] font-black text-[#434655] uppercase tracking-wider flex items-center gap-1.5 mb-1.5 pb-1 border-b border-[#c3c6d7]/10">
                <FaFileInvoice className="text-amber-600" /> Invoices
              </h4>
              <ul className="space-y-1">
                {results.invoices.map((i) => (
                  <li key={i.id} className="p-2 hover:bg-[#f8f9ff] rounded-lg cursor-pointer transition-colors flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0d1c2f]">{i.invoice_number}</p>
                      <p className="text-[10px] text-[#434655]/70">Student: {i.student_id?.name || "N/A"}</p>
                    </div>
                    <span className="text-xs font-black text-[#0d1c2f]">${i.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fallback Empty Panel Display */}
          {results.students.length === 0 && results.parents.length === 0 && results.invoices.length === 0 && (
            <div className="text-center py-4 text-xs font-bold text-[#434655]">
              No system entities match "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}