'use client';
import { Search } from "lucide-react";
import { useState } from "react";
import { Configure, useSearchBox } from "react-instantsearch";
import { useSelector } from "react-redux";

const AdsManagementJobTabCustomSearchBar = ()=>{
   const {query,refine}=useSearchBox()
   const selection = useSelector((state)=>state.user)

   return (
    <>
    <Configure filters={`isPromoted:false AND createdBy:${selection.userId}`} ></Configure>
    <div className="relative mb-4">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <input
      type="text"
      value={query}
      onChange={(e) => {
        const val = e.target.value;
        
        refine(val); // <-- trigger search in Algolia
      }}
      placeholder="Search jobs..."
      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
  </>
)

}

export default AdsManagementJobTabCustomSearchBar;