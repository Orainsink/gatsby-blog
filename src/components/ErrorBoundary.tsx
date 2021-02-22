import React from 'react';
import * as Sentry from '@sentry/react';

interface StateType {
  error: Error;
}
/**
 * ErrorBoundary with Sentry
 * https://zh-hans.reactjs.org/docs/error-boundaries.html
 */
class ErrorBoundary extends React.Component<any, StateType> {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.configureScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);
  }

  render() {
    if (this.state.error) {
      return <h1>Something went wrong!</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
