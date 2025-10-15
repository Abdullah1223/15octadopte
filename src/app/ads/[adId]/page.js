import JobError from "../../Components/JobError";
// import LoadingSpinner from "../../Components/LoadingSpinner";
import Navbar from "../../Components/Navbar";
// import { Ghost, XCircle } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { FaMapMarkerAlt } from "react-icons/fa";

export default async function  Ads({params}){
   const {adId} = await params
   
     const cookieStore = await cookies();
     const token = await  cookieStore.get('token');
     let responseCode;
     let errorData;
     let loading=true;
    const response = await fetch(`https://adopte.gotdns.ch/api8/adsRedirect/${adId}`,{
       headers:{'Content-Type':'application/json',  Cookie:`token=${token?.value}`},
       method:"GET",
       credentials:"include",
    })
    const result = await response.json()
    console.log(result)
    if(response.status==200){
      responseCode=200;
      loading=false;
      setInterval(()=>{},1000)

    }else if(response.status==400){
       responseCode=400;
       loading=false;
       errorData={
         title: 'Mauvaise requête',
         description:"Une mauvaise requête s'est produite. Veuillez réessayer plus tard !",
         actionText: 'Réessayez',
         actionLink: '/'
       } 
    }else if(response.status==404){
      responseCode=404;
      loading=false;
      errorData = {
         title: 'Annonce introuvable',
         description: "L'annonce demandée est introuvable. Veuillez réessayer plus tard !",
         actionText: 'Réessayez',
         actionLink: '/'
       }
       
    }else{
      responseCode=response.status;
      loading=false;
      errorData = {
         title: 'Erreur du serveur',
         description: "Une erreur du serveur s'est produite. Veuillez réessayer plus tard !",
         actionText: 'Réessayez',
         actionLink: '/'
       }       
    }

    return(
      <>
      <Navbar></Navbar>
     <div className={` ${responseCode!==200 ? "bg-gray-300" : 'bg-white' }  w-full h-full`}>
      
      <div className="flex flex-col justify-center items-center w-full h-[100vh]">
          {
            responseCode!==200?
            <JobError customError={errorData}></JobError>
            :redirect(result.targetUrl)
          } 

      </div>
        
     </div> 
     </>   

        
    )
}