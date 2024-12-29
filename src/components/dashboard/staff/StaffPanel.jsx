import { useState } from "react";
import ClientTable from "./ClientTable";
import AccessLogTable from "./AccessLogTable";

const StaffPanel = () => {
  const [activeTab, setActiveTab] = useState("clients");

  return (
    <div>
      <h2>Staff Panel</h2>
      <div>
        <button onClick={() => setActiveTab("clients")}>Clients</button>
        <button onClick={() => setActiveTab("accessLogs")}>Access Logs</button>
      </div>
      {activeTab === "clients" && <ClientTable />}
      {activeTab === "accessLogs" && <AccessLogTable />}
    </div>
  );
};

export default StaffPanel;
