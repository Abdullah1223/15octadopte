// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   User, Scissors, MapPin, Star, Calendar, Clock, 
//   Award, Image as ImageIcon, Edit, Save, Plus, Trash2,
//   Phone, Mail, Instagram, Facebook, Globe
// } from 'lucide-react';

// const BarberProfile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "John Doe",
//     title: "Master Barber",
//     location: "New York, NY",
//     phone: "+1 (555) 123-4567",
//     email: "johndoe@example.com",
//     experience: "8 years",
//     availability: "Mon-Fri: 9AM-6PM",
//     specialties: ["Classic Cuts", "Beard Trimming", "Hot Towel Shaves", "Hair Coloring"],
//     bio: "Professional barber with over 8 years of experience specializing in classic cuts and beard styling. Passionate about providing exceptional grooming services and creating styles that enhance each client's unique features.",
//     portfolio: [
//       { id: 1, title: "Classic Fade", image: "/api/placeholder/300/200" },
//       { id: 2, title: "Beard Styling", image: "/api/placeholder/300/200" },
//       { id: 3, title: "Modern Pompadour", image: "/api/placeholder/300/200" },
//     ],
//     certifications: [
//       { id: 1, name: "Master Barber Certification", issuer: "National Barber Association", year: "2019" },
//       { id: 2, name: "Advanced Hair Coloring", issuer: "Professional Styling Institute", year: "2021" }
//     ],
//     socials: {
//       instagram: "johndoe_barber",
//       facebook: "johndoebarber",
//       website: "johndoebarber.com"
//     },
//     ratings: 4.8,
//     reviewCount: 124
//   });

//   const [newSpecialty, setNewSpecialty] = useState("");
//   const [newCertification, setNewCertification] = useState({
//     name: "",
//     issuer: "",
//     year: ""
//   });

//   const handleProfileChange = (field, value) => {
//     setProfile({ ...profile, [field]: value });
//   };

//   const handleSpecialtyAdd = () => {
//     if (newSpecialty.trim()) {
//       setProfile({ 
//         ...profile, 
//         specialties: [...profile.specialties, newSpecialty.trim()] 
//       });
//       setNewSpecialty("");
//     }
//   };

//   const handleSpecialtyRemove = (index) => {
//     const updatedSpecialties = [...profile.specialties];
//     updatedSpecialties.splice(index, 1);
//     setProfile({ ...profile, specialties: updatedSpecialties });
//   };

//   const handleCertificationAdd = () => {
//     if (newCertification.name.trim() && newCertification.issuer.trim()) {
//       setProfile({
//         ...profile,
//         certifications: [
//           ...profile.certifications,
//           { 
//             id: profile.certifications.length + 1, 
//             ...newCertification 
//           }
//         ]
//       });
//       setNewCertification({ name: "", issuer: "", year: "" });
//     }
//   };

//   const handleCertificationRemove = (id) => {
//     setProfile({
//       ...profile,
//       certifications: profile.certifications.filter(cert => cert.id !== id)
//     });
//   };

//   const handleSocialChange = (platform, value) => {
//     setProfile({
//       ...profile,
//       socials: { ...profile.socials, [platform]: value }
//     });
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { type: 'spring', stiffness: 100 }
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">My Professional Profile</h1>
//         <button 
//           onClick={() => setIsEditing(!isEditing)} 
//           className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
//             isEditing 
//               ? "bg-green-600 hover:bg-green-700" 
//               : "bg-blue-600 hover:bg-blue-700"
//           } text-white transition-colors`}
//         >
//           {isEditing ? <Save size={18} /> : <Edit size={18} />}
//           {isEditing ? "Save Changes" : "Edit Profile"}
//         </button>
//       </div>

//       <motion.div 
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="grid grid-cols-1 lg:grid-cols-3 gap-6"
//       >
//         {/* Profile Basics */}
//         <motion.div 
//           variants={itemVariants}
//           className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden"
//         >
//           <div className="bg-gradient-to-r from-orange-500 to-amber-600 h-32 relative">
//             <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
//               <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white overflow-hidden flex items-center justify-center">
//                 <User size={64} className="text-gray-400" />
//               </div>
//             </div>
//           </div>
          
