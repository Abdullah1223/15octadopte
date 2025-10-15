


'use client';
import { AlarmClock, FileText, Globe, Handshake, HandshakeIcon, Scissors, Sparkle, Target, TargetIcon, Users, Zap } from "lucide-react";
import Navbar from "../Components/Navbar";
import Serviceboxresuseable from "../Components/Serviceboxresuable";
import { Autoplay, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../Components/Footer";
import { useTranslation } from "../Context/TranslationContext.";

export default function Aboutus() {
      const { translate, setLanguage, language } = useTranslation();
  const Serviceboxreuseabledata = [
    {
      title: translate('find_talent'),
      subheading: translate('find_talent_subheading'),
      icon: Handshake
    },
    {
      title: 'Liste Instantanée',
      subheading: 'Publiez vos offres d emplois en quelques clics.',
      icon: FileText
    },
    {
      title: 'Sensibilisation des talents',
      subheading: 'Accédez à un vivier de talents et échangez directement avec les candidats.',
      icon: Users
    },
    {
      title: "Recherche d'opportunités",
      subheading: "Découvrez des opportunités d'emplois qui correspondent à votre profil et à vos attentes.",
      icon: Scissors
    },
    {
      title: "Vitrine professionnelle",
      subheading: "Créez un profil professionnel attractif avec vos compétences et expériences.",
      icon: Sparkle
    },
    {
      title: "Réseau de salons professionnels",
      subheading: "Entrez en contact avec des employeurs sérieux et développez votre réseau.",
      icon: Globe
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FA4909] to-[#FF7A45] py-20 flex flex-col justify-center items-center w-full shadow-lg">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.png')] opacity-10" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white z-10">{translate('About_us_for_main_page')}</h1>
        <div className="h-1 w-20 bg-white my-4 rounded-full z-10" />
        <h2 className="text-xl md:text-2xl font-medium text-white text-center max-w-2xl px-4 z-10">
         {translate('About_us_for_main_page_subheading')}
        </h2>
      </div>
      
      {/* Who We Are Section */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex h-auto md:h-[35rem] bg-gradient-to-br from-[#FFB07C] to-[#FFD0B0] flex-col items-center justify-center py-16 px-6">
          <h2 className="text-black font-bold text-4xl xl:text-5xl mb-8 relative">
           {translate('who_are_we')}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-[#FA4909] rounded-full"></span>
          </h2>
          <p className="text-center text-base md:text-lg max-w-xl leading-relaxed mb-10">
            Bienvenue dans la première plateforme dédiée à la mise en relation entre coiffeurs et employeurs du secteur de la coiffure. Que vous soyez un salon en quête de talents ou un professionnel à la recherche d'opportunités, nous avons conçu un espace innovant pour répondre à vos besoins.
          </p>
          <button className="px-8 py-3 bg-[#FA4909] text-white font-medium rounded-full hover:bg-[#E43700] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
            {translate('Lets_Explore_About_Us')}
          </button>
        </div>

        <div className="w-full h-[35rem] overflow-hidden">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            spaceBetween={0}
            className="w-full h-full"
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
          >
            <SwiperSlide>
              <img src="/barber1.jpg" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Barber shop image 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/barber2.jpg" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Barber shop image 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/barber3.jpg" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Barber shop image 3" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/barber4.jpg" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Barber shop image 4" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <div className="py-16 px-4 md:px-12 bg-[#F9F7F7]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col justify-center">
            <div className="relative mb-8">
              <h2 className="text-[#F76A0C] text-5xl lg:text-6xl font-light">{translate('why')}</h2>
              <h2 className="text-[#DD171B] mt-2 font-bold text-5xl lg:text-6xl">{translate('choose')}</h2>
              <h2 className="text-[#DD171B] mt-2 font-bold text-5xl lg:text-6xl">{translate('us_for_about_us')}</h2>
              <div className="absolute -bottom-4 left-0 h-1 w-20 bg-[#F76A0C] rounded-full"></div>
            </div>
          </div>

          <div className="flex flex-col space-y-10">
            <div className="flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> 
              <div className="bg-[#FFF1E6] p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Zap size={30} className="text-[#FA4909]" />
              </div>
              <h3 className="text-2xl text-black font-bold mb-3">Simplicité & rapidité</h3>
              <p className="text-gray-600 leading-relaxed">
                Un processus de mise en relation fluide et efficace, permettant aux coiffeurs de trouver des opportunités adaptées et aux employeurs de recruter facilement des talents qualifiés.
              </p>
            </div>

            <div className="flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> 
              <div className="bg-[#FFF1E6] p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <TargetIcon size={30} className="text-[#FA4909]" />
              </div>
              <h3 className="text-2xl text-black font-bold mb-3">Ciblage précis</h3>
              <p className="text-gray-600 leading-relaxed">
                Recevez des offres D'emplois adaptées à votre expérience et à vos préférences. Les employeurs trouvent rapidement les coiffeurs qualifiés correspondant à leurs besoins.
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-10">
            <div className="flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> 
              <div className="bg-[#FFF1E6] p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <HandshakeIcon size={30} className="text-[#FA4909]" />
              </div>
              <h3 className="text-2xl text-black font-bold mb-3">Communauté engagée</h3>
              <p className="text-gray-600 leading-relaxed">
                Rejoignez une communauté active de coiffeur et d'employeurs partageant les mêmes valeurs. Échangez, collaborez et développez votre réseau professionnel en toute confiance.
              </p>
            </div>

            <div className="flex flex-col bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"> 
              <div className="bg-[#FFF1E6] p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <AlarmClock size={30} className="text-[#FA4909]" />
              </div>
              <h3 className="text-2xl text-black font-bold mb-3">Accès en temps réel</h3>
              <p className="text-gray-600 leading-relaxed">
                Consultez et postulez aux offres en temps réel, sans attendre. Les employeurs reçoivent instantanément les candidatures des coiffeur qualifiés.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Services Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-center items-center flex-col mb-12">
          <h2 className="text-black font-bold text-3xl md:text-4xl relative inline-block">
            {translate('our_services')}
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-[#FA4909] rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Serviceboxreuseabledata.map((data, index) => (
            <div key={index} className="flex flex-col justify-center items-center">
              <Serviceboxresuseable title={data.title} subheading={data.subheading} Icon={data.icon} />
            </div>
          ))}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
