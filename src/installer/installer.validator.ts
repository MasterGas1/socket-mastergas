import { check } from 'express-validator';

export const validationInstallerCreate = [
  check('installer.address', 'The address is required in installers')
    .not()
    .isEmpty(),

  check('installer.country', 'The country is required in installers')
    .not()
    .isEmpty(),

  check('installer.city', 'The city is required in installers').not().isEmpty(),

  check('installer.state', 'The state is required in installers')
    .not()
    .isEmpty(),

  check('installer.state', 'The state is required in installers')
    .not()
    .isEmpty(),

  check('installer.rfc', 'The RFC is required in installers').not().isEmpty(),

  check(
    'installer.rfc',
    'The rfc should have 12 character min and 13 max'
  ).isLength({ min: 12, max: 13 }),

  check('installer.phoneNumber', 'The phone number is required in installers')
    .not()
    .isEmpty(),

  check('installer.website', 'The website is required in installers')
    .not()
    .isEmpty(),

  check(
    'installer.employeesNumber',
    'The employees number is required in installers'
  )
    .not()
    .isEmpty(),

  check(
    'installer.yearsOfExperience',
    'The years of experience is required in installers and should be a number'
  )
    .not()
    .isEmpty()
    .isNumeric(),

  check(
    'installer.physicalPerson',
    'The physical person is required in installers and should be a boolean'
  )
    .not()
    .isEmpty()
    .isBoolean(),

  check(
    'installer.socialMedia',
    'The employees number is required in installers'
  )
    .isArray({ min: 1 })
    .withMessage('The social media is required in installers'),

  check('installer.socialMedia.*.name', 'The name is required in social media')
    .not()
    .isEmpty(),

  check('installer.socialMedia.*.url', 'The url is required in social media')
    .not()
    .isEmpty(),

  check(
    'installer.certifications',
    'The certifications is required in installers'
  )
    .isArray({ min: 1 })
    .withMessage('The certifications is required in installers'),

  check(
    'installer.certifications.*.name',
    'The name is required in certifications'
  )
    .not()
    .isEmpty(),

  check(
    'installer.securityCourses',
    'The security courses is required in installers'
  )
    .isArray({ min: 1 })
    .withMessage('The security courses is required in installers'),

  check(
    'installer.securityCourses.*.name',
    'The name is required in security courses'
  )
    .not()
    .isEmpty(),
];
