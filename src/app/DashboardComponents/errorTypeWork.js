const ErrorTypeWork = ({setIsLoading,setIsToastOpen,setToastType,setToastData,toastType,toastData})=>{

    setIsLoading(false)
    setIsToastOpen(true)
    setToastType(toastType)
    setToastData(toastData)
    return ;
}

export default ErrorTypeWork;