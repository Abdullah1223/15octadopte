// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import Navbar from '../Components/Navbar';
// import { useParams } from 'next/navigation';
// import CandidateProfile from '../Components/profileInfoCandidateView';
// import { FaUserSlash } from 'react-icons/fa';
// import JobError from '../Components/JobError';
// import EmployerProfile from '../Components/profileInfoEmployerView';
// import { useSelector } from 'react-redux';

// const ProfilePage = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [isOwner, setIsOwner] = useState(false);
//   const [isFollowed, setIsFollowed] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);
//   const [error, setError] = useState(false);
//   const [errorType, setErrorType] = useState();
//   const [errorData, setErrorData] = useState();
//   const selector = useSelector((state) => state.user)
//   const params = useParams();
//   const userId = selector.userId;
//    console.log('userId',userId)
//   // Memoized fetch function
//   const fetchingUser = useCallback(async () => {
//     console.log('Fetching User Call - Actual API call');
//     try {
//       const response = await fetch(`http://localhost:8001/user/fetch/userInfo/${userId}`, {
//         headers: {
//           'Content-Type': "application/json"
//         },
//         method: "GET",
//         credentials: "include"
//       });

//       const result = await response.json();
//       console.log('API Response:', result);
      
//       if (response.status === 200) {
//         // Batch all state updates together
//         setProfileData(result.userDetails);
//         setIsOwner(result.isOwner);
//         setIsFollowed(result.userDetails.isFollowed);
//       } else if (response.status === 400) {
//         if (result.type === "not_connected") {
//           setError(true);
//           setErrorType("notLoggedIn");
//           setErrorData({
//             icon: FaUserSlash,
//             title: 'Authentification requise',
//             description: 'Veuillez vous connecter pour voir les détails du profil.',
//             actionText: 'Se connecter',
//             actionLink: '/login'
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       setError(true);
//       setErrorData({
//         icon: FaUserSlash,
//         title: 'Erreur réseau',
//         description: 'Échec de la récupération des données du profil. Veuillez réessayer plus tard.',
//         actionText: 'Réessayer',
//         actionLink: window.location.href
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     // Only fetch if we don't have data and aren't already loading
//     if (!profileData && loading) {
//       fetchingUser();
//     }
//   }, [fetchingUser, profileData, loading]);

//   const handleFollow = useCallback(async (id, followStatus) => {
//     try {
//       // Optimistic update
//       setIsFollowed(prev => !prev);
      
//       const followReq = await fetch('http://localhost:8001/user/follow', {
//         headers: {
//           'Content-Type': "application/json"
//         },
//         method: "POST",
//         credentials: "include",
//         body: JSON.stringify({ followStatus: !followStatus, id })  
//       });
      
//       const result = await followReq.json();
//       console.log('Follow result:', result);
      
//       // If API call failed, revert the optimistic update
//       if (followReq.status !== 200) {
//         setIsFollowed(prev => !prev);
//       }
//     } catch (error) {
//       console.error('Follow error:', error);
//       setIsFollowed(prev => !prev);
//     }
//   }, []);

//   const handleMessage = useCallback(() => {
//     console.log('Open message dialog');
//     // Add your actual message functionality here
//   }, []);

//   const handleUpdate = useCallback((updates) => {
//     setProfileData(prev => ({ ...prev, ...updates }));
//   }, []);

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   // Render error state
//   if (error) {
//     return (
//       <div className='flex mt-12 justify-center items-center h-full'>
//         <JobError customError={errorData} />
//       </div>
//     );
//   }

//   // Render profile based on role
//   return (
//     <div>
//       {/* <Navbar /> */}
//       {profileData?.role === "candidate" ? (
//         <CandidateProfile
//           data={profileData}
//           isVisible={isVisible}
//           setIsVisible={setIsVisible}
//           isOwner={isOwner}
//           isFollowed={isFollowed}
//           onFollow={handleFollow}
//           onMessage={handleMessage}
//           onUpdate={handleUpdate}
//         />
//       ) : profileData?.role === "employer" ? (
//         <EmployerProfile
//           data={profileData}
//           isOwner={isOwner}
//           isFollowed={isFollowed}
//           onFollow={handleFollow}
//           onMessage={handleMessage}
//           onUpdate={handleUpdate}
//         />
//       ) : (
//         <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
//           <div className="text-center">
//             <p className="text-gray-600">No profile data found</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default React.memo(ProfilePage);




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
import { useSelector } from 'react-redux';


const MainProfilePage = () => {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>();
  const [isFollowed, setIsFollowed] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>();
  const [ErrorData, setErrorData] = useState<SetErrorInterface | null>(null);
  const [errorType, setErrorType] = useState<string | null>();
  const [localerrorData, setLocalErrorData] = useState<SetErrorInterface | null>(null);
  const {fetchProfileInfo} = useProfile()
  const selector = useSelector((state) => state.user)
  const userId = selector.userId;
  // const params = useParams();
  
  // const userId = params.id as string;
  
  // Memoized fetch function
  const fetchingUser = useCallback(async () => {
    const response = await fetchProfileInfo({userId,setProfileData,setIsOwner,setIsFollowed,setError,setErrorType,setErrorData,setLoading})
  }, [userId]);

  useEffect(() => {
    // Only fetch if we don't have data and aren't already loading
    if (!profileData && loading) {
      fetchingUser();
    }
    
  }, []);

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
