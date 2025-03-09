
// const Serviceboxresuseable = ({title,subheading,Icon})=>{

// return(
//     <div className="group shadow-lg rounded-lg flex items-center hover:scale-110 hover:bg-[#FA4909] self-start bg-[#F5F1F1] mt-8 flex-col border w-64 h-56 transition-all duration-300">
//     <Icon
//       className="mt-6 text-[#ff7300] group-hover:text-black transition-colors duration-300"
//       size={45}
//     />
//     <h1 className="text-black px-4 text-center font-bold text-xl mt-2">{title}</h1>
//     <h1 className="text-center text-[#817C7C] group-hover:text-white font-bold px-2 mt-2 transition-colors duration-300">
//       {/* Quickly find qualified hairdressers based on your needs (permanent,
//       fixed-term, freelance, temporary). */}
//       {subheading}
//     </h1>
//   </div>
// )

// }

// export default Serviceboxresuseable;

const Serviceboxresuseable = ({title, subheading, Icon}) => {
  return (
    <div className="group overflow-hidden rounded-xl flex items-center flex-col w-full h-64 bg-white shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-[#FA4909] hover:to-[#FF7A45]">
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <div className="bg-[#FFF1E6] group-hover:bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 transition-all duration-300">
          <Icon
            className="text-[#FA4909] group-hover:text-[#FA4909] transition-colors duration-300"
            size={30}
          />
        </div>
        <h3 className="text-black group-hover:text-white text-center font-bold text-xl mb-3 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-center text-gray-600 group-hover:text-white/90 text-sm transition-colors duration-300">
          {subheading}
        </p>
      </div>
    </div>
  );
};

export default Serviceboxresuseable;