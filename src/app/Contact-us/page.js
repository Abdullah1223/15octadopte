

// 'use client';
// import Footer from "../Components/Footer";
// import Navbar from "../Components/Navbar";
// import { useState } from "react";
// import { useTranslation } from "../Context/TranslationContext.";

// export default function Contactus() {
//   const [activeQuestion, setActiveQuestion] = useState(null);
//   const { translate, setLanguage, language } = useTranslation();
//   const toggleQuestion = (index) => {
//     setActiveQuestion(activeQuestion === index ? null : index);
//   };

//   const faqs = [
//     {
//       question: translate('faq_1'),
//       answer: translate('faq_1_answer') 
//     },
//     {
//       question: translate('faq_2'),
//       answer: translate('faq_2_answer')
//     },
//     {
//       question: translate('faq_3'),
//       answer: translate('faq_3_answer')
//     },
//     {
//       question: translate('faq_4'),
//       answer: translate('faq_4_answer')
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 border-b-4 border-orange-500 overflow-hidden">
//         <div className="container mx-auto px-4 py-12 md:py-20">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="w-full md:w-1/2 mb-12 md:mb-0 animate-fade-in-left">
//               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
//                 {translate('confused_dont_worry')} <br />
//                 {translate("we've_got_you")} <span className="text-orange-500 animate-pulse-soft">{translate('covered')}</span>
//               </h1>
//               <p className="mt-4 text-gray-700 text-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
//                 {translate("reach_out_to_us,_and_we'll_get_back_to_you_as_soon_as_possible")}
//               </p>
//               <div className="flex items-center space-x-6 mt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
//                 <a href="#" className="transition transform hover:scale-110">
//                   <img src="/facebook.png" alt="Facebook" className="w-8 h-8" />
//                 </a>
//                 <a href="#" className="transition transform hover:scale-110">
//                   <img src="/instagram.png" alt="Instagram" className="w-8 h-8" />
//                 </a>
//                 <a href="#" className="transition transform hover:scale-110">
//                   <img src="/email.png" alt="Email" className="w-8 h-8" />
//                 </a>
//               </div>
//             </div>
            
//             {/* Contact Form Card */}
//             <div className="w-full md:w-1/2 lg:w-5/12 animate-float-in-up" style={{ animationDelay: "0.3s" }}>
//               <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transform transition duration-500 hover:shadow-xl">
//                 <form>
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
//                       <input 
//                         type="text" 
//                         placeholder={translate('name')}
//                         className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition" 
//                       />
//                     </div>
//                     <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
//                       <input 
//                         type="text" 
//                         placeholder={translate('last_name')}
//                         className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition" 
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="mb-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
//                     <input 
//                       type="email" 
//                       placeholder={translate('enter_email')}
//                       className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition" 
//                     />
//                   </div>
                  
//                   <div className="mb-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
//                     <input 
//                       type="email" 
//                       placeholder={translate('enter_telephone')}
//                       className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition" 
//                     />
//                   </div>
//                   {/* Added Dropdown Menu */}
//                   <div className="mb-4 animate-fade-in" style={{ animationDelay: "0.65s" }}>
//                     <select 
//                       className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition appearance-none"
//                     >
//                       <option className="text-gray-300" value="" disabled selected>{translate('select_your_profile')}</option>
//                       <option value="employeurs">{translate('employeurs')}</option>
//                       <option value="candidat">{translate('candidat')}</option>
//                       <option value="autre">{translate('autre')}</option>
//                     </select>
//                   </div>
                  
//                   <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.7s" }}>
//                     <textarea 
//                       placeholder={translate('your_message')}
//                       rows="5"
//                       className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none" 
//                     ></textarea>
//                   </div>
                  
//                   <button
//                     type="submit"
//                     className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition duration-300 transform hover:scale-[1.02] animate-bounce-subtle"
//                   >
//                     {translate('get_in_touch')}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Steps Section */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="text-center mb-12 animate-fade-in">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//             {translate('how_easy_it_is_to')} <span className="text-orange-500">{translate('contact_us')}</span>
//           </h2>
//         </div>
        
//         <div className="max-w-4xl mx-auto">
//           <div className="flex flex-col md:flex-row items-center md:items-start mb-12 animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
//             <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold text-lg mb-4 md:mb-0 md:mr-6 animate-pulse-slow">
//               1
//             </div>
//             <div>
//               <h3 className="text-xl text-black font-bold mb-2">{translate('fill_the_form')}</h3>
//               <p className="text-gray-600">{translate('fill_the_form_subheading')}</p>
//             </div>
//           </div>
          
