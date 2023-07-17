'use client';
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SegmentForm from './SegmentForm';
import useSWR from 'swr';
import { getSegment, getSegmentEndpoint as getSegmentCacheKey } from '../../../uiApiLayer/segments';

export interface SegmentByUuidParams {
  uuid: string;
}

export interface SegmentByUuidProps {
  params: SegmentByUuidParams;
}

export default function SegmentByUuid(props: SegmentByUuidProps) {
  const segmentCacheKey = getSegmentCacheKey(props.params.uuid);
  console.log(segmentCacheKey);
  const {
    data: segment,
    error,
    isLoading,
  } = useSWR([segmentCacheKey, props.params.uuid], ([url, uuid]) => getSegment(uuid));

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

      {!isLoading && <SegmentForm uuid={props.params.uuid} />}

      {error && <div className="text-error">Error: {error.message}</div>}
    </main>
  );
}
