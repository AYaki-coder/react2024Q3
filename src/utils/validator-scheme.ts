import * as yup from 'yup';
import { COUNTRY_LIST } from './country-list';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Enter your name.')
    .matches(/^[A-Z]/, 'First letter should be capitalized.'),
  email: yup.string().required('Enter your e-mail.').email('The input should be an e-mail address.'),
  age: yup
    .number()
    .typeError('Enter your age.')
    .required('Enter your age.')
    .positive('The age should be positive.')
    .integer('The age should be an integer'),
  password: yup
    .string()
    .required('Enter your password')
    .matches(/([0-9])/, 'Must contain at least 1 number ')
    .matches(/([\p{Lu}])/u, 'Must contain at least 1 uppercase letter ')
    .matches(/([\p{Ll}])/u, 'Must contain at least 1 lowercase letter ')
    .matches(/([^\p{L}0-9])/u, 'Must contain one special character ')
    .required('Set password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords do not match.')
    .required('Confirm your password'),
  gender: yup.string().required('Choose the gender'),
  country: yup
    .string()
    .required('Choose your country')
    .lowercase()
    .trim()
    .oneOf(
      COUNTRY_LIST.map((x) => x.toLowerCase()),
      'Choose the country from the list',
    ),
  picture: yup
    .mixed<FileList>()
    .required('Upload your picture.')
    .test('fileSize', (files: FileList, { path, createError }) => {
      if (!files?.[0]) {
        return createError({
          message: 'Upload the file',
          path,
        });
      } else if (files[0].size >= 1024 * 1024 * 1024 * 1024) {
        return createError({
          message: 'file is too large',
          path,
        });
      }
      return true;
    })
    .test('fileTypeJpeg', 'Only JPEG/PNG are supported', (files: FileList) => {
      const type = files?.[0]?.type;
      return type === 'image/jpeg' || type === 'image/png';
    }),
  terms: yup.boolean().isTrue('You did not accepted Terms and Conditions').required(),
});
