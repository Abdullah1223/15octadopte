
import { z } from 'zod';
export const companyNameSchema = z.object({
  companyName: z.string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
});

export const nameSchema = z.object({
  firstName: z.string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z.string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
});

export const candidateTypeSchema = z.object({
  candidateType:z.string().min(4,'Candidate Type Is Required')
})

export const specializationSchema = z.object({
  Specialization:z.string().min(2,'Specialization cannot contain less than 2 characters').regex(/^[A-Za-z\s]+$/,"Specialization Can Only Contain Alphabets"),

})

export const salarySchema = z.object({
  salaryExpectationMinimum: z.number().min(1, 'Salary Cannot Be Less than 1').positive('Minimum Salary Cannot be Negative Number'),
  salaryExpectationMaximum: z.number().positive('Maximum Salary Cannot Be Negative Number')
}).refine(
  (data) => data.salaryExpectationMaximum >= data.salaryExpectationMinimum,
  {
    message: "Maximum salary cannot be less than minimum salary",
    path: ["salaryExpectationMaximum"],
  }
);
export const profilePictureSchema = z.object({
  profilePicture: z.instanceof(File,{
    message:"Please Enter File" 
  })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: 'Max image size is 2MB'
    })
    .refine((file) => 
      ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
      message: 'Only .jpg, .png, and .webp formats are supported'
    })
  
});
export const citySchema = z.object({
  City:z.string().min(1,'City is Required').toLowerCase().regex(/^[A-Za-z\s]+$/,'City can only contain alphabets'),
})

export const locationSchema = z.object({
  location: z.string()
    .min(1, "Location is required")
});

export const companyWebsite = z.object({
  companyWebsite:z.string().url("Please enter a valid URL"),
})

export const aboutUsSchema = z.object({
  aboutCompany: z.string()
    .min(50, "About Us must be at least 50 characters")
    .max(1000, "About Us must be less than 1000 characters")
});
