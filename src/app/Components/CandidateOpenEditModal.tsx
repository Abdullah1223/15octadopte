import { Dispatch, SetStateAction } from "react";
import { localDataInterface } from "./profileInfoCandidateView";

export interface openEditModalInterface {
    field:string,
    data:localDataInterface,
    setEditingField:Dispatch<SetStateAction<string>>,
    setOrginalValues:Dispatch<SetStateAction<any>>
    setEditValues:Dispatch<SetStateAction<any>>
    setEditModalOpen:Dispatch<SetStateAction<boolean>>
}
  const openEditModalCandidate = ({field,data,setEditingField,setOrginalValues,setEditValues,setEditModalOpen}:openEditModalInterface) => {
    setEditingField(field);
    let initialValues = {};
    
    switch(field) {
      case 'name':
        initialValues = { firstName: data.firstName, lastName: data.lastName };
        break;
      case 'Skills':
        initialValues = { Skills: data.Skills };
        break;
      case 'salary':
        initialValues = { 
          salaryExpectationMinimum: data.salaryExpectationMinimum,
          salaryExpectationMaximum: data.salaryExpectationMaximum 
        };
        break;
      case 'location':
        initialValues = { location: data.location };
        break;
      case 'candidateType':
        initialValues = { candidateType: data.candidateType };
        break;
      case 'preferredContractType':
        initialValues = { preferredContractType: data.preferredContractType };
        break;
      case 'addExperience':
        initialValues = {
          position: '',
          company: '',
          startDate: '',
          endDate: '',
          description: ''
        };
        break;
      default:
        initialValues = { [field]: data[field] };
       
    }
    setOrginalValues(initialValues) 
    setEditValues(initialValues);
    setEditModalOpen(true);
  };

export default openEditModalCandidate  