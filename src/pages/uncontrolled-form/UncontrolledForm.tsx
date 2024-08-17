import { Header } from '../../components/header/Header';
import { Endpoints, Links } from '../../types';

export const UncontrolledForm: React.FC = () => {
  return (
    <div>
      <Header p1={Endpoints.Main} p2={Endpoints.ControlledForm} link1={Links.Main} link2={Links.ControlledForm} />
    </div>
  );
};
