export interface CTErrorBoundaryProps {
  fallbackElement?: (props: {
    error?: Error | null;
    errorInfo?: React.ErrorInfo | null;
    resetError?: () => void;
  }) => React.ReactNode;
  onRefresh?: () => void;
  children?: React.ReactNode;
}

export interface CTErrorBoundaryState {
  error?: Error | null;
  errorInfo: React.ErrorInfo | null;
}
