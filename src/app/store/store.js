import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import chatSlice from './ChatInfo'
export const store = configureStore({
  reducer: {
    user:userSlice,
    chat:chatSlice
  },
})
