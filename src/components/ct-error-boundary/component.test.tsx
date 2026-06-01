import { Component, type ErrorInfo } from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('./style.scss', () => ({}));

import { CTErrorBoundary } from './component';

class ThrowOnRender extends Component<{ shouldThrow?: boolean }> {
  render() {
    if (this.props.shouldThrow) {
      throw new Error('Render failure');
    }
    return <div>Safe content</div>;
  }
}

describe('CTErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when no error occurs', () => {
    render(
      <CTErrorBoundary>
        <ThrowOnRender />
      </CTErrorBoundary>
    );

    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('renders default fallback UI when error happens', () => {
    render(
      <CTErrorBoundary>
        <ThrowOnRender shouldThrow />
      </CTErrorBoundary>
    );

    expect(screen.getByText('Error: Render failure')).toBeInTheDocument();
    expect(screen.getByText(/ThrowOnRender/)).toBeInTheDocument();
  });

  it('renders custom fallback and supports reset callback', () => {
    const onRefresh = vi.fn();

    render(
      <CTErrorBoundary
        onRefresh={onRefresh}
        fallbackElement={({ error, errorInfo, resetError }) => (
          <div>
            <p>{error?.message}</p>
            <p>{Boolean(errorInfo?.componentStack).toString()}</p>
            <button onClick={resetError} type="button">
              Reset
            </button>
          </div>
        )}
      >
        <ThrowOnRender shouldThrow />
      </CTErrorBoundary>
    );

    expect(screen.getByText('Render failure')).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('captures error state through componentDidCatch', () => {
    const instance = new CTErrorBoundary({ children: null });
    const setStateSpy = vi.spyOn(instance, 'setState');
    const error = new Error('manual');
    const errorInfo = { componentStack: 'stack trace' } as ErrorInfo;

    instance.componentDidCatch(error, errorInfo);

    expect(setStateSpy).toHaveBeenCalledWith({ error, errorInfo });
  });
});
