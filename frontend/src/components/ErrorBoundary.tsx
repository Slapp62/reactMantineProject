import React, { Component, ReactNode } from 'react';
import { Alert, Button, Container, Group, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconRefresh } from '@tabler/icons-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error);
      console.error('Error Info:', errorInfo);
    }

    this.setState({
      error,
      errorInfo
    });

    // Here you could also log the error to an error reporting service
    // this.logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Container size="sm" py="xl">
          <Alert
            icon={<IconAlertTriangle size="1.1rem" />}
            title="Something went wrong"
            color="red"
            variant="light"
            mb="md"
          >
            <Text size="sm" mb="md">
              We're sorry, but something unexpected happened. This error has been logged and we'll work to fix it.
            </Text>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '1rem' }}>
                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                  Technical Details (Development Only)
                </summary>
                <pre style={{ 
                  fontSize: '0.8rem', 
                  background: '#f5f5f5', 
                  padding: '1rem', 
                  borderRadius: '4px',
                  overflow: 'auto',
                  maxHeight: '200px'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </Alert>

          <Group justify="center" gap="sm">
            <Button 
              leftSection={<IconRefresh size="1rem" />}
              onClick={this.handleRetry}
              variant="light"
            >
              Try Again
            </Button>
            <Button 
              onClick={this.handleReload}
              color="red"
              variant="outline"
            >
              Reload Page
            </Button>
          </Group>
        </Container>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

// Async error boundary for handling async errors
export class AsyncErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log async errors
    console.error('Async Error Boundary caught an error:', error);
  }

  componentDidMount() {
    // Listen for unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    this.setState({
      hasError: true,
      error: new Error(event.reason || 'Unhandled promise rejection'),
      errorInfo: null
    });

    // Prevent the default browser behavior
    event.preventDefault();
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Alert color="red" title="Network or Processing Error">
          <Text mb="md">
            There was an error processing your request. Please check your internet connection and try again.
          </Text>
          <Button onClick={this.handleRetry} size="sm">
            Retry
          </Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}