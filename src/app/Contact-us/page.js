// 'use client';
// import Footer from "../Components/Footer";
// import Navbar from "../Components/Navbar";
// import { useState } from "react";
// import { useTranslation } from "../Context/TranslationContext.";

// export default function Contactus() {
//   const [activeQuestion, setActiveQuestion] = useState(null);
//     const { translate, setLanguage, language } = useTranslation();
//   const toggleQuestion = (index) => {
//     setActiveQuestion(activeQuestion === index ? null : index);
//   };

//   const faqs = [
//     {
//       question: translate('faq_1'),
//       answer: translate('faq_1_answer') 
//        },
//     {
//       question: translate('faq_2'),
//       answer:  translate('faq_2_answer')
//     },
//     {
//       question:translate('faq_3'),
//       answer:  translate('faq_3_answer')
//     },
//     {
//       question: translate('faq_4'),
//       answer:translate('faq_4_answer')
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 border-b-4 border-orange-500 overflow-hidden">
//         <div className="container mx-auto px-4 py-12 md:py-20">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="w-full md:w-1/2 mb-12 md:mb-0 animate-fade-in-left">
//               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
//                 {translate('confused_dont_worry')} <br />
//                 {translate("we've_got_you")} <span className="text-orange-500 animate-pulse-soft">{translate('covered')}</span>
//               </h1>
//               <p className="mt-4 text-gray-700 text-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
//                 {translate("reach_out_to_us,_and_we'll_get_back_to_you_as_soon_as_possible")}
//               </p>
//               <div className="flex items-center space-x-6 mt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
//                 <a href="#" className="transition transform hover:scale-110">
//                   <img src="/facebook.png" alt="Facebook" className="w-8 h-8" />
//                 </a>
//                 <a href="#" className="transition transform hover:scale-110">
//                   <img src="/instagram.png" alt="Instagram" className="w-8 h-8" />
//                 </a>
//                 <a href="#" className="transition transform hover:scale-110">
//                   <img src="/email.png" alt="Email" className="w-8 h-8" />
//                 </a>
//               </div>
//             </div>
            
//             {/* Contact Form Card */}
//             <div className="w-full md:w-1/2 lg:w-5/12 animate-float-in-up" style={{ animationDelay: "0.3s" }}>
//               <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transform transition duration-500 hover:shadow-xl">
//                 <form>
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
//                       <input 
//                         type="text" 
//                         placeholder={translate('name')}
//                         className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition" 
//                       />
//                     </div>
//                     <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
//                       <input 
//                         type="text" 
//                         placeholder={translate('last_name')}
//                         className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition" 
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="mb-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
//                     <input 
//                       type="email" 
//                       placeholder={translate('enter_email')}
//                       className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition" 
//                     />
//                   </div>
                  
//                   <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.7s" }}>
//                     <textarea 
//                       placeholder={translate('your_message')}
//                       rows="5"
//                       className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none" 
//                     ></textarea>
//                   </div>
                  
//                   <button
//                     type="submit"
//                     className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition duration-300 transform hover:scale-[1.02] animate-bounce-subtle"
//                   >
//                     {translate('get_in_touch')}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Steps Section */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="text-center mb-12 animate-fade-in">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//             {translate('how_easy_it_is_to')} <span className="text-orange-500">{translate('contact_us')}</span>
//           </h2>
//         </div>
        
//         <div className="max-w-4xl mx-auto">
//           <div className="flex flex-col md:flex-row items-center md:items-start mb-12 animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
//             <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold text-lg mb-4 md:mb-0 md:mr-6 animate-pulse-slow">
//               1
//             </div>
//             <div>
//               <h3 className="text-xl text-black font-bold mb-2">{translate('fill_the_form')}</h3>
//               <p className="text-gray-600">{translate('fill_the_form_subheading')}</p>
//             </div>
//           </div>
          
//           <div className="flex flex-col md:flex-row items-center md:items-start mb-12 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
//             <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold text-lg mb-4 md:mb-0 md:mr-6 animate-pulse-slow">
//               2
//             </div>
//             <div>
//               <h3 className="text-xl text-black font-bold mb-2">{translate('review_submission')}</h3>
//               <p className="text-gray-600">{translate('review_submission_subheading')}</p>
//             </div>
//           </div>
          
//           <div className="flex flex-col md:flex-row items-center md:items-start animate-slide-in-right" style={{ animationDelay: "0.6s" }}>
//             <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold text-lg mb-4 md:mb-0 md:mr-6 animate-pulse-slow">
//               3
//             </div>
//             <div>
//               <h3 className="text-xl text-black font-bold mb-2">{translate('problem_solved')}</h3>
//               <p className="text-gray-600">{translate('problem_solved_subheading')}</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* FAQ Section */}
//       <div className="bg-gray-100 py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12 animate-fade-in">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//                {translate('frequently_asked')}  <span className="text-orange-500">Questions</span>
//             </h2>
//             <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//             {translate('frequently_asked_subheading')} 
//             </p>
//           </div>
          
//           <div className="max-w-3xl mx-auto">
//             {faqs.map((faq, index) => (
//               <div 
//                 key={index} 
//                 className="mb-4 bg-white rounded-lg shadow-md overflow-hidden animate-fade-in-up"
//                 style={{ animationDelay: `${0.2 + index * 0.1}s` }}
//               >
//                 <button
//                   className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center focus:outline-none"
//                   onClick={() => toggleQuestion(index)}
//                 >
//                   <span className="text-black">{faq.question}</span>
//                   <svg 
//                     className={`w-5 h-5 transition-transform duration-300 ${activeQuestion === index ? 'transform rotate-180' : ''}`} 
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 <div 
//                   className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
//                     activeQuestion === index ? 'max-h-40 pb-4' : 'max-h-0'
//                   }`}
//                 >
//                   <p className="text-gray-600">{faq.answer}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

       
//       </div>
      
