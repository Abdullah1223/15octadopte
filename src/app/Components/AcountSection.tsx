import { useState } from "react";
import { SettingsOption } from "./SettingOptions";
import {Mail,Key,Trash2} from 'lucide-react'
import { ChangePasswordDialog, UpdateEmailDialog } from "./Dialogs";
export const AccountSection = () => {
   const [isOpen,setIsOpen]=useState<boolean>(false)
  
  return <>
    <SettingsOption icon={Mail} title="Change Email">
      <UpdateEmailDialog></UpdateEmailDialog>
      {/* <button
      className="text-sm font-medium text-orange-500 hover:text-orange-600 transition duration-150">Update</button> */}
    </SettingsOption>
    <SettingsOption icon={Key} title="Change Password">
      <button
      onClick={()=>{setIsOpen(!isOpen)}}
      className="text-sm font-medium text-orange-500 hover:text-orange-600 transition duration-150">Update</button>
    </SettingsOption>
    <SettingsOption icon={Trash2} title="Delete Account">
      <button className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 transition duration-150">Delete</button>
    </SettingsOption>

    {isOpen&&
    <ChangePasswordDialog isOpen={isOpen} setIsOpen={setIsOpen}></ChangePasswordDialog>
    }
  </>
};

