import React from 'react';
import { render, fireEvent, waitFor, findByRole, getByRole } from '@testing-library/react';
import { createSegment } from '../../uiApiLayer/segments';
import { SegmentCreateForm, SegmentCreateFormProps } from './SegmentCreateForm';

jest.mock('../../uiApiLayer/segments');

describe('SegmentCreateForm', () => {
  const onCancelMock = jest.fn();
  const onCreateMock = jest.fn();

  const renderComponent = (props: SegmentCreateFormProps) => {
    return render(
      <SegmentCreateForm onCancel={props.onCancel} onCreate={props.onCreate} formFocused={props.formFocused} />,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should focus on new segment title field when formFocused is true', () => {
    const { getByRole } = renderComponent({
      onCancel: onCancelMock,
      onCreate: onCreateMock,
      formFocused: true,
    });

    const inputElement = getByRole('textbox');

    expect(inputElement).toHaveFocus();
  });

  test('should not focus on new segment title field when formFocused is false', () => {
    const { getByRole } = renderComponent({
      onCancel: onCancelMock,
      onCreate: onCreateMock,
      formFocused: false,
    });

    const inputElement = getByRole('textbox');

    expect(inputElement).not.toHaveFocus();
  });

  test('should call createSegment and reset input value on form submit', async () => {
    const { getByPlaceholderText, getByRole } = renderComponent({
      onCancel: onCancelMock,
      onCreate: onCreateMock,
      formFocused: true,
    });

    const inputElement = getByRole('textbox') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Save' });
    const inputValue = 'New Segment';

    fireEvent.change(inputElement, { target: { value: inputValue } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(inputElement.value).toBe('');
    });

    expect(createSegment).toHaveBeenCalledWith(inputValue);
    expect(onCreateMock).toHaveBeenCalledTimes(1);
  });

  test('should call onCancel on cancel button click', () => {
    const { getByRole } = renderComponent({
      onCancel: onCancelMock,
      onCreate: onCreateMock,
      formFocused: true,
    });

    const cancelButton = getByRole('button', { name: 'Cancel' });

    fireEvent.click(cancelButton);

    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });
});
