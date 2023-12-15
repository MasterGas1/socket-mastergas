import { compareSync, hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import mongoose from 'mongoose';
import parseMongoId from '../helper/parseMongoId';
import { InstallerProps } from '../interfaces/installer.interface';
import Roles from '../roles/roles.model';
import { RequestMiddle } from '../user/user.middleware';
import User from '../user/user.model';
import InstallerModel from './installer.model';

type InstallerType = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  installer: InstallerProps;
};

export const createInstaller = async (installerUser: InstallerType) => {
  const { installer: installerProperties, ...installerUserMainProperties } =
    installerUser;

  const { email, password } = installerUserMainProperties;
  const { rfc } = installerProperties;

  const session = await mongoose.startSession();

  const isRepeatedEmail = await User.findOne({ email });
  if (isRepeatedEmail) {
    throw new Error(`User with email: ${email} is repeated`);
  }

  const isRepeatedCustomer = await InstallerModel.findOne({ rfc });
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

  const userBody = {
    ...installerUserMainProperties,
    role_id: role._id,
    password: hashSync(password, 10),
    status: 'approved',
    installer_id: installer[0]._id,
  };

  const user = await User.create([userBody], { session });

  await session.commitTransaction();
  session.endSession();

  const secretKey = process.env.SECRET_KEY || 'S3CR3TK3Y$';

  const token = sign({ id: user[0]._id }, secretKey);

  return token;
};

export const getOneInstaller = async (req: RequestMiddle) => {
  const { userId } = req;

  const installer = await User.findById(userId)
    .populate([
      { path: 'role_id', select: '-_id' },
      {
        path: 'installer_id',
        select: '-_id',
      },
    ])
    .select('-password -status');

  if (!installer) {
    throw new Error('Installer not found');
  }

  return installer;
};

export const getAllInstallers = async () => {
  const roleId = await Roles.findOne({ name: 'installer' });

  const installers = await User.find({ role_id: roleId })
    .populate([
      {
        path: 'installer_id',
        select: '-_id',
      },
      {
        path: 'role_id',
        select: '-_id',
        match: { name: 'installer' },
      },
    ])
    .select('-password');

  if (!installers) {
    throw new Error('Installers not found');
  }

  return installers;
};

export const updateInstaller = async (req: RequestMiddle) => {
  const { userId, body } = req;

  const { installer: installerBody, ...userInstaller }: InstallerType = body;

  const {
    socialMedia,
    certifications,
    securityCourses,
    ...installerBodyWithoutArrays
  } = installerBody;

  const session = await mongoose.startSession();
  session.startTransaction();

  if (!parseMongoId(userId)) {
    throw new Error('The id is not uuid');
  }

  const userFound = await User.findById(userId).session(session);
  if (!userFound) {
    throw new Error('User not found');
  }

  if (!compareSync(userInstaller.password, userFound.password)) {
    throw new Error('The password is not valid');
  }

  const emailRepeated = await User.findOne({ email: userInstaller.email });
  if (emailRepeated && emailRepeated._id.toString() != userId) {
    throw new Error(`User with email: ${userInstaller.email} is repeated`);
  }

  const installerFound = await InstallerModel.findById(
    userFound.installer_id
  ).session(session);
  if (!installerFound) {
    throw new Error('Installer not found');
  }

  // const rfc = await InstallerModel.findOne({ rfc: installerBody.rfc }).session(
  //   session
  // );
  // if (rfc && rfc._id != userFound.installer_id) {
  //   throw new Error(`Installer with rfc: ${installerBody.rfc} is repeated`);
  // }

  const installerId = userFound.installer_id;

  if (socialMedia) {
    socialMedia.map(async (socialMediaObj) => {
      await InstallerModel.findOneAndUpdate(
        {
          _id: installerId,
          'socialMedia._id': socialMediaObj._id,
        },
        {
          $set: {
            'socialMedia.$.url': socialMediaObj.url,
            'socialMedia.$.name': socialMediaObj.name,
          },
        },
        {
          new: true,
        }
      ).session(session);
    });
  }

  if (certifications) {
    certifications.map(async (certificationObj) => {
      await InstallerModel.findOneAndUpdate(
        {
          _id: installerId,
          'certifications._id': certificationObj._id,
        },
        {
          $set: {
            'certifications.$.name': certificationObj.name,
          },
        },
        {
          new: true,
        }
      ).session(session);
    });
  }

  if (securityCourses) {
    securityCourses.map(async (securityCourseObj) => {
      await InstallerModel.findOneAndUpdate(
        {
          _id: installerId,
          'securityCourses._id': securityCourseObj._id,
        },
        {
          $set: {
            'securityCourses.$.name': securityCourseObj.name,
          },
        },
        {
          new: true,
        }
      ).session(session);
    });
  }

  const installerUpdated = await InstallerModel.findByIdAndUpdate(
    userFound.installer_id,
    installerBodyWithoutArrays,
    {
      new: true,
    }
  )
    .select('-_id')
    .session(session);

  const userUpdated = await User.findByIdAndUpdate(
    userId,
    {
      email: userInstaller.email,
      name: userInstaller.name,
      lastName: userInstaller.lastName,
      password: hashSync(userInstaller.password, 10),
    },
    {
      new: true,
    }
  )
    .populate([
      { path: 'role_id', select: '-_id' },
      {
        path: 'installer_id',
        select: '-_id',
      },
    ])
    .select('-_id -password')
    .session(session);

  await session.commitTransaction();
  session.endSession();

  return userUpdated;
};

export const destroyInstaller = async (req: RequestMiddle) => {
  const { userId } = req;

  if (!parseMongoId(userId)) {
    throw new Error('The id is not uuid');
  }

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
