'use client';
import Link from 'next/link';
import { Briefcase, FileText, Bookmark, MessageSquare, Bell, User, LogOut, LayoutDashboard, VideoIcon } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext.';
import { useSelector } from 'react-redux';
import React from 'react';
import useAuth from '../Hooks/useAuth';

const Sidebar = React.memo(function Sidebar() {
      const { translate, setLanguage, language } = useTranslation();
     const selector = useSelector((state)=>state.user)
     const {logOut} = useAuth()
     let menuItems;
  
   {
    selector.role=="candidate"?
    menuItems=[
      { title: translate('dashboard'), icon: <LayoutDashboard size={20} />, path: '/Dashboard' },
    { title: translate('jobs_for_you'), icon: <Briefcase size={20} />, path: '/Dashboard/jobs' },
    { title: translate('my_cv'), icon: <FileText size={20} />, path: '/Dashboard/cv' },
    { title: translate('favorite_jobs'), icon: <Bookmark size={20} />, path: '/Dashboard/favoritesJobs' },
    { title: 'Messages', icon: <MessageSquare size={20} />, path: '/Dashboard/messages' },
    { title: 'Notifications', icon: <Bell size={20} />, path: '/Dashboard/notifications' },
    { title: translate('my_profile'), icon: <User size={20} />, path: '/Dashboard/profile' },
    ]
    :selector.role=="employer"?
    menuItems = [
      { title: translate('dashboard'), icon: <LayoutDashboard size={20} />, path: '/Dashboard' },
      // { title: translate('favorite_jobs'), icon: <Bookmark size={20} />, path: '/Dashboard/favoritesJobs' },
      { title: translate('favorite_cv'), icon: <Bookmark size={20} />, path: '/Dashboard/favoritesCv' },
      { title: "Create Jobs", icon: <Bookmark size={20} />, path: '/Dashboard/createJobs' },
      { title: "My Jobs", icon: <Bookmark size={20} />, path: '/Dashboard/jobListings' },
      { title: 'Messages', icon: <MessageSquare size={20} />, path: '/Dashboard/messages' },
      { title: 'Notifications', icon: <Bell size={20} />, path: '/Dashboard/notifications' },
      { title: translate('my_profile'), icon: <User size={20} />, path: '/Dashboard/profile' },
      {title: 'Ads Management',icon:<VideoIcon size={20}></VideoIcon>,path:"/Dashboard/ads"},
      {title: 'Ads Metrics',icon:<VideoIcon size={20}></VideoIcon>,path:"/Dashboard/adsMetrics"}
    ]
    : menuItems = [
      { title: translate('dashboard'), icon: <LayoutDashboard size={20} />, path: '/Dashboard' },
      { title: translate('favorite_jobs'), icon: <Bookmark size={20} />, path: '/Dashboard/favorites' },
      { title: 'Messages', icon: <MessageSquare size={20} />, path: '/Dashboard/messages' },
      { title: 'Notifications', icon: <Bell size={20} />, path: '/Dashboard/notifications' },
      { title: translate('my_profile'), icon: <User size={20} />, path: '/Dashboard/profile' },
    ];  
  }  
 

  return (
    <div className="w-64 h-full overflow-auto bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <LayoutDashboard size={24} className="text-gray-800" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">{translate('dashboard')}</h1>
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
        <div 
          className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
           
          <button
          onClick={()=>{logOut()}}
          className="font-medium">
            {selector.isUserLoggedIn == null ? "Login" : "Logout" }
            </button>
        </div>
      </div>
    </div>
  );
});
export default Sidebar

