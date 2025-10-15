const { createSlice } = require("@reduxjs/toolkit");
const { io } = require("socket.io-client");

const socketSlice = createSlice({
        name:'socket',
        initialState:{
            socket:null
        },
        reducers:{
            socketConnectivity:(state,actions)=>{
               
            
                // newSocket.on('connect', () => {
                //     console.log('Socket connected:', newSocket.id);
                //   });
              
                //   newSocket.on('disconnect', () => {
                //     console.log('Socket Disconnected', newSocket.id )
                // })

               state.socket=actions.data.socket 
            }
        }

 

})

export const {socketConnectivity} = socketSlice.actions
export default socketSlice.reducer;