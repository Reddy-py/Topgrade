import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaClipboardCheck, FaArrowUp } from "react-icons/fa";
const cardData = [
  { title: "Students", value: "2,450", subtext: "this month", badge: "+5%", icon: <FaUserGraduate />, bgIcon: "bg-blue-500/10", textIcon: "text-[#004ac6]" },
  { title: "Teachers", value: "128", subtext: "Faculty count", badge: "Active", icon: <FaChalkboardTeacher />, bgIcon: "bg-slate-500/10", textIcon: "text-[#505f76]" },
  { title: "Revenue", value: "$45,200", subtext: "Last 30 days", badge: "Monthly", icon: <FaMoneyBillWave />, bgIcon: "bg-emerald-500/10", textIcon: "text-[#006242]" },
  { title: "Attendance", value: "94.2%", subtext: "Average across classes", badge: "Today", icon: <FaClipboardCheck />, bgIcon: "bg-rose-500/10", textIcon: "text-[#ba1a1a]" },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, idx) => (
        <div key={idx} className="bg-white p-6 rounded-[24px] shadow-sm border border-[#c3c6d7]/30 hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-xl ${card.bgIcon} flex items-center justify-center ${card.textIcon} text-lg`}>
              {card.icon}
            </div>
            <span className="flex items-center gap-1 px-2 py-1 bg-[#4edea3]/10 text-[#007d55] rounded-full text-[10px] font-bold">
              {card.title === "Students" && <FaArrowUp className="text-[12px]" />}
              {card.badge}
            </span>
          </div>
          <p className="text-sm font-medium text-[#505f76]">{card.title}</p>
          <h3 className="text-2xl font-extrabold text-[#0d1c2f] mt-1">{card.value}</h3>
          <p className="text-[11px] text-[#434655]/70 mt-2 font-medium">{card.subtext}</p>
        </div>
      ))}
    </div>
  );
}