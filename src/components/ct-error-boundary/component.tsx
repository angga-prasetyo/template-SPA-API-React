import { Component, ErrorInfo } from 'react';

import type { CTErrorBoundaryProps, CTErrorBoundaryState } from './type';

import './style.scss';

const initState = { error: null, errorInfo: null };

export class CTErrorBoundary extends Component<
  CTErrorBoundaryProps,
  CTErrorBoundaryState
> {
  public state: CTErrorBoundaryState = initState;

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.error && this.state.errorInfo) {
      if (this.props.fallbackElement)
        return this.props.fallbackElement({
          error: this.state.error,
          errorInfo: this.state.errorInfo,
          resetError: () => {
            this.setState(initState);
            this.props.onRefresh?.();
          },
        });

      return (
        <div className="ct_error_boundary">
          <h3 className="ct_error_boundary__title">
            {this.state.error && this.state.error.toString()}
          </h3>
          <details className="ct_error_boundary__details">
            <pre className="ct_error_boundary__error-stack">
              {this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
