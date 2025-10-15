
import React from "react";
import Header from "../DashboardComponents/DashboardHeader";
import Sidebar from "../DashboardComponents/DashboardSidebar";
import DashboardWrapper from "./dashboardWrapper";
import Messages from "../DashboardComponents/Message";
const Layout = React.memo(function Layout({ children }) {
    const category = children?.props?.category
    console.log('category' , category)
  return (
      <DashboardWrapper>

    
      <div className=" flex h-screen bg-gray-50">
        
        <Sidebar />
        {category=="messages" ? 
      <Messages></Messages>:null  
      }
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
      </DashboardWrapper>
    );
  });

  export default Layout;