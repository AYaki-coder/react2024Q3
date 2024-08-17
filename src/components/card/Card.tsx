import { DataForRender } from '../../types';
import s from './Card.module.css';

export const Card: React.FC<DataForRender> = (props) => {
  const { name, age, email, password, gender, country, terms, picture } = props;
  return (
    <div className={s.card}>
      <div className={s.cardBody}>
        <div className={s.cardImageContainer}>
          <img className={s.cardImage} src={`data:image/jpeg;base64,${picture}`} />
        </div>

        <div className={s.cardData}>
          <div className={s.cardName}>{name}</div>

          <div className={s.cardNameLabel}>name</div>

          <div className={s.cardRow}>
            <div className={s.cardRowLabel}>age:</div>
            <div className={s.cardRowData}>{age}</div>
          </div>
          <div className={s.cardRow}>
            <div className={s.cardRowLabel}>e-mail:</div>
            <div className={s.cardRowData}>{email}</div>
          </div>
          <div className={s.cardRow}>
            <div className={s.cardRowLabel}>password:</div>
            <div className={s.cardRowData}>{password}</div>
          </div>
          <div className={s.cardRow}>
            <div className={s.cardRowLabel}>gender:</div>
            <div className={s.cardRowData}>{gender}</div>
          </div>
          <div className={s.cardRow}>
            <div className={s.cardRowLabel}>country:</div>
            <div className={s.cardRowData}>{country}</div>
          </div>
          <div className={s.cardRow}>
            <div className={s.cardRowLabel}>terms </div>
            <div className={s.cardRowData}>{String(terms)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
