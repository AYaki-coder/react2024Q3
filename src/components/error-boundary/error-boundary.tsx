import { ErrorInfo, PureComponent, ReactNode } from 'react';
import './error-boundary.css';

interface Props {
  readonly children: ReactNode;
}
interface State {
  hasError: boolean;
}
export class ErrorBoundary extends PureComponent<Props, State> {
  constructor(readonly props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h1>
            Something went wrong.
            <button onClick={() => this.setState({ hasError: false })} className="btn-error">
              {' '}
              {`<= Back`}{' '}
            </button>
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}
