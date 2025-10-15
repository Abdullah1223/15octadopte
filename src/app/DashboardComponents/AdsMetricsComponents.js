'use client';

import React, { useState,useMemo, useEffect } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  PlayCircle, 
  PauseCircle, 
  MousePointer, 
  Target,
 
  BarChart3,
  Calendar,
  CreditCard,
  ChevronDown,
  TrendingUp,
  Loader2,

} from 'lucide-react';
import { AdsMetricsApiService } from './AdsMetricsFunctions';
import LoadingSpinner from '../Components/LoadingSpinner';


const DateSelector = ({ createdAt, selectedDate, onDateChange }) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
   

  const { availableYears, availableMonths, availableDays } = useMemo(() => {
    const years = [];
    const months = [];
    const days = [];
    
    // Generate available years
    for (let year = createdDate.getFullYear(); year <= currentDate.getFullYear(); year++) {
      years.push(year);
    }
    
    const selectedYear = selectedDate ? new Date(selectedDate).getFullYear() : currentDate.getFullYear();
    
    // Generate available months for selected year
    const startMonth = selectedYear === createdDate.getFullYear() ? createdDate.getMonth() : 0;
    const endMonth = selectedYear === currentDate.getFullYear() ? currentDate.getMonth() : 11;
    
    for (let month = startMonth; month <= endMonth; month++) {
      months.push({
        value: month,
        label: new Date(selectedYear, month).toLocaleDateString('en-US', { month: 'long' })
      });
    }
    
    // Generate available days for selected year/month
    const selectedMonth = selectedDate ? new Date(selectedDate).getMonth() : currentDate.getMonth();
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    
    let startDay = 1;
    let endDay = daysInMonth;
    
    if (selectedYear === createdDate.getFullYear() && selectedMonth === createdDate.getMonth()) {
      startDay = createdDate.getDate();
    }
    
    if (selectedYear === currentDate.getFullYear() && selectedMonth === currentDate.getMonth()) {
      endDay = currentDate.getDate();
    }
    
    for (let day = startDay; day <= endDay; day++) {
      days.push(day);
    }
    
    return { availableYears: years, availableMonths: months, availableDays: days };
  }, [createdAt, selectedDate]);
  
  const handleDateChange = (type, value) => {
    const currentSelected = selectedDate ? new Date(selectedDate) : new Date();
    let newDate = new Date(currentSelected);
    
    switch (type) {
      case 'year':
        newDate.setFullYear(value);
        break;
      case 'month':
        newDate.setMonth(value);
        break;
      case 'day':
        newDate.setDate(value);
        break;
    }
    
    // Ensure the new date is within bounds
    console.log('newDate',newDate)
    if (newDate < createdDate) newDate = new Date(createdDate);
    if (newDate > currentDate) newDate = new Date(currentDate);
    
    onDateChange(newDate.toISOString().split('T')[0]);
  };
  
  const selectedYear = selectedDate ? new Date(selectedDate).getFullYear() : currentDate.getFullYear();
  const selectedMonth = selectedDate ? new Date(selectedDate).getMonth() : currentDate.getMonth();
  const selectedDay = selectedDate ? new Date(selectedDate).getDate() : currentDate.getDate();
  
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-3">
        <span className="font-medium">Ad created:</span> {createdDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24))} days ago
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Year Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => handleDateChange('year', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        {/* Month Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => handleDateChange('month', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {availableMonths.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </div>
        
        {/* Day Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
          <select
            value={selectedDay}
            onChange={(e) => handleDateChange('day', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {availableDays.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Quick Date Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button
        
          onClick={() => onDateChange(new Date().toISOString().split('T')[0])}
          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
        >
          Today
        </button>
        <button
   
          onClick={() => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            onDateChange(yesterday.toISOString().split('T')[0]);
          }}
          className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
        >
          Yesterday
        </button>
        <button
         
          onClick={() => onDateChange(createdDate.toISOString().split('T')[0])}
          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
        >
          Creation Date
        </button>
      </div>
    </div>
  );
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function HourlyChart({ rawData,isLoading }) {
 if(isLoading){
  return setTimeout(()=>{<LoadingSpinner size={23}></LoadingSpinner>},1000)
 }
  if (!rawData || rawData.length === 0) return <p>No Data Found </p>;

  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  const impressions = hours.map(h => rawData?.find(d => `${d.Hour}:00` === h)?.Impressions ?? 0);
  const ctr = hours.map(h => rawData.find(d => `${d.Hour}:00` === h)?.Ctr ?? 0);

  const data = {
    labels: hours,
    datasets: [
      {
        label: "Impressions",
        data: impressions,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        yAxisID: "y"
      },
      {
        label: "CTR (%)",
        data: ctr,
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        yAxisID: "y1"
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    scales: {
      y: { type: "linear", position: "left" },
      y1: { type: "linear", position: "right" }
    }
  };

  return <Line options={options} data={data} />;
}

export // Ad Card Component
const AdCard = ({ ad, selectedDate,defaultAdData, onDateChange, onAdUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [adData, setAdData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState(null);
  const [totals,setTotals]=useState({
    Impressions:0,
    Clicks:0,
    Ctr:0,
  })
  const currentSelectedDate = selectedDate || new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (isExpanded && ad._id) {
      fetchAdData(ad._id, currentSelectedDate);
    }
  }, [currentSelectedDate, isExpanded, ad.id]);

  const fetchAdData = async (adId, date) => {
    setIsLoadingData(true);
    setError(null);
    setTotals({
      Impressions:0,
      Clicks:0,
      Ctr:0
    })

    try {
      const data = await AdsMetricsApiService.fetchAdData(adId, date);
       setAdData(data.adData);
       setIsLoadingData(false)
      const total =  data?.adData?.reduce((acc,item)=>{
          acc.Impressions += item.Impressions || 0
          acc.Clicks += item.Clicks  || 0
          acc.Views += item.Views ||0 
          return acc;
       },{Impressions:0,Clicks:0,Views:0})
       const totalCtr = total.Impressions == 0 ? 0 : total.Clicks / total.Impressions * 100 ;
       setTotals({
        Impressions:total.Impressions,
        Clicks:total.Clicks,
        Ctr:totalCtr
       }) 
      
    } catch (err) {
      setError('Failed to load ad data');
    
      setAdData([]);
      setIsLoadingData(false)
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleStatusToggle = async () => {
    if (isUpdatingStatus) return;
    
    setIsUpdatingStatus(true);
    const newStatus = ad.Status === 'active' ? 'paused' : 'active';
    
    try {
      await apiService.updateAdStatus(ad.id, newStatus);
      // Update the ad status in parent component
      onAdUpdate(ad.id, { ...ad, status: newStatus });
    } catch (err) {
      setError('Failed to update ad status');
      console.error('Error updating ad status:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDateChangeInternal = (newDate) => {
    onDateChange(newDate);
  };
  

  return (
    <div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Card Header */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{ad.Title}</h3>
          <div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              ad.Status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {ad.Status}
            </span>
            {(ad.isExpired || !ad.isPaid) && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Payment Required
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Eye size={16} />
              <span>{ad.Impressions?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MousePointer size={16} />
              <span>{ad.clicks || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target size={16} />
              <span>{ad.ctr || 0}%</span>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100"
          >
            <div className="p-6 space-y-6">
              {/* Date Selector */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Calendar size={16} className="mr-2" />
                  Select Date
                </h4>
                <DateSelector 
                  createdAt={ad.createdAt}
                  selectedDate={currentSelectedDate}
                  onDateChange={handleDateChangeInternal}
                />
              </div>

              {/* Selected Day Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye size={16} className="text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Impressions</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {isLoadingData ? (
                      <span className="inline-block w-16 h-6 bg-gray-200 rounded animate-pulse"></span>
                    ) : (
                      totals?.Impressions || 0 
                    )}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MousePointer size={16} className="text-green-500" />
                    <span className="text-sm font-medium text-gray-700">Clicks</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {isLoadingData ? (
                      <span className="inline-block w-12 h-6 bg-gray-200 rounded animate-pulse"></span>
                    ) : (
                      totals?.Clicks || 0 
                    )}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target size={16} className="text-purple-500" />
                    <span className="text-sm font-medium text-gray-700">CTR</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {isLoadingData ? (
                      <span className="inline-block w-12 h-6 bg-gray-200 rounded animate-pulse"></span>
                    ) : (
                      
                      `${totals?.Ctr}%` || 0
                    )}
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <BarChart3 size={16} className="mr-2" />
                  Hourly Impressions ({new Date(currentSelectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })})
                </h4>
                <HourlyChart 
                
                  rawData={adData} 
                  isLoading={isLoadingData} 
                  selectedDate={currentSelectedDate}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                <button
                 
                  onClick={handleStatusToggle}
                  disabled={isUpdatingStatus}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    ad.Status === 'active'
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isUpdatingStatus ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : ad.Status === 'active' ? (
                    <>
                      <PauseCircle size={16} />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <PlayCircle size={16} />
                      <span>Activate</span>
                    </>
                  )}
                </button>

                {(ad.isExpired || !ad.isPaid) && (
                  <button
                    
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    <CreditCard size={16} />
                    <span>Pay Now</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const MetricCard = ({ icon: Icon, title, value, subtitle, color = "blue", isLoading = false }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    indigo: "from-indigo-500 to-indigo-600"
  };

  return (
    <div
     
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} text-white`}>
          <Icon size={24} />
        </div>
        {isLoading ? (
          <Loader2 size={20} className="text-gray-400 animate-spin" />
        ) : (
          <div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400"
          >
            <TrendingUp size={20} />
          </div>
        )}
      </div>
      <h1 className="text-sm font-medium text-gray-600 mb-1">{title}</h1>
      <p className="text-2xl font-bold text-gray-900 mb-1">
        {isLoading ? (
          <span className="inline-block w-16 h-6 bg-gray-200 rounded animate-pulse"></span>
        ) : (
          value?.toLocaleString()
        )}
      </p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
};