import { PureComponent, ReactNode } from 'react';

interface Props {}
interface State {
  hasError: boolean;
}

export class ErrorButton extends PureComponent<Props, State> {
  constructor(readonly props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidUpdate(): void {
    throw new Error('ups!');
  }

  throwError = () => {
    this.setState({ hasError: true });
  };

  render(): ReactNode {
    return (
      <button type="button" className="btn-large" onClick={this.throwError}>
        big error button
      </button>
    );
  }
}
