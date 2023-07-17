'use client';
import React from 'react';
import { Segment } from '@/components/data/model/Segment';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useDebouncedCallback } from 'use-debounce';
import useSWR from 'swr';
import {
  getSegment,
  getSegmentEndpoint as getSegmentCacheKey,
  updateSegment,
  deleteSegment,
} from '../../../uiApiLayer/segments';

export interface SegmentFormProps {
  uuid: string;
}

export default function SegmentForm(props: SegmentFormProps) {
  const segmentCacheKey = getSegmentCacheKey(props.uuid);
  const {
    data: segment,
    error,
    isLoading,
    mutate,
  } = useSWR([segmentCacheKey, props.uuid], ([url, uuid]) => getSegment(uuid));

  // Save the full segment by either creating a new segment or updating the existing.
  const saveSegment = async (segment: Segment) => {
    if (segment.title === '') {
      return;
    }

    await updateSegment(segment);
    mutate();
    console.log('hey');
  };

  const handleDelete = async () => {
    if (segment?.uuid) {
      await deleteSegment(segment.uuid);

      // TODO: probably a better way:
      window.location.href = '/segments';
    }
  };

  // Don't leave the page if form submit event occurs.
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Reduce calls to save data
  const handleDebouncedTitle = useDebouncedCallback((value) => {
    if (segment) {
      saveSegment({
        ...segment,
        title: value,
      });
    }
  }, 750);

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
            placeholder={isLoading ? '' : 'Example: Intro'}
            className="input input-bordered w-full max-w-xs"
            defaultValue={segment?.title}
            onChange={(e) => handleDebouncedTitle(e.target.value)}
          />
        </div>

        <h3>Actions</h3>
        <p>[TODO: Get the fun started here!]</p>

        <button
          onClick={handleDelete}
          className="btn btn-error rounded-btn gap-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Delete Segment
        </button>
      </form>
    </>
  );
}
