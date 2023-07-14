// TODO: 🔥🔥🔥: HOT: Going to replace overkill context here with SWR

import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { get } from '@/components/data/SegmentJsonConnector';
import { Segment } from '@/components/data/model/Segment';
import { SegmentProvider } from './SegmentContext';
import SegmentForm from './SegmentForm';

export interface SegmentByUuidParams {
  uuid: string,
}

export interface SegmentByUuidProps {
  params: SegmentByUuidParams,
}

const newSegment: Segment = {
  title: '',
  actions: [],
}

export default async function SegmentByUuid(props: SegmentByUuidProps) {
  const uuid = props.params.uuid;
  // const segment: Segment = uuid === 'create' ? newSegment : await get(uuid);
  
  return (
    <SegmentProvider>
      <main className="prose max-w-none mx-6">
        <SegmentForm uuid={uuid} />
      </main>
    </SegmentProvider>
  )
}