//           <div className="pt-20 px-6 pb-6">
//             {isEditing ? (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                   <input 
//                     type="text" 
//                     value={profile.name} 
//                     onChange={(e) => handleProfileChange('name', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
//                   <input 
//                     type="text" 
//                     value={profile.title} 
//                     onChange={(e) => handleProfileChange('title', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                   <input 
//                     type="text" 
//                     value={profile.location} 
//                     onChange={(e) => handleProfileChange('location', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center">
//                 <h2 className="text-2xl font-bold">{profile.name}</h2>
//                 <p className="text-gray-600 mt-1 flex items-center justify-center gap-1">
//                   <Scissors size={16} />
//                   {profile.title}
//                 </p>
//                 <p className="text-gray-500 mt-1 flex items-center justify-center gap-1">
//                   <MapPin size={16} />
//                   {profile.location}
//                 </p>
//                 <div className="flex items-center justify-center mt-3">
//                   <Star className="text-yellow-400" size={20} />
//                   <span className="font-bold ml-1">{profile.ratings}</span>
//                   <span className="text-gray-500 text-sm ml-1">({profile.reviewCount} reviews)</span>
//                 </div>
//               </div>
//             )}

//             <div className="mt-6">
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <Phone size={16} /> Contact Information
//               </h3>
//               {isEditing ? (
//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                     <input 
//                       type="text" 
//                       value={profile.phone} 
//                       onChange={(e) => handleProfileChange('phone', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                     <input 
//                       type="email" 
//                       value={profile.email} 
//                       onChange={(e) => handleProfileChange('email', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-2 text-gray-600">
//                   <p className="flex items-center gap-2">
//                     <Phone size={16} /> {profile.phone}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Mail size={16} /> {profile.email}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className="mt-6">
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <Globe size={16} /> Social Media
//               </h3>
//               {isEditing ? (
//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       <Instagram size={16} className="inline mr-1" /> Instagram
//                     </label>
//                     <input 
//                       type="text" 
//                       value={profile.socials.instagram} 
//                       onChange={(e) => handleSocialChange('instagram', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       placeholder="Username"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       <Facebook size={16} className="inline mr-1" /> Facebook
//                     </label>
//                     <input 
//                       type="text" 
//                       value={profile.socials.facebook} 
//                       onChange={(e) => handleSocialChange('facebook', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       placeholder="Username"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       <Globe size={16} className="inline mr-1" /> Website
//                     </label>
//                     <input 
//                       type="text" 
//                       value={profile.socials.website} 
//                       onChange={(e) => handleSocialChange('website', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       placeholder="example.com"
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-2 text-gray-600">
//                   <p className="flex items-center gap-2">
//                     <Instagram size={16} className="text-pink-600" /> @{profile.socials.instagram}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Facebook size={16} className="text-blue-600" /> {profile.socials.facebook}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Globe size={16} className="text-gray-500" /> {profile.socials.website}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>

//         {/* Main Content Area */}
//         <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
//           {/* Bio Section */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-xl font-bold mb-4">Professional Bio</h3>
//             {isEditing ? (
//               <textarea
//                 value={profile.bio}
//                 onChange={(e) => handleProfileChange('bio', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 placeholder="Tell clients about yourself, your experience, and your style..."
//               />
//             ) : (
//               <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
//             )}
//           </div>

//           {/* Experience & Availability */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-bold mb-4 flex items-center">
//                 <Calendar className="mr-2 text-orange-500" size={20} />
//                 Experience
//               </h3>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={profile.experience}
//                   onChange={(e) => handleProfileChange('experience', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   placeholder="e.g. 5 years"
//                 />
//               ) : (
//                 <p className="text-gray-700">{profile.experience}</p>
//               )}
//             </div>
            
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-xl font-bold mb-4 flex items-center">
//                 <Clock className="mr-2 text-orange-500" size={20} />
//                 Availability
//               </h3>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={profile.availability}
//                   onChange={(e) => handleProfileChange('availability', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   placeholder="e.g. Mon-Fri: 9AM-6PM"
//                 />
//               ) : (
//                 <p className="text-gray-700">{profile.availability}</p>
//               )}
//             </div>
//           </div>

//           {/* Specialties */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-xl font-bold mb-4 flex items-center">
//               <Scissors className="mr-2 text-orange-500" size={20} />
//               Specialties
//             </h3>
            
