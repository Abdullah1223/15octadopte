// "use client";
// import {IndiviualArticlePostCard} from "@/app/Components/IndiviualArticlePostCard";
// import Navbar from "@/app/Components/Navbar";
// import {
  
//   Clock,
//   MapPin,
//   MessageCircle,
//   Newspaper,
  
//   ThumbsDown,
  
//   ThumbsUp,
// } from "lucide-react";
// import { useParams } from "next/navigation";

// export default function IndiviualArticle() {
//   const params = useParams();
//   //console.log( params)
//   const category = decodeURIComponent(params.category);
//   const MockArray = ["Hair Care", "Hair Style", "Trending Styles"];
  
//   return (
//     <div className="bg-[#EBEBEB]">
//       <Navbar></Navbar>
//       <div
//         className="w-full h-[15rem] md:aspect-[14/4] grid place-items-center bg-cover bg-center"
//         style={{ backgroundImage: "url('/barber1 1.png')" }}
//       >
//         <div className="bg-black bg-opacity-20 w-full h-full grid place-items-center">
//           <div className="flex flex-col items-center">
//             <h1 className="text-white text-lg sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-8xl">
//               Stay Sharp Barbering Trends, Tips &
//             </h1>
//             <h1 className="text-white  text-lg sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl mt-3 2xl:text-8xl">
//               Career Insights
//             </h1>
//           </div>
//         </div>
//       </div>

//       <div className="grid   md:grid-cols-4 h-screen mt-4 bg-[#EBEBEB]">
//         <div className="bg-[#EBEBEB] w-full h-full">
//           <div className="px-4 flex flex-col">
//             <div className=" bg-white   mt-16 xl:ml-4 shadow-md md:w-36 md:h-28 lg:w-44 lg:h-36 xl:w-56 xl:h-44 rounded-xl hidden  md:flex flex-col justify-center px-4">
//               <Newspaper size={45} color="black" className="ml-2"></Newspaper>
//               <h1 className="ml-2 text-black md:text-base  lg:text-lg xl:text-2xl  mt-1 font-bold">
//                 News/{category}
//               </h1>
//             </div>

//             <div className="bg-white py-3  mt-6 xl:ml-4 shadow-md md:w-36 h-72  lg:w-44  xl:w-56  rounded-xl hidden md:flex flex-col ">
//               <h1 className="text-black  font-bold text-2xl ml-4">
//                 Categories
//               </h1>
//               {MockArray.map((data, index) => {
//                 return (
//                   <h1
//                     className={`${
//                       index == 0 ? "mt-6" : "mt-1"
//                     } ml-4 hover:bg-gray-100 w-auto ${
//                       data == category ? "text-[#ff7300]" : "text-black"
//                     }  ml-2 text-base text-black hover:text-[#f77300] font-bold`}
//                   >
//                     {data}
//                   </h1>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/*Middle Section*/}
//         <div className=" col-span-2 bg-[#EBEBEB] w-full h-full">
        
//         <IndiviualArticlePostCard></IndiviualArticlePostCard>
       
      
//        </div>
//         {/*Thrid Section*/}
//         <div className=" w-full h-full">
//           <h1>dsadas</h1>
//         </div>
//       </div>

   
//     </div>
//   );
// }


// pages/index.js
'use client';
import { motion } from "framer-motion";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { 
  Calendar, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  Eye, 
  Heart,
  Router
} from 'lucide-react';
import Navbar from '@/app/Components/Navbar';
import NewsletterNew from '@/app/Components/Newsletternew';
import Footer from '@/app/Components/Footer';
import BlogPageSearchSectionSm from '@/app/Components/BlogPageSearchSectionSm';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/app/Context/TranslationContext.';

