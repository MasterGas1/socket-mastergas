import { check } from 'express-validator';

export const validationInstallerCreate = [
  check('installer.companyName', 'The companyName is required in installers')
    .not().isEmpty(),
  check('installer.phoneNumber', 'The phoneNumber is required and should have 10 digits or more in installers')
    .not().isEmpty().isLength({min: 10}),
  check('installer.IMSSNumber', 'The IMSSNumber is required and should be number with 11 digits in installers')
    .not().isEmpty().isNumeric().isLength({ min: 10, max: 12 }),
  check('installer.employeesNumber', 'The employeesNumber is number in installers')
    .not().isEmpty().isNumeric(),
  check('installer.webSite', 'The webSite is required in installers')
    .not().isEmpty(),
  check('installer.ownOffice', 'The ownOffice is required and should be a boolean in installers')
    .not().isEmpty().isBoolean(),
  check('installer.ownVehicle','The ownVehicle is required and should be a boolean in installers')
    .not().isEmpty().isBoolean(),
  check('installer.state', 'The state is required in installers')
    .not().isEmpty(),
  check('installer.city', 'The city is required in installers')
    .not().isEmpty(),
  check('installer.address', 'The employees number is required in installers')
    .not().isEmpty(),
  check('installer.specializedTools', 'The specializedTools is required in installers')
    .not().isEmpty(),
  check('installer.yearsExperience', 'The yearsExperience is required and should be a number in installers')
    .not().isEmpty().isNumeric(),
  check('installer.certifications', 'The certifications is required in installers')
    .not().isEmpty(),
  check('installer.securityCourses', 'The securityCourses is required in installers')
    .not().isEmpty(),
];
