// import { CloudLightningIcon } from "lucide-react";

// const AdsPreview = ({data})=>{
//  console.log(data)
//     if(data==null) return null;
//     //  const baseStyle = {
//     //   backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : 'none',
//     //   backgroundColor: data.backgroundImage ? 'transparent' : data.backgroundColor,
//     //   backgroundSize: 'cover',
//     //   backgroundPosition: 'center'
//     // };
//     const backgroundStyle = {
//         background: data.backgroundImage 
//           ? `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${data.backgroundImage})`
//           : data.backgroundColor,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       };
    
//     return (

       
//         <div className="w-full max-w-4xl mx-auto p-4">
//         {/* Unified Responsive Design */}
//         <div 
//           className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:scale-[1.02]"
//           style={backgroundStyle}
//         //   onClick={handleClick}
//         >
//           {/* Gradient Overlay for better text readability */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          
//           {/* Main Content */}
//           <div className="relative z-10 p-4 sm:p-6 lg:p-8">
//             <div className="flex items-center justify-between">
//               {/* Left Content */}
//               <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
//                 {/* Icon */}
//                 <div className="flex-shrink-0">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-lg sm:text-xl group-hover:bg-white/30 transition-colors duration-300">
//                     {/* {icon} */}
//                     <CloudLightningIcon ></CloudLightningIcon>
//                   </div>
//                 </div>
                
//                 {/* Text Content */}
//                 <div className="flex-1 min-w-0">
//                   <h3 className="font-bold text-white text-sm sm:text-base lg:text-lg mb-1 truncate">
//                     {data.Title}
//                   </h3>
//                   <p className="text-white/90 text-xs sm:text-sm lg:text-base hidden sm:block leading-relaxed">
//                     {data.Description}
//                   </p>
//                   {/* Mobile simplified content */}
//                   <p className="text-white/80 text-xs sm:hidden">
//                     {data?.Description?.length > 40 ? content.substring(0, 40) + '...' : data.Description}
//                   </p>
//                 </div>
//               </div>
              
//               {/* Action Button */}
//               <div className="flex-shrink-0 ml-3">
//                 <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40 px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-xl text-white font-medium text-xs sm:text-sm transition-all duration-300 group-hover:scale-105 border border-white/20 hover:border-white/30">
//                   <span className="hidden sm:inline">Découvrir</span>
//                   <span className="sm:hidden">→</span>
//                 </button>
//               </div>
//             </div>
            
//             {/* Bottom accent line */}
//             <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
//           </div>
          
//           {/* Floating particles effect */}
//           <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
//           <div className="absolute top-8 right-8 w-1 h-1 bg-white/20 rounded-full animate-ping"></div>
//           <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-300"></div>
//         </div>
        
      
      
//       </div>


//     )


// }

// export default AdsPreview;


