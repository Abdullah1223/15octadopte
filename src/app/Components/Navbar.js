// import Image from "next/image"

//  const  Navbar = ()=>{
//     const NavItems = ['Accuiel','Offrres d’emploi', 'CVthèque','Conseils','À propos'  ]

// return <div className="flex bg-white p-3 md:p-4 lg:p-8 items-center border-b-2 border-[#ff7300] w-full justify-between">
    
//     <h1 className=" text-[0.9rem] sm:text-[1.1rem]  text-black  lg:text-[1.5rem] font-extrabold">Adopte Un Coiffer</h1>
//  <div className="md:flex md:items-center md:justify-center">
//      {NavItems.map((data,index)=>{
//        return <h1 key={index}  className={` hidden md:block  md:p-2   md:text-xs  lg:text-[14px]   font-extrabold ${index==0?'text-[#FF7300]':'hover:text-[#FF9522]' }`}>
//        {data}
//      </h1>
//      })}
//      </div>
    
//     <button className="bg-[#FF7300] hidden text-white  hover:bg-[#FF9522] md:block  lg:text-[20px] text-[12px]  w-32 h-9  lg:w-64 lg:h-12 rounded-[5px] ">Get Hired</button>  
    
 
//      <div className="flex items-center gap-3 md:hidden">
//      <button className="bg-[#FF7300] text-white hover:bg-[#FF9522]  md:hidden   lg:text-[20px] text-[12px]  w-24 h-8  lg:w-64 lg:h-12 rounded-[5px] ">Get Hired</button>  
//      <button className="md:hidden" >
       
//        <img src="/menu.png" className="w-8"></img>
//      </button>
 
//      </div>
 
//     </div>




// }

// export default Navbar


// 'use client';
// import Image from "next/image"
// import Link from "next/link"
// import { usePathname, useRouter } from "next/navigation";

//  const  Navbar = ()=>{
//   const router =useRouter()  
//   console.log(usePathname())
//   const NavItems=[
//       {
//         text:'Accuiel',
//         path:'/'
//       },
//       {
//         text:'Offrres d’emploi',
//         path:'/'
//       },
//       {
//         text:'CVthèque',
//         path:'/Cv'
//       },
//       {
//         text:'Conseils',
//         path:'/blog'
//       },
//       {
//         text:'À propos',
//         path:'/aboutus'
//       },
//     ] 
// return <div className="flex bg-white p-3 md:p-4 lg:p-8 items-center border-b-2 border-[#ff7300] w-full justify-between">
    
//     <h1 className=" text-[0.9rem] sm:text-[1.1rem]  text-black  lg:text-[1.5rem] font-extrabold">Adopte Un Coiffeur</h1>
//  <div className="md:flex md:items-center md:justify-center">
//      {NavItems.map((data,index)=>{
//        return <a href={data.path} ><h1 key={index}  className={` hidden md:block  md:p-2   md:text-xs  lg:text-[14px]   font-extrabold ${index==0?'text-[#FF7300]':'hover:text-[#FF9522]' }`}>
//        {data.text}
//      </h1></a>
//      })}
//      </div>
    
//     <button onClick={()=>{router.push('/login')}} className="bg-[#FF7300] hidden text-white  hover:bg-[#FF9522] md:block  lg:text-[18px] text-[12px]  w-32 h-9  lg:w-52 lg:h-10 rounded-[5px] ">Get Hired</button>  
    
 
//      <div className="flex items-center gap-3 md:hidden">
//      <button onClick={()=>{router.push('/login')}} className="bg-[#FF7300] text-white hover:bg-[#FF9522]  md:hidden   lg:text-[20px] text-[12px]  w-24 h-7  lg:w-64 lg:h-12 rounded-[5px] ">Get Hired</button>  
//      <button className="md:hidden" >
       
//        <img src="/menu.png" className="w-6"></img>
//      </button>
 
//      </div>
 
//     </div>




// }

// export default Navbar


'use client';
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(false)

  const NavItems = [
    {
      text: 'Accuiel',
      path: '/'
    },
    {
      text: 'Offrres d\'emploi',
      path: '/Jobs'
    },
    {
      text: 'CVthèque',
      path: '/Cv'
    },
    {
      text: 'Conseils',
      path: '/blog'
    },
    {
      text: 'À propos',
      path: '/aboutus'
    },
  ]

  const DashboardSubOptions = [
    {
      text: 'Profile',
      path: '/Dashboard/profile'
    },
    {
      text: 'Settings',
      path: '/Dashboard/settings'
    },
    {
      text: 'Statistics',
      path: '/Dashboard/statistics'
    }
  ]

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.slide-menu') && !event.target.closest('.menu-button')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Reset menu state when pathname changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <>
      <div className="flex bg-white p-3 md:p-4 lg:p-8 items-center border-b-2 border-[#ff7300] w-full justify-between">
        <h1 className="text-[0.9rem] sm:text-[1.1rem] text-black lg:text-[1.5rem] font-extrabold">Adopte Un Coiffeur</h1>
        
        <div className="md:flex md:items-center md:justify-center">
          {NavItems.map((data, index) => {
            return (
              <a href={data.path} key={index}>
                <h1 className={`hidden md:block md:p-2 md:text-xs lg:text-[14px] font-extrabold ${pathname === data.path ? 'text-[#FF7300]' : 'hover:text-[#FF9522]'}`}>
                  {data.text}
                </h1>
              </a>
            )
          })}
        </div>

        <button onClick={() => { router.push('/login') }} className="bg-[#FF7300] hidden text-white hover:bg-[#FF9522] md:block lg:text-[18px] text-[12px] w-32 h-9 lg:w-52 lg:h-10 rounded-[5px]">
          Get Hired
        </button>

        <div className="flex items-center gap-3 md:hidden">
          <button onClick={() => { router.push('/login') }} className="bg-[#FF7300] text-white hover:bg-[#FF9522] md:hidden lg:text-[20px] text-[12px] w-24 h-7 lg:w-64 lg:h-12 rounded-[5px]">
            Get Hired
          </button>
          <button className="md:hidden menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src="/menu.png" className="w-6" alt="Menu"></img>
          </button>
        </div>
      </div>

      {/* Slide menu from left */}
      <div className={`fixed top-0 left-0 h-full bg-white w-64 shadow-lg z-50 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} slide-menu`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#FF7300]">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="py-4">
          {NavItems.map((item, index) => (
            <a 
              key={index} 
              href={item.path} 
              className={`block px-4 py-2 text-sm ${pathname === item.path ? 'text-[#FF7300] font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {item.text}
            </a>
          ))}

          {/* Dashboard option - only visible when on Dashboard path */}
          {pathname?.includes('/Dashboard') && (
            <div>
              <button 
                onClick={() => setIsDashboardExpanded(!isDashboardExpanded)} 
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-[#FF7300] font-bold"
              >
                Dashboard
                <svg 
                  className={`w-4 h-4 transition-transform ${isDashboardExpanded ? 'transform rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              {/* Dashboard suboptions */}
              {isDashboardExpanded && (
                <div className="pl-8 py-1 bg-gray-50">
                  {DashboardSubOptions.map((subOption, subIndex) => (
                    <a 
                      key={subIndex} 
                      href={subOption.path} 
                      className={`block px-4 py-2 text-sm ${pathname === subOption.path ? 'text-[#FF7300]' : 'text-gray-600 hover:text-[#FF9522]'}`}
                    >
                      {subOption.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Navbar