import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Globe, Calendar, Award, Book, Briefcase, User, Plus, Trash2, Download, Upload, Eye, Edit, CheckCircle, X } from 'lucide-react';
import { usePDF } from 'react-to-pdf';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import useCv from '../Hooks/useCv';

// Zod-like validation schema
const createValidationSchema = () => ({
  personalInfo: {
    fullName: { required: true, minLength: 2 },
    title: { required: true, minLength: 2 },
    email: { required: true, email: true },
    phone: { required: true, minLength: 10 },
    location: { required: true },
    website: { required: false },
    summary: { required: true, minLength: 50 }
  },
  experience: {
    title: { required: true },
    company: { required: true },
    location: { required: true },
    startDate: { required: true },
    endDate: { required: true },
    description: { required: true, minLength: 1 }
  },
  education: {
    degree: { required: true },
    school: { required: true },
    location: { required: true },
    year: { required: true }
  },
  skills: { required: true, minLength: 1 }
});

// Validation function
const validateField = (value, rules, fieldName = '') => {
  const errors = [];
  
  if (rules.required && (!value || (Array.isArray(value) && value.length === 0))) {
    errors.push(`${fieldName} is required`);
  }
  
  if (value && rules.minLength && value.length < rules.minLength) {
    errors.push(`${fieldName} must be at least ${rules.minLength} characters`);
  }
  
  if (value && rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors.push(`${fieldName} must be a valid email`);
  }
  
  return errors;
};

