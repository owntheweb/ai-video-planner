import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { get } from '@/components/data/SegmentJsonConnector';
import { Segment } from '@/components/data/model/Segment';
import { SegmentProvider } from './SegmentContext';
import SegmentForm from './SegmentForm';

export interface SegmentBySlugParams {
  slug: string,
}

export interface SegmentBySlugProps {
  params: SegmentBySlugParams,
}

const newSegment: Segment = {
  title: '',
  actions: [],
}

export default async function SegmentBySlug(props: SegmentBySlugProps) {
  const slug = props.params.slug;
  const segment: Segment = slug === 'create' ? newSegment : await get(slug);
  
  return (
    <SegmentProvider>
      <main className="prose max-w-none mx-6">
        <Breadcrumbs breadcrumbs={[
          { uri: '/', title: 'Home' },
          { uri: '/segments', title: 'Segments' },
          { title: segment.title ? segment.title : 'Create' },
        ]} />

        <SegmentForm segment={segment} />
      </main>
    </SegmentProvider>
  )
}
