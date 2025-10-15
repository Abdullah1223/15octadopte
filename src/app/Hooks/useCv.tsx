import { toast } from "sonner"
import { fetchSavedCvInterface, fetchUserInfoCvInterface, getUploadCvPresignedInterface, uploadCvInterface, useCvInterface } from "../interfaces/CvInterfaces"
import { fetchCv, getCvProfileInfoCall, getSavedCv, getUploadCvPresigned, uploadCvCall, userInfoCv } from "../Services/cv.service"
import { CvNotFoundErrorMessage, CvServerErrorMessage, CvUnAuthorizedErrorMessage, MainFetchCv404ServerErrorMessage, NotLoggedInErrorMessage } from "../ErrorMessages/errorMessages"
 
export default function useCv():useCvInterface {
   
     const getCv = async(userId:string)=>{
        const response = await fetchCv(userId)
        const result = await response.data
        if(response.status==200){
            window.open(result.url,"__blank")
        }else if(response.status==400){
             toast(CvNotFoundErrorMessage.title,{
                description:CvNotFoundErrorMessage.description
             })            
        }else if(response.status==400){
            toast(CvServerErrorMessage.title, {
                description:CvServerErrorMessage.description
            })
        }else{
            toast(CvServerErrorMessage.title, {
                description:CvServerErrorMessage.description
            })
        }

     }


     const getCvProfileInfo = async({candidateId,data,onUpdate,})=>{

        try{
          
       if(data.Cv==null){
        const response = await getCvProfileInfoCall(candidateId)
         const result = await response.data
       console.log('result',result )
      if(response.status==200){
        window.open(result.url,'__blank')
        let updated = {...data,Cv:{url:result.url}}
        onUpdate(updated)
      }
      }else{
        window.open(data.Cv.url,"__blank")
      }
        }catch(err){
          toast.error('Error Fetching Cv',{
            description:"Error Fetching Cv"
          })
        }

     }
      

     const fetchUserInfoCv = async({cursor,prevDocs,setPageLoading, setUsers, setCursor,setPrevDocs, setHasMore, pageRef}:fetchUserInfoCvInterface)=>{

         try{
            const response = await userInfoCv(cursor,prevDocs)
            console.log('fetch cv response',response)
          const result  = await response.data
           console.log(result)
          if(response.status==200){
            console.log(result)
            setPageLoading(false)
            setUsers((prev)=>[...prev,...result.userData])
            setPrevDocs(
                (prev)=>[...prev,...result.prevDocIds]
            )
            setCursor(result.lastCursor)
            setHasMore(result.hasMore)
            pageRef.current=false;
          }else if(response.status==404){
            setHasMore(false)
            setPageLoading(false)
            toast.error(MainFetchCv404ServerErrorMessage.title, {
                description: MainFetchCv404ServerErrorMessage.description
            })
          }else if(response.status==400){
            toast.error(CvServerErrorMessage.title, {
                description: CvServerErrorMessage.description
            })
          }
         }catch(err){
            toast.error(CvServerErrorMessage.title, {
                description: CvServerErrorMessage.description
            })
            throw Error('Error Fetching User Cvs')
         }

     }

    const fetchSavedCv = async({cursor,prevDocs,setLoading,loading,loadRef,setCvData,setCursor,setHasMore,setSavedCvCount,setPrevDocs}:fetchSavedCvInterface)=>{
        if (loading) return;
        setLoading(true);
        let prevDocsIds;
        if(prevDocs.length==0){
         prevDocsIds = null
        }else{
            prevDocsIds=prevDocs
        }
        try {
          const response = await getSavedCv({cursor:cursor,prevDocs:prevDocsIds});
    
          loadRef.current=true;
          const result = await response.data;
          console.log(result);
          
          if (response.status === 200) {
            // Fix: Spread the savedData array instead of wrapping it in another array
            setCvData((prev) => [...prev, ...result.savedData]);
            setCursor(result.lastCursor);
            setHasMore(result.hasMore);
            setSavedCvCount(result.savedCvCount);
            setPrevDocs((prev)=>[...prev,...result.prevDocsIds])
          }else if(response.status==403){
            setHasMore(false)
            toast.error(CvUnAuthorizedErrorMessage.title, {
                description: CvUnAuthorizedErrorMessage.description
            })
          }else if(response.status==400){
            if(result.type=="not_connected"){
              toast.error(NotLoggedInErrorMessage.title,{
                description:NotLoggedInErrorMessage.description
              })
            }
          }
        } catch (error) {
          toast.error(CvServerErrorMessage.title, {
            description: CvServerErrorMessage.description
          })
          // console.error('Error fetching CV data:', error);
        } finally {
          setLoading(false);
        }
    } 

    const uploadCv = async({fileName,fileSize,fileType,setBackendErrors,pdfBlob,setIsLoading,setShowStatusBar}:uploadCvInterface)=>{
     try{ 
         
      const response = await uploadCvCall({fileName,fileSize,fileType})

       const result = await response.data
       console.log(response)
       console.log(result)
      
      if (response.status!==200) {
        setBackendErrors(result.errors);
        toast.error('Error Uploading',{
          description:"Error Uploading"
        })
      } else {
      
        const cvUploaded = await fetch(result.preSignedUrl, {
            headers: {
              "Content-Type": fileType,
            },
            body: pdfBlob, 
            method: "PUT"
          });
          // console.log('Uploaded')
        if(cvUploaded.ok){
          toast.success('Cv Uploaded Successfully',{
            description:"Cv Uploaded Successfully"
          })
        }
      }
    
    } catch (error) {
      // console.error('Upload failed:', error);
      toast.error('Error Uploading Cv', {
        description: 'Error Uploading Cv'
      })
      // alert('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
      // setShowStatusBar(true)
    }
    }


    const getUploadCvPresignedUrl =async({fileMetadata,setUploadState}:getUploadCvPresignedInterface)=>{
     try{
      
   const response = await getUploadCvPresigned({fileMetadata})

    const result = await response.data
    // console.log(result)
    if(response.status!==200){
      //errors
      const logError = result?.errors?.general||result.message
      

      console.log(logError)
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        error: { general: logError}
      }));
      return {
        uploadUrl:null,
        errors:result
      };
    }else{
      return {
        uploadUrl:result.preSignedUrl,
        errors:null
      }
    }
     }catch(err){
      console.log(err)
      setUploadState(prev=>({
        ...prev,
        isUploading:false,
        error:{general:"Error Uploading"}
      }))

     return {
      uploadUrl:null,
      errors:{
        message:"Error Uploading"
      }
     } 
     }
    }
    return {
        getCv,
        fetchUserInfoCv,
        fetchSavedCv,
        getCvProfileInfo,
        uploadCv,
        getUploadCvPresignedUrl
    }


}