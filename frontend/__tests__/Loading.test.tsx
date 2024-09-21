/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../src/components/commons/Loading';
import '@testing-library/jest-dom';

describe('Loading component', () => {
  it('renders the loading message', () => {
    render(<Loading />);

    const loadingMessage = screen.getByText(/Caricamento.../i);
    expect(loadingMessage).toBeInTheDocument();

    expect(loadingMessage).toHaveClass('text-center text-xl text-blue-600 animate-pulse');
  });
});