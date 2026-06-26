import { FaCheck, FaUser, FaEnvelope, FaExclamationTriangle } from "react-icons/fa";

const activities = [
  { text: <>Invoice <span className="font-bold">#INV-9022</span> paid by Jane Doe.</>, time: "2 minutes ago", icon: <FaCheck />, bg: "bg-blue-100 text-[#004ac6]" },
  { text: <>New student <span className="font-bold">Leo Martinez</span> registered for Arts.</>, time: "45 minutes ago", icon: <FaUser />, bg: "bg-purple-100 text-purple-700" },
  { text: <>Bulk email sent to <span className="font-bold">Year 10 Parents</span>.</>, time: "2 hours ago", icon: <FaEnvelope />, bg: "bg-emerald-100 text-[#006242]" },
  { text: <>Low attendance alert for <span className="font-bold">Section B</span>.</>, time: "Yesterday", icon: <FaExclamationTriangle />, bg: "bg-red-100 text-[#ba1a1a]" },
];

export default function RecentActivities() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d7]/30 p-6">
      <h4 className="text-base font-black text-[#0d1c2f] mb-4">Recent Activities</h4>
      <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#c3c6d7]/20">
        {activities.map((act, idx) => (
          <div key={idx} className="relative flex gap-4">
            <div className={`w-6 h-6 rounded-full ${act.bg} flex items-center justify-center text-[10px] z-10 shadow-sm`}>
              {act.icon}
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#0d1c2f] leading-relaxed">{act.text}</p>
              <p className="text-[10px] text-[#434655]/60 mt-0.5">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}