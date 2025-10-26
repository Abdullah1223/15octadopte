import { toast } from "sonner";
import { getNotificationsProps, UseNotificaitonInterface } from "../interfaces/NotificationInterface";
import { fetchNotifications } from "../Services/notification.service";
import { notificationBadRequestError, notificationInternalServerError, notificationNotFoundError, notificationServerError, NotLoggedInErrorMessage } from "../ErrorMessages/errorMessages";

export default function useNotifications():UseNotificaitonInterface{
         
    const getNotifications=async({cursor,prevDocs,setAllNotifications,setHasMore,setCursor,setPrevDocs}:getNotificationsProps)=>{
     try{
        
        const response = await fetchNotifications(cursor,prevDocs)
        const result = await response.data
        if(response.status==200){
            console.log(result)
           // setAllNotifications((prev)=>[...prev,...result.Notifications])
           setAllNotifications((prev) => {
             const existingIds = prev.map((n) => n._id);
             const newNotifications = result.Notifications.filter((n) => !existingIds.includes(n._id));
             return [ ...prev,...newNotifications];
           });
           setHasMore(result.hasMore)
           setCursor(result.lastCursor)
           setPrevDocs((prev)=>[...prev,...result.prevDocIds])
           console.log('result',result)
          }else if(response.status==400){
             if(result.type=="not_connected"){
                toast.error(NotLoggedInErrorMessage.title,{
                    description:NotLoggedInErrorMessage.description
                })

             }else {
                toast.error(notificationBadRequestError.title,{
                    description:notificationBadRequestError.description,
                })
             }
            
          }else if(response.status==404){
           console.log('cursor',cursor)
           console.log('prevDocs',prevDocs)
            setHasMore(false)
            toast.error(notificationNotFoundError.title,{
                description:notificationNotFoundError.description
            })
            
          }else {

            toast.error(notificationInternalServerError.title,{
                description:notificationInternalServerError.description
            })

          }

     }catch(err){

        toast.error(notificationServerError.title,{
            description:notificationServerError.description
        })

     }

    }
    return {
        getNotifications
    }
}