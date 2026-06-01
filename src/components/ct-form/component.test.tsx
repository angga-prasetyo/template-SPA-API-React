import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const { formSpy } = vi.hoisted(() => ({
  formSpy: vi.fn(),
}));

vi.mock('antd', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Form: ({ className, layout, children, ...rest }: any) => {
    formSpy({ className, layout, ...rest });
    return (
      <form data-class={className} data-layout={layout} data-testid="ct-form">
        {children}
      </form>
    );
  },
}));

vi.mock('./style.scss', () => ({}));

import { CTForm } from './component';

describe('CTForm', () => {
  it('renders with default vertical layout and base class', () => {
    render(
      <CTForm>
        <span>Child</span>
      </CTForm>,
    );

    expect(screen.getByTestId('ct-form')).toHaveAttribute(
      'data-layout',
      'vertical',
    );
    expect(screen.getByTestId('ct-form')).toHaveAttribute(
      'data-class',
      'ct_form',
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('merges custom className and forwards props', () => {
    render(
      <CTForm className="custom-class" layout="horizontal" name="my-form">
        <span>Form body</span>
      </CTForm>,
    );

    expect(formSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'ct_form custom-class',
        layout: 'horizontal',
        name: 'my-form',
      }),
    );
  });
});
