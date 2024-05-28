import { Schema, model } from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import {
  InstallerProps,
} from '../interfaces/installer.interface';


const InstallerSchema = new Schema<InstallerProps>({
  companyName: {
    type: String,
    require: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  IMMSNumber: {
    type: Number,
    require: true,
  },
  website: {
    type: String,
    require: true,
    trim: true,
  },
  employeesNumber: {
    type: Number,
    require: true
  },
  ownOffice: {
    type: Boolean,
    require: true,
  },
  ownVehicle: {
    type: Boolean,
    require: true,
  },
  state: {
    type: String,
    require: true,
    trim: true,
  },
  city: {
    type: String,
    require: true,
    trim: true,
  },
  address: {
    type: String,
    require: true,
    trim: true,
  },
  specializedTools: {
    type: String,
    require: true,
    trim: true,
  },
  yearsExperience: {
    type: Number,
    require: true,
  },
  certifications: {
    type: String,
    require: true,
    trim: true,
  },
  securityCourses: {
    type: String,
    require: true,
    trim: true,
  },
});

InstallerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const InstallerModel = model<InstallerProps>('installer', InstallerSchema);
export default InstallerModel;

// export default model<InstallerProps>('installer', InstallerSchema);
