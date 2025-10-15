'use client';
import { MessageSquare, Bell } from "lucide-react";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useTranslation } from "../Context/TranslationContext.";
import { useState } from "react";
import Link from "next/link";
import useAuth from "../Hooks/useAuth";

export default function Header() {
  const selector = useSelector((state) => state.user);
  const params = useParams();
  const category = params.category;
  const { translate, setLanguage, language } = useTranslation();
  const [isDropDown,setIsDropDown]=useState(false)
  console.log(selector);
 const {logOut} = useAuth()
  // Skeleton component for reusability
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );

  return (
    <div>
      <div className="md:hidden">
        <Navbar></Navbar>
      </div>
      <header
      onClick={()=>{setIsDropDown(!isDropDown)}}
      className="h-16  border-b border-gray-200 bg-white hidden md:flex items-center justify-between px-6">
        <h2 className="text-2xl font-bold">{category}</h2>
        
        {selector?.name ? (
          // User is logged in - show user info
          <div className="flex  items-center">
            {/* <button className="p-2 rounded-full hover:bg-gray-100 mr-2">
              <MessageSquare size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 mr-4">
              <Bell size={20} />
            </button> */}
            
            <div className="flex relative items-center gap-4">
              <span className="font-medium">{selector?.name}</span>
              <div className="h-10 w-10 rounded-full bg-gray-200 mr-2">
                <img
                  src={selector?.profilePicture}
                  alt="Profile"
                  className="h-10 w-10 rounded-full ring-2 ring-orange-500"
                />
              </div>
              {
          isDropDown && 
          <div className="hidden  md:block absolute top-12 z-10 right-0  bg-black   w-48">
            <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1  z-20">
                <Link
                  href="/Dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </Link>
                <Link
                  href="/profile/setting"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                   onClick={()=>{logOut(false)}}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
        </div>
      
        } 
            </div>
          </div>
        ) : selector.name !== null ? (
          // User is not logged in - show login button
          <button className="border font-medium bg-orange-500 text-white rounded-lg w-40 h-10">
            {translate('login')}
          </button>
        ) : (
          // Loading state - show skeleton
          <div className="flex items-center">
            {/* Skeleton for message and notification buttons */}
            <div className="flex items-center mr-4">
              <Skeleton className="h-9 w-9 rounded-full mr-2" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
            {/* Skeleton for user info */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-24" /> {/* Name skeleton */}
              <Skeleton className="h-10 w-10 rounded-full mr-2" /> {/* Profile pic skeleton */}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}