/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorLoading from '../src/components/commons/ErrorLoading';
import '@testing-library/jest-dom';

describe('ErrorLoading component', () => {
  it('renders the error message', () => {
    render(<ErrorLoading />);

    // Verifica che il messaggio di errore sia visualizzato
    const errorMessage = screen.getByText(/Errore nel caricamento/i);
    expect(errorMessage).toBeInTheDocument();

    // Verifica che il testo abbia la classe CSS corretta
    expect(errorMessage).toHaveClass('text-center text-xl text-red-600');
  });
});