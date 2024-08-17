import { Header } from '../../components/header/Header';
import { Endpoints, Links } from '../../types';
import s from '../../components/form/Form.module.css';
import { COUNTRY_LIST } from '../../utils/country-list';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/validator-scheme';

export const ControlledForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onBlur', defaultValues: {} });

  const onSubmit = (data: unknown) => {
    console.log('submit', data);
  };
  return (
    <div>
      <Header p1={Endpoints.Main} p2={Endpoints.UncontrolledForm} link1={Links.Main} link2={Links.UncontrolledForm} />
      <div className={s.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.formRow}>
            <label htmlFor="name" className={s.formLabel}>
              Name:
            </label>
            <div className={s.formInputContainer}>
              <input
                className={s.formInput}
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register('name')}
              />
              <p className={s.errorMessage}>{errors?.name?.message}</p>
            </div>
          </div>
          <div className={s.formRow}>
            <label htmlFor="age" className={s.formLabel}>
              Age:
            </label>
            <div className={s.formInputContainer}>
              <input className={s.formInput} id="age" type="number" placeholder="Enter your age" {...register('age')} />
              <p className={s.errorMessage}>{errors?.age?.message}</p>
            </div>
          </div>
          <div className={s.formRow}>
            <label htmlFor="email" className={s.formLabel}>
              E-mail:
            </label>
            <div className={s.formInputContainer}>
              <input
                className={s.formInput}
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
              />
              <p className={s.errorMessage}>{errors?.email?.message}</p>
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
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                {...register('password')}
              />
              <p className={s.errorMessage}>{errors?.password?.message}</p>
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
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your password"
                {...register('confirmPassword')}
              />
              <p className={s.errorMessage}>{errors?.confirmPassword?.message}</p>
            </div>
          </div>
          <fieldset className={s.formRow}>
            <span className={s.formLabel}>Gender:</span>
            <div className={s.formInputContainer}>
              <div className={s.genderContainer}>
                <input type="radio" id="gender-male" value="male" className={s.genderInput} {...register('gender')} />
                <label htmlFor="gender-male" className={s.genderLabel}>
                  Male
                </label>

                <input
                  type="radio"
                  id="gender-female"
                  value="female"
                  className={s.genderInput}
                  {...register('gender')}
                />
                <label htmlFor="gender-female" className={s.genderLabel}>
                  Female
                </label>
              </div>
              <p className={s.errorMessage}>{errors?.gender?.message}</p>
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
                type="text"
                placeholder="Select your country"
                autoComplete="off"
                {...register('country')}
              />
              <p className={s.errorMessage}>{errors?.country?.message}</p>
            </div>
          </div>
          <br />
          <div className={s.formRow}>
            <div className={s.formInputContainer}>
              <input type="checkbox" id="terms" className={s.terms} {...register('terms')} />
              <label htmlFor="terms" className={s.formLabel}>
                Accept Terms and Conditions agreement
              </label>
              <p className={s.errorMessage}>{errors?.terms?.message}</p>
            </div>
          </div>
          <br />
          <button className={s.submit} type="submit" disabled={!formState?.isValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