// CV Template Component
const CVTemplate = React.forwardRef(({ data }, ref) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;
  
  return (
    <div ref={ref} className="w-[210mm] h-[297mm] mx-auto bg-white shadow-lg">
      {/* Header Section */}
      <div className="bg-slate-800 text-white p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
            <div className="mb-4 md:mb-0 md:mr-6 flex justify-center md:justify-start">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-slate-600 border-4 border-slate-500 shadow-lg flex items-center justify-center">
                <User className="w-12 h-12 md:w-14 md:h-14 text-slate-300" />
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
              <p className="text-xl text-slate-300">{personalInfo.title || 'Your Title'}</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email || 'your.email@example.com'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone || '+1 (555) 123-4567'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location || 'Your Location'}</span>
            </div>
            {personalInfo.website && (
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section>
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 mr-2 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-800 border-b-2 border-slate-200 pb-1">
                Professional Summary
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section>
            <div className="flex items-center mb-4">
              <Briefcase className="w-5 h-5 mr-2 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-800 border-b-2 border-slate-200 pb-1">
                Professional Experience
              </h2>
            </div>
            
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index} className="border-l-4 border-slate-300 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-800">{job.title}</h3>
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{job.startDate} - {job.endDate}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium mb-1">
                    {job.company} • {job.location}
                  </p>
                  <ul className="space-y-1">
                    {job.description.map((item, idx) => (
                      <li key={idx} className="text-slate-700 text-sm">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section>
            <div className="flex items-center mb-4">
              <Award className="w-5 h-5 mr-2 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-800 border-b-2 border-slate-200 pb-1">
                Technical Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section>
            <div className="flex items-center mb-4">
              <Globe className="w-5 h-5 mr-2 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-800 border-b-2 border-slate-200 pb-1">
                Key Projects
              </h2>
            </div>
            
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="border-l-4 border-slate-300 pl-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">{project.name}</h3>
                  <p className="text-slate-700 text-sm mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <p className="text-blue-600 text-sm font-medium">{project.link}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section>
            <div className="flex items-center mb-4">
              <Book className="w-5 h-5 mr-2 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-800 border-b-2 border-slate-200 pb-1">
                Education
              </h2>
            </div>
            
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-slate-300 pl-6">
                  <h3 className="text-lg font-semibold text-slate-800">{edu.degree}</h3>
                  <p className="text-slate-700 font-medium">
                    {edu.school} • {edu.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-600 text-sm">Class of {edu.year}</p>
                    {edu.gpa && (
                      <p className="text-slate-600 text-sm font-medium">GPA: {edu.gpa}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <section>
            <div className="flex items-center mb-4">
              <Award className="w-5 h-5 mr-2 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-800 border-b-2 border-slate-200 pb-1">
                Certifications
              </h2>
            </div>
            
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{cert.name}</h3>
                    <p className="text-slate-600 text-sm">{cert.issuer}</p>
                  </div>
                  <span className="text-slate-600 text-sm font-medium">{cert.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

// Form Input Component
const FormInput = ({ label, name, value, onChange, error, type = "text", placeholder, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500 bg-red-50' : 'border-gray-300'
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Form Textarea Component
const FormTextarea = ({ label, name, value, onChange, error, rows = 3, placeholder, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
        error ? 'border-red-500 bg-red-50' : 'border-gray-300'
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Personal Info Form Component
const PersonalInfoForm = ({ data, onChange, errors }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormInput
        label="Full Name"
        name="fullName"
        value={data.fullName}
        onChange={onChange}
        error={errors.fullName}
        required
        placeholder="John Doe"
      />
      <FormInput
        label="Professional Title"
        name="title"
        value={data.title}
        onChange={onChange}
        error={errors.title}
        required
        placeholder="Full Stack Developer"
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={data.email}
        onChange={onChange}
        error={errors.email}
        required
        placeholder="john.doe@example.com"
      />
      <FormInput
        label="Phone"
        name="phone"
        type="tel"
        value={data.phone}
        onChange={onChange}
        error={errors.phone}
        required
        placeholder="+1 (555) 123-4567"
      />
      <FormInput
        label="Location"
        name="location"
        value={data.location}
        onChange={onChange}
        error={errors.location}
        required
        placeholder="New York, NY"
      />
      <FormInput
        label="Website"
        name="website"
        value={data.website}
        onChange={onChange}
        error={errors.website}
        placeholder="www.johndoe.com"
      />
    </div>
    <FormTextarea
      label="Professional Summary"
      name="summary"
      value={data.summary}
      onChange={onChange}
      error={errors.summary}
      required
      rows={4}
      placeholder="Write a compelling summary of your professional experience and career objectives..."
    />
  </div>
);

// Experience Form Component
const ExperienceForm = ({ data, onChange, errors }) => {
  const addExperience = () => {
    onChange([...data, {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ['']
    }]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const updateDescription = (expIndex, descIndex, value) => {
    const updated = [...data];
    updated[expIndex].description[descIndex] = value;
    onChange(updated);
  };

  const addDescription = (expIndex) => {
    const updated = [...data];
    updated[expIndex].description.push('');
    onChange(updated);
  };

  const removeDescription = (expIndex, descIndex) => {
    const updated = [...data];
    updated[expIndex].description = updated[expIndex].description.filter((_, i) => i !== descIndex);
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </button>
      </div>

      {data.map((exp, expIndex) => (
        <div key={expIndex} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Experience #{expIndex + 1}</h4>
            <button
              type="button"
              onClick={() => removeExperience(expIndex)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormInput
              label="Job Title"
              name={`title-${expIndex}`}
              value={exp.title}
              onChange={(e) => updateExperience(expIndex, 'title', e.target.value)}
              error={errors[`experience_${expIndex}_title`]}
              required
              placeholder="Senior Developer"
            />
            <FormInput
              label="Company"
              name={`company-${expIndex}`}
              value={exp.company}
              onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
              error={errors[`experience_${expIndex}_company`]}
              required
              placeholder="Tech Company Inc."
            />
            <FormInput
              label="Location"
              name={`location-${expIndex}`}
              value={exp.location}
              onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
              error={errors[`experience_${expIndex}_location`]}
              required
              placeholder="New York, NY"
            />
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                label="Start Date"
                name={`startDate-${expIndex}`}
                value={exp.startDate}
                onChange={(e) => updateExperience(expIndex, 'startDate', e.target.value)}
                error={errors[`experience_${expIndex}_startDate`]}
                required
                placeholder="Jan 2022"
              />
              <FormInput
                label="End Date"
                name={`endDate-${expIndex}`}
                value={exp.endDate}
                onChange={(e) => updateExperience(expIndex, 'endDate', e.target.value)}
                error={errors[`experience_${expIndex}_endDate`]}
                required
                placeholder="Present"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            {exp.description.map((desc, descIndex) => (
              <div key={descIndex} className="flex mb-2">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => updateDescription(expIndex, descIndex, e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeDescription(expIndex, descIndex)}
                  className="ml-2 text-red-600 hover:text-red-800"
                  disabled={exp.description.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDescription(expIndex)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Description Point
            </button>
            {errors[`experience_${expIndex}_description`] && (
              <p className="text-red-500 text-xs mt-1">{errors[`experience_${expIndex}_description`]}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Education Form Component
const EducationForm = ({ data, onChange, errors }) => {
  const addEducation = () => {
    onChange([...data, {
      degree: '',
      school: '',
      location: '',
      year: '',
      gpa: ''
    }]);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Education
        </button>
      </div>

      {data.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Education #{index + 1}</h4>
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Degree"
              name={`degree-${index}`}
              value={edu.degree}
              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
              error={errors[`education_${index}_degree`]}
              required
              placeholder="Bachelor of Science in Computer Science"
            />
            <FormInput
              label="School"
              name={`school-${index}`}
              value={edu.school}
              onChange={(e) => updateEducation(index, 'school', e.target.value)}
              error={errors[`education_${index}_school`]}
              required
              placeholder="University of Technology"
            />
            <FormInput
              label="Location"
              name={`location-${index}`}
              value={edu.location}
              onChange={(e) => updateEducation(index, 'location', e.target.value)}
              error={errors[`education_${index}_location`]}
              required
              placeholder="New York, NY"
            />
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                label="Year"
                name={`year-${index}`}
                value={edu.year}
                onChange={(e) => updateEducation(index, 'year', e.target.value)}
                error={errors[`education_${index}_year`]}
                required
                placeholder="2020"
              />
              <FormInput
                label="GPA (Optional)"
                name={`gpa-${index}`}
                value={edu.gpa}
                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                error={errors[`education_${index}_gpa`]}
                placeholder="3.8/4.0"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Skills Form Component
const SkillsForm = ({ data, onChange, errors }) => {
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim()) {
      onChange([...data, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill (e.g., JavaScript, React, Node.js)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {errors.skills && <p className="text-red-500 text-xs mb-4">{errors.skills}</p>}

      <div className="flex flex-wrap gap-2">
        {data.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

// Projects Form Component
const ProjectsForm = ({ data, onChange, errors }) => {
  const [techInput, setTechInput] = useState({});

  const addProject = () => {
    onChange([...data, {
      name: '',
      description: '',
      technologies: [],
      link: ''
    }]);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addTechnology = (projectIndex) => {
    const tech = techInput[projectIndex]?.trim();
    if (tech) {
      const updated = [...data];
      updated[projectIndex].technologies.push(tech);
      onChange(updated);
      setTechInput(prev => ({ ...prev, [projectIndex]: '' }));
    }
  };

  const removeTechnology = (projectIndex, techIndex) => {
    const updated = [...data];
    updated[projectIndex].technologies = updated[projectIndex].technologies.filter((_, i) => i !== techIndex);
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <button
          type="button"
          onClick={addProject}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Project
        </button>
      </div>

      {data.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Project #{index + 1}</h4>
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormInput
              label="Project Name"
              name={`name-${index}`}
              value={project.name}
              onChange={(e) => updateProject(index, 'name', e.target.value)}
              error={errors[`projects_${index}_name`]}
              placeholder="E-commerce Platform"
            />
            <FormInput
              label="Project Link"
              name={`link-${index}`}
              value={project.link}
              onChange={(e) => updateProject(index, 'link', e.target.value)}
              error={errors[`projects_${index}_link`]}
              placeholder="github.com/user/project"
            />
          </div>

          <FormTextarea
            label="Description"
            name={`description-${index}`}
            value={project.description}
            onChange={(e) => updateProject(index, 'description', e.target.value)}
            error={errors[`projects_${index}_description`]}
            placeholder="Brief description of the project and its impact"
            rows={3}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
            <div className="flex mb-2">
              <input
                type="text"
                value={techInput[index] || ''}
                onChange={(e) => setTechInput(prev => ({ ...prev, [index]: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology(index))}
                placeholder="Add technology (e.g., React, Node.js)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => addTechnology(index)}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(index, techIndex)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Certifications Form Component
const CertificationsForm = ({ data, onChange, errors }) => {
  const addCertification = () => {
    onChange([...data, {
      name: '',
      issuer: '',
      year: ''
    }]);
  };

  const removeCertification = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateCertification = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
        <button
          type="button"
          onClick={addCertification}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Certification
        </button>
      </div>

      {data.map((cert, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Certification #{index + 1}</h4>
            <button
              type="button"
              onClick={() => removeCertification(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="Certification Name"
              name={`name-${index}`}
              value={cert.name}
              onChange={(e) => updateCertification(index, 'name', e.target.value)}
              error={errors[`certifications_${index}_name`]}
              placeholder="AWS Certified Solutions Architect"
            />
            <FormInput
              label="Issuing Organization"
              name={`issuer-${index}`}
              value={cert.issuer}
              onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
              error={errors[`certifications_${index}_issuer`]}
              placeholder="Amazon Web Services"
            />
            <FormInput
              label="Year"
              name={`year-${index}`}
              value={cert.year}
              onChange={(e) => updateCertification(index, 'year', e.target.value)}
              error={errors[`certifications_${index}_year`]}
              placeholder="2023"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Main CV Builder Component
const CVBuilder = () => {
   const cvRef = useRef(null)
   const previewRef=useRef()
   const[showStatusBar,setShowStatusBar]=useState(false)
  const [activeTab, setActiveTab] = useState('builder');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({});
  const {uploadCv} = useCv()
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const { toPDF, targetRef } = usePDF({ 
    filename: `${cvData.personalInfo.fullName || 'cv'}.pdf`,
    page: {
      margin: 10,
    }
  });

  const closeSuccessBar = ()=>{
    setShowStatusBar(false)
  }
  // Validation function
  const validateData = () => {
    const validationErrors = {};
    const schema = createValidationSchema();

    // Validate personal info
    Object.keys(schema.personalInfo).forEach(field => {
      const fieldErrors = validateField(
        cvData.personalInfo[field], 
        schema.personalInfo[field], 
        field.charAt(0).toUpperCase() + field.slice(1)
      );
      if (fieldErrors.length > 0) {
        validationErrors[field] = fieldErrors[0];
      }
    });

    // Validate experience
    cvData.experience.forEach((exp, index) => {
      Object.keys(schema.experience).forEach(field => {
        if (field === 'description') {
          if (!exp.description || exp.description.length === 0 || exp.description.every(d => !d.trim())) {
            validationErrors[`experience_${index}_description`] = 'At least one description point is required';
          }
        } else {
          const fieldErrors = validateField(
            exp[field], 
            schema.experience[field], 
            field.charAt(0).toUpperCase() + field.slice(1)
          );
          if (fieldErrors.length > 0) {
            validationErrors[`experience_${index}_${field}`] = fieldErrors[0];
          }
        }
      });
    });

    // Validate education
    cvData.education.forEach((edu, index) => {
      Object.keys(schema.education).forEach(field => {
        const fieldErrors = validateField(
          edu[field], 
          schema.education[field], 
          field.charAt(0).toUpperCase() + field.slice(1)
        );
        if (fieldErrors.length > 0) {
          validationErrors[`education_${index}_${field}`] = fieldErrors[0];
        }
      });
    });

    // Validate skills
    if (cvData.skills.length === 0) {
      validationErrors.skills = 'At least one skill is required';
    }

    return validationErrors;
  };

  // Handle personal info changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setCvData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (backendErrors[name]) {
      setBackendErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle export functionality
//   const handleExport = async () => {
//     const validationErrors = validateData();
//     const allErrors = { ...validationErrors, ...backendErrors };
    
//     if (Object.keys(allErrors).length > 0) {
//       setErrors(allErrors);
//       alert('Please fix all errors before exporting');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Simulate API call for export
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // In a real implementation, you would send the data to your backend
//       console.log('Exporting CV data:', cvData);
//       alert('CV exported successfully!');
//     } catch (error) {
//       console.error('Export failed:', error);
//       alert('Export failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

// const handleExport = async () => {
//     const validationErrors = validateData();
//     const allErrors = { ...validationErrors, ...backendErrors };
    
//     if (Object.keys(allErrors).length > 0) {
//       setErrors(allErrors);
//       alert('Please fix all errors before exporting');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await toPDF();
//     } catch (error) {
//       console.error('Export failed:', error);
//       alert('Export failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

const handleExport = async (usedType) => {
    const validationErrors = validateData();
    let pdfBlob=null;
    let fileName=null;
    let fileType=null;
    let fileSize=null;
    const allErrors = { ...validationErrors, ...backendErrors };
    
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      alert('Please fix all errors before exporting');
      return;
    }

    setIsLoading(true);
    try {
      // Temporarily reset scale for capture
      previewRef.current.style.transform = 'scale(1)';
      
      const element = cvRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      if (usedType == null) {
        // Default behavior - save locally
        pdf.save(`${cvData.personalInfo.fullName || 'cv'}.pdf`);
      } else {
        // Get PDF as blob
         pdfBlob = pdf.output('blob');
        
        // Prepare file metadata
         fileName = `${cvData.personalInfo.fullName || 'cv'}.pdf`;
         fileType = 'application/pdf';
         fileSize = pdfBlob.size;
        
     
      } 
      // Restore original scale
      previewRef.current.style.transform = 'scale(1)';
      return {
        pdfBlob,
        fileName,
        fileType,
        fileSize
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  // Handle upload functionality
  const handleUpload = async () => {
    const validationErrors = validateData();
    const allErrors = { ...validationErrors, ...backendErrors };
    let simulatedBackendErrors;
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      alert('Please fix all errors before uploading');
      return;
    }

    setIsLoading(true);
    try {
       
        const {pdfBlob,fileSize,fileName,fileType}= await handleExport('notnull')
       if(pdfBlob==null){
        simulatedBackendErrors = {"Cv":"Please Add Cv"}  
       }

       const response = await uploadCv({fileName,fileSize,fileType,setBackendErrors,pdfBlob,setIsLoading,setShowStatusBar})

      }catch(err){

      }  
  };

  // Combine all errors for display
  const allErrors = { ...errors, ...backendErrors };

  return (
    <div className="min-h-screen bg-gray-50">
       
        {
            showStatusBar&&(
                <div 
                className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-in slide-in-from-right-5 duration-300"
                style={{
                  animation: 'slideInFromRight 0.3s ease-out'
                }}
              >
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">CV uploaded successfully!</span>
                <button
                   onClick={closeSuccessBar}
                  className="ml-4 text-white hover:text-green-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )
        }
       
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">CV Builder</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('builder')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'builder'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Edit className="w-4 h-4 inline mr-2" />
                Builder
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'preview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'builder' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <PersonalInfoForm
                data={cvData.personalInfo}
                onChange={handlePersonalInfoChange}
                errors={allErrors}
              />
              
              <ExperienceForm
                data={cvData.experience}
                onChange={(data) => setCvData(prev => ({ ...prev, experience: data }))}
                errors={allErrors}
              />
              
              <EducationForm
                data={cvData.education}
                onChange={(data) => setCvData(prev => ({ ...prev, education: data }))}
                errors={allErrors}
              />
              
              <SkillsForm
                data={cvData.skills}
                onChange={(data) => setCvData(prev => ({ ...prev, skills: data }))}
                errors={allErrors}
              />
              
              <ProjectsForm
                data={cvData.projects}
                onChange={(data) => setCvData(prev => ({ ...prev, projects: data }))}
                errors={allErrors}
              />
              
              <CertificationsForm
                data={cvData.certifications}
                onChange={(data) => setCvData(prev => ({ ...prev, certifications: data }))}
                errors={allErrors}
              />

              {/* Action Buttons */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex space-x-4">
                  <button
                    onClick={()=>handleExport(null)}
                    disabled={isLoading}
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isLoading ? 'Exporting...' : 'Export CV'}
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={isLoading}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isLoading ? 'Uploading...' : 'Upload CV'}
                  </button>
                </div>
              </div>
            </div>

            {/* Live Preview Section */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                <div className="preview-container overflow-hidden rounded-lg border border-gray-200">
                  <div ref={previewRef}  className="scale-50 origin-top-left transform w-[200%] h-auto">
                  <CVTemplate ref={cvRef} data={cvData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Full Preview Section */
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">CV Preview</h2>
              <div className="flex space-x-4">
                <button
                  onClick={()=>handleExport(null)}
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={handleUpload}
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </button>
              </div>
            </div>
            {/* <div ref={previewRef} >
            <CVTemplate  ref={cvRef} data={cvData} />
            </div>  */}
 <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                <div className="preview-container overflow-hidden rounded-lg border border-gray-200">
                  <div ref={previewRef}  className="scale-100 origin-top-left transform  h-auto">
                  <CVTemplate ref={cvRef} data={cvData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    );
};

export default CVBuilder;