// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, } from 'framer-motion';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';
// import { useSelector } from 'react-redux';
// import LoadingSpinner from '../Components/LoadingSpinner';
// import JobError from '../Components/JobError';
// import { FaLock, FaUserSlash } from 'react-icons/fa';
// import { useInView } from 'react-intersection-observer';
// import { algoliasearch } from 'algoliasearch';
// import { Hits, InstantSearch, useSearchBox } from 'react-instantsearch';
// import CustomSearchBarCv from '../Components/CustomSearchBarCv';
// import PdfModal from '../Components/PdfModel';
// import useCv from '../Hooks/useCv';
// import { UserCard } from '../Components/CvUserCard';
// import { ConditionalHits } from '../Components/UserCvConditionalHits';
// import {UserCvInterface} from '../interfaces/CvInterfaces'

// interface JobSearchAppProps{
//     usersProps:UserCvInterface[],
//     prevDocIds:string[],
//     Cursor:string,
//     PageLoadingProps:boolean,
//     hasMoreProps:boolean;
//     roleErrorProps:boolean;
//     showDialogProps:boolean; 
//     pageRefProps:boolean;

// }
// const JobSearchApp = ({usersProps,prevDocIds,Cursor,PageLoadingProps,hasMoreProps,roleErrorProps,showDialogProps,pageRefProps}:JobSearchAppProps) => {
//   const [users, setUsers] = useState<UserCvInterface[]>(usersProps);
//   const [selectedCv,setSelectedCv]=useState()
//   const searchClient = algoliasearch('ZTJ32FOJMI', 'd829fbb07a8cbd8d503c6f523ee51ea5');
//   const [pageLoading,setPageLoading]=useState(PageLoadingProps)
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(hasMoreProps);
//   const [page, setPage] = useState(1);
//   const[prevDocs,setPrevDocs]=useState(prevDocIds)
//   const [roleError,setRoleError]=useState(roleErrorProps)
//   const [showDialog,setShowDialog]=useState(showDialogProps)
//  const [isOpen,setIsOpen]=useState(false)
//  const [cursor,setCursor]=useState(Cursor)
//  const {fetchUserInfoCv}=useCv()
//  const pageRef = useRef(pageRefProps)
//  const {ref,inView}=useInView()
//   const [filters, setFilters] = useState({
//     contractType: '',
//     city: '',
//     yearsOfExperience: '',
//     minimumSalary: '',
//     maximumSalary: '',
//     specialization: ''
//   });

  
// //   const makingReq = async(cursor:string,prevDocs:string[])=>{
// //     const fetchedUsers = await fetchUserInfoCv({cursor,prevDocs,setPageLoading, setUsers, setCursor,setPrevDocs, setHasMore, pageRef})
   
// //   }
// //  const selector = useSelector((state)=>state.user)

// //  useEffect(()=>{
// //   if(selector.isUserLoggedIn==false){
// //     setPageLoading(false)
// //     setShowDialog(true)
// //     console.log(selector.isUserLoggedIn)
// //   }else if(selector.isUserLoggedIn==true){
// //     console.log(selector)
// //     if(selector.role=="candidate"){
    
// //       setPageLoading(false)
// //       setRoleError(true)
// //       setShowDialog(true)
// //     }else{
// //       makingReq(cursor,prevDocs)
// //     }
// //   }
// //  },[selector.isUserLoggedIn])
//   const handleSearch = (searchTerm) => {
//     console.log('Searching for:', searchTerm);
//   };

// //   useEffect(()=>{
// //     if(hasMore && cursor && pageRef.current==false && inView){
// //       makingReq(cursor,prevDocs)
// //     }
// //   },[inView])
//   return (
//     <>
//     <Navbar></Navbar>
//     <PdfModal isOpen={isOpen} setIsOpen={setIsOpen} src={selectedCv} ></PdfModal>
//     {pageLoading==true?
//      <div className='flex min-h-screen w-full justify-center items-center'><LoadingSpinner size={50}></LoadingSpinner></div>
//     :
//     pageLoading ==false && showDialog==true && roleError==false ?
//     <div className=''>
//     <div className='flex mt-12 justify-center items-center h-full'>
//         <JobError customError={
//        {  icon: FaLock,
//            title: 'Accès refusé',
//            description: 'Vous devez être connecté pour accéder à ce contenu.',
//            actionText: 'Se connecter',
//            actionLink: '/login'}
//     } ></JobError>
//     </div>
//     <Footer></Footer>
//     </div> 
//     : pageLoading==false && showDialog==true && roleError==true ? 
//     <div className=''>
//     <div className='flex mt-12 justify-center items-center h-full'>
//         <JobError customError={
//        {icon: FaUserSlash,
//           title: 'Candidats non autorisés',
//           description: "Veuillez vous connecter en tant qu'employeur pour accéder à ce contenu.",
//           actionText: 'Se Connecter',
//           actionLink: '/login'}
//     } ></JobError>
//     </div>
//     <Footer></Footer>
//     </div>
//     : 
    
//     <div className="min-h-screen bg-gray-50">
      
       
//       <main className="px-6 py-6">
       
//         <InstantSearch indexName='Users' searchClient={searchClient}>
//           <CustomSearchBarCv filters={filters} setFilters={setFilters}></CustomSearchBarCv>
//           <ConditionalHits></ConditionalHits>
//         </InstantSearch>
//         {/* Results Section */}
//         <div className="mt-8">
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-1">
//               Profils disponibles
//             </h2>
//             <p className="text-sm text-gray-600">{users.length} coiffeurs trouvés</p>
//           </div>
          
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//             {users.map((user, index) => (
//               <div key={index} ref={index == users.length - 1 ?ref : null}>
//               <UserCard setSelectedCv={setSelectedCv} setUsers={setUsers} setIsOpen={setIsOpen} key={user._id} user={user} index={index} />
//               </div>
//             ))}
//           </div>
          
//           {loading && (
//             <motion.div
//               className="flex justify-center py-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <div className="flex items-center gap-3">
//                 <div className="animate-spin rounded-full h-6 w-6 border-2 border-orange-500 border-t-transparent"></div>
//                 <span className="text-gray-600 text-sm">Chargement...</span>
//               </div>
//             </motion.div>
//           )}
          
//           {!hasMore && users.length > 0 && (
//             <motion.div
//               className="text-center py-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <p className="text-gray-600 text-sm">Tous les profils ont été chargés.</p>
//             </motion.div>
//           )}
//         </div>
//       </main>
      
//       <Footer></Footer>
//     </div>
// }</>
//   );
// };

// export default JobSearchApp;