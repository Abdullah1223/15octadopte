import LoadingSpinner from "../../Components/LoadingSpinner";
// import Navbar from "@/app/Components/Navbar";

export default function loader(){

    return (
         <div className="flex  bg-white flex-col justify-center items-center w-full h-[100vh]">

        <LoadingSpinner size={50} ></LoadingSpinner>
      </div>
    )
}