export const Signout = async()=>{
       const authUrl = process.env.NEXT_PUBLIC_IDENTIFICATION_SERVICE
     
     try{
        
     const response = await fetch(`${authUrl}/Signout`,{
        headers:{
            'Content-Type':"application/json"
        },
        method:"GET",
        credentials:"include"
     })
     
     return response;
     
     }catch(err){
        throw Error('Error signing out')
     }

}


