import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateSearchBar, { CreateSearchBarProps } from './CreateSearchBar';

describe('CreateSearchBar', () => {
  const mockOnOpenCreateForm = jest.fn();
  const mockOnSearch = jest.fn();

  const defaultProps: CreateSearchBarProps = {
    onOpenCreateForm: mockOnOpenCreateForm,
    onSearch: mockOnSearch,
    searchText: '',
    searchEnabled: true,
  };

  test('should render the search input when segments are present', () => {
    const segments = [
      { title: 'Segment 1', uuid: '1bf8e20e-1feb-11ee-be56-0242ac120000' },
      { title: 'Segment 2', uuid: '1bf8e20e-1feb-11ee-be56-0242ac120001' },
    ];

    render(<CreateSearchBar {...defaultProps} />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });

  test('should not render the search input when segments are empty (search disabled)', () => {
    render(<CreateSearchBar {...defaultProps} searchEnabled={false} />);

    const searchInput = screen.queryByPlaceholderText(/search/i);
    expect(searchInput).not.toBeInTheDocument();
  });

  test('should call onOpenCreateForm when the create button is clicked', () => {
    render(<CreateSearchBar {...defaultProps} />);

    const createButton = screen.getByRole('button', { name: /create segment/i });
    fireEvent.click(createButton);

    expect(mockOnOpenCreateForm).toHaveBeenCalled();
  });

  test('should call onSearch with the correct value when search input changes', () => {
    const searchText = 'test';

    render(<CreateSearchBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: searchText } });

    expect(mockOnSearch).toHaveBeenCalledWith(searchText);
  });
});
