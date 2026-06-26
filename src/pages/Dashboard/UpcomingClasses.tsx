import { FaChevronRight } from "react-icons/fa";

const classesData = [
  { id: "M1", name: "Advanced Mathematics II", teacher: "Dr. Emily Watson", time: "09:00 AM", room: "Lab 302", status: "On Track", statusColor: "bg-[#4edea3]/20 text-[#007d55]" },
  { id: "P1", name: "Quantum Physics Basics", teacher: "Prof. Alan Turing", time: "10:30 AM", room: "Hall A", status: "Starting Soon", statusColor: "bg-[#d0e1fb]/50 text-[#0b1c30]" },
  { id: "C4", name: "Organic Chemistry", teacher: "Ms. Sarah Miller", time: "12:00 PM", room: "Room 105", status: "Postponed", statusColor: "bg-red-100 text-[#ba1a1a]" },
  { id: "L2", name: "English Literature", teacher: "Mr. Robert Frost", time: "02:00 PM", room: "Library Annex", status: "On Track", statusColor: "bg-[#4edea3]/20 text-[#007d55]" },
];

export default function UpcomingClasses() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d7]/30 overflow-hidden">
      {/* Header Panel */}
      <div className="p-6 flex justify-between items-center border-b border-[#c3c6d7]/20">
        <h4 className="text-base font-black text-[#0d1c2f]">Upcoming Classes</h4>
        <button className="text-[#004ac6] text-xs font-bold hover:underline flex items-center gap-1">
          View Full Schedule <FaChevronRight className="text-[10px]" />
        </button>
      </div>

      {/* Overflow Scroll Container for Responsive Mobile Views */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#eff4ff]/50 border-b border-[#c3c6d7]/20">
              <th className="px-6 py-3 text-[10px] font-bold text-[#505f76] uppercase tracking-wider">Class Name</th>
              <th className="px-6 py-3 text-[10px] font-bold text-[#505f76] uppercase tracking-wider">Teacher</th>
              <th className="px-6 py-3 text-[10px] font-bold text-[#505f76] uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-[10px] font-bold text-[#505f76] uppercase tracking-wider">Room</th>
              <th className="px-6 py-3 text-[10px] font-bold text-[#505f76] uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c3c6d7]/20">
            {classesData.map((cls, idx) => (
              <tr key={idx} className="hover:bg-[#f8f9ff] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#004ac6]/10 flex items-center justify-center text-[#004ac6] text-xs font-black">
                      {cls.id}
                    </div>
                    <span className="text-xs font-semibold text-[#0d1c2f]">{cls.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-medium text-[#434655]">{cls.teacher}</td>
                <td className="px-6 py-4 text-xs font-medium text-[#434655]">{cls.time}</td>
                <td className="px-6 py-4 text-xs font-medium text-[#434655]">{cls.room}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${cls.statusColor}`}>
                    {cls.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}