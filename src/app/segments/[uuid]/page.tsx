'use client';
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SegmentForm from './SegmentForm';
import useSWR from 'swr';
import {
  deleteSegment,
  getSegment,
  getSegmentEndpoint as getSegmentCacheKey,
  updateSegment,
} from '../../../uiApiLayer/segments';
import { Segment } from '@/components/data/model/Segment';

export interface SegmentByUuidParams {
  uuid: string;
}

export interface SegmentByUuidProps {
  params: SegmentByUuidParams;
}

export default function SegmentByUuid(props: SegmentByUuidProps) {
  const segmentCacheKey = getSegmentCacheKey(props.params.uuid);
  const {
    data: segment,
    error,
    isLoading,
    mutate,
  } = useSWR([segmentCacheKey, props.params.uuid], ([url, uuid]) => getSegment(uuid));

  const handleSave = async (segment: Segment) => {
    if (segment.title === '') {
      return;
    }

    await updateSegment(segment);
    mutate();
  };

  const handleDelete = async () => {
    if (segment?.uuid) {
      await deleteSegment(segment.uuid);

      // TODO: probably a better way:
      window.location.href = '/segments';
    }
  };

  return (
    <main className="prose max-w-none mx-6">
      <Breadcrumbs
        breadcrumbs={[
          { uri: '/', title: 'Home' },
          { uri: '/segments', title: 'Segments' },
          { title: segment?.title ?? '' },
        ]}
      />

      {isLoading && <span className="loading loading-spinner text-secondary"></span>}

      {!isLoading && segment && <SegmentForm segment={segment} onSave={handleSave} onDelete={handleDelete} />}

      {error && <div className="text-error">Error: {error.message}</div>}
    </main>
  );
}
