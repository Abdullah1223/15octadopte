import { useRouter } from "next/navigation";
import { Signout } from "../Services/auth.service"
import { toast } from "sonner";
import { signedOutError, signOutBadRequestError, signOutServerError } from "../ErrorMessages/errorMessages";
import { useDispatch } from "react-redux";
import {changeState} from '../store/userSlice'
import {useSocket} from '../Context/socketContext'
interface useAuthInterface{
    logOut:(isRedirect?:boolean)=>Promise<Response>
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

    return{
        logOut
    }
}