//           <div className="flex flex-col md:flex-row items-center md:items-start mb-12 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
//             <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold text-lg mb-4 md:mb-0 md:mr-6 animate-pulse-slow">
//               2
//             </div>
//             <div>
//               <h3 className="text-xl text-black font-bold mb-2">{translate('review_submission')}</h3>
//               <p className="text-gray-600">{translate('review_submission_subheading')}</p>
//             </div>
//           </div>
          
//           <div className="flex flex-col md:flex-row items-center md:items-start animate-slide-in-right" style={{ animationDelay: "0.6s" }}>
//             <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold text-lg mb-4 md:mb-0 md:mr-6 animate-pulse-slow">
//               3
//             </div>
//             <div>
//               <h3 className="text-xl text-black font-bold mb-2">{translate('problem_solved')}</h3>
//               <p className="text-gray-600">{translate('problem_solved_subheading')}</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* FAQ Section */}
//       <div className="bg-gray-100 py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12 animate-fade-in">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//               {translate('frequently_asked')} <span className="text-orange-500">Questions</span>
//             </h2>
//             <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//               {translate('frequently_asked_subheading')} 
//             </p>
//           </div>
          
//           <div className="max-w-3xl mx-auto">
//             {faqs.map((faq, index) => (
//               <div 
//                 key={index} 
//                 className="mb-4 bg-white rounded-lg shadow-md overflow-hidden animate-fade-in-up"
//                 style={{ animationDelay: `${0.2 + index * 0.1}s` }}
//               >
//                 <button
//                   className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center focus:outline-none"
//                   onClick={() => toggleQuestion(index)}
//                 >
//                   <span className="text-black">{faq.question}</span>
//                   <svg 
//                     className={`w-5 h-5 transition-transform duration-300 ${activeQuestion === index ? 'transform rotate-180' : ''}`} 
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div 
//                   className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
//                     activeQuestion === index ? 'max-h-40 pb-4' : 'max-h-0'
//                   }`}
//                 >
//                   <p className="text-gray-600">{faq.answer}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       {/* Add custom animation keyframes to your CSS or in a style tag */}
//       <style jsx>{`
//         @keyframes fadeInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes floatInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes pulseSoft {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.8; }
//         }
        
//         @keyframes pulseSlow {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//         }
        
//         @keyframes bounceSoft {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-3px); }
//         }
        
//         .animate-fade-in-left {
//           animation: fadeInLeft 0.8s ease-out forwards;
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.8s ease-out forwards;
//         }
        
//         .animate-float-in-up {
//           animation: floatInUp 0.8s ease-out forwards;
//         }
        
//         .animate-slide-in-right {
//           animation: slideInRight 0.8s ease-out forwards;
//         }
        
//         .animate-fade-in-up {
//           animation: fadeInUp 0.6s ease-out forwards;
//         }
        
//         .animate-pulse-soft {
//           animation: pulseSoft 2s infinite;
//         }
        
//         .animate-pulse-slow {
//           animation: pulseSlow 3s infinite;
//         }
        
//         .animate-bounce-subtle {
//           animation: bounceSoft 2s infinite;
//         }
//       `}</style>
//       <Footer></Footer>
//     </div>
//   );
// }


