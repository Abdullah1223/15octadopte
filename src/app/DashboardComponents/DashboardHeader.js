import { MessageSquare, Bell } from "lucide-react";
import Navbar from "../Components/Navbar";


export default function Header() {
    return (
      <div>
        <div className="md:hidden">
      <Navbar ></Navbar>
      </div>
      <header className="h-16 border-b border-gray-200 bg-white hidden md:flex items-center justify-between px-6">
       
        <h2 className="text-2xl font-bold">Messages</h2>
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-gray-100 mr-2">
            <MessageSquare size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 mr-4">
            <Bell size={20} />
          </button>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 mr-2"></div>
            <span className="font-medium">Jhon Doe</span>
          </div>
        </div>
      </header>
      </div>
    );
  };