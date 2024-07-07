import React from "react"
import { Provider } from 'react-redux'; 
import {it, expect, describe} from "vitest"
import { render, screen, fireEvent } from '@testing-library/react';
import Nudger from '../../src/components/Nudger/Nudger'
import userEvent from '@testing-library/user-event'; // For simulating user interactions
import configureStore from 'redux-mock-store'; // For creating a mock Redux store
import { initialState } from '../../src/redux/quantityValueChanger'; // Your initial Redux state



const mockStore = configureStore();
const store = mockStore(initialState); // Initialize with your initial state

// Wrap render with a custom provider for the mock store
const renderWithRedux = (ui, { initialState, reducer }) => {
  const store = mockStore(initialState);
  return render(ui, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });
};


describe("Nudger", () => {
	it('should increment a value when clicked on add', async() => {
		renderWithRedux(<Nudger />, { initialState }); // Render with mock store
		const addButton = screen.getByRole('button', { name: /add/i });
	  	const countSpan = screen.getByRole('span');

	  	expect(countSpan.textContent).toBe('0'); // Initial count should be 0

		// Simulate a click on the "add" button
		userEvent.click(addButton);

		// Wait for the store update to propagate (if necessary)
		await waitFor(() => {
		   expect(countSpan.textContent).toBe('1'); // Count should be incremented
		   expect(store.getActions()[0]).toEqual(increment()); // Assert action dispatched
		});
	})
})