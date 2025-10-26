'use client';
import { Clock, LogOut, Smartphone,Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { LoginHistoryList } from "./LoginHistoryList";
import { ActiveDevicesList } from "./ActiveDeviceList";
import { SettingsOption } from "./SettingOptions";
import { ToggleSwitch } from "./ToggleSwitch";
import useAuth from "../Hooks/useAuth";
import { Disable2faDialog, QrCodeDialog } from "./Dialogs";

export const SecuritySection = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState();
  const [qrCode,setQrCode]=useState<string>()
  const [error,setError]=useState<boolean>(false)
  const [isLoading,setIsLoading]=useState<boolean>(true)
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const [dialogType,setDialogType]=useState<string | null>(null)
  const  {  enableTwoFactor,fetchSecuritySettings} = useAuth()
  const  handleTwoFactor = async()=>{
        // setIs2FAEnabled(!is2FAEnabled)
        console.log('is2faenable',is2FAEnabled)
     await enableTwoFactor(!is2FAEnabled,setIsOpen,setQrCode,is2FAEnabled,setIs2FAEnabled,setDialogType)  
  }


  useEffect(()=>{
    fetchSecuritySettings({setError,setIs2FAEnabled,setIsLoading})

  },[])

  return (
    <>
      <SettingsOption icon={Shield} title="Two-Factor Authentication">
        <ToggleSwitch disabled={isLoading || error } checked={is2FAEnabled}  onChange={() => handleTwoFactor()} />
      </SettingsOption>
      
      {/* <div className="p-4 pt-0">
        <h3 className="text-base font-medium text-gray-700 mb-2 mt-4 flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-gray-500" />
            <span>Active Devices</span>
        </h3>
        <ActiveDevicesList />
      </div>

      <div className="p-4 pt-0">
        <h3 className="text-base font-medium text-gray-700 mb-2 mt-4 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span>Login History</span>
        </h3>
        <LoginHistoryList />
      </div>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition duration-150">
          <LogOut className="w-4 h-4 mr-2" />
          Logout from All Devices
        </button>
      </div> */}

      {isOpen && dialogType === "enable_otp" && (
  <QrCodeDialog 
    setIs2FAEnabled={setIs2FAEnabled}
    is2FAEnabled={is2FAEnabled}
    isOpen={isOpen} 
    setIsOpen={setIsOpen} 
    qrCode={qrCode}
    // You must also include the onEnable2FA prop here, which is missing
  />
)}

{isOpen && dialogType === "disable_otp" && (
  <Disable2faDialog 
  setIs2FAEnabled={setIs2FAEnabled}
  is2FAEnabled={is2FAEnabled}
    isOpen={isOpen} 
    setIsOpen={setIsOpen} 
    // You MUST provide the onDisable2FA prop, which is required by the component
    // onDisable2FA={async (code) => { 
    //   /* Your actual disable 2FA logic goes here */
    // }} 
  />
)}

     {/* <QrCodeDialog isOpen={isOpen} setIsOpen={setIsOpen} qrCode={qrCode}></QrCodeDialog> */}
      
    </>
  );
};
