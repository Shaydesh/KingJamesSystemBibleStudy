import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: "20px",
          margin: "20px",
          border: "1px solid #dc3545",
          borderRadius: "8px",
          backgroundColor: "#f8d7da",
          color: "#721c24",
        }}>
          <h2>Something went wrong</h2>
          <p>An error occurred while displaying this content.</p>
          {this.state.error && (
            <details style={{ marginTop: "10px" }}>
              <summary>Error details</summary>
              <pre style={{
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "4px",
                overflow: "auto",
                fontSize: "12px",
              }}>
                {this.state.error.message}
              </pre>
            </details>
          )}
          <button
            onClick={this.handleReset}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#721c24",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
