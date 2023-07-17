'use client';
import React, { useEffect, useState } from 'react';
import { Segment } from '@/components/data/model/Segment';
import { useDebouncedCallback } from 'use-debounce';

export interface SegmentFormProps {
  segment: Segment;
  onSave(segment: Segment): void;
  onDelete(): void;
}

export default function SegmentForm(props: SegmentFormProps) {
  // Update the title field freely while not bothering the parent with an update that saves (debounce controlled component delays)
  const [pendingTitle, setPendingTitle] = useState(props.segment.title);

  // reduce save data request counts with debounce
  const handleDebouncedTitle = useDebouncedCallback((value: string) => {
    if (props.segment) {
      props.onSave({
        ...props.segment,
        title: value,
      });
    }
  }, 750);

  // Update a workable form value right away for further edits while debouncing value to save
  const handleTitleChange = (value: string) => {
    setPendingTitle(value);
    handleDebouncedTitle(value);
  };

  // Don't leave the page if form submit event occurs.
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="form" onSubmit={handleFormSubmit}>
        <h3>Segment Info</h3>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Segment Title</span>
          </label>
          <input
            type="text"
            placeholder="Example: Intro"
            className="input input-bordered w-full max-w-xs"
            value={pendingTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            autoFocus
          />
        </div>

        <h3>Actions</h3>
        <p>[TODO: Get the fun started here!]</p>

        <button onClick={props.onDelete} className="btn btn-error rounded-btn gap-4">
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
          Delete Segment
        </button>
      </form>
    </>
  );
}
