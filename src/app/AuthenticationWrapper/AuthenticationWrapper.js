'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkingUser } from "../store/userSlice";
import { useSocket } from "../Context/socketContext";
import { userInstance } from "../Services/user.service";

const AuthenticationWrapper = ({children})=>{
    const selector = useSelector((state)=>state.user)
    const {connectSocket,disconnectSocket}=useSocket()
    const checkingForUser = async()=>{
      const response = await userInstance.get('/checkingForUser',
        //  {
      //    headers: {
      //      'Content-Type': 'application/json'
      //    },
      //    method: "GET",
      //    credentials: "include"
      //  }
      );
 
       const result = await response.data;
       if(response.status!==200){
        disconnectSocket()
         return {
            status:response.status,
            isUserLoggedIn:false,
         }
       }
     
       connectSocket()
       return {
         status:200,
         userDetails:result.returnValues
       }  

   }
 
   const dispatch = useDispatch()
   const authenticate = async () => {
    const response = await checkingForUser();
    console.log(response);
    
      dispatch(checkingUser(response));
   
  }; 
   useEffect(()=>{
     
      
      // const authenticate = async () => {
      //    const response = await checkingForUser();
      //    console.log(response);
         
      //      dispatch(checkingUser(response));
        
      //  };
   
      
       authenticate()
       

    },[]) 
  // console.log('Authentication Wrapper')
 
 return <>
  
  {children}</>;

}
export default AuthenticationWrapper