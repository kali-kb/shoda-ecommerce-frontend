import React from "react"
import {it, expect, describe} from "vitest"
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // For simulating user interactions
import ProductCard from '../../src/components/ProductCard/ProductCard'

describe("Product", () => {
	
	it('clicking add-to-bag-btn opens the Dialog component', async() => {
    const { container } = render(<ProductCard title="Nike Air" price={1250} discount={10} />);

    // Find the add-to-bag button (assuming it has a unique ID)
    const addToBagButton = container.querySelector("#add-to-bag-btn");
    const dialog = container.querySelector(".p-dialog"); // Targeting the dialog by class
    expect(dialog).toBeNull(); // Assert dialog is not found

    //simulate click
    const user = userEvent.setup()
    await user.click(addToBagButton)


    expect(dialog).toBeInTheDocument();
	
	})

	it('should not display the discount badge when discount is null', () => {
		render(<ProductCard title="Nike Air" price={1250} discount={null} />)
		const badge = screen.getByTestId("discount-badge")
		expect(badge).not.toBeInTheDocument()
	})
})