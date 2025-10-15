import Image from "next/image";
import Navbar from "../Components/Navbar";
import LoginCard from "../Components/LoginCard";
import Loginpagelgview from "../Components/Loginpagelgview";
import Loginpagesmview from "../Components/Loginpagesmview";

export const metadata = {
    title: "Adopte un Coiffeur - Login",
    description:
      "Login to Adopte un Coiffeur, the leading barber industry job portal in France. Employers can post jobs and run ads, while candidates discover barber job opportunities.",
    keywords: [
      "barber jobs France",
      "hairdresser jobs France",
      "coiffeur emploi",
      "barber industry hiring",
      "barbershop careers",
      "find barbers France",
      "post barber jobs",
      "Adopte un Coiffeur login"
    ],
  }
  
export default function Login(){


    return (
       <div>
        <Navbar></Navbar>
        <Loginpagelgview></Loginpagelgview>
        <Loginpagesmview></Loginpagesmview>   
       </div>
    )



}
