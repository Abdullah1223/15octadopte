'use client';
import * as Dialog from '@radix-ui/react-dialog'
import React, { Dispatch, SetStateAction, useState,useCallback } from 'react';
import useAuth from '../Hooks/useAuth';
import zod from 'zod'
import { ArrowLeft, LogOut, Send, X } from 'lucide-react';
import {motion} from 'framer-motion'
import { messageInstance } from '../Services/message.service';
import { useRouter } from 'next/navigation';
import { errorSendingMessage, NotLoggedInErrorMessage } from '../ErrorMessages/errorMessages';
import { toast } from 'sonner';
export const UpdateEmailDialog = ()=>{
    const [email,setEmail]=useState<string | null>(null)
    const {changeEmail,verifyChangeEmailOtp} = useAuth()
    const [isOtp,setIsOtp]=useState<boolean>(false)
    const [error,setError] = useState({emailError:null,codeError:null})
    const [otp,setOtp]=useState<string | null>(null)
    const emailSchema = zod.object({
        email:zod.string({required_error:"Please Enter Email Address"}).email("Please Enter Valid Email Address").toLowerCase()
    })
    
    const otpSchema = zod.object({
        otp:zod.string({required_error:"Please Enter Otp"})
    })
    // ... (assuming you have the controlled state logic here for handleSave and setIsOpen)
    // For this example, we'll keep it as a placeholder for simplicity.
   const handleInput=(e,type:string)=>{
    console.log('e',e.target.value)
    
   type== "otp"  ? setOtp((prev)=>e.target.value) : setEmail((prev)=>e.target.value)

   }
    const handleSave = async (type:string) => {
        console.log('type',type)
        const value =  type == "otp" ? otp : email 
       console.log('value',value)
       const errorType = type == "otp" ? "codeError" : "emailError"
        const schema = type == "otp" ? otpSchema :  emailSchema
        console.log('schema',schema)
        if(!value){
            console.log('value isnt there',value)
            console.log(errorType)
            setError((prev)=>({...prev,[errorType]:`${isOtp ? "Please Enter Otp Code" : "Please Enter Email address"}`}))
            return;
        }
        
        const result = schema.safeParse({[type]:value})
        if(!result.success){
            setError((prev)=>({...prev,[errorType]:result.error.errors[0].message}))
            return;
        }
        setError((prev)=>({...prev,emailError:null,codeError:null}))
       type == "otp" ? await verifyChangeEmailOtp(email,otp,setError,setIsOtp) : await changeEmail(email,setError,setIsOtp)
    };

    return (
        <Dialog.Root>
             {/* ... Dialog.Trigger and Dialog.Portal components here ... */}
            <Dialog.Trigger color='orange'>
                <h1 className='text-orange-500'>Update</h1>
            </Dialog.Trigger>
            <Dialog.Portal> 
                
                {/* 1. Overlay (Dimmed background) */}
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                
                {/* 2. Dialog Content with smoother animations and focus handling */}
                <Dialog.Content 
                    className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-xl shadow-2xl w-[90vw] max-w-md z-50 
                               transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
                               data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] 
                               data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
                >
                    
                    {/* --- HEADER --- */}
                    <Dialog.Title className="text-2xl font-semibold ml-4 text-gray-900 border-b pb-3 mb-4">
                        {isOtp ?"OTP Verification" : "Edit Email Address"}
                    </Dialog.Title>
                    
                    {/* Explicit Accessible Description */}
                    <Dialog.Description className="text-gray-600 mb-6">
                       { isOtp ? "Enter your OTP code below this action will verify your new email address"  : "Enter your new email address below. This action will update your primary account email."}
                    </Dialog.Description>
                    
                    {/* --- FORM CONTENT --- */}
                   {isOtp ?
                   
                    <div className="space-y-2">
                        <label htmlFor="otpcode" className="block text-sm font-medium text-gray-700">{"Otp Verification"}</label>
                        <input
                            value={otp ? otp : ""}
                            onChange={(e)=>{handleInput(e,'otp')}}
                            id="otpcode"
                            type="text"
                            placeholder="41451"
                            className={`w-full p-2.5 border   ${error.codeError ? "border-red-400" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150`}
                        />
                       {error.codeError  ? <h1 className='text-red-400 pt-0 mt-0'>{error.codeError}</h1>   : null} 
                    </div>
                   
                   : <div className="space-y-2">
                        <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">{"New Email"}</label>
                        <input
                            onChange={(e)=>{handleInput(e,'email')}}
                            id="newEmail"
                            type="email"
                            placeholder="you@example.com"
                            className={`w-full p-2.5 border   ${error.emailError ? "border-red-400" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150`}
                        />
                       {error.emailError  ? <h1 className='text-red-400 pt-0 mt-0'>{error.emailError}</h1>   : null} 
                    </div>
                  }
                    {/* --- FOOTER/BUTTONS --- */}
                    <div className='flex justify-end space-x-3 mt-8 pt-4 border-t'>
                        
                        {/* Cancel Button - Uses Dialog.Close for Radix functionality */}
                        <Dialog.Close asChild>
                            <button 
                                type="button" 
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
                            >
                                Cancel
                            </button>
                        </Dialog.Close>

                        {/* Change Email Button - Standard button with your logic */}
                        {isOtp ? 
                        
                        <button 
                            type="submit" 
                            onClick={()=>handleSave('otp')} 
                            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition duration-150"
                        >
                            Verify Code
                        </button>
                        :<button 
                            type="submit" 
                            onClick={()=>handleSave('email')} 
                            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition duration-150"
                        >
                            Change Email
                        </button>}
                    </div>

                    {/* --- Close (X) Button --- */}
                    <Dialog.Close asChild>
                       <button 
                         aria-label="Close dialog" 
                         className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-900 transition duration-150 rounded-full hover:bg-gray-100"
                       >
                         {/* X icon instead of &times; for a cleaner look */}
                         <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                         </svg>
                       </button>
                    </Dialog.Close>
{ isOtp?
<div >
                       <button 
                         aria-label="Close dialog" 
                         className="absolute top-6  left-1 p-1 text-gray-400 hover:text-gray-900 transition duration-150 rounded-full hover:bg-gray-100"
                       >
                      
                         <ArrowLeft
                         onClick={()=>{setIsOtp(false);}}
                         ></ArrowLeft>
                       </button>
                    </div> : null}

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}


