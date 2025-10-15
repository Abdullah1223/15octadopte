"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "../Context/TranslationContext.";
import { ChevronDown, LogIn, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import Image from "next/image";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const selector = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  let DashboardSubOptions=[];
  const { logOut } = useAuth();
  const { translate, setLanguage, language } = useTranslation();
 console.log('selector' , selector)
  const NavItems = [
    {
      text: translate("home"),
      path: "/",
    },
    {
      text: translate("job_offers"),
      path: "/Jobs",
    },
    {
      text: translate("cv_library"),
      path: "/Cv",
    },

    {
      text: translate("about_us"),
      path: "/aboutus",
    },
    
    
  ];

  const NavItemsMobile = [
    {
      text: translate("home"),
      path: "/",
    },
    {
      text: translate("job_offers"),
      path: "/Jobs",
    },
    {
      text: translate("cv_library"),
      path: "/Cv",
    },

    {
      text: translate("about_us"),
      path: "/aboutus",
    },
    
    selector.isUserLoggedIn ? 
    {
      text: translate("dashboard"),
      path: "/Dashboard",
    }
    :
    {
      text: translate("login"),
      path: "/login",
    }
    
    
  ];

  if(selector.role=="candidate"){
      DashboardSubOptions=[
        {
          text:translate('jobs_for_you'),
          path:"/Dashboard/jobs"
        },
        {
          text:translate('my_cv'),
          path:"/Dashboard/cv"
        },
        {
          text:translate('favorite_jobs'),
          path:"/Dashboard/favoritesJobs"
        },
        {

          text:'Messages',
          path:"/Dashboard/messages"
        },
        {
          text:"notifications",
          path:"/Dashboard/notifications"
        },
        {
          text:translate('my_profile'),
          path:"/Dashboard/profile"
        }
      ]
  }else if(selector.role=='employer'){

     DashboardSubOptions=[
      {
        text:translate('favorite_cv'),
        path:'/Dashboard/favoritesCv'
      },
      {
        text:"Create Jobs",
        path:"/Dashboard/createJobs"
      },
      {
        text:"My Jobs",
        path:"/Dashboard/jobListings"
      },
      {

          text:'Messages',
          path:"/Dashboard/messages"
      },
      {
        text:"Notifications",
        path:"/Dashboard/notifications"
      },
      {
        text:translate('my_profile'),
        path:"/Dashboard/profile"
      },
      {
        text:"Ads Management",
        path:"/Dashboard/ads"
      },
      {
        text:"Ads Metrics",
        path:"/Dashboard/adsMetrics"
      }
     ]

  }else{

    DashboardSubOptions=[
      {
        text:translate('dashboard'),
        path:"/Dashboard"
      },
      {
        text:translate('favorite_jobs'),
        path:"/Dashboard/favorites"
      },
      {
        text:"Messages",
        path:"/Dashboard/messages"
      },
      {
        text:"Notifications",
        path:"/Dashboard/notifications"
      },
      {
        text:"my_profile",
        path:"/Dashboard/profile"
      }
    ]

  }
  // const DashboardSubOptions = [
  //   {
  //     text: translate("dashboard"),
  //     path: "/Dashboard",
  //   },
  //   {
  //     text: translate("my_profile"),
  //     path: "/Dashboard/profile",
  //   },
  //   {
  //     text: "Messages",
  //     path: "/Dashboard/messages",
  //   },
  //   {
  //     text: "Notifications",
  //     path: "/Dashboard/notifications",
  //   },
  //   {
  //     text: translate("jobs_for_you"),
  //     path: "/Dashboard/jobs",
  //   },
  //   {
  //     text: translate("my_cv"),
  //     path: "/Dashboard/cv",
  //   },
  //   {
  //     text: translate("favorite_jobs"),
  //     path: "/Dashboard/favorites",
  //   },

  // ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(".slide-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Reset menu state when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="flex bg-white p-3 md:p-4 lg:p-8 items-center border-b-2 border-[#ff7300] w-full justify-between">
        <Link href="/">
          <h1 className="text-[0.9rem] sm:text-[1.1rem] text-black lg:text-[1.5rem] font-extrabold">
            Adopte Un Coiffeur
          </h1>
        </Link>

        <div className="md:flex md:items-center md:justify-center">
          {/* {NavItems.map((data, index) => {
            return (
             
              <Link href={data.path} key={index}>
  <h1 className={`hidden md:block md:p-2 md:text-xs lg:text-[14px] font-extrabold ${pathname === data.path ? 'text-[#FF7300]' : 'hover:text-[#FF9522]'}`}>
    {data.text}
  </h1>
</Link>
            )
          })} */}
          {NavItems.map((data, index) => (
            <Link
              href={data.path}
              key={index}
              aria-label={data.text} // screen reader label
            >
              <h1
                className={`hidden md:block md:p-2 md:text-xs lg:text-[14px] font-extrabold ${
                  pathname === data.path
                    ? "text-[#FF7300]"
                    : "hover:text-[#FF9522]"
                }`}
              >
                {data.text}
              </h1>
            </Link>
          ))}
        </div>
        {selector.isUserLoggedIn ? (
          <div 
          onClick={()=>{setIsProfileClicked(!isProfileClicked)}}
          className="hidden md:flex items-center md:space-x-1">
            <div className="relative ">
              <button className="flex items-center space-x-2 lg:space-x-3 focus:outline-none p-1 rounded-full hover:bg-gray-100">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs lg:text-sm font-medium text-gray-700 truncate max-w-xs">
                    {selector.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate max-w-xs">
                    {selector.email}
                  </span>
                </div>
                <div className="flex items-center">
                   {
                    selector?.profilePicture ? (
                      <Image
                      src={selector?.profilePicture}
                      alt="Profile"
                      width={35}
                      className=" rounded-full ring-2 ring-orange-500"
                      height={35}
                    />
  
                    ):
                    (
                      <Image
                      src="/profile.png"
                      alt="Profile"
                      width={35}
                      className=" rounded-full ring-2 ring-orange-500"
                      height={35}
                    />
                    )
                   }
                  <ChevronDown className="h-4 w-4 text-gray-500 ml-1 hidden sm:block" />
                </div>
              </button>
               {
              isProfileClicked &&    
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1  z-20">
                <Link
                  href="/Dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </Link>
                <Link
                  href="/profile/setting"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                   onClick={()=>{logOut(false)}}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
        }
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="bg-[#FF7300] hidden text-white hover:bg-[#FF9522] md:block lg:text-[18px] text-[12px] w-32 h-9 lg:w-52 lg:h-10 rounded-[5px]"
          >
            <div className="flex justify-center gap-3 items-center">
              {translate("Get Hired")}
              <LogIn className="w-4 h-4 lg:w-5 lg:h-5 mt-0" />
            </div>
          </button>
        )}

        <div className="flex items-center gap-3 md:hidden">
          {selector.isUserLoggedIn ? (
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 relative">
        <Bell className="w-5 h-5" />
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
      </button> */}

              <div className="relative group">
                <button className="flex items-center space-x-2 lg:space-x-3 focus:outline-none p-1 rounded-full hover:bg-gray-100">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-xs lg:text-sm font-medium text-gray-700 truncate max-w-xs">
                      {selector.name}
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-xs">
                      {selector.email}
                    </span>
                  </div>
                  <div className="flex items-center">
                {console.log('selector.profilePicture' ,  selector.profilePicture)}       
                  {
                  
                    selector?.profilePicture ? (
                      <Image
                      src={selector?.profilePicture}
                      alt="Profile"
                      width={35}
                      className=" rounded-full ring-2 ring-orange-500"
                      height={35}
                    />
  
                    ):
                    (
                      <Image
                      src="/profile.png"
                      alt="Profile"
                      width={35}
                      className=" rounded-full ring-2 ring-orange-500"
                      height={35}
                    />
                    )
                   }
                    <ChevronDown className="h-4 w-4 text-gray-500 ml-1 hidden sm:block" />
                  </div>
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-20">
                  <Link
                    href="/Dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/profile/setting"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                  onClick={()=>{logOut(false)}}
                    // onClick={toggleLoginState}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="bg-[#FF7300] text-white hover:bg-[#FF9522] md:hidden flex items-center justify-center gap-1 w-[7rem] h-7 lg:px-6 lg:py-3 rounded-[5px]"
            >
              <span className="text-xs lg:text-lg">
                {translate("Get Hired")}
              </span>
              <LogIn className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          )}
          <button
            className="md:hidden menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Image src="/menu.webp" width={24} height={24} className="w-6" alt="Menu"></Image>
          </button>
        </div>
      </div>

      {/* Slide menu from left */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 shadow-lg z-50 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } slide-menu`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#FF7300]">Menu</h2>
            <button
              aria-label="Menu"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col h-full justify-between py-4">
          {/* {NavItems.map((item, index) => (
           
            <Link href={item.path} key={index}>
            <h1 className={`block px-4 py-2 text-sm ${pathname === item.path ? 'text-[#FF7300] font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>
              {item.text}
            </h1>
          </Link>
          ))} */}
          <div> 
          {NavItemsMobile.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className={`block px-4 py-2 text-sm ${
                pathname === item.path
                  ? "text-[#FF7300] font-bold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.text}
            </Link>
          ))}

          {/* Dashboard option - only visible when on Dashboard path */}
          {pathname?.includes("/Dashboard") && (
            <div>
              <button
                onClick={() => setIsDashboardExpanded(!isDashboardExpanded)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-[#FF7300] font-bold"
              >
                Dashboard
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isDashboardExpanded ? "transform rotate-180" : ""
                  }`}
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
                      className={`block px-4 py-2 text-sm ${
                        pathname === subOption.path
                          ? "text-[#FF7300]"
                          : "text-gray-600 hover:text-[#FF9522]"
                      }`}
                    >
                      {subOption.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
          </div>
        {selector.isUserLoggedIn && <button
         onClick={()=>{logOut(false)}}
         className="w-full mb-14  text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
       <div className="flex ml-4  justify-between">
        Sign out
        <LogOut size={16} className="mr-6"></LogOut> 
        
       </div>
</button>
}
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
  );
};

export default Navbar;
