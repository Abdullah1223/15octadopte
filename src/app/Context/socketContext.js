'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';


const SocketContext = createContext(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider=({ children }) => {
  const [socket, setSocket] = useState(null);
  const numport8005 = 'http://localhost:8005/'
  console.log('Socket Provider')
  const connectSocket = () => {
    
    //http://localhost:8005
    const newSocket = io('http://localhost:8005',{
        withCredentials:true,
        auth:{
            token:"token"
        }
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    setSocket(newSocket);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      console.log("Socket Disconnected",socket.id)
      setSocket(null);
    }
  };

//   useEffect(() => {
//     return () => {
//       disconnectSocket(); // Cleanup on unmount
//     };
//   }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket,numport8005 }}>
      {children}
    </SocketContext.Provider>
  );
};
