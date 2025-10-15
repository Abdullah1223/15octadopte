import { AnyUseBaseQueryOptions } from '@tanstack/react-query';
import { candidateTypeSchema, citySchema, locationSchema, nameSchema, profilePictureSchema, salarySchema, specializationSchema } from '../DTOs/profileInfoEmployerViewDTO';
import {z} from 'zod'
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { fileInfo } from '../interfaces/candidateInterface';




 const getSchema = (field) => {
        switch (field) {
          case 'name': return nameSchema;
          case 'location': return locationSchema;
          case "candidateType": return candidateTypeSchema;
          case "City":return citySchema;
          case "salary":return salarySchema;
          case "Specialization":return specializationSchema;
          case "profilePicture":return profilePictureSchema;
          default: return z.object({});
        }
      };
   

  const selectionError=(field,values,type,types,)=>{
    
    if(field===type  && !types.includes(values[field])){
      return {error:{[type]:`Please Select A Valid ${type}`},sucess:true}
    }
    return {sucess:false}
   }  
    

   export interface validateFieldCandidate{
    field:string,
    values:any,
    orginalValues:any,
    locations:string[],
    candidateTypes:string[],
    contractTypes:string[]
   }
   export const validateFieldCandidate = ({field, values,orginalValues,locations,candidateTypes,contractTypes}:validateFieldCandidate) => {
      try {
        console.log('values',values)
          getSchema(field).parse(values);
          
         const locationValidation =  selectionError(field,values,'location',locations)
         const candidateTypeValidation =  selectionError(field,values,'candidateType',candidateTypes)
         const preferredContractTypeValidation = selectionError(field,values,'preferredContractType',contractTypes)
         if(locationValidation.sucess){
          return locationValidation.error
         }
         if(candidateTypeValidation.sucess){
          return candidateTypeValidation.error
         }
         if(preferredContractTypeValidation.sucess){
          return preferredContractTypeValidation.error
         }
       
          const newErrors = {};
          Object.keys(values).forEach(key => {
            if (values[key].toString().toLowerCase() ==orginalValues[key].toString().toLowerCase()) {
                  newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} must be different from the current value`;
              }
          });
          if (Object.keys(newErrors).length > 0) return newErrors;
  
        return {};
      } catch (error) {
        console.log('error occurred',error)
        if (error instanceof z.ZodError) {
          const errors = {};
          error.errors.forEach((err) => {
            errors[err.path[0]] = err.message;
          });
          return errors;
        }
        return {};
      }
    };
  

    
    export interface handleFile{
        e:ChangeEvent<HTMLInputElement>,
        setFileInfo:Dispatch<SetStateAction<fileInfo>>,
        setEditValues:any,
        editValues:any
    }
   export const handleFile = async({e,setFileInfo,setEditValues,editValues}:handleFile)=>{                
    const file = e.target.files?.[0];
                    if (file) {
                      setFileInfo({
                        name: file.name,
                        type: file.type,
                        size: file.size, // in bytes
                      });
                      setEditValues({...editValues, profilePicture: file});
                      
                    } else {
                      setFileInfo(null);
                      setEditValues({...editValues, profilePicture: null}); 
                    }
                  }
                  