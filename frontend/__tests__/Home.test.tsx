/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../src/components/Home';
import '@testing-library/jest-dom';

describe('Home component', () => {
  it('renders the welcome message and buttons correctly', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const welcomeMessage = screen.getByText(/Benvenuto nel nostro E-commerce/i);
    expect(welcomeMessage).toBeInTheDocument();

    const productListLink = screen.getByText(/Vai alla Lista dei Prodotti/i);
    expect(productListLink).toBeInTheDocument();
    expect(productListLink.closest('a')).toHaveAttribute('href', '/products');

    const githubLink = screen.getByText(/Visita il repository GitHub/i);
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/alessandrooppe/e-commerce-product/tree/main'
    );
  });
});