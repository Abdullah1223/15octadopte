import { toast } from "sonner";
import { saveUserFav } from "../Services/user.service";
import { errorSavingUser, errorUnsavingUser } from "../ErrorMessages/errorMessages";

export  function useUser(){


    const saveUser=async({userId,toSave,setUsers})=>{
       let errorInstance;
      errorInstance = toSave ==true ? errorSavingUser  :  errorUnsavingUser;
   
        try{


        setUsers((prev) =>
        prev.map((user, i) =>
          user._id.toString() == userId.toString() ? { ...user, isSaved: toSave } : user
        )
      );
 
      const response = await saveUserFav({userId,toSave})
      const result = await response.data;
      if(response.status!==200){

setUsers((prev) =>
        prev.map((user, i) =>
          user._id.toString() == userId.toString() ? { ...user, isSaved: !toSave } : user
        )
      );

      toast.error(errorInstance.title,{
        description:errorInstance.description
      })  
    }else{
        toast.success("Profil sauvegardé avec succès",{description:result.Message})
    }
      

         }catch(err){
            console.log('err',err)
         toast.error(errorInstance.title,{
        description:errorInstance.description
      })


         }


    }

    return {
        saveUser
    }

}