//             {isEditing ? (
//               <div>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {profile.specialties.map((specialty, index) => (
//                     <div key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center">
//                       {specialty}
//                       <button 
//                         onClick={() => handleSpecialtyRemove(index)}
//                         className="ml-2 text-orange-600 hover:text-orange-800"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={newSpecialty}
//                     onChange={(e) => setNewSpecialty(e.target.value)}
//                     className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     placeholder="Add a specialty"
//                   />
//                   <button
//                     onClick={handleSpecialtyAdd}
//                     className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md flex items-center"
//                   >
//                     <Plus size={18} />
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex flex-wrap gap-2">
//                 {profile.specialties.map((specialty, index) => (
//                   <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
//                     {specialty}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Certifications */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-xl font-bold mb-4 flex items-center">
//               <Award className="mr-2 text-orange-500" size={20} />
//               Certifications & Training
//             </h3>
            
//             {isEditing ? (
//               <div>
//                 <div className="space-y-4 mb-6">
//                   {profile.certifications.map((cert) => (
//                     <div key={cert.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
//                       <div>
//                         <h4 className="font-medium">{cert.name}</h4>
//                         <p className="text-gray-500 text-sm">{cert.issuer} ({cert.year})</p>
//                       </div>
//                       <button 
//                         onClick={() => handleCertificationRemove(cert.id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="border-t pt-4">
//                   <h4 className="font-medium mb-2">Add New Certification</h4>
//                   <div className="space-y-3">
//                     <input
//                       type="text"
//                       value={newCertification.name}
//                       onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       placeholder="Certification Name"
//                     />
//                     <div className="grid grid-cols-2 gap-3">
//                       <input
//                         type="text"
//                         value={newCertification.issuer}
//                         onChange={(e) => setNewCertification({...newCertification, issuer: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                         placeholder="Issuing Organization"
//                       />
//                       <input
//                         type="text"
//                         value={newCertification.year}
//                         onChange={(e) => setNewCertification({...newCertification, year: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                         placeholder="Year"
//                       />
//                     </div>
//                     <button
//                       onClick={handleCertificationAdd}
//                       className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
//                     >
//                       <Plus size={18} /> Add Certification
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {profile.certifications.map((cert) => (
//                   <div key={cert.id} className="flex items-start">
//                     <Award className="text-orange-400 mt-1 mr-3" size={18} />
//                     <div>
//                       <h4 className="font-medium">{cert.name}</h4>
//                       <p className="text-gray-500 text-sm">{cert.issuer} • {cert.year}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Portfolio */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-xl font-bold mb-4 flex items-center">
//               <ImageIcon className="mr-2 text-orange-500" size={20} />
//               Work Portfolio
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {profile.portfolio.map((item) => (
//                 <div key={item.id} className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
//                   <img 
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-3">
//                     <h4 className="font-medium text-center">{item.title}</h4>
//                   </div>
//                 </div>
//               ))}

//               {isEditing && (
//                 <button className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-48 p-4 hover:bg-gray-50 transition-colors">
//                   <Plus size={24} className="text-gray-400 mb-2" />
//                   <span className="text-gray-500">Add Photo</span>
//                 </button>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default BarberProfile;










// ProfilePage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Scissors, Briefcase, MapPin, Phone, Mail, 
  Calendar, Award, Download, Edit, Eye, Plus, Trash2,
  Heart, Star, MessageSquare, ChevronRight, FileText
} from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext.';

const ProfilePage = ({ userType = 'candidate' }) => {
        const { translate, setLanguage, language } = useTranslation();
  // Sample data - in a real app this would come from your API/database
  const [userData, setUserData] = useState(
    userType === 'candidate' 
      ? {
          name: 'James Wilson',
          title: 'Master Barber',
          location: 'Brooklyn, NY',
          phone: '+1 (555) 123-4567',
          email: 'james.wilson@example.com',
          experience: '8 years',
          skills: ['Classic Cuts', 'Beard Styling', 'Hot Towel Shave', 'Hair Coloring', 'Fade Specialist'],
          about: translate('about_subheading'),
          education: [
            { id: 1, school: 'New York Barber Academy', degree: 'Master Barber License', year: '2015' },
            { id: 2, school: 'Style & Technique Workshop', degree: 'Advanced Certification', year: '2018' }
          ],
          workHistory: [
            { 
              id: 1, 
              company: 'Downtown Cuts', 
              position: 'Senior Barber',
              period: '2019 - Present',
              description: 'Specialized in premium men\'s haircuts and beard styling. Managed client bookings and mentored junior barbers.'
            },
            { 
              id: 2, 
              company: 'Classic Gentleman', 
              position: 'Barber',
              period: '2015 - 2019',
              description: 'Performed haircuts, shaves, and facial hair grooming. Built a loyal client base through exceptional service.'
            }
          ],
          portfolio: [
            { id: 1, title: 'Classic Fade', imageUrl: '/api/placeholder/300/300', likes: 24 },
            { id: 2, title: 'Beard Styling', imageUrl: '/api/placeholder/300/300', likes: 18 },
            { id: 3, title: 'Vintage Cut', imageUrl: '/api/placeholder/300/300', likes: 32 },
            { id: 4, title: 'Modern Pompadour', imageUrl: '/api/placeholder/300/300', likes: 15 }
          ],
          cvUrl: '/sample-cv.pdf'
        }
      : {
          name: 'Elite Barber Shop',
          title: 'Premium Barber Services',
          location: 'Manhattan, NY',
          phone: '+1 (555) 987-6543',
          email: 'hiring@elitebarbershop.com',
          about: 'Elite Barber Shop has been serving distinguished gentlemen since 2010. We offer premium grooming services in a classic yet modern atmosphere. We\'re always looking for talented barbers to join our growing team.',
          companyInfo: {
            founded: '2010',
            size: '15-20 employees',
            website: 'www.elitebarbershop.com'
          },
          postedJobs: [
            {
              id: 1,
              title: 'Senior Barber',
              location: 'Manhattan, NY',
              salary: '$65,000 - $85,000',
              type: 'Full-time',
              posted: '2 days ago',
              applications: 12,
              status: 'Active'
            },
            {
              id: 2,
              title: 'Junior Barber',
              location: 'Brooklyn, NY',
              salary: '$45,000 - $55,000',
              type: 'Full-time',
              posted: '1 week ago',
              applications: 24,
              status: 'Active'
            },
            {
              id: 3,
              title: 'Receptionist',
              location: 'Manhattan, NY',
              salary: '$40,000 - $45,000',
              type: 'Part-time',
              posted: '3 weeks ago',
              applications: 18,
              status: 'Closed'
            }
          ]
        }
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  const hoverVariants = {
    hover: { 
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { 
        type: "spring", 
        stiffness: 300
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <motion.div 
        className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-48 bg-gradient-to-r from-orange-500 to-amber-600">
          <motion.button 
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit size={18} className="text-orange-500" />
          </motion.button>
        </div>
        
        <div className="relative px-6 pt-16 pb-6 flex flex-col md:flex-row md:items-center">
          <div className="absolute -top-16 left-6">
            <motion.div 
              className="h-32 w-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              {userType === 'candidate' ? (
                <User size={50} className="text-gray-400" />
              ) : (
                <Briefcase size={50} className="text-gray-400" />
              )}
            </motion.div>
          </div>
          
          <div className="md:ml-40 flex-1">
            <motion.h1 
              className="text-2xl font-bold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {userData.name}
            </motion.h1>
            <motion.p 
              className="text-orange-500 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {userData.title}
            </motion.p>
            <motion.div 
              className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {userData.location}
              </span>
              {userType === 'candidate' && (
                <span className="flex items-center gap-1">
                  <Scissors size={16} />
                  {userData.experience} experience
                </span>
              )}
              {userType === 'employer' && userData.companyInfo && (
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  Founded {userData.companyInfo.founded}
                </span>
              )}
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-4 md:mt-0 flex flex-wrap gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {userType === 'candidate' && (
              <motion.button 
                className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-orange-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                Download CV
              </motion.button>
            )}
            <motion.button 
              className="bg-white text-orange-500 border border-orange-500 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-orange-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare size={16} />
              Message
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <motion.div 
          className="lg:col-span-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* About Section */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6 mb-8"
            variants={itemVariants}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">{translate('About')}</h2>
            <p className="text-gray-600">{userData.about}</p>
          </motion.div>

          {/* Candidate-specific sections */}
          {userType === 'candidate' && (
            <>
              {/* Work History */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 mb-8"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Work History</h2>
                  <motion.button 
                    className="text-orange-500 flex items-center gap-1 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Plus size={16} />
                    Add Experience
                  </motion.button>
                </div>
                
                <div className="space-y-6">
                  {userData.workHistory.map((work) => (
                    <motion.div 
                      key={work.id}
                      className="relative pl-8 border-l-2 border-orange-200"
                      whileHover="hover"
                      variants={hoverVariants}
                    >
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Briefcase size={12} className="text-white" />
                      </div>
                      <div className="flex justify-between">
                        <h3 className="font-bold text-gray-800">{work.position}</h3>
                        <div className="text-sm font-medium text-orange-500">{work.period}</div>
                      </div>
                      <div className="text-gray-500 text-sm">{work.company}</div>
                      <p className="text-gray-600 mt-2 text-sm">{work.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Education */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 mb-8"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Education</h2>
                  <motion.button 
                    className="text-orange-500 flex items-center gap-1 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Plus size={16} />
                    Add Education
                  </motion.button>
                </div>
                
                <div className="space-y-6">
                  {userData.education.map((edu) => (
                    <motion.div 
                      key={edu.id}
                      className="relative pl-8 border-l-2 border-orange-200"
                      whileHover="hover"
                      variants={hoverVariants}
                    >
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Award size={12} className="text-white" />
                      </div>
                      <div className="flex justify-between">
                        <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                        <div className="text-sm font-medium text-orange-500">{edu.year}</div>
                      </div>
                      <div className="text-gray-500 text-sm">{edu.school}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Portfolio */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 mb-8"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Portfolio</h2>
                  <motion.button 
                    className="text-orange-500 flex items-center gap-1 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Plus size={16} />
                    Add Work
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userData.portfolio.map((item) => (
                    <motion.div 
                      key={item.id}
                      className="rounded-lg overflow-hidden shadow-sm"
                      whileHover={{ 
                        y: -5,
                        boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"
                      }}
                    >
                      <div className="relative">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md flex items-center">
                          <Heart size={14} className="text-orange-500" />
                          <span className="text-xs ml-1">{item.likes}</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-gray-800">{item.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CV Viewer */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 mb-8"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">CV Document</h2>
                  <div className="flex gap-2">
                    <motion.button 
                      className="text-orange-500 flex items-center gap-1 text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Edit size={16} />
                      Update
                    </motion.button>
                    <motion.button 
                      className="text-orange-500 flex items-center gap-1 text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Download size={16} />
                      Download
                    </motion.button>
                  </div>
                </div>
                
                <motion.div 
                  className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center h-64 cursor-pointer"
                  whileHover={{ 
                    backgroundColor: "rgba(249, 115, 22, 0.05)",
                    borderColor: "rgba(249, 115, 22, 0.3)"
                  }}
                >
                  <FileText size={48} className="text-orange-500 mb-4" />
                  <h3 className="font-medium text-gray-800 mb-1">James_Wilson_CV.pdf</h3>
                  <p className="text-sm text-gray-500">Updated 2 months ago</p>
                  <motion.button 
                    className="mt-4 flex items-center gap-1 text-orange-500 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Eye size={18} />
                    View CV
                  </motion.button>
                </motion.div>
              </motion.div>
            </>
          )}

          {/* Employer-specific sections */}
          {userType === 'employer' && (
            <>
              {/* Posted Jobs */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 mb-8"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Posted Jobs</h2>
                  <motion.button 
                    className="bg-orange-500 text-white px-3 py-1.5 rounded-md flex items-center gap-1 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={16} />
                    Post New Job
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  {userData.postedJobs.map((job) => (
                    <motion.div 
                      key={job.id}
                      className="border border-gray-200 rounded-lg p-4"
                      whileHover="hover"
                      variants={hoverVariants}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-bold text-gray-800">{job.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase size={14} />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          Posted {job.posted}
                        </span>
                      </div>
                      <div className="mt-2 text-gray-700">
                        <p>{job.salary}</p>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="text-sm">
                          <span className="font-medium text-orange-500">{job.applications}</span> applications
                        </div>
                        <div className="flex gap-2">
                          <motion.button 
                            className="text-gray-500 hover:text-orange-500"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button 
                            className="text-gray-500 hover:text-red-500"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                          <motion.button 
                            className="text-orange-500 flex items-center gap-1 text-sm"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Eye size={16} />
                            View
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Right Column - Sidebar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible" 
          className="space-y-8"
        >
          {/* Contact Info */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            variants={itemVariants}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">{translate('Contact Information')}</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{userData.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{userData.email}</div>
                </div>
              </div>
              {userType === 'employer' && userData.companyInfo && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Briefcase size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Website</div>
                    <div className="font-medium">{userData.companyInfo.website}</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Candidate-specific sidebar sections */}
          {userType === 'candidate' && (
            <>
              {/* Skills */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Skills</h2>
                  <motion.button 
                    className="text-orange-500 text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Edit size={16} />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <motion.span 
                      key={index}
                      className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "rgba(249, 115, 22, 0.2)" 
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {/* Employer-specific sidebar sections */}
          {userType === 'employer' && userData.companyInfo && (
            <>
              {/* Company Info */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6"
                variants={itemVariants}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Company Details</h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Founded</div>
                    <div className="font-medium">{userData.companyInfo.founded}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Company Size</div>
                    <div className="font-medium">{userData.companyInfo.size}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-medium">{userData.location}</div>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6"
                variants={itemVariants}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Activity Overview</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">Active Jobs</div>
                    <div className="font-bold text-orange-500">
                      {userData.postedJobs.filter(job => job.status === 'Active').length}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">Total Applications</div>
                    <div className="font-bold text-orange-500">
                      {userData.postedJobs.reduce((sum, job) => sum + job.applications, 0)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600">Jobs Posted</div>
                    <div className="font-bold text-orange-500">
                      {userData.postedJobs.length}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {/* Suggested Profiles/Jobs */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6"
            variants={itemVariants}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {userType === 'candidate' ? 'Suggested Jobs' : 'Top Candidates'}
            </h2>
            <div className="space-y-4">
              {userType === 'candidate' ? (
                // Suggested Jobs for Candidates
                <>
                  {[1, 2, 3].map((item) => (
                    <motion.div 
                      key={item}
                      className="flex gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
                      whileHover="hover"
                      variants={hoverVariants}
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                        <Briefcase size={18} className="text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-800">
                            {item === 1 ? 'Expert Barber' : item === 2 ? 'Senior Stylist' : 'Master Barber'}
                          </h3>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            New
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {item === 1 ? 'Urban Cuts' : item === 2 ? 'Style Studio' : 'Classic Gents'}
                        </div>
                        <div className="flex justify-between mt-1 text-sm">
                          <span className="text-gray-500">
                            {item === 1 ? 'Brooklyn, NY' : item === 2 ? 'Manhattan, NY' : 'Queens, NY'}
                          </span>
                          <span className="text-orange-500 font-medium">
                            {item === 1 ? '$65K-$80K' : item === 2 ? '$55K-$70K' : '$60K-$75K'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <motion.button 
                    className="w-full bg-orange-50 text-orange-500 py-2 rounded-md flex items-center justify-center gap-2 mt-2 font-medium"
                    whileHover={{ backgroundColor: "rgba(249, 115, 22, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View All Jobs
                    <ChevronRight size={16} />
                  </motion.button>
                </>
              ) : (
                // Top Candidates for Employers
                <>
                  {[1, 2, 3].map((item) => (
                    <motion.div 
                      key={item}
                     
                      className="flex gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
                      whileHover="hover"
                      variants={hoverVariants}
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-800">
                            {item === 1 ? 'James Wilson' : item === 2 ? 'Michael Brown' : 'David Smith'}
                          </h3>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Available
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {item === 1 ? 'Master Barber' : item === 2 ? 'Senior Barber' : 'Barber'}
                        </div>
                        <div className="flex justify-between mt-1 text-sm">
                          <span className="text-gray-500">
                            {item === 1 ? 'Brooklyn, NY' : item === 2 ? 'Manhattan, NY' : 'Queens, NY'}
                          </span>
                          <span className="text-orange-500 font-medium">
                            {item === 1 ? '8 years exp' : item === 2 ? '6 years exp' : '4 years exp'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <motion.button 
                    className="w-full bg-orange-50 text-orange-500 py-2 rounded-md flex items-center justify-center gap-2 mt-2 font-medium"
                    whileHover={{ backgroundColor: "rgba(249, 115, 22, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View All Candidates
                    <ChevronRight size={16} />
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;