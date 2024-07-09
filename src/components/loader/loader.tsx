import { PureComponent, ReactNode } from 'react';
import './loader.css';

interface Props {}
interface State {}

export class Loader extends PureComponent<Props, State> {
  render(): ReactNode {
    return <div className="loader"></div>;
  }
}
