'use client';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import useSWR from 'swr';
import {
  getSegmentList,
  segmentListEndpoint as segmentListCacheKey,
} from '../../uiApiLayer/segments';
import { DrawerWrapper } from '@/components/DrawerWrapper/DrawerWrapper';
import { SegmentCreateForm } from './SegmentCreateForm';

export interface SegmentListProps {
  segments: SegmentListItem[];
}

export interface SegmentListItem {
  title: string;
  uuid: string;
}

const SegmentList = () => {
  const {
    data: segments,
    error,
    isLoading,
    mutate,
  } = useSWR(segmentListCacheKey, getSegmentList, {
    onSuccess: (data) => sortSegments(data),
  });

  const [searchText, setSearchText] = useState('');

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const sortSegments = (segments: SegmentListItem[]) => {
    return segments.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  };

  // Open the segment create panel on create button press.
  const handleCreate = () => {
    toggleDrawer();
  };

  // Cancel segment creation on cancel click.
  const handleNewSegmentCancel = () => {
    toggleDrawer();
  };

  // Create a new segment on save button / enter
  const handleNewSegmentSave = async () => {
    mutate(); // revalidate list data
    toggleDrawer();
  };

  const debouncedSearch = useDebouncedCallback((value) => {
    setSearchText(value);
  }, 350);

  const filteredSegments =
    searchText && segments
      ? segments.filter((segment) =>
          segment.title.toLowerCase().includes(searchText.toLowerCase()),
        )
      : segments;

  // When segments are updated, filter those based on current search value
  useEffect(() => {
    if (isLoading === false) {
      setSearchText('');
    }
  }, [segments, isLoading]);

  return (
    <>
      <DrawerWrapper
        title="New Segment"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <SegmentCreateForm
          onCreate={handleNewSegmentSave}
          onCancel={handleNewSegmentCancel}
          formFocused={isDrawerOpen}
        />
      </DrawerWrapper>

      <div className="not-prose pb-6 flex gap-4">
        <button
          onClick={handleCreate}
          className="btn btn-primary rounded-btn gap-4"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create Segment
        </button>

        {segments && segments?.length > 0 && (
          <div className="form-control flex-1 invisible sm:visible">
            <input
              type="text"
              placeholder="Search"
              defaultValue={searchText}
              className="input input-bordered w-100 md:w-auto text-white"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      {filteredSegments && filteredSegments.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 not-prose">
            {filteredSegments.map((segment) => (
              <Link
                className="p-4 rounded-lg shadow-lg btn-secondary flex gap-4"
                href={`/segments/${segment.uuid}`}
                key={segment.uuid}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <span>{segment.title}</span>
              </Link>
            ))}
          </div>
          <div className="divider mt-4"></div>
        </>
      )}

      {!isLoading && (!filteredSegments || filteredSegments.length === 0) && (
        <div className="text-white">No results</div>
      )}

      {isLoading && (
        <span className="loading loading-spinner text-secondary"></span>
      )}

      {error && <div className="text-error">Error: {error.message}</div>}
    </>
  );
};

export { SegmentList };
