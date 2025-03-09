import Link from 'next/link';
import { Briefcase, FileText, Bookmark, MessageSquare, Bell, User, LogOut, LayoutDashboard } from 'lucide-react';

export default function Sidebar(){
  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/Dashboard' },
    { title: 'Jobs For You', icon: <Briefcase size={20} />, path: '/Dashboard/jobs' },
    { title: 'My Cv', icon: <FileText size={20} />, path: '/Dashboard/cv' },
    { title: 'Favorite Jobs', icon: <Bookmark size={20} />, path: '/Dashboard/favorites' },
    { title: 'Messages', icon: <MessageSquare size={20} />, path: '/Dashboard/messages' },
    { title: 'Notifications', icon: <Bell size={20} />, path: '/Dashboard/notifications' },
    { title: 'My Profile', icon: <User size={20} />, path: '/Dashboard/profile' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <LayoutDashboard size={24} className="text-gray-800" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-xs text-gray-500">Candidate Manager System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.path}
            className="flex items-center p-3 rounded-lg hover:bg-orange-100 text-gray-700 hover:text-orange-500 transition-colors"
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link 
          href="/logout" 
          className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

