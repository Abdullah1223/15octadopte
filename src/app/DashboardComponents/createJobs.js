'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobInstance } from '../Services/jobs.service';

// Zod schema for form validation
const jobFormSchema = z.object({
  title: z.string().min(3, "Le titre doit comporter au moins 3 caractères"),
  contractType: z.enum(["CDD", "CDI", "Stage", "Intérim"], {
    errorMap: () => ({ message: "Veuillez sélectionner un type de contrat valide" }),
  }),
  salaryMin: z.string().min(1, "Veuillez saisir un salaire minimum"),
  salaryMax: z.string().min(1, "Veuillez saisir un salaire maximum"),
  startDate: z.string().min(1, "Veuillez saisir une date de début"),
  location: z.object({
    region: z.string().min(1, "Veuillez saisir une région"),
    city: z.string().min(1, "Veuillez saisir une ville"),
    department: z.string().min(1, "Veuillez saisir un département"),
  }),
  qualifications: z.object({
    diploma: z.string().optional(),
    experience: z.enum(["0-2", "2-5", "5+"], {
      errorMap: () => ({ message: "Veuillez sélectionner une expérience valide" }),
    }),
    specialization: z.array(z.string()).min(1, "Veuillez sélectionner au moins une spécialisation"),
  }),
  description: z.string().min(10, "La description doit comporter au moins 10 caractères"),
});

// Enhanced Input component with flexible error handling
const Input = ({ label, name, register, errors, type = "text", ...rest }) => {
  // Check if error is a React element or a string
  const renderError = () => {
    if (!errors) return null;
    
    if (React.isValidElement(errors.message)) {
      return <div className="text-red-500 text-xs mt-1">{errors.message}</div>;
    }
    
    return <p className="text-red-500 text-xs mt-1">{errors.message}</p>;
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 ${
          errors ? "border-red-500" : "border-gray-300"
        }`}
        {...register(name)}
        {...rest}
      />
      {renderError()}
    </div>
  );
};

// Enhanced Select component with flexible error handling
const Select = ({ label, name, register, errors, options, ...rest }) => {
  // Check if error is a React element or a string
  const renderError = () => {
    if (!errors) return null;
    
    if (React.isValidElement(errors.message)) {
      return <div className="text-red-500 text-xs mt-1">{errors.message}</div>;
    }
    
    return <p className="text-red-500 text-xs mt-1">{errors.message}</p>;
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 ${
          errors ? "border-red-500" : "border-gray-300"
        }`}
        {...register(name)}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {renderError()}
    </div>
  );
};

// Enhanced Checkbox group component with flexible error handling
const CheckboxGroup = ({ label, name, register, errors, options, ...rest }) => {
  // Check if error is a React element or a string
  const renderError = () => {
    if (!errors) return null;
    
    if (React.isValidElement(errors.message)) {
      return <div className="text-red-500 text-xs mt-1">{errors.message}</div>;
    }
    
    return <p className="text-red-500 text-xs mt-1">{errors.message}</p>;
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={option.value}
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              {...register(name)}
              {...rest}
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {renderError()}
    </div>
  );
};