const MockDialog = {
  Root: ({ open, children }) => <div className={open ? 'block' : 'hidden'}>{children}</div>,
  Trigger: ({ children }) => <div>{children}</div>, // Not strictly needed in this implementation
  Portal: ({ children }) => <>{children}</>,
  Overlay: ({ className }) => <div className={className}></div>,
  Content: ({ className, children }) => <div className={className}>{children}</div>,
  Title: ({ children }) => <h2 className="text-xl font-bold text-orange-400 mb-2">{children}</h2>,
  Description: ({ children }) => <p className="text-sm text-gray-300 mb-6">{children}</p>,
};

interface QrCodeDialogInterface {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  qrCode: string; // Base64 or URL for the QR code image
  // onEnable2FA: (code: string) => void; // Callback when 2FA is successfully enabled
  setIs2FAEnabled:Dispatch<SetStateAction<boolean>>,
  is2FAEnabled:boolean,
}

const GlassButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant: 'primary' | 'secondary' }> = ({ children, variant, className, ...props }) => {
  const baseClasses = "py-2 px-4 rounded-lg font-semibold transition-all duration-200 shadow-lg active:scale-[.98] focus:outline-none focus:ring-2";
  const primaryClasses = "bg-orange-600 text-white hover:bg-orange-500 focus:ring-orange-500/50 border border-orange-700";
  const secondaryClasses = "bg-black/30 text-gray-200 hover:bg-black/50 focus:ring-gray-500/50 border border-gray-700";

  return (
    <button
      className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const QrCodeDialog = ({ isOpen, setIsOpen, qrCode,setIs2FAEnabled,is2FAEnabled }: QrCodeDialogInterface) => {
  type VerificationStep = 'qr_display' | 'code_entry';
  const [verificationStep, setVerificationStep] = useState<VerificationStep>('qr_display');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {verifyTwoFactor} = useAuth()
  const handleCancel = () => {
    setIsOpen(false);
    setVerificationStep('qr_display');
    setVerificationCode('');
  };

  const handleVerify = async() => {
    setVerificationStep('code_entry');
  };

  const handleEnable2FA = async () => {
    if (verificationCode.length !== 6) {
      console.error("Verification code must be 6 digits.");
      return;
    }

    setIsLoading(true);
    await verifyTwoFactor(verificationCode,setIs2FAEnabled,is2FAEnabled,setIsOpen,setVerificationCode)
    // onEnable2FA(verificationCode);
    
    // handleCancel(); 
    setIsLoading(false);
  };

  const glassMorphismClasses = `
    bg-black/20 backdrop-blur-xl border border-orange-500/30 text-white
    shadow-[0_8px_32px_0_rgba(249,115,22,0.37)] dark:shadow-none
  `;
  
  const QrDisplayContent = (
    <>
      <MockDialog.Title>Scan QR Code to Enable 2FA</MockDialog.Title>
      <MockDialog.Description>
        Use your authentication app (like Google Authenticator) to scan the code below.
      </MockDialog.Description>

      <div className="flex justify-center mb-6 p-4 rounded-xl bg-black/40 shadow-inner">
        {/* Placeholder image tag - use a mock URL or the actual qrCode prop */}
        <img src={qrCode} alt="2FA QR Code" className="w-full max-w-[200px] h-auto object-contain" />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <GlassButton variant="secondary" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </GlassButton>
        <GlassButton variant="primary" onClick={handleVerify} disabled={isLoading}>
          Verify Setup
        </GlassButton>
      </div>
    </>
  );

  const CodeEntryContent = (
    <>
      <MockDialog.Title>Confirm 2FA Setup</MockDialog.Title>
      <MockDialog.Description>
        Enter the 6-digit code provided by your authentication app to complete the setup.
      </MockDialog.Description>

      <div className="mb-6">
        <input
          type="number"
          placeholder="e.g., 123456"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className={`
            w-full p-3 text-center text-lg rounded-lg bg-black/50 border border-orange-500/50 
            text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none 
            transition duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
          `}
          maxLength={6}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <GlassButton variant="secondary" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </GlassButton>
        <GlassButton 
          variant="primary" 
          onClick={handleEnable2FA} 
          disabled={verificationCode.length !== 6 || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enabling...
            </span>
          ) : 'Enable 2FA'}
        </GlassButton>
      </div>
    </>
  );

  return (
    <MockDialog.Root open={isOpen}>
      <MockDialog.Portal>
        {/* Overlay with subtle dark background - Updated to bg-black/70 for better visibility of background elements */}
        <MockDialog.Overlay className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Dialog Content with Glassmorphism */}
        <MockDialog.Content className={`
             fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-6 rounded-xl shadow-2xl w-[90vw] max-w-md z-50 
             font-sans
             ${glassMorphismClasses}
             
             transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
             data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] 
             data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
        `}>
          {verificationStep === 'qr_display' ? QrDisplayContent : CodeEntryContent}
        </MockDialog.Content>
      </MockDialog.Portal>
    </MockDialog.Root>
  );
};





