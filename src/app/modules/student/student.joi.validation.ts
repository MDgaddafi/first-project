import Joi from "joi";

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, 'capitalize')
    .required()
    .messages({
      'string.base': 'First name must be a string.',
      'string.empty': 'Please type your first name.',
      'string.max': 'First name cannot be more than 20 characters.',
      'string.pattern.name': '{#label} is not in capitalize.',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/, 'alphabet')
    .messages({
      'string.base': 'Last name must be a string.',
      'string.empty': 'Please type your last name.',
      'string.pattern.name': '{#label} must only contain alphabet characters.',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father name must be a string.',
    'string.empty': 'Please type your father name.',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father occupation must be a string.',
    'string.empty': 'Please type your father occupation.',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': 'Father contact number must be a string.',
    'string.empty': 'Please type your father contact number.',
  }),
  motherName: Joi.string().required().messages({
    'string.base': 'Mother name must be a string.',
    'string.empty': 'Please type your mother name.',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother occupation must be a string.',
    'string.empty': 'Please type your mother occupation.',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': 'Mother contact number must be a string.',
    'string.empty': 'Please type your mother contact number.',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local guardian name must be a string.',
    'string.empty': 'Please type your local guardian name.',
  }),
  occupation: Joi.string().required().messages({
    'string.base': 'Local guardian occupation must be a string.',
    'string.empty': 'Please type your local guardian occupation.',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Local guardian contact number must be a string.',
    'string.empty': 'Please type your local guardian contact number.',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Local guardian address must be a string.',
    'string.empty': 'Please type your local guardian address.',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID must be a string.',
    'string.empty': 'ID is required.',
  }),
  name: userNameSchema.required().messages({
    'object.base': 'Name is required.',
  }),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'string.base': 'Gender must be a string.',
      'string.empty': 'Gender is required.',
      'any.only': '{#value} is not valid.',
    }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Email must be a string.',
      'string.email': '{#value} is not valid.',
      'string.empty': 'Email is required.',
    }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact number must be a string.',
    'string.empty': 'Contact number is required.',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency contact number must be a string.',
    'string.empty': 'Emergency contact number is required.',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'string.base': 'Blood group must be a string.',
      'any.only': '{#value} is not valid.',
    }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present address must be a string.',
    'string.empty': 'Present address is required.',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent address must be a string.',
    'string.empty': 'Permanent address is required.',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian information is required.',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local guardian information is required.',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .default('active')
    .messages({
      'string.base': 'Status must be a string.',
      'any.only': '{#value} is not valid.',
    }),
});

export default studentValidationSchema;
