"use client";
import React, { useState,  useEffect } from 'react';
import { 
  Eye, 
  PlayCircle, 
  FileText, 
  MousePointer, 
  Target,
  BarChart3,
} from 'lucide-react';
import { AdCard, MetricCard } from './AdsMetricsComponents';
import { useInView } from 'react-intersection-observer';
import { AdsMetricsApiService } from './AdsMetricsFunctions';
import LoadingSpinner from '../Components/LoadingSpinner';


const defaultAdData = {
  impressions: Array.from({length: 24}, () => 0),
  clicks: 0,
  ctr: 0
};


const AdsMetricsDashboard = ({adsData,dashboardMetrics,prevDocIdsProp,lastCursorProp,hasMoreProp}) => {
  
   const {ref,inView}=useInView()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [prevDocIds,setPrevDocIds]=useState([...prevDocIdsProp])
  const [lastCursor,setLastCursor]=useState(lastCursorProp)
  const [hasMore,setHasMore]=useState(hasMoreProp)
  const [metrics, setMetrics] = useState(dashboardMetrics);
  const [ads, setAds] = useState([...adsData]);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);
  const [isLoadingAds, setIsLoadingAds] = useState(false);
  const [isLoadingMore,setIsLoadingMore]=useState(false)
  const [error, setError] = useState(null);


  const fetchDashboardData = async () => {
    try {
      setIsLoadingMore(true)
      const adsResponse =  await AdsMetricsApiService.fetchAds(lastCursor,prevDocIds)  
       if(adsResponse.Status==200){
        console.log(adsResponse.result)
           setAds(prevAds => [...prevAds, ...adsResponse.result.adsData])
          setHasMore(adsResponse.result.hasMore)
          setLastCursor(adsResponse.result.lastCursorId)
          setPrevDocIds(prevIds => [...prevIds,...adsResponse.result.prevDocIds])
          setIsLoadingMore(false)
       }
    } catch (err) {
      setError('Failed to load dashboard data');
      setIsLoadingMore(false)
      console.error('Error loading dashboard:', err);
    } finally {
      setIsLoadingMetrics(false);
      setIsLoadingMore(false)
      setIsLoadingAds(false);
    }
  };

  const handleAdUpdate = (adId, updatedAd) => {
    setAds(prevAds => 
      prevAds.map(ad => 
        ad.id === adId ? updatedAd : ad
      )
    );
  };

  useEffect(()=>{
    if(inView && hasMore){
      fetchDashboardData()
    }
  },[inView])
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-none">
        {/* Header */}
        <div
       
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Ads Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your advertising campaigns performance</p>
          {error && (
            <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Metrics Overview */}
        <div
       
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-8"
        >
          <MetricCard
            icon={Eye}
            title="Total Ad Clicks"
            value={metrics?.totalAdClicks||0}
            color="blue"
            isLoading={isLoadingMetrics}
          />
          <MetricCard
            icon={PlayCircle}
            title="Active Campaigns"
            value={metrics?.activeCampaign||0}
            color="green"
            isLoading={isLoadingMetrics}
          />
          <MetricCard
            icon={FileText}
            title="Draft Campaigns"
            value={metrics?.draftCampaign||0}
            color="orange"
            isLoading={isLoadingMetrics}
          />
          <MetricCard
            icon={Target}
            title="Total CTR"
            value={metrics?.totalAdsCtr||0}
            subtitle="%"
            color="purple"
            isLoading={isLoadingMetrics}
          />
          <MetricCard
            icon={MousePointer}
            title="Paused Campaigns"
            value={metrics?.pausedCampaign||0}
            subtitle="%"
            color="indigo"
            isLoading={isLoadingMetrics}
          />
          <MetricCard
            icon={BarChart3}
            title="Total Impressions"
            value={metrics?.totalImpressions||0}
            color="red"
            isLoading={isLoadingMetrics}
          />
        </div>

        {/* My Ads Section */}
        <div
        
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">My Ads</h2>
          
          {isLoadingAds ? (
            <div className="space-y-6">
              {Array.from({length: 3}, (_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="flex space-x-4">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="flex space-x-4">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : ads.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FileText size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Ads Found</h3>
              <p className="text-gray-600">Create your first ad campaign to get started.</p>
              <button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200"
              >
                Create Ad Campaign
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6">
              {ads.map((ad,index) => (
               <div key={index} ref={ref} >
                 <AdCard
                  key={ad._id}
                  ad={ad}
                  selectedDate={selectedDate}
                  defaultAdData={defaultAdData}
                  onDateChange={setSelectedDate}
                  onAdUpdate={handleAdUpdate}
                />
               </div>

              ))}

            </div>

          )}
          {isLoadingMore && <div className='flex justify-center items-center mt-4 h-full w-full'>
            <LoadingSpinner size={50}></LoadingSpinner>
            </div>}
            {hasMore==false ?
            <div className='flex justify-center items-center mt-4 h-full w-full'>
                <h3 className='text-black text-xl'>There Are No Ads Left</h3>
            </div>
            :null}
        </div>
      </div>
    </div>
  );
};

export default AdsMetricsDashboard;