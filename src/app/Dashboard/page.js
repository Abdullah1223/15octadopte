// import React from 'react';
// const ProposalCard = ({ proposal }) => {
//   return (
//     <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
//       <div className="p-4 flex">
//         <div className="w-16 h-16 rounded-md bg-gray-200 overflow-hidden mr-4">
//           <img src={proposal.image} alt="Proposal" className="w-full h-full object-cover" />
//         </div>
//         <div className="flex-1">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <h3 className="text-lg font-semibold">{proposal.title}</h3>
//               <div className="flex items-center text-sm text-gray-500">
//                 <span className="mr-1">📍</span>
//                 <span>{proposal.location}</span>
//               </div>
//             </div>
//             <div className={`px-3 py-1 text-sm font-medium rounded ${
//               proposal.status === 'Accepted' 
//                 ? 'bg-green-100 text-green-800' 
//                 : 'bg-red-100 text-red-800'
//             }`}>
//               {proposal.status}
//             </div>
//           </div>
//           <p className="text-gray-700 mb-3">{proposal.description}</p>
//           <div className="flex justify-end">
//             <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
//               View Job
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




 

// // pages/index.js

// import { LayoutDashboard } from 'lucide-react';
// import Layout from './Layout';
// import Navbar from '../Components/Navbar';

//  export default function Dashboard() {
//   // Dashboard stats
//   const stats = [
//     { label: 'Proposal Sent', value: 8, color: 'text-gray-800' },
//     { label: 'Proposals Accepted', value: 3, color: 'text-green-500' },
//     { label: 'Proposal Rejected', value: 2, color: 'text-red-500' },
//   ];

//   const proposalData = [
//     {
//       title: 'Need For Barber',
//       status: 'Accepted',
//       location: 'France,Paris',
//       image: '/cat.jpg', // You'll need to add this image to your public folder
//       description: 'Hey We need a barber for our salon in France he must have 4 years of experience in this industry he must be willing to give his 100% we are ready to pay good amount of salary'
//     },
//     {
//       title: 'Need For Barber',
//       status: 'Rejected',
//       location: 'France,Paris',
//       image: '/cat.jpg',
//       description: 'Hey We need a barber for our salon in France he must have 4 years of experience in this industry he must be willing to give his 100% we are ready to pay good amount of salary'
//     }
//   ];

//   return (
//     <Layout>
//       <div className="p-6">
      
//         {/* Welcome section */}
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold">Welcome Back,Jhon</h1>
//             <div className="flex space-x-8">
//               {stats.map((stat, index) => (
//                 <div key={index} className="text-center">
//                   <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
//                   <p className="text-sm text-gray-500">{stat.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Proposals section */}
//         <div className="mb-8">
//           <h2 className="text-xl font-bold mb-4">Your Proposals</h2>
//           {proposalData.map((proposal, index) => (
//             <div key={index} className="mb-4">
//               <ProposalCard proposal={proposal} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// }
'use client';
import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import Layout from './Layout';
import Navbar from '../Components/Navbar';
import { useTranslation } from '../Context/TranslationContext.';

// ProposalCard Component
const ProposalCard = ({ proposal }) => {
      const { translate, setLanguage, language } = useTranslation();
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row">
        <div className="w-full sm:w-16 h-40 sm:h-16 rounded-md bg-gray-200 overflow-hidden sm:mr-4 mb-4 sm:mb-0">
          <img src={proposal.image} alt="Proposal" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold">{proposal.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1">📍</span>
                <span>{proposal.location}</span>
              </div>
            </div>
            <div className={`px-3 py-1 text-sm font-medium rounded mt-2 sm:mt-0 ${
              proposal.status === 'Accepted' || proposal.status==="Accepté" 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {proposal.status}
            </div>
          </div>
          <p className="text-gray-700 mb-3">{proposal.description}</p>
          <div className="flex justify-end">
            <button className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
              {translate('views_jobs')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Page
export default function Dashboard() {
  const { translate, setLanguage, language } = useTranslation();

  // Dashboard stats
  const stats = [
    { label: translate('proposal_sent'), value: 8, color: 'text-gray-800' },
    { label: translate('proposals_accepted'), value: 3, color: 'text-green-500' },
    { label:  translate('proposals_rejected'), value: 2, color: 'text-red-500' },
  ];

  const proposalData = [
    {
      title: translate('Need For Barber'),
      status: translate('Accepted'),
      location: 'France,Paris',
      image: '/cat.jpg', // You'll need to add this image to your public folder
      description: translate('proposal_subheading_1'),
    },
    {
      title: translate('Need For Barber'),
      status: translate('Rejected'),
      location: 'France,Paris',
      image: '/cat.jpg',
      description: translate('proposal_subheading_1'), }
  ];

  return (
    <Layout>
      <div className="p-4 md:p-6">
        {/* Welcome section */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">{translate('welcome_back_jhon')}</h1>
            <div className="grid grid-cols-3 gap-4 w-full md:w-auto md:flex md:space-x-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs md:text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Proposals section */}
        <div className="mb-8">
          <h2 className="text-lg md:text-xl font-bold mb-4">{translate('your_proposals')}</h2>
          {proposalData.map((proposal, index) => (
            <div key={index} className="mb-4">
              <ProposalCard proposal={proposal} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}



