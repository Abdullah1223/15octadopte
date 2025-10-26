
import React from "react";
// import Header from "../DashboardComponents/DashboardHeader";
// import Sidebar from "../DashboardComponents/DashboardSidebar";
// import DashboardWrapper from "./dashboardWrapper";
import Sidebar from "../../DashboardComponents/DashboardSidebar";
import Messages from "../../DashboardComponents/Message";
import DashboardWrapper from "../dashboardWrapper";
import Header from "../../DashboardComponents/DashboardHeader";
const Layout = React.memo(function Layout({ children }) {
   
  return (
      <DashboardWrapper>

    
      <div className=" flex h-screen w-full bg-gray-50">
        
        {/* <Sidebar /> */}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex flex-col md:flex-row overflow-y-auto">
          <Messages></Messages> 
            {children}
          </main>
        
        </div>
        
      </div>
      </DashboardWrapper>
    );
  });

  export default Layout;