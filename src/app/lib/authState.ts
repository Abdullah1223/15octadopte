export let isRefreshing:boolean;
export let failedQueue:any[]=[];
import axios from "axios";
export const processQueue = (error:any, token:any=null)=>{
  console.log('failedQueue` before',failedQueue)
  failedQueue.forEach(prom=>{
    if(error){
      prom.reject(error)
    }else{
      prom.resolve(token)
    }

  })
 
  failedQueue=[]
 console.log('failedQUEUE after',failedQueue) 
}



export const interceptorAssignment = (instance)=>{

  instance.interceptors.response.use((response)=>{
  console.log('response from job service',response.data)
  return response
}, async error=>{
  const originalRequest = error.config;
  // console.log('error response',error.response)
  // console.log('original request',originalRequest)  
  if(error.response?.status===400 && !originalRequest._retry && error.response.data.type=="not_connected"){{
      originalRequest._retry=true;
      if(isRefreshing){
        console.log('isRRefreshing', isRefreshing)
        return new Promise((resolve,reject)=>{
          failedQueue.push({resolve,reject,instanceName:instance})
        }).then(token=>{
          originalRequest.headers['Authorization']=`Bearer ${token}`;
          return axios(originalRequest);
        }).catch(err=>{
          return Promise.reject(err);
        })
       console.log('is refreshing', isRefreshing) 
      }else{
        isRefreshing=true;
        try{
          const response = await axios.get(`${process.env.NEXT_PUBLIC_IDENTIFICATION_SERVICE}/auth/refresh`,{
            withCredentials:true
          });
          const {accessToken} = response.data;
          instance.defaults.headers['Authorization']=`Bearer ${accessToken}`;
          processQueue(null,accessToken);
          console.log('response from refresh',response)
          return instance(originalRequest);
        }catch(err){
          processQueue(err);
          return Promise.reject(err);
        }finally{
          isRefreshing=false;
        }
      }
    }
  } else{
     console.log('esle error',error)
      return error.response
    }
})

}