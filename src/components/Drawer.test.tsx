import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer, DrawerProps } from './Drawer';

describe('Drawer', () => {
  const mockOnClose = jest.fn();

  const defaultProps: DrawerProps = {
    open: true,
    onClose: mockOnClose,
    children: <form data-testid="form">Drawer Content</form>,
    title: 'Drawer Title',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the drawer with title and content', () => {
    render(<Drawer {...defaultProps} />);

    const drawerTitle = screen.getByRole('heading');
    expect(drawerTitle).toBeInTheDocument();

    const drawerContent = screen.getByTestId('form');
    expect(drawerContent).toBeInTheDocument();
  });

  test('should call onClose when ESC key is pressed', () => {
    render(<Drawer {...defaultProps} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('should not call onClose when another key is pressed', () => {
    render(<Drawer {...defaultProps} />);

    fireEvent.keyDown(document, { key: 'A' });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('should close the drawer when the overlay is clicked', () => {
    render(<Drawer {...defaultProps} />);

    const overlay = screen.getByTestId('drawer-overlay');
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('should not render the drawer when open prop is false', () => {
    render(<Drawer {...defaultProps} open={false} />);

    const drawerTitle = screen.queryByText('Drawer Title');
    const drawerContent = screen.queryByText('Drawer Content');

    expect(drawerTitle).not.toBeInTheDocument();
    expect(drawerContent).not.toBeInTheDocument();
  });
});
