import s from './Card.module.css';

export const Card: React.FC = () => {
  return (
    <div className={s.card}>
      <div className={s.cardBody}>
        <div className={s.cardImage}>
          <img src="images.png" alt="avatar" />
        </div>

        <div className={s.cardData}>
          <div className={s.cardName}>Alena</div>

          <div className={s.cardNameLabel}>name</div>

          <div className={s.cardRow}>
            <div className={s.cardRowLabel}>age:</div>
            <div className={s.cardRowData}>36</div>
          </div>
          <div className={s.cardRow}>
            <div className={s.cardRowLabel}>e-mail:</div>
            <div className={s.cardRowData}>bkibki@gtrh.ty</div>
          </div>
          <div className={s.cardRow}>
            <div className={s.cardRowLabel}>password:</div>
            <div className={s.cardRowData}>Qwerty123</div>
          </div>
          <div className={s.cardRow}>
            <div className={s.cardRowLabel}>gender:</div>
            <div className={s.cardRowData}>Female</div>
          </div>
          <div className={s.cardRow}>
            <div className={s.cardRowLabel}>country:</div>
            <div className={s.cardRowData}>Belarus</div>
          </div>
        </div>
      </div>
    </div>
  );
};
