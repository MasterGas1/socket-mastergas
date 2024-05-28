import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcrypt';

import parseMongoId from '../helper/parseMongoId';
import { sendEmail } from '../helper/mail';

import { confirmationRegisterEmail } from '../templates/email/confirmationRegisterEmail';

import { InstallerProps } from '../interfaces/installer.interface';

import { RequestMiddle } from '../user/user.middleware';

import User from '../user/user.model';
import Roles from '../roles/roles.model';
import InstallerModel from './installer.model';

type InstallerType = {
  name: string;
  lastName: string;
  email: string;
  rfc: string;
  installer: InstallerProps;
};

export const createInstaller = async (installerUser: InstallerType) => {
  const { installer: installerProperties, ...installerUserMainProperties } =
    installerUser;

  const { email, rfc, name, lastName} = installerUserMainProperties;

  const session = await mongoose.startSession();

  const isRepeatedEmail = await User.findOne({ email });
  if (isRepeatedEmail) {
    throw new Error(`User with email: ${email} is repeated`);
  }

  const isRepeatedCustomer = await User.findOne({ rfc });

  if (isRepeatedCustomer) {
    throw new Error(`Customer with rfc: ${rfc} is repeated`);
  }

  session.startTransaction(); // Start transaction, help us if there a problem when we are creating both collections make a rollback

  const installer = await InstallerModel.create([installerProperties], {
    session,
  });

  const role = await Roles.findOne({ name: 'installer' }); //Get the role

  if (!role) {
    throw new Error(
      "It's necessary to ejecute seeder role before to call this end-point"
    );
  }

  const randomPassword = Math.random().toString(36).slice(-8);

  const userBody = {
    ...installerUserMainProperties,
    role_id: role._id,
    password: hashSync(randomPassword, 10),
    status: 'pending',
    installer_id: installer[0]._id,
  };

  await User.create([userBody], { session });

  await session.commitTransaction();
  session.endSession();

  // Send email

  const subject = "MasterGas23: Confirmación de solicitud";

  const receipients = email;

  const message = confirmationRegisterEmail(name, lastName);

  await sendEmail({receipients, subject, message});

  return {msg: "Installer was created"};
};

export const getOneInstallerById = async (id: string) => {
  
  const installer = await User.findById(id)
    .populate([
      { 
        path: 'role_id', 
        select: 'name -_id' },
      {
        path: 'installer_id',
        select: '-_id -__v -deleted',
      },
    ])
    .select('-password -status -deleted -__v');

  if (!installer) {
    throw new Error('Installer not found');
  }

  return installer;
};

export const getAllInstallers = async (status: string) => {
  const roleId = await Roles.findOne({ name: 'installer' });

  const installers = await User.find({ role_id: roleId, status })
    .populate([
      {
        path: 'installer_id',
        select: 'companyName',
      }
    ])
    .select('-password -role_id -deleted -__v');

  if (!installers) {
    throw new Error('Installers not found');
  }

  return installers;
};

// export const updateInstaller = async (req: RequestMiddle) => {
//   const { userId, body } = req;

//   const { installer: installerBody, ...userInstaller }: InstallerType = body;

//   const {
//     socialMedia,
//     certifications,
//     securityCourses,
//     ...installerBodyWithoutArrays
//   } = installerBody;

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   if (!parseMongoId(userId)) {
//     throw new Error('The id is not uuid');
//   }

//   const userFound = await User.findById(userId).session(session);
//   if (!userFound) {
//     throw new Error('User not found');
//   }

//   if (!compareSync(userInstaller.password, userFound.password)) {
//     throw new Error('The password is not valid');
//   }

//   const emailRepeated = await User.findOne({ email: userInstaller.email });
//   if (emailRepeated && emailRepeated._id.toString() != userId) {
//     throw new Error(`User with email: ${userInstaller.email} is repeated`);
//   }

//   const installerFound = await InstallerModel.findById(
//     userFound.installer_id
//   ).session(session);
//   if (!installerFound) {
//     throw new Error('Installer not found');
//   }

//   // const rfc = await InstallerModel.findOne({ rfc: installerBody.rfc }).session(
//   //   session
//   // );
//   // if (rfc && rfc._id != userFound.installer_id) {
//   //   throw new Error(`Installer with rfc: ${installerBody.rfc} is repeated`);
//   // }

//   const installerId = userFound.installer_id;

//   if (socialMedia) {
//     socialMedia.map(async (socialMediaObj) => {
//       await InstallerModel.findOneAndUpdate(
//         {
//           _id: installerId,
//           'socialMedia._id': socialMediaObj._id,
//         },
//         {
//           $set: {
//             'socialMedia.$.url': socialMediaObj.url,
//             'socialMedia.$.name': socialMediaObj.name,
//           },
//         },
//         {
//           new: true,
//         }
//       ).session(session);
//     });
//   }

//   if (certifications) {
//     certifications.map(async (certificationObj) => {
//       await InstallerModel.findOneAndUpdate(
//         {
//           _id: installerId,
//           'certifications._id': certificationObj._id,
//         },
//         {
//           $set: {
//             'certifications.$.name': certificationObj.name,
//           },
//         },
//         {
//           new: true,
//         }
//       ).session(session);
//     });
//   }

//   if (securityCourses) {
//     securityCourses.map(async (securityCourseObj) => {
//       await InstallerModel.findOneAndUpdate(
//         {
//           _id: installerId,
//           'securityCourses._id': securityCourseObj._id,
//         },
//         {
//           $set: {
//             'securityCourses.$.name': securityCourseObj.name,
//           },
//         },
//         {
//           new: true,
//         }
//       ).session(session);
//     });
//   }

//   const installerUpdated = await InstallerModel.findByIdAndUpdate(
//     userFound.installer_id,
//     installerBodyWithoutArrays,
//     {
//       new: true,
//     }
//   )
//     .select('-_id')
//     .session(session);

//   const userUpdated = await User.findByIdAndUpdate(
//     userId,
//     {
//       email: userInstaller.email,
//       name: userInstaller.name,
//       lastName: userInstaller.lastName,
//       password: hashSync(userInstaller.password, 10),
//     },
//     {
//       new: true,
//     }
//   )
//     .populate([
//       { path: 'role_id', select: '-_id' },
//       {
//         path: 'installer_id',
//         select: '-_id',
//       },
//     ])
//     .select('-_id -password')
//     .session(session);

//   await session.commitTransaction();
//   session.endSession();

//   return userUpdated;
// };

export const destroyInstaller = async (userId: string) => {

  const userFound = await User.findById(userId);

  if (!userFound) {
    throw new Error('User not found');
  }

  const installerFound = await InstallerModel.findById(userFound.installer_id);

  if (!installerFound) {
    throw new Error('Installer not found');
  }

  await userFound.delete();
  await installerFound.delete();

  return { msg: 'Installer was deleted' };
};
