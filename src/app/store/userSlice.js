// const { createSlice } = require("@reduxjs/toolkit");

// const userSlice = createSlice({
//     name:"userSlice",
//     initialState:{
//         isUserLoggedIn:null,
//         userId:null,
//         username:null,
//         email:null,
//         role:null
//     },
//     reducers:{
//         checkinUser:async(state,actions)=>{
//            const response = await fetch('https://adopte.gotdns.ch/api1/checkingForUser',{
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             method:"GET",
//             credentials:"include"
//            })
//            const result  = await response.json()
//            if(response.status!==200){
//             state.isUserLoggedIn=false
//            }
//           if(response.status==200){
//             state.isUserLoggedIn=true
//             state.email=result.email,
//             state.role=result.role,
//             state.userId=result.userId,
//             state.username=result.username
//           }   

//         }
//     }
// })

// export default userSlice.reducer;
// export const {checkinUser} = userSlice.actions;


// store/userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
    isUserLoggedIn: null,
    userId: null,
    name:null,
    username: null,
    email: null,
    role: null,
    profilePicture:null,
  },
  reducers: {
    // You can add normal reducers here if needed
    profileChange:(state,actions)=>{
      console.log('actions',actions)
      if(state.isUserLoggedIn==true){
        
      state.profilePicture=actions.payload.picture
    }
    },
    changeState:(state,actions)=>{
      console.log('changeState Worked')
      state.isUserLoggedIn=actions.payload.isUserLoggedIn,
      state.email=actions.payload.email,
      state.role=actions.payload.role,
      state.userId=actions.payload.userId,
      state.username=actions.payload.username
      state.profilePicture=actions?.payload?.profilePicture || null
      state.name=actions.payload.name
    },
    checkingUser:(state,actions)=>{
      console.log(actions.payload)  
      if(actions.payload.status!==200){
       state.isUserLoggedIn=false
      }else{
        console.log(actions)
       state.email=actions.payload.userDetails.email,
       state.isUserLoggedIn=actions.payload.userDetails.isUserLoggedIn,
       state.role=actions.payload.userDetails.role,
       state.userId=actions.payload.userDetails.userId,
       state.username=actions.payload.userDetails.username ,
       state.profilePicture=actions?.payload?.userDetails?.profilePicture ||  null , 
       state.name=actions.payload.userDetails.name
      }
    }
},
 
});

// ✅ Export the reducer (default) and async thunk
export const {checkingUser,changeState,profileChange}=userSlice.actions
export default userSlice.reducer;
