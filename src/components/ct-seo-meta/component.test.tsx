import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';

import { CTSeoMeta } from './component';

describe('CTSeoMeta', () => {
  it('sets title and custom description from meta', async () => {
    render(
      <HelmetProvider>
        <CTSeoMeta
          meta={{
            titlePage: 'Users Page',
            descriptionPage: 'Users description',
          }}
        />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe('Users Page');
      expect(
        document.head
          .querySelector('meta[name="description"]')
          ?.getAttribute('content')
      ).toBe('Users description');
    });
  });

  it('uses default description when descriptionPage is missing', async () => {
    render(
      <HelmetProvider>
        <CTSeoMeta meta={{ titlePage: 'Dashboard' }} />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe('Dashboard');
      expect(
        document.head
          .querySelector('meta[name="description"]')
          ?.getAttribute('content')
      ).toBe('Custom Template for React and written with TypeScript.');
    });
  });

  it('handles undefined meta object', async () => {
    render(
      <HelmetProvider>
        <CTSeoMeta />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(
        document.head
          .querySelector('meta[name="description"]')
          ?.getAttribute('content')
      ).toBe('Custom Template for React and written with TypeScript.');
    });
  });
});
