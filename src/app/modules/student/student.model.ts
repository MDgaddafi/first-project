import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'Please type your first name'],
    trim: true,
    maxlength: [20, 'First Name con not be more then 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize'
    }
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Please type your last name'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Please type your father name'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Please type your fatherOccupation'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Please type your FatherContactNo'],
  },
  motherName: {
    type: String,
    required: [true, 'Please type your mother name'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Please type your motherOccupation'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Please type your motherContactNo'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Please type your localGuardianSchema name'],
  },
  occupation: {
    type: String,
    required: [true, 'Please type your localGuardianSchema occupation'],
  },
  contactNo: {
    type: String,
    required: [true, 'Please type your localGuardianSchema contactNo'],
  },
  address: {
    type: String,
    required: [true, 'Please type your localGuardianSchema address'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'Id is required'], unique: true },
  password: { type: String, required: [true, 'password is required'], maxlength: [10, 'Password can not be 10 characters'] },
  name: {
    type: userNameSchema,
    required: [true, 'Please type your userNameSchema name'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid'
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String, required: true, unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not valid',
    // }
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  toJSON: {
    virtuals: true,
  },
}
);

// virtual
studentSchema.virtual('fullName').get(function (){
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
})

// pre save middleware / hook : will word on create() save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save data')
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  next();
})

// post save middleware / hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
})

// Query Middleware

studentSchema.pre('find', function (next) {
  this.find({isDeleted: {$ne: true}})
  next();
})
studentSchema.pre('findOne', function (next) {
  this.find({isDeleted: {$ne: true}})
  next();
})
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({$match: {isDeleted : {$ne: true}}})
  next();
})



// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// creating a custom instance method

// studentSchema.methods.isUsersExists = async function (id: string){
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
