import { Card } from '../../components/card/Card';
import { Header } from '../../components/header/Header';
import { selectData } from '../../store/selector';
import { useAppSelector } from '../../store/storeHooks';
import { Endpoints, Links } from '../../types';
import s from './MainPage.module.css';

export const MainPage: React.FC = () => {
  const dataForRender = useAppSelector(selectData);

  return (
    <div>
      <Header
        p1={Endpoints.ControlledForm}
        p2={Endpoints.UncontrolledForm}
        link1={Links.ControlledForm}
        link2={Links.UncontrolledForm}
      />
      <div className={s.cardContainer}>
        {dataForRender.list.map((d) => {
          const { name, age, email, password, gender, country, terms, date, picture } = d;
          console.log(d);
          return (
            <Card
              key={name}
              date={date}
              terms={terms}
              name={name}
              email={email}
              age={age}
              password={password}
              gender={gender}
              country={country}
              picture={picture}
            />
          );
        })}
      </div>
    </div>
  );
};