'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('ads-approvals');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    {
      id: 'ads-approvals',
      title: 'Ads Approvals',
      icon: '✓',
      badge: '24'
    },
    {
      id: 'ads-config',
      title: 'Ads Config',
      icon: '⚙️',
      badge: '8'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: '🔔',
      badge: '18'
    },
    {
      id: 'users',
      title: 'Users',
      icon: '👥',
      badge: '1.2K'
    }
  ];

  const contentData = {
    'ads-approvals': {
      title: 'Ads Approvals Management',
      stats: [
        { label: 'Pending Reviews', value: '24', change: '+12%', trend: 'up' },
        { label: 'Approved Today', value: '156', change: '+8%', trend: 'up' },
        { label: 'Rejected', value: '12', change: '-5%', trend: 'down' },
        { label: 'Total This Month', value: '2,847', change: '+15%', trend: 'up' }
      ],
      recentActivity: [
        { action: 'Ad Campaign Approved', time: '2 minutes ago', status: 'success' },
        { action: 'Review Required', time: '5 minutes ago', status: 'pending' },
        { action: 'Ad Rejected - Policy Violation', time: '12 minutes ago', status: 'error' },
        { action: 'Bulk Approval Completed', time: '1 hour ago', status: 'success' }
      ]
    },
    'ads-config': {
      title: 'Ads Configuration',
      stats: [
        { label: 'Active Campaigns', value: '8', change: '+2', trend: 'up' },
        { label: 'Draft Configs', value: '3', change: '0', trend: 'neutral' },
        { label: 'Templates', value: '15', change: '+3', trend: 'up' },
        { label: 'Budget Utilized', value: '76%', change: '+12%', trend: 'up' }
      ],
      recentActivity: [
        { action: 'Campaign "Summer Sale" Created', time: '30 minutes ago', status: 'success' },
        { action: 'Budget Updated for Campaign #12', time: '1 hour ago', status: 'info' },
        { action: 'Template "Holiday Promo" Saved', time: '2 hours ago', status: 'success' },
        { action: 'Campaign Paused - Budget Limit', time: '3 hours ago', status: 'warning' }
      ]
    },
    'notifications': {
      title: 'Notifications Center',
      stats: [
        { label: 'Unread Messages', value: '18', change: '+6', trend: 'up' },
        { label: 'High Priority', value: '7', change: '+2', trend: 'up' },
        { label: 'System Alerts', value: '3', change: '-1', trend: 'down' },
        { label: 'Today Total', value: '45', change: '+18', trend: 'up' }
      ],
      recentActivity: [
        { action: 'High Priority: Server Load Alert', time: '5 minutes ago', status: 'error' },
        { action: 'Campaign Budget 90% Reached', time: '15 minutes ago', status: 'warning' },
        { action: 'New User Registration Spike', time: '30 minutes ago', status: 'info' },
        { action: 'Weekly Report Generated', time: '2 hours ago', status: 'success' }
      ]
    },
    'users': {
      title: 'User Management',
      stats: [
        { label: 'Total Users', value: '1,247', change: '+23', trend: 'up' },
        { label: 'Online Now', value: '89', change: '+12', trend: 'up' },
        { label: 'New Today', value: '23', change: '+5', trend: 'up' },
        { label: 'Active This Month', value: '956', change: '+45', trend: 'up' }
      ],
      recentActivity: [
        { action: 'New User: john.doe@email.com', time: '3 minutes ago', status: 'success' },
        { action: 'User Role Updated: Admin', time: '15 minutes ago', status: 'info' },
        { action: 'Bulk User Import Completed', time: '45 minutes ago', status: 'success' },
        { action: 'Inactive Users Cleaned Up', time: '2 hours ago', status: 'warning' }
      ]
    }
  };

  const sidebarVariants = {
    open: { width: '280px', transition: { duration: 0.3 } },
    closed: { width: '80px', transition: { duration: 0.3 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const currentContent = contentData[activeSection];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={sidebarOpen ? 'open' : 'closed'}
        className="bg-white shadow-2xl flex-shrink-0 overflow-hidden"
      >
        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6">
          <div className="flex items-center justify-between">
            <motion.div
              animate={{ opacity: sidebarOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {sidebarOpen && (
                <h1 className="text-white text-xl font-bold">Dashboard</h1>
              )}
            </motion.div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl">{item.icon}</span>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex items-center justify-between flex-1"
                  >
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <motion.span
                        className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <motion.div
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            className="flex items-center space-x-3"
          >
            {sidebarOpen && (
              <>
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  U
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">admin@company.com</p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b p-6">
          <div className="flex items-center justify-between">
            <motion.h2
              key={activeSection}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-800"
            >
              {currentContent.title}
            </motion.h2>
            <div className="flex items-center space-x-4">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Export Data
              </button>
              <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto h-full bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentContent.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`flex items-center space-x-1 text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 
                        stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <span>{stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}</span>
                        <span>{stat.change}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <motion.div
                variants={cardVariants}
                className="bg-white rounded-xl shadow-sm border"
              >
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {currentContent.recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className={`w-3 h-3 rounded-full ${
                          activity.status === 'success' ? 'bg-green-500' :
                          activity.status === 'error' ? 'bg-red-500' :
                          activity.status === 'warning' ? 'bg-yellow-500' :
                          activity.status === 'pending' ? 'bg-orange-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">{activity.action}</p>
                          <p className="text-gray-500 text-sm">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;