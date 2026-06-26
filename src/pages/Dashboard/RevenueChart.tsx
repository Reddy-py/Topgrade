export default function RevenueChart() {
  const chartData = [
    { month: "May", height: "h-[60%]" },
    { month: "Jun", height: "h-[45%]" },
    { month: "Jul", height: "h-[80%]" },
    { month: "Aug", height: "h-[65%]" },
    { month: "Sep", height: "h-[90%]" },
    { month: "Oct", height: "h-[75%]" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#c3c6d7]/30 p-6 overflow-hidden relative">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-base font-black text-[#0d1c2f]">Revenue Analytics</h4>
          <p className="text-xs font-medium text-[#434655]/70 mt-0.5">Fee collections and miscellaneous revenue trend</p>
        </div>
        <div>
          <select className="bg-[#eff4ff]/60 border border-[#c3c6d7]/20 rounded-xl text-xs font-bold py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#004ac6]/20 text-[#0d1c2f] cursor-pointer">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      {/* Pure Tailwind Bar Chart Canvas */}
      <div className="h-48 w-full relative mt-8">
        <div className="absolute inset-0 flex items-end justify-between px-4 pb-6 border-b border-l border-[#c3c6d7]/20">
          
          {/* Dynamic Bars mapping */}
          {chartData.map((data, idx) => (
            <div 
              key={idx} 
              className={`w-10 bg-[#004ac6]/10 rounded-t-md relative group transition-all duration-300 hover:bg-[#004ac6]/20 cursor-pointer ${data.height}`}
            >
              {/* Highlight Top Indicator Border */}
              <div className="absolute -top-0.5 left-0 right-0 border-t-2 border-[#004ac6] rounded-t-full"></div>
              
              {/* Simple hover tooltip simulation */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0d1c2f] text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
                View Data
              </div>
            </div>
          ))}

        </div>

        {/* X-Axis Month Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-[10px] text-[#505f76] font-bold tracking-wider">
          {chartData.map((data, idx) => (
            <span key={idx} className="w-10 text-center">{data.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}