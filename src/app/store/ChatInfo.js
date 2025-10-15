const { createSlice } = require("@reduxjs/toolkit");

const chatSlice = createSlice({
        name:'chat',
        initialState:{
            chats:[]
        },
        reducers:{
          addChat:(state,actions)=>{
            console.log('actions',actions)
            for(const i of actions.payload){
              state.chats.push({
                chatId:i.chatId,
                opponentId:i.opponentId,
                opponentName:i.opponentDetails.firstName,
                avatar_url:i.opponentDetails?.profilePicture?.url || null
              })
            }
            //state.chats.push(actions.payload)
          },
         findChat:(state,actions)=>{
           const chatFound= state.chats.find(chat=>chat.chatId===actions.payload.chatId)
            return  chatFound;             
         }
         
        }


})

export const {addChat,findChat } = chatSlice.actions
export default chatSlice.reducer