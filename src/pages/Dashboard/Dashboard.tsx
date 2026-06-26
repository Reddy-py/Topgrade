import { useState, useEffect } from "react";
// ... keep your existing react-icons imports here ...

export default function Dashboard() {
  // New state to hold live backend information
  const [backendData, setBackendData] = useState<any>(null);

  useEffect(() => {
    // Request metadata from our local Node server
    fetch("http://localhost:5000/api/crm-info")
      .then((res) => res.json())
      .then((data) => setBackendData(data))
      .catch((err) => console.error("Error connecting to Render backend:", err));
  }, []);

  // ... keep your existing metrics, performanceData, and activities arrays here ...

  return (
    <div className="space-y-6 p-1">
      {/* View Header */}
      <div>
        <h1 className="text-2xl font-black text-[#0d1c2f]">
          {backendData ? backendData.systemName : "Institutional Overview"}
        </h1>
        <p className="text-xs font-semibold text-[#434655]">
          System Status: <span className="text-emerald-600 font-black">{backendData ? backendData.status : "Connecting..."}</span> | Core DB: {backendData ? backendData.database : "Pending"}
        </p>
      </div>

      {/* ... keep the rest of your dashboard JSX cards, charts, and layout elements down here ... */}
    </div>
  );
}