import { Card } from '../../components/card/Card';
import { Header } from '../../components/header/Header';
import { Endpoints, Links } from '../../types';

export const MainPage: React.FC = () => {
  return (
    <div>
      <Header
        p1={Endpoints.ControlledForm}
        p2={Endpoints.UncontrolledForm}
        link1={Links.ControlledForm}
        link2={Links.UncontrolledForm}
      />
      <Card />
    </div>
  );
};
