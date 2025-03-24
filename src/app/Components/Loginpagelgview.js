import LoginCard from "./LoginCard"

const Loginpagelgview =()=>{

 return(
    <div className=" hidden relative lg:flex  flex-col">
    <img src="/loginsvgorange.png" className=" hidden lg:block h-[30rem] w-[100%]"></img>
    
    <div className=" justify-center items-center flex flex-col w-full lg:grid lg:grid-cols-2">

     <div>

     <h1 className=" self-start lg:absolute lg:top-20 xl:top-12 text-black font-semibold  lg:text-3xl lg:ml-32  xl:text-4xl xl:ml-52 ">ADOPTE UN COIFFEUR</h1>
    <h1 className=" lg:absolute lg:top-[6.6rem] xl:top-20 mt-3 text-black font-semibold lg:text-3xl lg:ml-32 xl:text-4xl xl:ml-52 ">WHERE <span className="bg-[white] text-[#ff7300] px-3 text-center mr-1"> TALENT </span> MEETS</h1>
    <h1 className=" lg:absolute  lg:top-36  xl:top-32 mt-3 xl:mt-2 text-black font-semibold lg:text-3xl lg:ml-32  xl:text-4xl xl:ml-52 ">OPPORTUNITIES</h1>
    <div>
     <img className=" lg:absolute lg:top-[14rem] xl:top-[11rem] lg:ml-[11.5rem] lg:w-52 xl:ml-[18rem] xl:w-56" src="/loginimg.png"></img>
    </div>
     </div>

     <LoginCard></LoginCard>
    </div>

    </div>
 )

}

export default Loginpagelgview