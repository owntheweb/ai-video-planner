'use client';
import React, { useEffect, useRef } from 'react';
import { createSegment } from '../../uiApiLayer/segments';

export interface SegmentCreateFormProps {
  onCancel(): void;
  onCreate(): void;
  formFocused: boolean;
}

const SegmentCreateForm = (props: SegmentCreateFormProps) => {
  // Focus on new segment title field when create panel opens.
  const newSegmentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.formFocused === true && newSegmentInputRef.current) {
      newSegmentInputRef.current.focus();
    }
  }, [props.formFocused]);

  // Don't leave the page if form submit event occurs.
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newSegmentInputRef.current) {
      await createSegment(newSegmentInputRef.current.value);
      newSegmentInputRef.current.value = '';
    }
    props.onCreate();
  };

  // Cancel segment creation on cancel click.
  const handleNewSegmentCancel = () => {
    if (newSegmentInputRef.current) {
      newSegmentInputRef.current.value = '';
    }
    props.onCancel();
  };

  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Segment Title</span>
        </label>
        <input
          ref={newSegmentInputRef}
          type="text"
          placeholder="Example: Intro"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="flex gap-4 pt-6 justify-end">
        <button className="btn btn-sm btn-primary rounded-btn gap-2" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Save
        </button>
        <button onClick={handleNewSegmentCancel} className="btn btn-sm btn-secondary rounded-btn gap-2" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel
        </button>
      </div>
    </form>
  );
};

export { SegmentCreateForm };
