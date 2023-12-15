import { Schema, model } from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import {
  Certification,
  InstallerProps,
  SecurityCourse,
  SocialMedia,
} from '../interfaces/installer.interface';

const SocialMediaSchema = new Schema<SocialMedia>({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const CertificationSchema = new Schema<Certification>({
  name: {
    type: String,
    required: true,
  },
});

const SecurityCourseSchema = new Schema<SecurityCourse>({
  name: {
    type: String,
    required: true,
  },
});

const InstallerSchema = new Schema<InstallerProps>({
  address: {
    type: String,
    require: true,
    trim: true,
  },
  country: {
    type: String,
    require: true,
    trim: true,
  },
  city: {
    type: String,
    require: true,
    trim: true,
  },
  state: {
    type: String,
    require: true,
    trim: true,
  },
  rfc: {
    type: String,
    require: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    require: true,
    trim: true,
  },
  website: {
    type: String,
    require: true,
    trim: true,
  },
  employeesNumber: {
    type: Number,
    require: true,
    trim: true,
  },
  yearsOfExperience: {
    type: Number,
    require: true,
    trim: true,
  },
  physicalPerson: {
    type: Boolean,
    require: true,
    trim: true,
  },
  socialMedia: {
    type: [SocialMediaSchema],
    require: true,
    trim: true,
  },
  certifications: {
    type: [CertificationSchema],
    require: true,
    trim: true,
  },
  securityCourses: {
    type: [SecurityCourseSchema],
    require: true,
    trim: true,
  },
});

InstallerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const InstallerModel = model<InstallerProps>('installer', InstallerSchema);
export default InstallerModel;

// export default model<InstallerProps>('installer', InstallerSchema);