'use client';
import { CloudLightning, Sparkles, ArrowRight, Play, Heart, Share, Bookmark } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const AdsPreview = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const cardRef = useRef(null);
  const route = useRouter()
  // Handle mouse movement for dynamic effects
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  // Create ripple effect on click
  const createRipple = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { x, y, id: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
  };

  // Floating particles animation
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    duration: 3 + (i % 3),
    x: 10 + (i * 10) % 80,
    y: 10 + (i * 15) % 70
  }));

  if (data == null) return null;

  const backgroundStyle = {
    background: data.backgroundImage 
      ? `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${data.preSignedUrl})`
      : `linear-gradient(135deg, ${data.backgroundColor || '#667eea'}, ${data.backgroundColor ? data.backgroundColor + '88' : '#764ba2'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="w-full p-4">
      <div 
        ref={cardRef}
        className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-700 cursor-pointer group"
        style={{
          ...backgroundStyle,
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          filter: isHovered ? 'brightness(1.1) saturate(1.2)' : 'brightness(1) saturate(1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={createRipple}
      >
        {/* Dynamic gradient overlay that follows mouse */}
        <div 
          className="absolute inset-0 opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 300px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.3), transparent 50%)`,
            opacity: isHovered ? 0.4 : 0
          }}
        />

        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-500" />
        <div 
          className="absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-700"
          style={{
            background: isHovered 
              ? 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent) border-box'
              : 'none',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'subtract'
          }}
        />

        {/* Ripple effects */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
              animationDuration: '0.6s'
            }}
          />
        ))}

        {/* Floating particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${particle.duration}s infinite ease-in-out`,
              animationDelay: `${particle.delay}s`,
              transform: isHovered ? 'scale(1.5)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          />
        ))}

        {/* Main Content Container */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          {/* Header with action buttons */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            
            <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
                className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <Heart className={`w-4 h-4 transition-colors duration-300 ${isLiked ? 'text-red-400 fill-current' : 'text-white'}`} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsBookmarked(!isBookmarked); }}
                className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <Bookmark className={`w-4 h-4 transition-colors duration-300 ${isBookmarked ? 'text-yellow-400 fill-current' : 'text-white'}`} />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-110">
                <Share className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex items-center justify-between">
            {/* Left Content */}
            <div className="flex items-center space-x-4 sm:space-x-6 flex-1 min-w-0">
              {/* Enhanced Icon */}
              <div className="relative flex-shrink-0">
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-500 border border-white/30"
                  style={{
                    transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                    boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.2)'
                  }}
                >
                  <CloudLightning className="text-white drop-shadow-lg" />
                  <Sparkles 
                    className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse"
                    style={{ opacity: isHovered ? 1 : 0 }}
                  />
                </div>
                
                {/* Pulsing ring effect */}
                <div 
                  className="absolute inset-0 rounded-2xl border-2 border-white/50 transition-all duration-1000"
                  style={{
                    transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                    opacity: isHovered ? 0 : 0.5
                  }}
                />
              </div>
              
              {/* Enhanced Text Content */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 
                    className="font-bold text-white text-lg sm:text-xl lg:text-2xl leading-tight transition-all duration-300"
                    style={{
                      transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                      textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                    }}
                  >
                    {data.Title}
                  </h3>
                  <div 
                    className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.5s', opacity: isHovered ? 1 : 0 }}
                  />
                </div>
                
                <p 
                  className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed transition-all duration-300"
                  style={{
                    transform: isHovered ? 'translateX(12px)' : 'translateX(0)',
                    textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  <span className="hidden sm:block">{data.Description}</span>
                  <span className="sm:hidden">
                    {data?.Description?.length > 40 ? data.Description.substring(0, 40) + '...' : data.Description}
                  </span>
                </p>

                {/* Interactive progress bar */}
                <div className="hidden sm:block">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isHovered ? '85%' : '0%',
                        transform: isHovered ? 'translateX(0)' : 'translateX(-100%)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Action Button */}
            <div className="flex-shrink-0 ml-4">
              <button 
              onClick={()=>redirect(data.redirectUrl)}
                className="group/btn relative overflow-hidden bg-white/20 backdrop-blur-xl hover:bg-white/30 active:bg-white/40 px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-4 rounded-2xl text-white font-semibold text-sm sm:text-base transition-all duration-500 border-2 border-white/30 hover:border-white/50"
                style={{
                  transform: isHovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
                  boxShadow: isHovered ? '0 15px 35px rgba(0,0,0,0.3)' : '0 5px 15px rgba(0,0,0,0.2)'
                }}
              >
                {/* Button background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/20 to-pink-400/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                
                <div className="relative flex items-center space-x-2">
                  <span className="hidden sm:inline">Découvrir</span>
                  <span className="sm:hidden">→</span>
                  <ArrowRight 
                    className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                  <Play 
                    className="w-0 h-4 transition-all duration-300 group-hover/btn:w-4 group-hover/btn:ml-1 opacity-0 group-hover/btn:opacity-100"
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced bottom accent with animated elements */}
          <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transform origin-left transition-transform duration-700"
              style={{
                transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
              }}
            />
            <div 
              className="absolute top-0 left-0 w-8 h-full bg-white/60 transform -skew-x-12 transition-transform duration-1000"
              style={{
                transform: isHovered ? 'translateX(400px)' : 'translateX(-32px)',
              }}
            />
          </div>
        </div>

        {/* Ambient glow effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-5deg); }
        }
        
        .shadow-4xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
};

export default AdsPreview;