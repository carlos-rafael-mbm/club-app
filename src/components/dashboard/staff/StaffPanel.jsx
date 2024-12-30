import { useState } from "react";
import ClientTable from "./ClientTable";
import AccessLogTable from "./AccessLogTable";
import {
  ContentContainer,
  PanelContainer,
  TabButton,
  TabsContainer,
  Title,
} from "./StaffPanel.styles";

const StaffPanel = () => {
  const [activeTab, setActiveTab] = useState("clients");

  return (
    <PanelContainer>
      <Title>Control de acceso al club</Title>
      <TabsContainer>
        <TabButton
          isActive={activeTab === "clients"}
          onClick={() => setActiveTab("clients")}
        >
          Clientes
        </TabButton>
        <TabButton
          isActive={activeTab === "accessLogs"}
          onClick={() => setActiveTab("accessLogs")}
        >
          Accesos
        </TabButton>
      </TabsContainer>
      <ContentContainer>
        {activeTab === "clients" && <ClientTable />}
        {activeTab === "accessLogs" && <AccessLogTable />}
      </ContentContainer>
    </PanelContainer>
  );
};

export default StaffPanel;
