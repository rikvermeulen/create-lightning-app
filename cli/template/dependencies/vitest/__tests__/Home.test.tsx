import { render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';

import Page from '../src/app/page';

test('home', () => {
  render(<Page />);
  const main = within(screen.getByRole('main'));
  expect(main.getByRole('heading', { level: 1 })).toBeDefined();
});
