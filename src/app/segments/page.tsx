'use client';
import React, { useEffect, useState } from 'react';
import { SegmentList, SegmentListItem } from '@/app/segments/SegmentList';
import Breadcrumbs from '@/components/Breadcrumbs';
import useSWR from 'swr';
import { getSegmentList, segmentListEndpoint as segmentListCacheKey } from '../../uiApiLayer/segments';
import { SegmentCreateForm } from './SegmentCreateForm';
import CreateSearchBar from './CreateSearchBar';
import { Drawer } from '@/components/Drawer';

export default function Segments() {
  const {
    data: segments,
    error,
    isLoading,
    mutate,
  } = useSWR(segmentListCacheKey, getSegmentList, {
    onSuccess: (data) => sortSegments(data),
  });

  const sortSegments = (segments: SegmentListItem[]) => {
    return segments.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const [searchText, setSearchText] = useState('');

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  // Open the segment create panel on create button press.
  const handleOpenCreateForm = () => {
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

  // When segments are updated (then reloading), filter those based on current search value
  useEffect(() => {
    if (isLoading === false) {
      setSearchText('');
    }
  }, [segments, isLoading]);

  const filteredSegments =
    searchText && segments
      ? segments.filter((segment) => segment.title.toLowerCase().includes(searchText.toLowerCase()))
      : segments;

  return (
    <main className="prose max-w-none mx-6">
      <Breadcrumbs breadcrumbs={[{ uri: '/', title: 'Home' }, { title: 'Segments' }]} />

      <CreateSearchBar
        onOpenCreateForm={handleOpenCreateForm}
        onSearch={(searchQuery) => setSearchText(searchQuery)}
        searchText={searchText}
        searchEnabled={filteredSegments ? true : false}
      />

      <SegmentList segments={filteredSegments ?? []} />

      <p>
        A segment is a reusable chunk of video that can be strung together with other segments to form a full video
        production. Examples: logo intro, recipe introductions, recipe ingredients list
      </p>

      {!isLoading && (!filteredSegments || filteredSegments.length === 0) && (
        <div className="text-white">No results</div>
      )}

      {isLoading && <span data-testid="loading-spinner" className="loading loading-spinner text-secondary"></span>}

      {error && <div className="text-error">Error: {error.message}</div>}

      <Drawer title="New Segment" open={isDrawerOpen} onClose={toggleDrawer}>
        <SegmentCreateForm
          onCreate={handleNewSegmentSave}
          onCancel={handleNewSegmentCancel}
          formFocused={isDrawerOpen}
        />
      </Drawer>
    </main>
  );
}
