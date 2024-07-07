// src/components/ProductForm/ProductForm.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import rootReducer from '../../redux/rootReducer'; // Adjust the import path according to your project structure
import reduxStore from "../../src/redux/store"
import ProductForm from './ProductForm';
import userEvent from '@testing-library/user-event';

// Mock the cloudinaryUploader function
vi.mock('../../../utils', () => ({
  cloudinaryUploader: vi.fn(() => Promise.resolve({ secure_url: 'http://example.com/image.jpg' })),
}));

describe('ProductForm', () => {
  it('renders correctly', () => {
    const store = createStore(reduxStore);
    render(
      <Provider store={store}>
        <ProductForm handleSubmit={() => {}} />
      </Provider>
    );

    expect(screen.getByLabelText(/Product title/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product description/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price\(ETB\)/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Stock Available/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Size/)).toBeInTheDocument();
  });

  it('allows submitting a product with title, price, and stock', async () => {
    const handleSubmit = vi.fn();
    const store = createStore(reduxStore);
    render(
      <Provider store={store}>
        <ProductForm handleSubmit={handleSubmit} />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/Product title/), 'Test Product');
    await userEvent.type(screen.getByLabelText(/Price\(ETB\)/), '100');
    await userEvent.type(screen.getByLabelText(/Stock Available/), '50');
    await userEvent.click(screen.getByText(/Save Product/));

    expect(handleSubmit).toHaveBeenCalled();
  });

  // Add more tests as needed to cover other interactions and edge cases
});