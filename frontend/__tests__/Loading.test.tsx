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

    // Verifica che il messaggio di caricamento sia visualizzato
    const loadingMessage = screen.getByText(/Caricamento.../i);
    expect(loadingMessage).toBeInTheDocument();

    // Verifica che il testo abbia la classe CSS corretta
    expect(loadingMessage).toHaveClass('text-center text-xl text-blue-600 animate-pulse');
  });
});