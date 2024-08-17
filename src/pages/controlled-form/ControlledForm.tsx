import { Form } from '../../components/form/Form';
import { Header } from '../../components/header/Header';
import { Endpoints, Links } from '../../types';

export const ControlledForm: React.FC = () => {
  return (
    <div>
      <Header p1={Endpoints.Main} p2={Endpoints.UncontrolledForm} link1={Links.Main} link2={Links.UncontrolledForm} />
      <Form />
    </div>
  );
};
