// 'use client';
// import { useEffect, useState } from "react";
// import { useTranslation } from "../Context/TranslationContext.";
// import ProposalCard from "./ProposalCard";
// import { useInView } from "react-intersection-observer";

// const MainProposals = ()=>{
//     const { translate } = useTranslation();
//    const [proposalData,setProposalData]=useState([])
//    const [lastCursor,setLastCursor]=useState(null)
//    const {ref,inView}=useInView
//   const makingReq = async()=>{
          
//     const response = await fetch(`http://localhost:8002/proposal/details/single/${null}`,{
//         headers:{
//             'Content-Type':"Application/json"
//         },
//         credentials:"include",
//         method:"GET"
//     })
//     const result = await response.json()
//     if(response.status==200){
//       setProposalData(result.proposalDetails)
//       setLastCursor(result.lastCursor)
//     }

//   }
    

//       useEffect(()=>{

//         makingReq();
//       },[])

//       useEffect(()=>{
//         console.log(inView)
//       },[inView])
//     return (
//         <div className="mb-8">
//         <h2 className="text-lg text-black md:text-xl font-bold mb-4">
//           {translate('your_proposals')}
//         </h2>
//         {proposalData.map((proposal, index) => (
//           <ProposalCard key={index} proposal={proposal} inView={inView} ref={ref} />
       
//         ))}
//       </div>
//     )

// }

// export default MainProposals;



'use client';
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../Context/TranslationContext.";
import ProposalCard from "./ProposalCard";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../Components/LoadingSpinner";
import JobError from "../Components/JobError";
import { FaExclamationTriangle, FaSearch, FaUserSlash } from "react-icons/fa";
import { jobInstance } from "../Services/jobs.service";

const MainProposals = () => {
    const { translate } = useTranslation();
    const [proposalData, setProposalData] = useState([]);
    const [lastCursor, setLastCursor] = useState(null);
    const [hasMore,sethasMore]=useState(true)
    const renderRef  = useRef(true)
    const [isLoading,setisLoading]=useState(true)
    const [error,setError]=useState(null)
    const { ref, inView } = useInView(); // Fixed: added parentheses

    const makingReq = async (lastCursor) => {
        const response = await jobInstance.get(`/candidate/proposal/details/single/${lastCursor}`,
          //  {
        //     headers: {
        //         'Content-Type': "Application/json"
        //     },
        //     credentials: "include",
        //     method: "GET"
        // }
      );
        const result = await response.data;
        if (response.status == 200) {
            setisLoading(false)
            setProposalData((prev)=>[...prev,...result.proposalDetails]);
            setLastCursor(result.lastCursor);
            renderRef.current=false;
        }else{
          setisLoading(false)
          if(response.status==400){
                setError({
                     icon: FaUserSlash,
                                title: 'Authentification requise',
                                description: 'Veuillez vous connecter pour voir les détails de la proposition.',
                                actionText: 'Se connecter',
                                actionLink: '/login'
                })  
          }else if(response.status==404){
            sethasMore(false)
            if(proposalData.length>0){
               
            }else{
              setError({
                icon: FaSearch,
                title: 'Propositions introuvables',
                description: "Les propositions que vous recherchez n'existent pas ou ont été supprimées.",
                actionText: 'Envoyer des propositions ?',
                actionLink: '/jobs'
              })
              
            }

          }else  if(response.status==500){
          setError({
              icon: FaExclamationTriangle,
                title: "Une erreur s'est produite",
                description: 'Une erreur s’est produite lors du chargement des détails de la proposition.',
                actionText: 'Réessayer',
                actionLink: '#'
          })
          }
        }
    };

    useEffect(() => {
        makingReq(null);
    }, []);

    useEffect(()=>{
      if(renderRef.current==false && hasMore==true && inView==true){
        console.log('working')
        console.log(lastCursor)
        makingReq(lastCursor)
      }  
    },[
      inView
    ])

    return (
      error?<JobError customError={error}></JobError> :isLoading?
      <div className="flex justify-center items-center"><LoadingSpinner size={50}></LoadingSpinner>
      </div>
      :
      <div className="mb-8">
      <h2 className="text-lg text-black md:text-xl font-bold mb-4">
          {translate('your_proposals')}
      </h2>
      {proposalData.map((proposal, index) => (
          // Only attach ref to the last element for infinite loading
          <div ref={index === proposalData.length - 1 ? ref : null} key={index}>
              <ProposalCard proposal={proposal} />
          </div>
      ))}
  </div>
    );
};

export default MainProposals;