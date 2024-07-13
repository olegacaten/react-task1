import { Component, ErrorInfo, ReactNode } from "react";


interface HasErrorState {
  hasError: boolean;
}


export class ErrorBoundary extends Component<{children: ReactNode; fallback:ReactNode}, HasErrorState> {
  state: HasErrorState = {
    hasError: false
  };

  static getDerivedStateFromError(): HasErrorState {
    return { hasError: true };
  }

componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error: ${error.toString()} \n Component Stack: ${errorInfo.componentStack}`);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
