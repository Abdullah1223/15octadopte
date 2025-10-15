'use client';
// import { cookies } from "next/headers";
import AdsMetricsDashboard from "./AdsMetricsMain";
import { userInstance } from "../Services/user.service";
import { useState } from "react";
import { useEffect } from "react";

   const adsMetricDasboardFetch = async()=>{     
    // console.log('called dashboard')
    // console.log('token',token)
    // console.log('refreshToken',refreshToken)
    try{

     
      const response = await  userInstance.get('https://adopte.gotdns.ch/api1/adsMetricDasboard/fetch',)
    console.log('response',response.data) 
    const result = await response.data
    return{
      status:response.status,
      result:result
    }


    }catch(err){
      return {
        status:500,
        data:null,
        errorMessage:err
      }
    }
  }   


 


const AdsFetchCall = async(token,Cursor,excludeDocsIds)=>{
         
    const response =  await fetch('https://adopte.gotdns.ch/api8/adsMetricDasboard/fetch/ads',{
         headers:{
             'Content-Type':"application/json",
               Cookie:`token=${token?.value}`
         },
         method:'POST',
         body:JSON.stringify({Cursor,excludeDocsIds}),
         credentials:"include"
     })

   const result =  await response.json() 

   return {
     status:response.status,
     result:result
   }
 
}

export default  function AdsMetricsWrapper(){
      const [prevDocIds,setPrevDocIds]=useState([])
      const [lastCursor,setLastCursor]=useState('')
      const [hasMore,setHasMore]=useState()
      const [adsMetricDasboardData,setAdsMetricDashboard]=useState()
    
    const getData = async()=>{
const [adsMetricDasboardData,adsData]=await Promise.all([
       adsMetricDasboardFetch(),
       AdsFetchCall(token,null,null)
    ])
    setAdsMetricDashboard(adsMetricDasboardData) 
    setPrevDocIds(adsData?.result?.prevDocIds)
     setLastCursor(adsData?.result?.lastCursorId)
    setHasMore(adsData?.result?.hasMore)
    }
   
    useEffect(()=>{
      getData();
    },[])

    // getData()

     
    // prevDocIds=adsData.result.prevDocIds;
    // lastCursor=adsData.result.lastCursorId;
    // hasMore=adsData.result.hasMore
    
    // console.log('adsMetric Dashboard',adsMetricDasboardData)
 
    return (
      
        <AdsMetricsDashboard adsData={adsData?.result?.adsData || []} prevDocIdsProp={prevDocIds || []} lastCursorProp={lastCursor || ''} hasMoreProp={hasMore || false} dashboardMetrics={adsMetricDasboardData.result.AdsDashboardData}></AdsMetricsDashboard>
    )
}