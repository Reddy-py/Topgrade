import { FaUserPlus, FaReceipt, FaUserCheck, FaArrowRight } from "react-icons/fa";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d7]/30 p-6">
      <h4 className="text-base font-black text-[#0d1c2f] mb-4">Quick Actions</h4>
      <div className="flex flex-col gap-3">
        <button className="w-full flex items-center justify-between p-4 bg-[#004ac6] text-white rounded-xl hover:bg-[#004ac6]/90 transition-all active:scale-[0.98] group">
          <div className="flex items-center gap-3">
            <FaUserPlus />
            <span className="text-sm font-bold">Add Student</span>
          </div>
          <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-[#dde9ff] text-[#004ac6] rounded-xl hover:bg-[#d5e3fd] transition-all active:scale-[0.98] group">
          <div className="flex items-center gap-3">
            <FaReceipt />
            <span className="text-sm font-bold">Issue Invoice</span>
          </div>
          <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-[#dde9ff] text-[#004ac6] rounded-xl hover:bg-[#d5e3fd] transition-all active:scale-[0.98] group">
          <div className="flex items-center gap-3">
            <FaUserCheck />
            <span className="text-sm font-bold">Record Attendance</span>
          </div>
          <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}