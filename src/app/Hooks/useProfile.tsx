import { FaUserSlash } from "react-icons/fa";
import { fetchProfileInfoProps, updateProfileInfoEmployerProps, useProfileInterface } from "../interfaces/profileinterface";
import { getUserProfileInfo, updateCandidateProfilePictureCall, updateUserProfileInfo } from "../Services/user.service";
import { toast } from "sonner";
import { errorUpdatingProfile, errorUploadingProfilePicture, NotLoggedInErrorMessage } from "../ErrorMessages/errorMessages";
import { updateCandidateProfileInterface, updateCandidateProfilePictureProps } from "../interfaces/candidateInterface";
import { profileChange } from "../store/userSlice";
import { useDispatch } from "react-redux";

export default function useProfile():useProfileInterface{

 
   async function fetchProfileInfo({userId,setProfileData,setIsOwner,setIsFollowed,setError,setErrorType,setErrorData,setLoading}:fetchProfileInfoProps){

    try{
         const response = await getUserProfileInfo(userId)
    const result =  await response.json()
     
    if (response.status === 200) {
        // Batch all state updates together
        setProfileData(result.userDetails);
        setIsOwner(result.isOwner);
        setIsFollowed(result.userDetails.isFollowed);
      } else if (response.status === 400) {
        if (result.type === "not_connected") {
          setError(true);
          setErrorType("notLoggedIn");
          setErrorData({
            icon: FaUserSlash,
            title: 'Authentification requise',
            description: 'Veuillez vous connecter pour voir les détails du profil.',
            actionText: 'Se connecter',
            actionLink: '/login'
          });
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError(true);
      setErrorData({
        icon: FaUserSlash,
        title: 'Erreur réseau',
        description: 'Échec de la récupération des données du profil. Veuillez réessayer plus tard.',
        actionText: 'Réessayer',
        actionLink: window.location.href
      });
    } finally {
      setLoading(false);
    
    }

   }



   async function updateProfileInfoEmployer({validateField,editingField,editValues,setValidationErrors,data,setIsVisible,onUpdate,setEditModalOpen}:updateProfileInfoEmployerProps){
    const errors = validateField(editingField, editValues);
    console.log('editingField',editingField)
    console.log('editValues',editValues)
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    const updatedVals = await updateUserProfileInfo({data,editingField,editValues})
    
    const result = await updatedVals.data
    if(updatedVals.status==200){
        setIsVisible(true)
        // setToastMessage(result.Message)
        // setToastType('success')
        toast.success("Updated ",{
          description:result.Message
        })
        onUpdate(editValues);
        setEditModalOpen(false);
        setValidationErrors({});
    }else if(updatedVals.status==400){
      if(result.type=="not_connected"){
        
        toast.error(NotLoggedInErrorMessage.title,{
          description: NotLoggedInErrorMessage.description
        })
        
      }else{
        setIsVisible(true)
        // setToastMessage(result?.errors?.general || result?.message)
        toast.error(result?.errors?.general || result?.message)
        setValidationErrors({
         [result.field]:result.errors.general
        })
      }
       
    }
   }


 async function updateCandidateProfilePicture({fileInfo,file,setEditValues,editValues,onUpdate,dispatch}:updateCandidateProfilePictureProps){
  try{
    
    console.log('fileInfo',fileInfo)
    const response = await updateCandidateProfilePictureCall({fileInfo})
    const result = await response.data;
    console.log('response status ',response.status)
      if(response.status==200){
        
    const profilePicture = await fetch(result.preSignedUrl, {
              headers: {
                "Content-Type": fileInfo.type,
              },
              body: file, 
              method: "PUT"
            });      
    if(profilePicture.status==200){
      toast.success('Profile Updated',{
        description:"Congragulations Your Profile Picture Has Been Updated"
      })
   const imageUrl = URL.createObjectURL(file)
   const updatedVals = {...editValues,profilePicture:{url:imageUrl}}
   onUpdate(updatedVals)

    dispatch(profileChange({picture:imageUrl}))

    }else{
    
      toast.error(errorUploadingProfilePicture.title,{
      description:errorUploadingProfilePicture.description
    })
    }    

      
  }else if(response.status==400){
    if(result.type=="not_connected"){
      toast.error(NotLoggedInErrorMessage.title,{
        description:NotLoggedInErrorMessage.description
      })
    }
  }
  else{

    toast.error(errorUploadingProfilePicture.title,{
      description:errorUploadingProfilePicture.description
    })
      }

  }catch(err){
    console.log('err',err)
    toast.error(errorUploadingProfilePicture.title,{
      description:errorUploadingProfilePicture.description
    })
    // throw Error('Eror At Uploading File')
  }

 } 

 async function updateCandidateProfile({editingField,editValues,setExperiences,experiences,data,setIsVisible,onUpdate,setEditModalOpen,setValidationErrors}:updateCandidateProfileInterface){


   try {
    
        if (editingField === 'addExperience') {
        const newExperience = { ...editValues, id: Date.now() };
        setExperiences([...experiences, newExperience]);
        
        // Send to backend
        await fetch('/api/candidate/add-experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ candidateId: data._id, experience: newExperience })
        });
      } else {
      //   // Send to backend
      //   // console.log(editingField)
      // const updatedVals = await fetch('http://localhost:8001/update/user/userProfile', {
      //     method: 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ 
      //       candidateId: data._id, 
      //       field: editingField, 
      //       value: editValues 
      //     }),
      //     credentials:'include'
      //   });
const updatedVals = await updateUserProfileInfo({data,editingField,editValues})
      const result = await updatedVals.data
        // console.log(result)
        if(updatedVals.status==200){
            // setIsVisible(true)
           toast.success("Updated ",{
          description:result.Message
        })
       
      setEditModalOpen(false);          
        if (onUpdate) onUpdate(editValues);
          
      
      }else if(updatedVals.status==400){
      if(result.type=="not_connected"){
        
        toast.error(NotLoggedInErrorMessage.title,{
          description: NotLoggedInErrorMessage.description
        })
        
      }else{
        // setToastMessage(result?.errors?.general || result?.message)
        toast.error(result?.errors?.general || result?.message)
        setValidationErrors({
         [result.field]:result.errors.general
        })
      }

      }
      }
      
    } catch (error) {
      // console.error('Error saving:', error);
      toast.error(errorUpdatingProfile.title,{
        description:errorUpdatingProfile.description
      })
    }

 }
   
   return {
    fetchProfileInfo,
    updateProfileInfoEmployer,
    updateCandidateProfilePicture,
    updateCandidateProfile 
  }


}