//       {/* Add custom animation keyframes to your CSS or in a style tag */}
//       <style jsx>{`
//         @keyframes fadeInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes floatInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes pulseSoft {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.8; }
//         }
        
//         @keyframes pulseSlow {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//         }
        
//         @keyframes bounceSoft {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-3px); }
//         }
        
//         .animate-fade-in-left {
//           animation: fadeInLeft 0.8s ease-out forwards;
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.8s ease-out forwards;
//         }
        
//         .animate-float-in-up {
//           animation: floatInUp 0.8s ease-out forwards;
//         }
        
//         .animate-slide-in-right {
//           animation: slideInRight 0.8s ease-out forwards;
//         }
        
//         .animate-fade-in-up {
//           animation: fadeInUp 0.6s ease-out forwards;
//         }
        
//         .animate-pulse-soft {
//           animation: pulseSoft 2s infinite;
//         }
        
//         .animate-pulse-slow {
//           animation: pulseSlow 3s infinite;
//         }
        
//         .animate-bounce-subtle {
//           animation: bounceSoft 2s infinite;
//         }
//       `}</style>
//        <Footer></Footer>
//     </div>
//   );
// }


'use client';
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import { useTranslation } from "../Context/TranslationContext.";

export default function Contactus() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const { translate, setLanguage, language } = useTranslation();
  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: translate('faq_1'),
      answer: translate('faq_1_answer') 
    },
    {
      question: translate('faq_2'),
      answer: translate('faq_2_answer')
    },
    {
      question: translate('faq_3'),
      answer: translate('faq_3_answer')
    },
    {
      question: translate('faq_4'),
      answer: translate('faq_4_answer')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 border-b-4 border-orange-500 overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-12 md:mb-0 animate-fade-in-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                {translate('confused_dont_worry')} <br />
                {translate("we've_got_you")} <span className="text-orange-500 animate-pulse-soft">{translate('covered')}</span>
              </h1>
              <p className="mt-4 text-gray-700 text-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
                {translate("reach_out_to_us,_and_we'll_get_back_to_you_as_soon_as_possible")}
              </p>
              <div className="flex items-center space-x-6 mt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <a href="#" className="transition transform hover:scale-110">
                  <img src="/facebook.png" alt="Facebook" className="w-8 h-8" />
                </a>
                <a href="#" className="transition transform hover:scale-110">
                  <img src="/instagram.png" alt="Instagram" className="w-8 h-8" />
                </a>
                <a href="#" className="transition transform hover:scale-110">
                  <img src="/email.png" alt="Email" className="w-8 h-8" />
                </a>
              </div>
            </div>
            
            {/* Contact Form Card */}
            <div className="w-full md:w-1/2 lg:w-5/12 animate-float-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transform transition duration-500 hover:shadow-xl">
                <form>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                      <input 
                        type="text" 
                        placeholder={translate('name')}
                        className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition" 
                      />
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                      <input 
                        type="text" 
                        placeholder={translate('last_name')}
                        className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition" 
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                    <input 
                      type="email" 
                      placeholder={translate('enter_email')}
                      className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition" 
                    />
                  </div>
                  
                  {/* Added Dropdown Menu */}
                  <div className="mb-4 animate-fade-in" style={{ animationDelay: "0.65s" }}>
                    <select 
                      className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition appearance-none"
                    >
                      <option className="text-gray-300" value="" disabled selected>{translate('select your profile')}</option>
                      <option value="employeurs">{translate('employeurs')}</option>
                      <option value="candidat">{translate('candidat')}</option>
                      <option value="autre">{translate('autre')}</option>
                    </select>
                  </div>
                  
                  <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.7s" }}>
                    <textarea 
                      placeholder={translate('your_message')}
                      rows="5"
                      className="w-full bg-gray-100 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none" 
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition duration-300 transform hover:scale-[1.02] animate-bounce-subtle"
                  >
                    {translate('get_in_touch')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Steps Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {translate('how_easy_it_is_to')} <span className="text-orange-500">{translate('contact_us')}</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-12 animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold text-lg mb-4 md:mb-0 md:mr-6 animate-pulse-slow">
              1
            </div>
            <div>
              <h3 className="text-xl text-black font-bold mb-2">{translate('fill_the_form')}</h3>
              <p className="text-gray-600">{translate('fill_the_form_subheading')}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start mb-12 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold text-lg mb-4 md:mb-0 md:mr-6 animate-pulse-slow">
              2
            </div>
            <div>
              <h3 className="text-xl text-black font-bold mb-2">{translate('review_submission')}</h3>
              <p className="text-gray-600">{translate('review_submission_subheading')}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start animate-slide-in-right" style={{ animationDelay: "0.6s" }}>
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold text-lg mb-4 md:mb-0 md:mr-6 animate-pulse-slow">
              3
            </div>
            <div>
              <h3 className="text-xl text-black font-bold mb-2">{translate('problem_solved')}</h3>
              <p className="text-gray-600">{translate('problem_solved_subheading')}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {translate('frequently_asked')} <span className="text-orange-500">Questions</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {translate('frequently_asked_subheading')} 
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="mb-4 bg-white rounded-lg shadow-md overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <button
                  className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center focus:outline-none"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="text-black">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${activeQuestion === index ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    activeQuestion === index ? 'max-h-40 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add custom animation keyframes to your CSS or in a style tag */}
      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes floatInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulseSoft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes bounceSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-float-in-up {
          animation: floatInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-pulse-soft {
          animation: pulseSoft 2s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounceSoft 2s infinite;
        }
      `}</style>
      <Footer></Footer>
    </div>
  );
}