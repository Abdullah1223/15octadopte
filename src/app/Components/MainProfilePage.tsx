'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../Components/Navbar';
import { useParams } from 'next/navigation';
import CandidateProfile from '../Components/profileInfoCandidateView';
import JobError from '../Components/JobError';
import EmployerProfile from '../Components/profileInfoEmployerView';
import {Profile} from '../interfaces/profileinterface'
import {SetErrorInterface} from '../interfaces/errorInterface'
import useProfile from '../Hooks/useProfile';
import { FaUserSlash } from 'react-icons/fa';
import { toast } from 'sonner';
import { badRequestErrorProfileInfo, notFoundErrorProfileInfo, serverErrorOccurredProfileInfo } from '../ErrorMessages/errorMessages';
import { userInstance } from '../Services/user.service';


export interface MainProfilePageProps{
    profileDataProp:Profile,
    isOwnerProp:boolean,
    isFollowedProp:boolean,
    isLoading?:boolean,
    errorProp:boolean,
    errorTypeProp:string|null;
}
const MainProfilePage = ({profileDataProp,isOwnerProp,isFollowedProp,isLoading,errorProp,errorTypeProp}:MainProfilePageProps) => {
  const [profileData, setProfileData] = useState<Profile | null>(profileDataProp);
  const [isOwner, setIsOwner] = useState<boolean>(isOwnerProp);
  const [isFollowed, setIsFollowed] = useState<boolean>(isFollowedProp);
  const [loading, setLoading] = useState<boolean>(isLoading || false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(errorProp);
  const [errorType, setErrorType] = useState<string | null>(errorTypeProp);
  const [localerrorData, setLocalErrorData] = useState<SetErrorInterface | null>(null);
  const {fetchProfileInfo} = useProfile()
  const params = useParams();
  const userId = params.id as string;

  // Memoized fetch function
  // const fetchingUser = useCallback(async () => {
  //   const response = await fetchProfileInfo({userId,setProfileData,setIsOwner,setIsFollowed,setError,setErrorType,setErrorData,setLoading})
  // }, [userId]);

  // useEffect(() => {
  //   // Only fetch if we don't have data and aren't already loading
  //   if (!profileData && loading) {
  //     fetchingUser();
  //   }
    
  // }, [fetchingUser, profileData, loading]);

  useEffect(()=>{
    let errorData;
    console.log('errpr',errorType)
    switch(errorType){
      case "NotLoggedIn":

        errorData={
          icon: FaUserSlash,
                             title: 'Authentification requise',
                             description: 'Veuillez vous connecter pour voir les détails du profil.',
                             actionText: 'Se connecter',
                             actionLink: '/login'
        
    }
           break;
    case "Bad Request":


      toast.error(badRequestErrorProfileInfo.title,{
      description:badRequestErrorProfileInfo.description
      })
      errorData={
          icon: FaUserSlash,
          title: 'Erreur réseau',
          description: 'Échec de la récupération des données du profil. Veuillez réessayer plus tard.',
          actionText: 'Réessayer',
          actionLink: '/'}
            break;  
    case "NotFound":

      toast.error(notFoundErrorProfileInfo.title,
        {
          description:notFoundErrorProfileInfo.description
        }
      )
      errorData={
        icon: FaUserSlash,
        title: 'Profil introuvable',
        description: "Le profil utilisateur que vous recherchez n'existe pas ou n'est plus disponible.",
        actionText: 'Retour à l’accueil',
        actionLink: '/'
      }
        break; 
    case "ServerError":

      toast.error(serverErrorOccurredProfileInfo.title,{
        description:serverErrorOccurredProfileInfo.description
      })
      errorData={
        icon: FaUserSlash,
        title: 'Erreur réseau',
        description: 'Échec de la récupération des données du profil. Veuillez réessayer plus tard.',
        actionText: 'Réessayer',
        actionLink: '/'
      }
        break; 
    default:
      break;         
  }
  setLocalErrorData(errorData)
  },[])


  const handleFollow = useCallback(async (id, followStatus) => {
    try {
      // Optimistic update
      setIsFollowed(prev => !prev);
      
      const followReq = await userInstance.post('/user/follow',
        //  {
        // headers: {
        //   'Content-Type': "application/json"
        // },
        // method: "POST",
        // credentials: "include",
        // body: JSON.stringify({ followStatus: !followStatus, id })
        { followStatus: !followStatus, id }  
      // }
    );
      
      const result = await followReq.data;
      console.log('Follow result:', result);
      
      // If API call failed, revert the optimistic update
      if (followReq.status !== 200) {
        setIsFollowed(prev => !prev);
      }
    } catch (error) {
      console.error('Follow error:', error);
      setIsFollowed(prev => !prev);
    }
  }, []);

  const handleMessage = useCallback(() => {
    console.log('Open message dialog');
    // Add your actual message functionality here
  }, []);

  const handleUpdate = useCallback((updates) => {
    setProfileData(prev => ({ ...prev, ...updates }));
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
   
    return (
      <div className='flex mt-12 justify-center items-center h-full'>
        <JobError customError={localerrorData} />
      </div>
    );
  }

  // Render profile based on role
  return (
    <div className='bg-gray-50'>
      {profileData?.role === "candidate" ? (
        <CandidateProfile
          data={profileData}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          isOwnerProp={isOwner}
          isFollowed={isFollowed}
          onFollow={handleFollow}
          onMessage={handleMessage}
          onUpdate={handleUpdate}
        />
      ) : profileData?.role === "employer" ? (
        <EmployerProfile
          data={profileData}
          isOwner={isOwner}
          isFollowed={isFollowed}
          onFollow={handleFollow}
          onMessage={handleMessage}
          onUpdate={handleUpdate}
          userId={userId}
        />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">No profile data found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(MainProfilePage);



// const MainProfilePage = () => {
  
//   const sim = async ()=>{
//     console.log('call running')
//     Promise.all([
//       messageInstance.get('/fetch/chats'),
//       adInstance.post('/adsMetricDasboard/fetch/ads',
//         {Cursor:null,previousDocs:null}
//       ),
//       userInstance.post('/user/follow',{ followStatus: true, id:"64b8f3f4e4b0c9b1a5e4d2c1" }),
//       userInstance.post('/user/follow',{ followStatus: false, id:"64b8f3f4e4b0c9b1a5e4d2c14" }),
      
//       userInstance.post('/user/follow',{ followStatus: false, id:"64b8f3f4e4b0c9b1a5e4d2c14" }),
      
//       userInstance.post('/user/follow',{ followStatus: false, id:"64b8f3f4e4b0c9b1a5e4d2c14" }),
      
//       userInstance.post('/user/follow',{ followStatus: false, id:"64b8f3f4e4b0c9b1a5e4d2c14" }),
//       jobInstance.post('/job/liked',{ jobId:"6842dae1e2f76d207a977294",isLiked:true }),
      
//     ]).then((res)=>{
//       // console.log('responses',res)
//     }).catch((err)=>{
//       // console.log('error',err)
//     })
//   }

//  useEffect(()=>{

//   sim()

//  },[]) 

//   return (
//     <div>MainProfilePage</div>
//   )
// }
// export default MainProfilePage