interface GlassDialogRootProps {
  open: boolean;
  children: React.ReactNode;
}
const GlassDialog = {
  Root: ({ open, children }: GlassDialogRootProps) => (
    <div data-glass-dialog-root data-state={open ? 'open' : 'closed'}>{children}</div>
  ),
  Portal: ({ children }: { children: React.ReactNode }) => (
    <div data-glass-dialog-portal>{children}</div>
  ),
  Overlay: ({ className }: { className: string }) => (
    <div data-glass-dialog-overlay className={className} />
  ),
  Content: ({ className, children }: { className: string, children: React.ReactNode }) => (
    <div data-glass-dialog-content className={className}>{children}</div>
  ),
  Title: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-bold mb-2">{children}</h2>
  ),
  Description: ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm text-gray-300 mb-6">{children}</p>
  ),
};

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

const GlassButton2 = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ variant, children, className, ...props }, ref) => {
    const baseClasses = `
      px-5 py-2 rounded-lg font-semibold transition duration-300 ease-in-out
      hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
      shadow-md
    `;
    
    const primaryClasses = `
      bg-orange-600 hover:bg-orange-500 text-white 
      shadow-[0_4px_15px_rgba(249,115,22,0.5)] 
    `;
    
    const secondaryClasses = `
      bg-white/10 hover:bg-white/20 text-white border border-white/20
    `;

    return (
      <button 
        ref={ref} 
        className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className || ''}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
// --- END GLASS DIALOG COMPONENTS ---

// --- NEW COMPONENT INTERFACE ---
interface Disable2faDialogInterface {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIs2FAEnabled:Dispatch<SetStateAction<boolean>>,
  is2FAEnabled:boolean,

  
  // onDisable2FA: (verificationCode: string) => Promise<void>;
}

// --- NEW COMPONENT ---
export const Disable2faDialog = ({ isOpen, setIsOpen,setIs2FAEnabled,is2FAEnabled  }: Disable2faDialogInterface) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {verifyDisable2FA} = useAuth()
  
  const handleCancel = () => {
    setIsOpen(false);
    setVerificationCode('');
  };

  const handleVerifyCode = async () => {
    // if (verificationCode.length !== 6) {
    //   console.error("Verification code must be 6 digits.");
    //   return;
    // }

    setIsLoading(true);
    
    try {
      await verifyDisable2FA({verificationCode,setIsOpen,setVerificationCode,setIs2FAEnabled,is2FAEnabled})
      // await onDisable2FA(verificationCode); 
    
    } catch (error) {
      // console.error("Failed to disable 2FA:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const glassMorphismClasses = `
    bg-black/20 backdrop-blur-xl border border-orange-500/30 text-white
    shadow-[0_8px_32px_0_rgba(249,115,22,0.37)] dark:shadow-none
  `;
  
  const CodeEntryContent = (
    <>
      <GlassDialog.Title>Disable Two-Factor Authentication</GlassDialog.Title> {/* Renamed */}
      <GlassDialog.Description> {/* Renamed */}
        A 6-digit verification code has been sent to your registered email address. Please enter it below to confirm disabling 2FA.
      </GlassDialog.Description>

      <div className="mb-6">
        <input
          type="number"
          placeholder="e.g., 123456"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className={`
            w-full p-3 text-center text-lg rounded-lg bg-black/50 border border-orange-500/50 
            text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none 
            transition duration-200 
            [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
          `}
          maxLength={6}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <GlassButton2 variant="secondary" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </GlassButton2>
        <GlassButton2 
          variant="primary" 
          onClick={handleVerifyCode}
          disabled={ isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </span>
          ) : 'Verify Code'}
        </GlassButton2>
      </div>
    </>
  );

  return (
    <GlassDialog.Root open={isOpen} > {/* Renamed */}
      <GlassDialog.Portal> {/* Renamed */}
        {/* Overlay with subtle dark background */}
        <GlassDialog.Overlay className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" /> {/* Renamed */}

        {/* Dialog Content with Glassmorphism */}
        <GlassDialog.Content className={` {/* Renamed */}
             fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-6 rounded-xl shadow-2xl w-[90vw] max-w-md z-50 
             font-sans
             ${glassMorphismClasses}
             
             transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
             data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] 
             data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
        `}>
          {CodeEntryContent}
        </GlassDialog.Content>
      </GlassDialog.Portal>
    </GlassDialog.Root>
  );
};





// interface ChangePasswordDialogInterface{
//   isOpen:boolean,
//   setIsOpen:Dispatch<SetStateAction<boolean>>,
// }
// export const ChangePasswordDialog= ({isOpen,setIsOpen}:ChangePasswordDialogInterface)=>{




// }


// import React, { useState, useCallback, useMemo } from 'react';
// Note: We are using Tailwind CSS for all styling, including Shadcn-inspired design.

// Define the component interface (from user prompt, slightly simplified for React in one file)
/**
 * @typedef {object} ChangePasswordDialogInterface
 * @property {boolean} isOpen - Controls the visibility of the dialog.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - Function to close the dialog.
 */

// Utility component for a Shadcn-like input field
// MOVED OUTSIDE to prevent re-definition and focus loss on every keystroke
const InputField = ({ id, type = 'text', label, value, onChange, placeholder, disabled = false }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-gray-300 block">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="
        w-full p-3 rounded-xl
        bg-white/5 border border-white/20 text-white
        focus:outline-none focus:ring-2 focus:ring-orange-500
        transition duration-300
        placeholder-gray-500
        disabled:opacity-50
      "
    />
  </div>
);

// Utility component for the primary action button
// MOVED OUTSIDE to ensure component stability
const PrimaryButton = ({ onClick, children, disabled = false, isLoading = false }) => (
  <button
    onClick={onClick}
    disabled={disabled || isLoading}
    className={`
      w-full sm:w-auto px-6 py-3 rounded-xl font-semibold uppercase tracking-wider
      bg-orange-600 text-white shadow-xl hover:bg-orange-700
      transition duration-300 transform active:scale-[0.98]
      disabled:bg-gray-500 disabled:shadow-none disabled:cursor-not-allowed
      flex items-center justify-center space-x-2
    `}
  >
    {isLoading ? (
      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    ) : (
      children
    )}
  </button>
);

// Utility component for the secondary action button
// MOVED OUTSIDE to ensure component stability
const SecondaryButton = ({ onClick, children, disabled = false, isLoading = false }) => (
  <button
    onClick={onClick}
    disabled={disabled || isLoading}
    className={`
      w-full sm:w-auto px-6 py-3 rounded-xl font-semibold uppercase tracking-wider
      bg-transparent text-gray-300 border border-gray-500 hover:text-white hover:border-white
      transition duration-300 transform active:scale-[0.98]
      disabled:opacity-50
    `}
  >
    {children}
  </button>
);

// Step definitions for the multi-step flow
export const STEPS = {
  CURRENT_PASSWORD: 'CURRENT_PASSWORD',
  OTP_VERIFICATION: 'OTP_VERIFICATION',
  NEW_PASSWORD_SETUP: 'NEW_PASSWORD_SETUP',
};


/**
 * A beautiful, glass-morphism styled dialog for changing passwords.
 * Implements a three-step flow: Current Password -> (Optional OTP Verification) -> Set New Password.
 * @param {ChangePasswordDialogInterface} props
 * @returns {JSX.Element | null}
 */
export interface changePasswordFormData{
   currentPassword:string,
   otp:string,
   newPassword:string,
   confirmPassword:string
}
export const ChangePasswordDialog = ({ isOpen, setIsOpen }) => {
  // State for the current step in the password change process
  const [currentStep, setCurrentStep] = useState(STEPS.CURRENT_PASSWORD);
  const {verifyCurrentPassword,changePassword} = useAuth()
  const [resetToken,setResetToken] = useState<string | null>(null)
  // State for form inputs (simplified for design purposes)
  const [formData, setFormData] = useState<changePasswordFormData>({
    currentPassword: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State for loading/simulating processing
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset all state when the dialog closes or is canceled
  const resetDialog = useCallback(() => {
    setCurrentStep(STEPS.CURRENT_PASSWORD);
    setFormData({ currentPassword: '', otp: '', newPassword: '', confirmPassword: '' });
    setError('');
    setIsLoading(false);
    setIsOpen(false);
  }, [setIsOpen]);


  // --- Handlers for simulated transitions ---

  // Handler for checking the current password (Simulated backend check)
  const handleCheckCurrentPassword = async () => {
    if (formData.currentPassword.length < 6) {
      setError("Please enter a valid password.");
      return;
    }

    // setError('');
    // setIsLoading(true);

    await verifyCurrentPassword({currentPassword:formData.currentPassword, setIsLoading,
     setIsOpen,
     setResetToken,
     setError,
     setCurrentStep,
     setFormData})
    // setIsLoading(false);

    // Assuming the check passed, move to new password setup
    // setCurrentStep(STEPS.NEW_PASSWORD_SETUP);
  };

  // Handler for OTP verification (Simulated backend check)
  const handleVerifyOTP = async () => {
    if (formData.otp !== '123456') { // Simple simulation
      setError("Invalid OTP. Please try again.");
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);

    // If OTP is correct, move to new password setup
    setCurrentStep(STEPS.NEW_PASSWORD_SETUP);
  };

  // Handler for setting the new password
  const handleSetNewPassword = async () => {
    console.log('resetToken',resetToken)
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (formData.newPassword.length < 8) {
        setError("New password must be at least 8 characters.");
        return;
    }
     if(!resetToken){
      setError("You've Lost Token")
     }
   console.log('in',resetToken)
    await changePassword({password:formData.newPassword,confirmPassword:formData.confirmPassword,setCurrentStep,setError,setFormData,setIsLoading,setIsOpen,setResetToken,token:resetToken}) 
    // setError('');
    // setIsLoading(true);

    // setIsLoading(false);

    // // Success!
    // console.log('Password changed successfully! (Simulated)'); 
    // resetDialog();
  };

  // Handler to switch to the OTP flow
  const handleForgetPasswordClick = () => {
    setCurrentStep(STEPS.OTP_VERIFICATION);
    setError(''); // Clear any previous errors
  };

  // Determine the content based on the current step. 
  const renderCurrentContent = () => {
    switch (currentStep) {
      case STEPS.CURRENT_PASSWORD:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Verify Current Password</h3>

            <InputField
              id="current-password"
              type="password"
              label="Current Password"
              placeholder="Enter your current password"
              value={formData.currentPassword}
              onChange={(v) => setFormData(prev => ({ ...prev, currentPassword: v }))}
              disabled={isLoading}
            />

            <button
              onClick={handleForgetPasswordClick}
              className="text-sm font-medium text-orange-400 hover:text-orange-300 transition duration-200 block text-right w-full"
            >
              Forget password?
            </button>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <PrimaryButton onClick={handleCheckCurrentPassword} disabled={!formData.currentPassword} isLoading={isLoading}>
                Verify & Proceed
              </PrimaryButton>
              <SecondaryButton onClick={resetDialog} isLoading={isLoading}>
                Cancel
              </SecondaryButton>
            </div>
          </div>
        );

      case STEPS.OTP_VERIFICATION:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">OTP Verification</h3>
            <p className="text-sm text-gray-400">
              Please enter the 6-digit code sent to your registered email or phone number.
            </p>
            <InputField
              id="otp-code"
              type="text"
              label="Verification Code (OTP)"
              placeholder="e.g., 123456"
              value={formData.otp}
              onChange={(v) => setFormData(prev => ({ ...prev, otp: v }))}
              disabled={isLoading}
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <PrimaryButton onClick={handleVerifyOTP} disabled={formData.otp.length !== 6} isLoading={isLoading}>
                Verify OTP
              </PrimaryButton>
              <SecondaryButton onClick={() => setCurrentStep(STEPS.CURRENT_PASSWORD)} disabled={isLoading} isLoading={isLoading}>
                Back
              </SecondaryButton>
            </div>
          </div>
        );

      case STEPS.NEW_PASSWORD_SETUP:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Set New Password</h3>

            <InputField
              id="new-password"
              type="password"
              label="New Password"
              placeholder="Enter your new password"
              value={formData.newPassword}
              onChange={(v) => setFormData(prev => ({ ...prev, newPassword: v }))}
              disabled={isLoading}
            />

            <InputField
              id="confirm-password"
              type="password"
              label="Confirm New Password"
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={(v) => setFormData(prev => ({ ...prev, confirmPassword: v }))}
              disabled={isLoading}
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <PrimaryButton
                onClick={handleSetNewPassword}
                disabled={!formData.newPassword || formData.newPassword !== formData.confirmPassword}
                isLoading={isLoading}
              >
                Save New Password
              </PrimaryButton>
              <SecondaryButton onClick={resetDialog} isLoading={isLoading}>
                Cancel
              </SecondaryButton>
            </div>
          </div>
        );

      default:
        return null;
    }
  };


  if (!isOpen) return null;

  return (
    // Outer overlay: Fixed black background with strong blur for glass effect
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm">
      {/* Dialog container: The glass element itself */}
      <div
        className="
          w-full max-w-lg mx-auto
          p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]
          bg-white/5 border border-white/20
          backdrop-blur-xl
          transition-all duration-300 transform
          scale-100 opacity-100
          font-['Inter']
        "
        // Ensure content doesn't cause overflow on small screens
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Title and Close Button */}
        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Password Manager
          </h2>
          <button
            onClick={resetDialog}
            className="text-gray-400 hover:text-orange-500 transition duration-150 p-1"
            aria-label="Close dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 6L6 18"/><path d="M6 6L18 18"/></svg>
          </button>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-800/20 text-red-300 border border-red-500/50 text-sm">
            {error}
          </div>
        )}

        {/* Dynamic Content */}
        {renderCurrentContent()}

      </div>
    </div>
  );
};



export const ChatDialog = ({ isOpen, onClose, candidate }) => {
  // console.log('candidate',candidate)
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const uniqueId = crypto.randomUUID();
  const route = useRouter()
  const handleSendMessage = async(e) => {
  console.log('candidate',candidate)
  
    e.preventDefault();
    if (!message.trim()) return;

   
     try{

      const response = await messageInstance.post('/message/firstMessageSent',
     {message,receiverId:candidate._id,uniqueId}
    
  )
    const result = await response.data
     
   if(response.status==200){
    // const result = await response.data
    console.log('result',result)
     route.push(`/Dashboard/messages/${result.chatId}`)
  
   }else if(response.status==400){
    if(result.errors.type=="not_connected"){
      toast.error(NotLoggedInErrorMessage.title,{description:NotLoggedInErrorMessage.description})
      return;
    }
    
   }
     }catch(err){
       toast.error(errorSendingMessage.title,{description:errorSendingMessage.description})
       return; 
     }
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg flex flex-col max-h-[80vh]"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={candidate?.profilePicture?.url || '/default-avatar.png'}
                alt={candidate.firstName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{candidate.firstName}</h3>
              <p className="text-sm text-gray-500">Messages will be saved in your inbox</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {chatHistory.map((chat, index) => (
            <div 
              key={index} 
              className={`flex ${chat.isCreator ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${
                chat.isCreator 
                  ? 'bg-orange-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              } rounded-lg px-4 py-2`}>
                <p className="text-sm">{chat.message}</p>
                <p className="text-xs mt-1 opacity-75">{chat.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};