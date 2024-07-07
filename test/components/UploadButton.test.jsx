// src/components/UploadButton/UploadButton.test.jsx
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadButton from '../../src/components/UploadButton/UploadButton';

// Helper function to render the component with default props
// Allows overriding props for specific tests
const onUpload = () => {
    console.log("executed")
}

const renderUploadButton = (props = {}) => {
  const defaultProps = {
    onUploadEvent: () => {},
  };
  return render(<UploadButton {...defaultProps} {...props} />);
};

describe('UploadButton', () => {
  it('displays the provided imageName when given', () => {
    const testImageName = "Upload Image";
    renderUploadButton({ imageName: testImageName, onUploadEvent:onUpload});
    expect(screen.getByText(testImageName)).toBeInTheDocument();
  });

  it('displays "Choose File" when imageName is not provided', () => {
    renderUploadButton({imageName: null});
    expect(screen.getByText(/Choose File/i)).toBeInTheDocument();
  });

  it('calls onUploadEvent when a file is selected', async () => {
    const mockOnUploadEvent = vi.fn();
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    renderUploadButton({ imageName: "Upload Image", onUploadEvent: mockOnUploadEvent });

    const input = screen.getByLabelText(/Upload Image/i);
    await userEvent.upload(input, file);

    expect(mockOnUploadEvent).toHaveBeenCalledOnce();
    expect(mockOnUploadEvent).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        files: expect.arrayContaining([file]),
      }),
    }));
  });
});