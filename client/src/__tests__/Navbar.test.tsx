import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', email: 'test@test.com' },
    login: () => {},
    logout: vi.fn(),
  }),
}));

describe('Navbar', () => {
  it('shows books link when logged in', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('My Books').getAttribute('href')).toBe('/books');
  });
});
