/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../src/components/Pagination';

describe('Pagination component', () => {
  const onPageChangeMock = jest.fn();

  it('renders the correct number of buttons when totalPages is less than or equal to 4', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChangeMock} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5); 
  });

  it('renders dots when totalPages is greater than 4 and currentPage is not in the beginning or end', () => {
    render(<Pagination currentPage={4} totalPages={6} onPageChange={onPageChangeMock} />);

    const dots = screen.getAllByText('...');
    expect(dots.length).toBe(1); 
  });

  it('calls onPageChange with the correct page when a page button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />);

    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });
});