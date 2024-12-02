import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First name cannot be more than 20 characters.' })
    .regex(/^[A-Z][a-z]*$/, { message: 'First name must be capitalized.' }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty({ message: 'Please type your last name.' })
    .regex(/^[A-Za-z]+$/, { message: 'Last name must only contain alphabet characters.' }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: 'Please type your father name.' }),
  fatherOccupation: z.string().nonempty({ message: 'Please type your father occupation.' }),
  fatherContactNo: z.string().nonempty({ message: 'Please type your father contact number.' }),
  motherName: z.string().nonempty({ message: 'Please type your mother name.' }),
  motherOccupation: z.string().nonempty({ message: 'Please type your mother occupation.' }),
  motherContactNo: z.string().nonempty({ message: 'Please type your mother contact number.' }),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Please type your local guardian name.' }),
  occupation: z.string().nonempty({ message: 'Please type your local guardian occupation.' }),
  contactNo: z.string().nonempty({ message: 'Please type your local guardian contact number.' }),
  address: z.string().nonempty({ message: 'Please type your local guardian address.' }),
});


const studentValidationSchemaSchema = z.object({
  id: z.string().min(1),
  password: z.string().max(10),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address.' }),
  contactNo: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchemaSchema;