import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Pending } from './Pending';

describe('Pending', () => {
  it('renders the badge with its hint for an unfilled marker', () => {
    render(<Pending>{'[[TODO: number of locations]]'}</Pending>);
    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.getByText('number of locations')).toBeInTheDocument();
  });

  it('passes real content straight through, badge and all removed', () => {
    render(<Pending>250+ locations</Pending>);
    expect(screen.getByText('250+ locations')).toBeInTheDocument();
    expect(screen.queryByText('Todo')).not.toBeInTheDocument();
  });
});
