'use client';
import { Provider } from "react-redux"
import { store } from "./store"
import { useRef } from "react";

export default function ReduxProvider({children}){
   console.log('Redux Provider')
   const t1=performance.now()
    const storeRef = useRef();
    if (!storeRef.current) {
      storeRef.current = store; // Create store once
    }
    const t2=performance.now()
    console.log('redux  timing = ' , t2-t1)
    return <Provider store={storeRef.current}>{children}</Provider>;
   
   
}