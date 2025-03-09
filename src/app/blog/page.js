// import Image from "next/image";
// import Navbar from "../Components/Navbar";
// import { Menu, Scissors, Search } from "lucide-react";
// import BlogCard from "../Components/BlogCard";
// import BlogPageSectionLg from "../Components/BlogPageSectionLg";
// import BlogPageSectionSm from "../Components/BlogPageSectionSm";
// import BlogPageSearchSectionSm from "../Components/BlogPageSearchSectionSm";

// export default function Blog(){
//    const MockArray=['Hair Care','Hair Trends','Style Hairs']
//     return (
//         <div className="bg-[#EBEBEB] h-screen">
//            <Navbar></Navbar>
//            <div className="w-full h-[15rem] md:aspect-[14/4] grid place-items-center bg-cover bg-center" style={{ backgroundImage: "url('/barber1 1.png')" }}>
//     <div className="bg-black bg-opacity-20 w-full h-full grid place-items-center">
//         <div className="flex flex-col items-center">
//             <h1 className="text-white text-lg sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-8xl">Stay Sharp Barbering Trends, Tips &</h1>
//             <h1 className="text-white  text-lg sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl mt-3 2xl:text-8xl">Career Insights</h1>
//         </div>
//     </div>
// </div>

//      <BlogPageSectionLg></BlogPageSectionLg>
     
//      <BlogPageSearchSectionSm></BlogPageSearchSectionSm>
//   <BlogPageSectionSm></BlogPageSectionSm>

 

//      <div className="h-44"></div>
//         </div>
//     )
// }
'use client';
import Image from "next/image";
import Navbar from "../Components/Navbar";
import { Menu, Router, Scissors, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";
import { useRouter } from "next/navigation";
import BlogPageSearchSectionSm from "../Components/BlogPageSearchSectionSm";

export default function Blog() {
  const [isLoaded, setIsLoaded] = useState(false);
  const categories = ['Hair Care', 'Hair Trends', 'Style Tips', 'Grooming Essentials', 'Beard Care'];
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <div className="bg-neutral-100 min-h-screen font-sans">
      <Navbar />
      
      {/* Hero Banner with Animation */}
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
              Stay Sharp: Barbering Trends, Tips &
            </h1>
            <h1 className="text-white font-bold text-3xl md:text-5xl lg:text-6xl mt-2 md:mt-4 leading-tight">
              Career Insights
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

      {/* Desktop View with Animations */}
      <div className="hidden md:block container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <motion.div 
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <motion.div 
              className="flex items-center mb-8"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-bold text-neutral-900">Blog</h2>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="h-1 bg-orange-500 ml-4"
              ></motion.div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div key={item} variants={itemVariants}>
                  <BlogCard featured={item === 1} />
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-12 flex justify-center"
              variants={itemVariants}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-neutral-800 hover:bg-neutral-900 text-white px-6 py-3 rounded-md font-medium transition-all duration-300"
              >
                Load More Articles
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div 
            className="md:w-72 lg:w-80"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="sticky top-24">
              <motion.div 
                className="relative mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h3 className="text-xl font-bold px-6 py-4 border-b border-neutral-100">
                  Categories
                </h3>
                
                <div>
                  {categories.map((category, index) => (
                    <motion.div 
                      key={category}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ 
                        backgroundColor: "rgba(249, 115, 22, 0.05)", 
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                      className={`flex items-center gap-3 px-6 py-4 hover:bg-neutral-50 transition-colors cursor-pointer ${
                        index !== categories.length - 1 ? 'border-b border-neutral-100' : ''
                      }`}
                    >
                      <Scissors size={16} className="text-orange-500" />
                      <span onClick={()=>{router.push(`/blog/${category}`)}} className="font-medium">{category}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-8 bg-neutral-800 text-white rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                <p className="text-neutral-300 text-sm mb-4">Subscribe to get the latest articles and trends delivered to your inbox.</p>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-lg py-2 px-4 mb-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-lg font-medium transition-all"
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <BlogPageSearchSectionSm />
        <BlogPageSectionSm />
      </div>
      <Footer></Footer>

    </div>
  );
}

const BlogCard = ({ featured = false }) => {
  const router = useRouter()

  return (
    
    <motion.div 
      whileHover={{ y: -5 }}
      className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image 
          src="/haircare.jpg" 
          alt="Blog post" 
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
        ></motion.div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-orange-500">Hair Care</span>
          <span className="h-1 w-1 rounded-full bg-neutral-300"></span>
          <span className="text-xs text-neutral-500">Feb 29, 2025</span>
        </div>
        
        <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-orange-500 transition-colors">
          {featured ? 'Master the Art of Perfect Haircare: Expert Tips' : 'How To Care For Your Hair Like a Pro'}
        </h3>
        
        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
          Lorem ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type.
        </p>
        
        <div className="flex items-center justify-between">
          <motion.button 
          onClick={()=>{router.push(`/blog/Hair Care/1`)}}
            className="text-orange-500 font-medium text-sm flex items-center"
            whileHover={{ x: 3 }}
          >
            Read More
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </motion.button>
          
          <div className="flex items-center text-neutral-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              486
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};



const BlogPageSectionSm = () => {
  const articles = [
    {
      image: "/haircare.jpg",
      category: "Hair Care",
      date: "Feb 2, 2025",
      title: "How To Style Your Hair",
      excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
    },
    {
      image: "/haircare.jpg",
      category: "Hair Trends",
      date: "Feb 5, 2025",
      title: "2025 Trending Hairstyles",
      excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
    },
    {
      image: "/haircare.jpg",
      category: "Style Tips",
      date: "Feb 10, 2025",
      title: "Perfect Fade Techniques",
      excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
    }
  ];
  
  const categories = ['Hair Care', 'Hair Trends', 'Style Tips'];
 const router = useRouter();
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="bg-neutral-100 md:hidden py-6 px-4"
    >
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-4"
      >
        <h2 className="text-2xl font-bold text-neutral-900 flex items-center">
          Blog
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "2rem" }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-1 bg-orange-500 ml-3"
          ></motion.div>
        </h2>
      </motion.div>
      
      {categories.map((category, categoryIndex) => (
        <motion.div 
          key={category} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * categoryIndex, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-neutral-800">{category}</h3>
            <motion.button 
              whileHover={{ x: 3 }}
              className="text-orange-500 text-sm font-medium flex items-center"
            >
              View All
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 ml-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                whileHover={{ x: 2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </motion.button>
          </div>
          
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * categoryIndex + 0.1 * i, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="flex-shrink-0 w-72 bg-white rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src="/haircare.jpg" 
                      alt="Blog post" 
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105" 
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-orange-500">{category}</span>
                      <span className="h-1 w-1 rounded-full bg-neutral-300"></span>
                      <span className="text-xs text-neutral-500">Feb {2 + i}, 2025</span>
                    </div>
                    
                    <h3 className="font-bold text-neutral-900 mb-2">{articles[i % 3].title}</h3>
                    
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                      {articles[i % 3].excerpt}
                    </p>
                    
                    <motion.button 
                     onClick={()=>{router.push(`/blog/Hair Care/1`)}}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-orange-500 hover:bg-orange-600 w-full py-2 rounded text-white text-sm font-medium transition-colors"
                    >
                      Read More
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
           
          </div>
        </motion.div>
      ))}
    
    </motion.div>
  );
};