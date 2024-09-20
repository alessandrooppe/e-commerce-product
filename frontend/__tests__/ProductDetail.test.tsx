/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import StarRating from '../src/components/StarRating';
describe('StarRating', () => {
  it('renders the correct number of filled and empty stars', () => {
    render(<StarRating rating={3} />);

    const filledStars = screen.getAllByText('★');
    expect(filledStars.length).toBe(3);

    const emptyStars = screen.getAllByText('☆');
    expect(emptyStars.length).toBe(2);
  });
});