export default function IndiviualArticle() {
  const [comment, setComment] = useState('');
        const { translate, setLanguage, language } = useTranslation();
  const router = useRouter()
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setComment('');
    // Here you would typically handle the comment submission
  };

  return (
    <div className=" mx-auto bg-gray-100 min-h-screen font-sans">
      <Navbar></Navbar>


      <div className="w-full h-[20rem] md:h-[30rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        <motion.div
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <Image 
            src="/barber1 1.png" 
            alt="Barbershop Hero" 
            fill 
            className="object-cover object-center"
            priority 
          />
        </motion.div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center px-4 max-w-4xl"
          >
            <h1 className="text-white font-bold text-3xl md:text-5xl lg:text-6xl leading-tight">
              {translate('stay_sharp:_barbering_trends_tips_&')}
            </h1>
            <h1 className="text-white font-bold text-3xl md:text-5xl lg:text-6xl mt-2 md:mt-4 leading-tight">
              {translate('career_insights')}
            </h1>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-6 md:mt-8"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md text-lg font-medium transition-all duration-300"
              >
                Explore Articles
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Head>
        <title>Hair Care</title>
        <meta name="description" content="Hair Care tips and advice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <div className='md:hidden'>
        <BlogPageSearchSectionSm></BlogPageSearchSectionSm>
       </div>  
      <main className="p-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">{translate('Hair Care')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="hidden md:block md:col-span-1">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                <span className="text-sm">News/Hair Care</span>
              </div>
              
              <div className=" mt-6">
                <h3 className="font-medium mb-2">{translate('categories')}</h3>
                <ul className="space-y-2">
                  <li onClick={()=>{router.push('/blog/Hair Care')}} className="text-orange-500 font-medium">{translate('Hair Care')}</li>
                  <li onClick={()=>{router.push('/blog/Barber Industry')}} className="text-gray-600 hover:text-gray-800 cursor-pointer">{translate('Grooming Essentials')}</li>
                  <li onClick={()=>{router.push('/blog/Hairdressing Techniques')}} className="text-gray-600 hover:text-gray-800 cursor-pointer">{translate('Style Tips')}</li>
                  <li onClick={()=>{router.push('/blog/Trends')}}  className="text-gray-600 hover:text-gray-800 cursor-pointer">{translate('Hair Trends')}</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-64 w-full">
                <Image 
                  src="/haircare.jpg"
                  alt="Woman with curly hair" 
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              
              <div className="p-4">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-orange-100 text-orange-500 text-xs px-2 py-1 rounded">Hair Care</span>
                    <div className="flex space-x-3 text-xs text-gray-500">
                      <span className="flex items-center"><Eye className="h-3 w-3 mr-1" /> 3.4k</span>
                      <span className="flex items-center"><Heart className="h-3 w-3 mr-1" /> 1k</span>
                      <span className="flex items-center"><Share2 className="h-3 w-3 mr-1" /> 1.2k</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2">{translate('How To Care For Your Hair Like a Pro')}</h2>
                  <p className="text-sm text-gray-600 mb-4">By Shiksh Solutions</p>
                  
                  <div className="flex space-x-2 mb-6">
                    <button className="flex items-center text-xs border border-gray-200 rounded-full px-3 py-1.5">
                      <Bookmark className="h-3 w-3 mr-1" />
                      {translate('Save To Favorites')}
                    </button>
                    <button className="flex items-center text-xs border border-gray-200 rounded-full px-3 py-1.5">
                      <Share2 className="h-3 w-3 mr-1" />
                      {translate('Share On Media')}
                    </button>
                  </div>
                </div>
                
                <div className="prose mb-6">
                  <h3 className="text-lg font-semibold mb-2">{translate('Good Shampoo')}</h3>
                  <p className="text-sm text-gray-700 mb-4">{translate('blog_id_subheading')}</p>
                  
                  <h3 className="text-lg font-semibold mb-2">{translate('Frequent Baths')}</h3>
                  <p className="text-sm text-gray-700 mb-4">{translate('blog_id_subheading')}</p>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 mb-4">{translate('Published On: 2/2/25')} 2/28/24</p>
                  
                  <div className="flex space-x-4 mb-6">
                    <button className="flex items-center text-gray-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">Like</span>
                    </button>
                    <button className="flex items-center text-gray-600">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span className="text-sm">Comments</span>
                    </button>
                    <button className="flex items-center text-gray-600">
                      <Share2 className="h-4 w-4 mr-1" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex mb-4">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 mr-2">
                        {/* User avatar placeholder */}
                      </div>
                      <input 
                        type="text" 
                        placeholder="Write a comment" 
                        className="flex-1 border border-gray-200 rounded-full px-4 py-1 text-sm"
                      />
                    </div>
                    
                    <div className="mt-6">
                      <div className="mb-6">
                        <div className="flex mb-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 mr-2">
                            {/* User avatar placeholder */}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Shiksh Solutions 
                              <span className="text-xs font-normal text-gray-500 ml-2">6 hours ago</span>
                              <span className="text-xs text-gray-400 ml-2">partly friends</span>
                            </p>
                            <p className="text-sm mt-1">{translate('comment_1')}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-2 ml-10 mb-4">
                          <button className="flex items-center mr-3">
                            <ThumbsUp className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-xs">25K</span>
                          </button>
                          <button className="flex items-center mr-3">
                            <ThumbsDown className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-xs">25K</span>
                          </button>
                          <span className="text-xs text-gray-500">2 comments</span>
                        </div>
                        
                        <div className="ml-10 pl-8 border-l border-gray-100">
                          <div className="mb-3">
                            <div className="flex mb-1">
                              <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 mr-2">
                                {/* User avatar placeholder */}
                              </div>
                              <div>
                                <p className="text-xs font-medium">
                                  Shiksh Solutions 
                                  <span className="text-xs font-normal text-gray-500 ml-1">1 day ago</span>
                                  <span className="text-xs text-gray-400 ml-1">partly friends</span>
                                </p>
                                <p className="text-xs mt-1">{translate('comment_2')}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="flex mb-1">
                              <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 mr-2">
                                {/* User avatar placeholder */}
                              </div>
                              <div>
                                <p className="text-xs font-medium">
                                  Shiksh Solutions 
                                  <span className="text-xs font-normal text-gray-500 ml-1">1 day ago</span>
                                  <span className="text-xs text-gray-400 ml-1">partly friends</span>
                                </p>
                                <p className="text-xs mt-1">{translate('comment_2')}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex mb-2">
                            <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 mr-2">
                              {/* User avatar placeholder */}
                            </div>
                            <input 
                              type="text" 
                              placeholder={translate('Add a comment')}
                              className="flex-1 border border-gray-200 rounded-full px-3 py-1 text-xs"
                              value={comment}
                              onChange={handleCommentChange}
                            />
                          </div>
                          <button 
                            className="bg-orange-500 text-white text-xs px-4 py-1 rounded ml-auto block"
                            onClick={handleSubmit}
                          >
                            {translate('Submit')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related News */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Related News</h3>
              
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="mb-4 bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="relative h-24 w-full">
                    <Image 
                      src="/haircare.jpg"
                      alt="Hair care"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-2 relative">
                    <div className="flex justify-between items-center mb-6">
                      <span className="bg-orange-100 text-orange-500 text-xs px-1.5 py-0.5 rounded">{translate('Hair Care')}</span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Eye className="h-3 w-3 mr-1" /> 3.4k
                      </span>
                    </div>
                    <h4 className="text-sm font-medium">{translate('How To Care For Your Hair Like a Pro')}</h4>
                  </div>
                </div>
              ))}
            </div>
            <NewsletterNew></NewsletterNew>
          </div>

          
        </div>
        
        {/* Subscribe Section */}
      
      </main>
      <Footer></Footer>
    </div>
  );
}