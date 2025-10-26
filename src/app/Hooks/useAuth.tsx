import { useRouter } from "next/navigation";
import { Signout } from "../Services/auth.service"
import { toast } from "sonner";
import { AlreadyDisabledTwoFactor, AlreadyEnabledTwoFactor, badRequestFetchingSecuritySettings, emailAlreadyChangedError, emailAlreadyExists, errorOccurredVerifyingPassword, invalidCode, invalidOtp, NotLoggedInErrorMessage, notVerified, oldPasswordMatchEnterNew, OTPAlreadySentChangeEmail, OtpAlreadySentDisableTwoFactor, passwordDontMatch, serverErrorChaningEmail, serverErrorFetchingSecuritySettings, serverErrorWhileChangingPassword, serverErrorWhileTwoFactor, signedOutError, signOutBadRequestError, signOutServerError, userNotFound } from "../ErrorMessages/errorMessages";
import { useDispatch } from "react-redux";
import {changeState} from '../store/userSlice'
import {useSocket} from '../Context/socketContext'
import { changeEmailCall, changePasswordCall, enableTwoFactorCall, getSecuritySettingsCall, verifyChangeEmailOtpCall, verifyCurrentPasswordCall, verifyDisable2FACall, verifyTwoFactorCall } from "../Services/user.service";
import { Dispatch, SetStateAction } from "react";
import { changePasswordFormData, STEPS } from "../Components/Dialogs";
interface fetchSecuritySettingsInterface{
  setError:Dispatch<SetStateAction<boolean>>,
  setIsLoading:Dispatch<SetStateAction<boolean>>,
  setIs2FAEnabled:Dispatch<SetStateAction<boolean>>
}
interface verifyDisable2FAInterface{
  verificationCode:string,
  setIsOpen:Dispatch<SetStateAction<boolean>>,
  setVerificationCode:Dispatch<SetStateAction<string>>,
  setIs2FAEnabled:Dispatch<SetStateAction<boolean>>,
  is2FAEnabled:boolean
}
interface verifyCurrentPassword{
  currentPassword:string,
  setIsLoading:Dispatch<SetStateAction<boolean>>,
  setIsOpen:Dispatch<SetStateAction<boolean>>,
  setError:Dispatch<SetStateAction<string>>,
  setResetToken:Dispatch<SetStateAction<string | null>>
  setCurrentStep:Dispatch<SetStateAction<string>>,
  setFormData:Dispatch<SetStateAction<changePasswordFormData>>
}
interface changePassword{
  password:string,
  confirmPassword:string,
  token:string,
  setIsLoading:Dispatch<SetStateAction<boolean>>,
  setIsOpen:Dispatch<SetStateAction<boolean>>,
  setError:Dispatch<SetStateAction<string>>,
  setResetToken:Dispatch<SetStateAction<string | null>>
  setCurrentStep:Dispatch<SetStateAction<string>>,
  setFormData:Dispatch<SetStateAction<changePasswordFormData>>
  
}
interface useAuthInterface{
    logOut:(isRedirect?:boolean)=>Promise<Response>
    changeEmail:(email:string,setError:Dispatch<SetStateAction<{}>>,setIsOtp:Dispatch<SetStateAction<boolean>>)=>Promise<void>
    verifyChangeEmailOtp:(email:string,code:string,setError:Dispatch<SetStateAction<{}>>,setIsOtp:Dispatch<SetStateAction<boolean>> )=>Promise<void>
    enableTwoFactor:(isTwoFactor:boolean,setIsOpen:Dispatch<SetStateAction<boolean>>,setQrCode:Dispatch<SetStateAction<string>>,is2FAEnabled:boolean,setIs2FAEnabled:Dispatch<SetStateAction<boolean>>,setDialogType:Dispatch<SetStateAction<string>>)=>Promise<void>
    verifyTwoFactor:(verificationCode:string,setIs2FAEnabled:Dispatch<SetStateAction<boolean>>,is2FAEnabled:boolean,
  setIsOpen:Dispatch<SetStateAction<boolean>>,
  setVerificationCode:Dispatch<SetStateAction<string>>,)=>Promise<void>,
    fetchSecuritySettings:(props:fetchSecuritySettingsInterface)=>Promise<void>,
    verifyDisable2FA:(props:verifyDisable2FAInterface)=>Promise<void>
    verifyCurrentPassword:(props:verifyCurrentPassword)=>Promise<void>
    changePassword:(props:changePassword)=>Promise<void>
  }
