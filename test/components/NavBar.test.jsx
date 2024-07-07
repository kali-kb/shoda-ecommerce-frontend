// src/components/NavBar/NavBar.test.jsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '../../src/components/NavBar/NavBar';


describe('NavBar with BagItem', () => {
  it('removes an item from the bag when the remove button is clicked', async () => {
    // Render the NavBar component
    render(<NavBar />);

    // Initial check to ensure the item is rendered
    expect(screen.getByText('Red Running Shoes')).toBeInTheDocument();

    // Find the remove button for the first item and click it
    const removeButtons = screen.getAllByRole('button', { name: /-/i }); // Assuming "-" is part of the button's accessible name
    fireEvent.click(removeButtons[0]);

    // Assert the item is removed by checking it's not in the document
    expect(screen.queryByText('Red Running Shoes')).not.toBeInTheDocument();
  });
});
