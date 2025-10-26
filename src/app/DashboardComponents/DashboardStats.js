// 'use client'

// import { useSelector } from "react-redux";
// import { useTranslation } from "../Context/TranslationContext.";


// const DashboardStats = () => {
//   const { translate } = useTranslation();
//    const selector = useSelector((state)=>state.user)
//    const name = selector.name
//   const stats = [
//     { label: selector.role=="candidate" ?  translate('proposal_sent') : translate('proposal_waiting'), value: 8, color: 'text-gray-800' },
//     { label: translate('proposals_accepted'), value: 3, color: 'text-green-500' },
//     { label: translate('proposals_rejected'), value: 2, color: 'text-red-500' },
//   ];

//   return (
//     <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
//       <div className="flex flex-col md:flex-row justify-between items-center">
//         <h1 className="text-xl text-black md:text-2xl font-bold mb-4 md:mb-0">
//           {translate('welcome_back_jhon') }{" "}{+" "+ name?name:""}
//         </h1>
//         <div className="grid grid-cols-3 gap-4 w-full md:w-auto md:flex md:space-x-8">
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center">
//               <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
//               <p className="text-xs md:text-sm text-gray-500">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardStats; 

'use client'

import { useSelector } from "react-redux";
import { useTranslation } from "../Context/TranslationContext.";
import { motion } from "framer-motion";
import { 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  User 
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboard } from "../Hooks/useDashboard";

const DashboardStats = () => {
  const { translate } = useTranslation();
  const selector = useSelector((state) => state.user);
  const {getDashboardStats} = useDashboard();
  const [dashboardStats,setDashboardStats]=useState([
     { 
      label: selector.role === "candidate" ? translate('proposal_sent') : translate('proposal_waiting'), 
      type:selector.role=="candidate"?"proposal_sent":"proposal_waiting",
      value: 0, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: selector.role === "candidate" ? Send : Clock
    },
    { 
      label: translate('proposals_accepted'), 
      value: 0, 
      type:"proposal_accepted",
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: CheckCircle
    },
    { 
      label: translate('proposals_rejected'), 
      value: 0, 
      type:"proposal_rejected",
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: XCircle
    },
  ])

  useEffect(()=>{
    if(selector.role=="candidate" || selector.role=="employer"){
      setDashboardStats((prev)=>{
       const newData= prev.map((data)=>{
          if(data.type=="proposal_sent" || data.type=="proposal_waiting"){
            return {...data,type:selector.role=="candidate"?"proposal_sent":"proposal_waiting"}
          }
          return data;
        })
       return newData 
      })
    }
  },[selector.role])

  const updateData = (type, value) => {
    setDashboardStats((prev) => {
      const newData = prev.map((data) => {
        if (data.type === type) {
         
          return { ...data, value: value };
        }
        return data; // Return unchanged if type doesn't match
      });
      return newData; // Return updated array directly
    });
  };
  
  
  

  useEffect(()=>{
    getDashboardStats({updateData})
  
  },[])
  // const stats = [
  //   { 
  //     label: selector.role === "candidate" ? translate('proposal_sent') : translate('proposal_waiting'), 
  //     value: 8, 
  //     color: 'text-orange-600',
  //     bgColor: 'bg-orange-50',
  //     borderColor: 'border-orange-200',
  //     icon: selector.role === "candidate" ? Send : Clock
  //   },
  //   { 
  //     label: translate('proposals_accepted'), 
  //     value: 3, 
  //     color: 'text-green-600',
  //     bgColor: 'bg-green-50',
  //     borderColor: 'border-green-200',
  //     icon: CheckCircle
  //   },
  //   { 
  //     label: translate('proposals_rejected'), 
  //     value: 2, 
  //     color: 'text-red-600',
  //     bgColor: 'bg-red-50',
  //     borderColor: 'border-red-200',
  //     icon: XCircle
  //   },
  // ];

  console.log(dashboardStats)
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="bg-orange-100 p-3 rounded-full">
            <User className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {translate('welcome_back_jhon')} {name && <span className="text-orange-600">{name}</span>}
            </h1>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              {"Here's your dashboard overview"}
            </p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
          {dashboardStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-xl p-4 md:p-6 text-center min-w-[140px] cursor-pointer transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex justify-center mb-3">
                  <div className={`p-2 rounded-full ${stat.bgColor} border ${stat.borderColor}`}>
                    <IconComponent className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <motion.p 
                  className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs md:text-sm text-gray-600 font-medium leading-tight">
                  {stat.label}
                </p>
                
                {/* Subtle progress indicator */}
                <div className="mt-3 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">Active</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Subtle bottom accent */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-6 h-1 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 rounded-full"
      />
    </motion.div>
  );
};

export default DashboardStats;