export default  function useAuth():useAuthInterface {
     const navigate = useRouter()
    const dispatch = useDispatch()
    const {disconnectSocket} = useSocket()
    const logOut = async(isRedirect=false):Promise<Response>=>{
        try{
            const response  = await Signout();
            console.log('response', response)
            const result = await response.json()
            if(response.status==200){
               if(isRedirect){
                navigate.push('/')
               }
              toast.success('Signed Out',{
                description:"You Have Been Signedout Successfully"
              })
              disconnectSocket()
              dispatch(changeState({
                isUserLoggedIn:false,
                email:null,
                role:null,
                userId:null,
                username:null,
                profilePicture:null,
                name:null
            }))  
            }else if(response.status==400){
              if(result.type=="not_connected"){
                toast.error(signedOutError.title, {
                  description: signedOutError.description,
                })
              }
            }
            else{
                console.log('error', response.status)
                toast.error(signOutBadRequestError.title, {
                    description: signOutBadRequestError.description,
                })
            }
         return response;
        }catch(err){
            console.log('err' , err)
            toast.error(signOutServerError.title, {
                description: signOutServerError.description,
            })
        }
    } 


    const changeEmail = async(email:string,setError:Dispatch<SetStateAction<{}>>,setIsOtp:Dispatch<SetStateAction<boolean>>)=>{
          try{

                   const response = await changeEmailCall(email)
                   const result = await response.data;
                   if(response.status==200){
                    setIsOtp(true)
                    return;
                   }else if(response.status==400){
                     if(result?.errors?.type=="not_connected"){
                      toast.error(NotLoggedInErrorMessage.title,{
                        description:NotLoggedInErrorMessage.description
                      })
                      return;
                     }
                    
                     if(result.errorType=="already_sent"){
                     
                      setIsOtp(true)
                      toast.error(OTPAlreadySentChangeEmail.title,{
                        description:OTPAlreadySentChangeEmail.description
                      })

                     return;
                     }else if(result.errors.Email){
                      if(result.errorType=="email_already_exists"){
                       setError((prev)=>({...prev,emailError:"Email Already Exists"})) 
                       return;
                      }else{
                      //  toast.error() 
                       setError((prev)=>({...prev,emailError:"Please Enter Valid Email Address"})) 
                       return;
                      }
                     }
                    
                     if(result.errorType=="invalid_values"){
            toast.error(serverErrorChaningEmail.title,{description:serverErrorChaningEmail.description})
            return;
                     } 

                   }else {
            toast.error(serverErrorChaningEmail.title,{description:serverErrorChaningEmail.description})
                   }
                   
          }catch(err){
            console.log('error at useauth changeemail',err)
            toast.error(serverErrorChaningEmail.title,{description:serverErrorChaningEmail.description})
          }
      
    }

   const verifyChangeEmailOtp = async(email:string,code:string,setError:Dispatch<SetStateAction<{}>>,setIsOtp:Dispatch<SetStateAction<boolean>>)=>{
        try{
           const response = await verifyChangeEmailOtpCall(email,code)
         console.log('response',response)
         const result = await response.data;
         if(response.status==200){
                 toast.success('Email Changed',{description:"Congragulations,Your email has been changed"})
                 setIsOtp(false)
         }else if(response.status==400){
          if(result.errors.type=="not_connected"){
            toast.error(NotLoggedInErrorMessage.title,{description:NotLoggedInErrorMessage.description})
           return;
          }
         
          if(result.errorType=="invalid_values"){
            toast.error(serverErrorChaningEmail.title,{description:serverErrorChaningEmail.description})
            return;
          }

          if(result.errorType=="invalid_otp"){
            setError((prev)=>({...prev,codeError:"Invalid Otp"}))
            return;
          }

          if(result.errorType=="email_changed"){
            toast.error(emailAlreadyChangedError.title,{description:emailAlreadyChangedError.description})
            return;
          }

          if(result.errorType=="already_exists"){
            toast.error(emailAlreadyExists.title,{description:emailAlreadyExists.description})
            return;
          }

          // if()



         }else if(response.status==403){
            setError((prev)=>({...prev,codeError:"Invalid Otp"}))
            return;  
         }else {

            toast.error(serverErrorChaningEmail.title,{description:serverErrorChaningEmail.description})
            return;
         }
        }catch(err){
          console.log('error at verifyChange Email Otp',err)
          
        }
   }

   const enableTwoFactor = async(isTwoFactor:boolean,setIsOpen:Dispatch<SetStateAction<boolean>>,setQrCode:Dispatch<SetStateAction<string>>,is2FAEnabled:boolean,setIs2FAEnabled:Dispatch<SetStateAction<boolean>>,setDialogType:Dispatch<SetStateAction<string>>)=>{
    try{
      console.log('isTwoFactor',isTwoFactor)
      const response = await enableTwoFactorCall(isTwoFactor)
      const result = await response.data;
        const dialogType = isTwoFactor ? 'enable_otp' : 'disable_otp'   

      console.log('respnse',response.status)
      if(response.status==200){
        if(isTwoFactor){
               setQrCode(result.data.qrCode) 
            }
               setIsOpen(true)
               setDialogType(dialogType)
              //  setQrCode(result.data.qrCode) 
              //  setIs2FAEnabled(!is2FAEnabled)
      }else if(response.status==400){
        if(result.errors.type=="not_connected"){
          toast.error(NotLoggedInErrorMessage.title,{description:NotLoggedInErrorMessage.description})
        }
        if(result.errorType=="already_sent"){
          setIsOpen(true)
          setDialogType(dialogType)
          toast.error(OtpAlreadySentDisableTwoFactor.title,{description:OtpAlreadySentDisableTwoFactor.description})
        }
      }else if(response.status==403){
        let ForbiddenError = isTwoFactor ? AlreadyEnabledTwoFactor : AlreadyDisabledTwoFactor
        toast.error(ForbiddenError.title,{description:ForbiddenError.description})
      }else if(response.status==404){
        toast.error(userNotFound.title,{description:userNotFound.description})
      }
      else{
        toast.error(serverErrorWhileTwoFactor.title,{description:serverErrorWhileTwoFactor.description})
      }

    }catch(err){
      console.log('err',err)
        toast.error(serverErrorWhileTwoFactor.title,{description:serverErrorWhileTwoFactor.description})
    }
   }

   const verifyTwoFactor = async(verificationCode:string,setIs2FAEnabled:Dispatch<SetStateAction<boolean>>,is2FAEnabled:boolean,
  setIsOpen:Dispatch<SetStateAction<boolean>>,
  setVerificationCode:Dispatch<SetStateAction<string>>,)=>{

    try{

        const response = await verifyTwoFactorCall(verificationCode)
        const result = await response.data;
        if(response.status==200){
               setIs2FAEnabled(!is2FAEnabled)
               setIsOpen(false)
               setVerificationCode('')
        } else if(response.status==400){
           if(result.errors.type=="not_connected"){
            toast.error(NotLoggedInErrorMessage.title,{description:NotLoggedInErrorMessage.description})
            return
           } 
           if(result.errorType=="invalid_values"){
            toast.error(serverErrorWhileTwoFactor.title,{description:serverErrorWhileTwoFactor.description})
            return;
           }

        }else if(response.status==403){
          if(result.errorType=="invalid_code"){
           toast.error(invalidCode.title,{description:invalidCode.description})
           return; 
          } else{
          toast.error(AlreadyEnabledTwoFactor.title,{description:AlreadyEnabledTwoFactor.description})
           return;
          }
        }else if(response.status==404){
           toast.error(userNotFound.title,{description:userNotFound.description})
           return ;  
        }else if(response.status==500){
            toast.error(serverErrorWhileTwoFactor.title,{description:serverErrorWhileTwoFactor.description})
             
        }
        
    }catch(err){

            toast.error(serverErrorWhileTwoFactor.title,{description:serverErrorWhileTwoFactor.description})
             return;

    }
     
   }

   const fetchSecuritySettings = async({setError,setIsLoading,setIs2FAEnabled})=>{
    try{
      setIsLoading(true)  
      const response  = await getSecuritySettingsCall()
      const result = await response.data;
      console.log('result',result)
      if(response.status==200){
        setError(false)
        setIsLoading(false)
        setIs2FAEnabled(result.data.findUser.isTwoFactor)

      }else if(response.status==400){
           if(result?.errors?.type=="not_connected"){
            toast.error(NotLoggedInErrorMessage.title,{description:NotLoggedInErrorMessage.description})
            setError(true)
            setIsLoading(false)
            return;
           }

         toast.error(badRequestFetchingSecuritySettings.title,{description:badRequestFetchingSecuritySettings.description})  
         return;
      }else if(response.status==404){
        setError(true)
        setIsLoading(false)
       toast.error(userNotFound.title,{description:userNotFound.description}) 
      }else{
        setError(true)
        setIsLoading(false)
      } 

    }catch(err){

      setError(true)
      setIsLoading(false)
      toast.error(serverErrorFetchingSecuritySettings.title,{description:serverErrorFetchingSecuritySettings.description})

    }
   }

   const verifyDisable2FA = async({verificationCode,setIsOpen,setVerificationCode,setIs2FAEnabled,is2FAEnabled}:verifyDisable2FAInterface)=>{
    
    try{

      const response = await verifyDisable2FACall(verificationCode)
      const result = await response.data;

      console.log('response',response)
     
      if(response.status==200){
           setIs2FAEnabled(!is2FAEnabled)
toast.success('Authentification à deux facteurs désactivée', { description: "L’authentification à deux facteurs a été désactivée" })
   setIsOpen(false)
   setVerificationCode('')
}else if(response.status==400){
         if(result?.errors?.type=="not_connected"){
          toast.error(NotLoggedInErrorMessage.title,{description:NotLoggedInErrorMessage.description})
          return; 
        }
        if(result.errorType=="already_disabled"){
          toast.error(AlreadyDisabledTwoFactor.title,{description:AlreadyDisabledTwoFactor.description})
          return;
        }
        if(result.errorType=="invalid_values"){
          toast.error(serverErrorWhileTwoFactor.title,{description:serverErrorWhileTwoFactor.description})
          return;
        }


      }else if(response.status==403){
         if(result.errorType=="invalid_otp"){
          toast.error(invalidOtp.title,{description:invalidOtp.description})
          return;
         }   
      }else if(response.status==404){

        toast.error(userNotFound.title,{description:userNotFound.description})
        return;

      }else if(response.status==500){
          toast.error(serverErrorWhileTwoFactor.title,{description:serverErrorWhileTwoFactor.description})

      return;
      }
    }catch(err){
      console.log('Error at / use auth',err)
    toast.error(serverErrorWhileTwoFactor.title,{description:serverErrorWhileTwoFactor.description})
    return;
    }

   }


   const verifyCurrentPassword = async({
     currentPassword,
     setIsLoading,
     setIsOpen,
     setResetToken,
     setError,
     setCurrentStep,
     setFormData
   }:verifyCurrentPassword)=>{

    try{
      setError('')
      setIsLoading(true)
      const response = await verifyCurrentPasswordCall(currentPassword)
      const result =await response.data;
      console.log('result',result)
      if(response.status==200){
        toast.success('Félicitations', { description: "Votre mot de passe correspond" })
   
        setResetToken(result.data.token)
           setCurrentStep(STEPS.NEW_PASSWORD_SETUP)

           setFormData((prev)=>({...prev,currentPassword:''}))

           return; 
      }else if(response.status==400){

        if(result.errors.type=="not_connected"){
          setError('Please Login')
          toast.error(NotLoggedInErrorMessage.title,{description:NotLoggedInErrorMessage.description})
          return;
        }
        if(result.errorType=="invalid_values"){
          setError('Invalid Values Bad Request')
          toast.error(errorOccurredVerifyingPassword.title,{description:errorOccurredVerifyingPassword.description})
          return;
        }
       
        if(result.errorType=="operation_failed"){
          setError('Please Try Again Later!')
                    toast.error(errorOccurredVerifyingPassword.title,{description:errorOccurredVerifyingPassword.description})
          return;
        }
         
      }else if(response.status==403){
           if(result.errorType=="already_sent"){
            // toast.error()
            setError('Already In Progress')
            setResetToken(result?.data?.token)
            setCurrentStep(STEPS.NEW_PASSWORD_SETUP)
            return;
           }
           if(result.errorType=="not_verified"){
            setError('You Are Not Verified')
            toast.error(notVerified.title,{description:notVerified.description})
            return;
           }

          if(result.errorType=="password_mismatch"){
            setError('Your Password Do Not Match')
            toast.error(passwordDontMatch.title,{description:passwordDontMatch.description})
            return;
          } 


      }else {
          toast.error(errorOccurredVerifyingPassword.title,{description:errorOccurredVerifyingPassword.description})
          return;  
      }
      // console.log('response',)
    }catch(err){
      setError('Try Again Later')  
      toast.error(errorOccurredVerifyingPassword.title,{description:errorOccurredVerifyingPassword.description})
        return;  
    }finally{
      setIsLoading(false)
    }

   }

   const changePassword = async({password,confirmPassword,setIsLoading,setIsOpen,setError,setResetToken,setCurrentStep,setFormData,token}:changePassword)=>{
       console.log('token',token)
    try{

      const response = await changePasswordCall(password,confirmPassword,token)
     const result = await response.data;
     console.log('result',result)
     if(response.status==200){
      toast.success('Félicitations', { description: "Mot de passe modifié" })
      setIsOpen(false)
      setResetToken(null)
      setError('')
      setIsLoading(false)
      setFormData({confirmPassword:"",currentPassword:"",newPassword:"",otp:""})  
     }else if(response.status==400){
      if(result?.errors.type=="not_connected"){
        toast.error(NotLoggedInErrorMessage.description,{description:NotLoggedInErrorMessage.description})
        setError(`${NotLoggedInErrorMessage.description}`)
        return;
      } 
      if(result.errorType=="invalid_values"){
        
        toast.error(`Invalid Values`,{description:result.errors.general})
        setError(result.errors.general)
        return;
      }
      
     }else if(response.status==403){
        if(result.errors.errorType=="not_verified"){
          toast.error(notVerified.title,{description:notVerified.description});
          setError(notVerified.description)
          return;
        }
        if(result.errors.errorType=="same_password"){
          toast.error(oldPasswordMatchEnterNew.title,{description:oldPasswordMatchEnterNew.description})
          setError(oldPasswordMatchEnterNew.description)
          return;
        }
        if(result.errors.errorType=="invalid_code"){
          toast.error(invalidCode.title,{description:invalidCode.description});
          setError(invalidCode.description)
          return;
        }

     }else if(response.status==500){

       toast.error(serverErrorWhileChangingPassword.title,{description:serverErrorWhileChangingPassword.description}) 
       setError(serverErrorWhileChangingPassword.description)
       return; 
     }
    }catch(err){
      console.log('Error At /services/useAuth',err)
      
       toast.error(serverErrorWhileChangingPassword.title,{description:serverErrorWhileChangingPassword.description}) 
       setError(serverErrorWhileChangingPassword.description)
       return;
    }

   }

    return{
        logOut,
        changeEmail,
        verifyChangeEmailOtp,
        enableTwoFactor,
        verifyTwoFactor,
        fetchSecuritySettings,
        verifyDisable2FA,
        verifyCurrentPassword,
        changePassword
    }
}