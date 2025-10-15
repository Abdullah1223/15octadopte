// 'use client';
// import { useEffect, useState } from "react";
// import { useTranslation } from "../Context/TranslationContext.";
// import NotificationList from "./NotificationList";

// export default function Notifications() {
//   const { translate } = useTranslation();
//   const [notifications,setNotifications]=useState([])
//    const [cursor,setCursor]=useState(null)
//   const makingReq  = async(cursor)=>{
//     console.log('req started')
//     const response = await fetch(`http://localhost:8004/notifications/fetch/${cursor}`,{
//       headers:{
//         'Content-Type':'Application/json'
//       },
//       method:"GET",
//       credentials:"include"
//     })
//    const result = await response.json()
//    if(response.status==200){
//     console.log(result)
//     setNotifications((prev)=>[...prev,...result.Notifications])
//     setCursor(result.lastCursor)
//    }
//   }

//   useEffect(()=>{
//   console.log('request ran')
//    makingReq(cursor)
//   },[])

//   const notificationsDummy = [
//     {
//       type: translate('job_proposal'),
//       title: translate('Job proposal for unisex has been accepted'),
//       description: translate('You job proposal has been accepted by shiekh solutions for unisex barber'),
//       actionText: translate('Click Here To See more'),
//       time: '24 feb 2025 at 9:30pm',
//     },
//     {
//       type: 'Message',
//       title: translate('Shiekh Solutions Has Sent You The Message'),
//       description: translate('Sheikh Solutions Has Sent You The Message_2'),
//       actionText: translate('Click Here To Reply Him'),
//       time: '24 feb 2025 at 9:30pm',
//     },
//     {
//       type: translate('New Article'),
//       title: translate('New Article Is Published About Hair Style'),
//       description: translate('New Article Is Published By Shiekh Solutions About Hair Style'),
//       actionText: translate('Click Here To See more'),
//       time: '24 feb 2025 at 9:30pm',
//     },
//   ];

//   return (
//     <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
//       <NotificationList notifications={notifications} />
//     </div>
//   );
// }


'use client';
import { useSocket } from "../Context/socketContext";
import { useTranslation } from "../Context/TranslationContext.";
import useNotifications from "../Hooks/useNotifications";
import NotificationList from "./NotificationList";
import { useState, useEffect } from 'react';

const Notifications = ()  =>{
  const { translate } = useTranslation();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allNotifications, setAllNotifications] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor,setCursor]=useState(null)
  const [prevDocs,setPrevDocs]=useState([])
  const {getNotifications} = useNotifications()
  const {socket}=useSocket()
  // Sample notifications data - replace this with your actual data fetching logic

    // Simulate API pagination (3 items per page)

  const loadMoreNotifications = async (cursor,prevDocs) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // Simulate API delay
      console.log('req started')
   await getNotifications({cursor,prevDocs,setAllNotifications,setCursor,setHasMore,setPrevDocs})
      
    } catch (error) {
      console.error('Error loading more notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    
    loadMoreNotifications(cursor,prevDocs)
   
  }, []);

  useEffect(()=>{
    socket?.on("new_Notification",(data)=>{
     console.log('newNotifications',data)
      setAllNotifications((prev) => {
        const exists = prev.some((notification) => notification._id === data._id);
        if (!exists) {
          return [ ...prev,data];
        }
        return prev;
      });

    })

    return () => {
      socket?.off("new_Notification");
    }; 
},[socket])

  return (
    <div className="flex-1 h-screen  bg-white">
      <NotificationList 
        notifications={allNotifications}
        onLoadMore={loadMoreNotifications}
        hasMore={hasMore}
        isLoading={isLoading}
        lastCursor={cursor}
        prevDocs={prevDocs}
      />
    </div>
  );
}

export default Notifications;