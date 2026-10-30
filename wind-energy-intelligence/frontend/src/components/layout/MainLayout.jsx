import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({ children, onRefresh, loading }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />
      <main className="lg:ml-64">
        <Header onRefresh={onRefresh} loading={loading} />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
