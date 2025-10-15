'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Eye, User, Heart, DollarSign, Clock, FileText } from 'lucide-react';
import { useSelector } from 'react-redux';
import CvCard from './CvCard';
import useCv from '../Hooks/useCv';
import { UserCvInterface } from '../interfaces/CvInterfaces';

export default function FavoriteCv () {
  const [cursor, setCursor] = useState<string | null>(null);
  const [cvData, setCvData] = useState<UserCvInterface[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [savedCvCount, setSavedCvCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevDocs,setPrevDocs] = useState<string[]>([])
  // const selector = useSelector((state)=>state.user)
  const loadRef = useRef(false)
  const {fetchSavedCv}=useCv()
  const makingReq = async (cursor) => {
    fetchSavedCv({cursor,prevDocs,setLoading,loading,loadRef,setCvData,setCursor,setHasMore,setSavedCvCount,setPrevDocs})
   
  };

  useEffect(() => {
    if(cvData.length==0 && loadRef.current==false ){
      console.log(loadRef)
      console.log(cvData)
      console.log(cvData.length)
      makingReq(cursor);
    }
   return () =>{
    console.log('exited')
    setCvData([])
   }
  }, []);


  const loadMore = () => {
    if (hasMore && !loading) {
      makingReq(cursor);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Favorite CVs
          </h1>
          <p className="text-gray-600 text-lg">
            Your curated collection of preferred candidates
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-orange-600 fill-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{savedCvCount}</h2>
                <p className="text-gray-600">Favorite Candidates</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-semibold text-orange-600">Today</p>
            </div>
          </div>
        </div>

        {/* CV Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cvData?.map((cv, index) => (
            <CvCard key={cv?._id || cv?._id || index} cv={cv} setCvData={setCvData} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && cvData.length > 0 && (
          <div className="text-center mt-8">
            <button 
              onClick= {loadMore}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && cvData.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Heart className="w-12 h-12 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Loading Favorite CVs...
            </h3>
            <p className="text-gray-600">
              Please wait while we fetch your saved candidates.
            </p>
          </div>
        )}

        {/* Empty State (when no favorites) */}
        {!loading && cvData.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Favorite CVs Yet
            </h3>
            <p className="text-gray-600 mb-6">
             { "Start building your collection by favoriting candidates you're interested in."}
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Browse Candidates
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

