import { Header } from '../../components/header/Header';
import { Endpoints, FormErrors, Links } from '../../types';
import { COUNTRY_LIST } from '../../utils/country-list';
import s from '../../components/form/Form.module.css';
import { schema } from '../../utils/validator-scheme';
import * as yup from 'yup';
import { useState } from 'react';
import { convertTo64Base } from '../../utils/convert';

export const UncontrolledForm: React.FC = () => {
  const [errors, setErrors] = useState<Partial<FormErrors>>({});
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      age: { value: number };
      email: { value: string };
      password: { value: string };
      confirmPassword: { value: string };
      gender: { value: string };
      country: { value: string };
      terms: { checked: boolean };
      picture: { files: FileList };
    };

    const formData = {
      name: target.name.value,
      age: target.age.value,
      email: target.email.value,
      password: target.password.value,
      confirmPassword: target.confirmPassword.value,
      gender: target.gender.value,
      country: target.country.value,
      terms: target.terms.checked,
      picture: target.picture.files,
    };

    schema
      .validate(formData, { abortEarly: false, context: { COUNTRY_LIST } })
      .then(async (formData) => {
        const file = formData.picture[0];
        const base64 = await convertTo64Base(file);
        console.log(base64);
      })
      .catch((validationErrors: yup.ValidationError) => {
        const errors: Partial<FormErrors> = validationErrors.inner.reduce(
          (acc: Partial<FormErrors>, err: yup.ValidationError) => {
            const key = err.path as keyof FormErrors;
            if (key) {
              acc[key] = err?.message ?? '';
            }
            return acc;
          },
          {},
        );
        setErrors(errors);
      });

    console.log('submit', formData);
  };
  return (
    <div>
      <Header p1={Endpoints.Main} p2={Endpoints.ControlledForm} link1={Links.Main} link2={Links.ControlledForm} />
      <div className={s.card}>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className={s.formRow}>
            <label htmlFor="name" className={s.formLabel}>
              Name:
            </label>

            <div className={s.formInputContainer}>
              <input className={s.formInput} id="name" name="name" type="text" placeholder="Enter your name" />
              <p className={s.errorMessage}>{errors?.name}</p>
            </div>
          </div>
          <div className={s.formRow}>
            <label htmlFor="age" className={s.formLabel}>
              Age:
            </label>
            <div className={s.formInputContainer}>
              <input className={s.formInput} id="age" name="age" type="text" placeholder="Enter your age" />
              <p className={s.errorMessage}>{errors?.age}</p>
            </div>
          </div>
          <div className={s.formRow}>
            <label htmlFor="email" className={s.formLabel}>
              E-mail:
            </label>
            <div className={s.formInputContainer}>
              <input className={s.formInput} id="email" name="email" type="email" placeholder="Enter your email" />
              <p className={s.errorMessage}>{errors?.email}</p>
            </div>
          </div>
          <div className={s.formRow}>
            <label htmlFor="password" className={s.formLabel}>
              Password:
            </label>
            <div className={s.formInputContainer}>
              <input
                className={s.formInput}
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <p className={s.errorMessage}>{errors?.password}</p>
            </div>
          </div>

          <div className={s.formRow}>
            <label htmlFor="confirmPassword" className={s.formLabel}>
              Confirm Password:
            </label>
            <div className={s.formInputContainer}>
              <input
                className={s.formInput}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
              />

              <p className={s.errorMessage}>{errors?.confirmPassword}</p>
            </div>
          </div>
          <fieldset className={s.formRow}>
            <span className={s.formLabel}>Gender:</span>
            <div className={s.formInputContainer}>
              <div className={s.genderContainer}>
                <input type="radio" name="gender" id="gender-male" className={s.genderInput} />
                <label htmlFor="gender-male" className={s.genderLabel}>
                  Male
                </label>

                <input type="radio" name="gender" id="gender-female" className={s.genderInput} />
                <label htmlFor="gender-female" className={s.genderLabel}>
                  Female
                </label>
              </div>
              <p className={s.errorMessage}>{errors?.gender}</p>
            </div>
          </fieldset>

          <div className={s.formRow}>
            <span className={s.formLabel}>Country:</span>
            <datalist className={(s.formInput, s.countries)} id="country-list">
              {COUNTRY_LIST.map((name) => (
                <option className={s.formInput} value={name} key={name}>
                  {name}
                </option>
              ))}
            </datalist>
            <div className={s.formInputContainer}>
              <input
                className={s.formInput}
                id="country"
                list="country-list"
                name="country"
                type="text"
                placeholder="Select your country"
              />
              <p className={s.errorMessage}>{errors?.country}</p>
            </div>
          </div>
          <div className={s.formRow}>
            <label htmlFor="picture" className={s.formLabel}>
              Picture:
            </label>
            <div className={s.formInputContainer}>
              <input className={s.formInput} id="picture" type="file" placeholder="Upload a picture" name="picture" />
              <p className={s.errorMessage}>{errors?.picture}</p>
            </div>
          </div>
          <br />
          <div className={s.formRow}>
            <div className={s.formInputContainer}>
              <input type="checkbox" name="terms" id="terms" className={s.terms} />
              <label htmlFor="terms" className={s.formLabel}>
                Accept Terms and Conditions agreement
              </label>
              <p className={s.errorMessage}>{errors?.terms}</p>
            </div>
          </div>
          <br />
          <button className={s.submit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
