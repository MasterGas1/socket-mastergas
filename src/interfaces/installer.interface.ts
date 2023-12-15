export interface SocialMedia {
  _id?: string;
  name: string;
  url: string;
}

export interface Certification {
  _id?: string;
  name: string;
}

export interface SecurityCourse {
  _id?: string;
  name: string;
}

export interface InstallerProps {
  address: string;
  country: string;
  city: string;
  state: string;
  rfc: string;
  phoneNumber: string;
  website: string;
  employeesNumber: number;
  yearsOfExperience: number;
  physicalPerson: boolean;
  socialMedia: SocialMedia[];
  certifications: Certification[];
  securityCourses: SecurityCourse[];
}
