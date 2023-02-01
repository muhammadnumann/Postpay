import React from 'react';
import * as Sentry from '@sentry/browser';

export default class ErrorBoundary extends React.Component {
  componentDidCatch(err: any) {
    console.log(err);
    Sentry.captureException(err);
  }

  render() {
    return this.props.children;
  }
}
