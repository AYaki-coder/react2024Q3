import { COUNTRY_LIST } from '../../utils/country-list';
import s from './Form.module.css';

export const Form: React.FC = () => {
  return (
    <div className={s.card}>
      <form>
        <div className={s.formRow}>
          <label htmlFor="name" className={s.formLabel}>
            Name:
          </label>
          <input className={s.formInput} id="name" name="name" type="text" placeholder="Enter your name" />
        </div>
        <div className={s.formRow}>
          <label htmlFor="age" className={s.formLabel}>
            Age:
          </label>
          <input className={s.formInput} id="age" name="age" type="text" placeholder="Enter your age" />
        </div>
        <div className={s.formRow}>
          <label htmlFor="email" className={s.formLabel}>
            E-mail:
          </label>
          <input className={s.formInput} id="email" name="email" type="email" placeholder="Enter your email" />
        </div>
        <div className={s.formRow}>
          <label htmlFor="password" className={s.formLabel}>
            Password:
          </label>
          <input
            className={s.formInput}
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div className={s.formRow}>
          <label htmlFor="password2" className={s.formLabel}>
            Confirm Password:
          </label>
          <input
            className={s.formInput}
            id="password2"
            name="password2"
            type="password"
            placeholder="Confirm your password"
          />
        </div>
        <fieldset className={s.formRow}>
          <span className={s.formLabel}>Gender:</span>
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
          <input
            className={s.formInput}
            id="country"
            list="country-list"
            name="country"
            type="text"
            placeholder="Select your country"
          />
        </div>
        <br />
        <div className={s.formRow}>
          <input type="checkbox" name="terms" id="terms" className={s.terms} />
          <label htmlFor="terms" className={s.formLabel}>
            Accept Terms and Conditions agreement
          </label>
        </div>
        <br />
        <button className={s.submit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