// Enhanced TextArea component with flexible error handling
const TextArea = ({ label, name, register, errors, rows = 4, ...rest }) => {
  // Check if error is a React element or a string
  const renderError = () => {
    if (!errors) return null;
    
    if (React.isValidElement(errors.message)) {
      return <div className="text-red-500 text-xs mt-1">{errors.message}</div>;
    }
    
    return <p className="text-red-500 text-xs mt-1">{errors.message}</p>;
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 ${
          errors ? "border-red-500" : "border-gray-300"
        }`}
        {...register(name)}
        {...rest}
      ></textarea>
      {renderError()}
    </div>
  );
};

const CreateJobComponent = ({ onSubmit, initialData = {} }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors
  } = useForm({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: initialData.title || "",
      contractType: initialData.contractType || "",
      salaryMin: initialData.salaryMin || "",
      salaryMax: initialData.salaryMax || "",
      startDate: initialData.startDate || "",
      location: {
        region: initialData.location?.region || "",
        city: initialData.location?.city || "",
        department: initialData.location?.department || "",
      },
      qualifications: {
        diploma: initialData.qualifications?.diploma || "",
        experience: initialData.qualifications?.experience || "",
        specialization: initialData.qualifications?.specialization || [],
      },
      description: initialData.description || "",
    },
  });

  // Handle form submission
  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    clearErrors();
    setApiErrors({});
    
    try {
      const response = await jobInstance.post('/createJobs',
       data
        //  {
      //   headers: {
      //     'Content-Type': "application/json"
      //   },
      //   method: "POST",
      //   body: JSON.stringify(data),
      //   credentials: "include",
      // }
    );
      
      const result = await response.data;
      
      if (!response.ok) {
        // Handle API validation errors
        if (result.errors) {
          setApiErrors(result.errors);
          
          // Set react-hook-form errors based on API response
          Object.keys(result.errors).forEach(field => {
            if (result.errorType === "verify") {
              setError(field, {
                type: 'server',
                message: (
                  <React.Fragment>
                    {result.errors[field]} <a className="text-blue-800 underline text-[1rem]" href="/verify">Verify</a>
                  </React.Fragment>
                )
              });
            } else {
              // Handle nested fields like location.city
              if (field.includes('.')) {
                const [parent, child] = field.split('.');
                setError(`${parent}.${child}`, {
                  type: 'server',
                  message: result.errors[field]
                });
              } else {
                setError(field, {
                  type: 'server',
                  message: result.errors[field]
                });
              }
            }
          });
        } else {
          // General error
          console.error("Error submitting form:", result.message || "Une erreur s'est produite");
        }
      } else {
        // Success
        console.log("Job posting created successfully:", result);
        reset();
        if (onSubmit) {
          onSubmit(result);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('root.serverError', { 
        type: 'server',
        message: "Une erreur de connexion s'est produite. Veuillez réessayer plus tard."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contract type options
  const contractTypeOptions = [
    { value: "", label: "Sélectionner un type de contrat" },
    { value: "CDD", label: "CDD (Contrat à Durée Déterminée)" },
    { value: "CDI", label: "CDI (Contrat à Durée Indéterminée)" },
    { value: "Stage", label: "Stage" },
    { value: "Intérim", label: "Intérim" },
  ];

  // Experience options
  const experienceOptions = [
    { value: "", label: "Sélectionner l'expérience requise" },
    { value: "0-2", label: "0-2 ans" },
    { value: "2-5", label: "2-5 ans" },
    { value: "5+", label: "5+ ans" },
  ];

  // Specialization options
  const specializationOptions = [
    { value: "unisex", label: "Coiffeur mixte" },
    { value: "women", label: "Coiffeur femmes" },
    { value: "men", label: "Coiffeur hommes" },
    { value: "barber", label: "Barbier" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg p-6 my-4 mx-auto w-full max-w-4xl"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        <span className="text-orange-500">Créer</span> {"une offre d'emploi"}
      </h2>
      
      {/* Display global form error if any */}
      {errors.root?.serverError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{errors.root.serverError.message}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Titre de l'offre d'emploi"
              name="title"
              register={register}
              errors={errors.title}
              placeholder="ex: Coiffeur expérimenté"
            />

            <Select
              label="Type de contrat"
              name="contractType"
              register={register}
              errors={errors.contractType}
              options={contractTypeOptions}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Salaire minimum (€)"
                name="salaryMin"
                register={register}
                errors={errors.salaryMin}
                type="number"
                placeholder="ex: 1800"
              />
              
              <Input
                label="Salaire maximum (€)"
                name="salaryMax"
                register={register}
                errors={errors.salaryMax}
                type="number"
                placeholder="ex: 2500"
              />
            </div>

            <Input
              label="Date de début"
              name="startDate"
              register={register}
              errors={errors.startDate}
              type="date"
            />
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Région"
                name="location.region"
                register={register}
                errors={errors.location?.region}
                placeholder="ex: Île-de-France"
              />
              
              <Input
                label="Ville"
                name="location.city"
                register={register}
                errors={errors.location?.city}
                placeholder="ex: Paris"
              />
              
              <Input
                label="Département"
                name="location.department"
                register={register}
                errors={errors.location?.department}
                placeholder="ex: 75"
              />
            </div>

            <Input
              label="Diplôme requis (optionnel)"
              name="qualifications.diploma"
              register={register}
              errors={errors.qualifications?.diploma}
              placeholder="ex: CAP Coiffure"
            />

            <Select
              label="Années d'expérience"
              name="qualifications.experience"
              register={register}
              errors={errors.qualifications?.experience}
              options={experienceOptions}
            />

            <CheckboxGroup
              label="Spécialisation"
              name="qualifications.specialization"
              register={register}
              errors={errors.qualifications?.specialization}
              options={specializationOptions}
            />
          </div>
        </div>

        <TextArea
          label="Description du poste"
          name="description"
          register={register}
          errors={errors.description}
          placeholder="Décrivez les responsabilités et les compétences requises pour ce poste..."
          rows={4}
        />

        <div className="flex justify-end mt-6">
          <motion.button
            type="button"
            onClick={() => {
              reset();
              setApiErrors({});
            }}
            className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Annuler
          </motion.button>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none disabled:bg-orange-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </span>
            ) : (
              "Publier l'offre"
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateJobComponent;