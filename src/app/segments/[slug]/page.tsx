import React, { useEffect, useState } from 'react';
import { SegmentList, SegmentListItem } from '@/app/segments/SegmentList';
import Link from "next/link";
import Breadcrumbs from '@/components/Breadcrumbs';
import { get } from '@/components/data/SegmentJsonConnector';

export interface SegmentBySlugParams {
  slug: string,
}

export interface SegmentBySlugProps {
  params: SegmentBySlugParams,
}

export default async function SegmentBySlug(props: SegmentBySlugProps) {
  const slug = props.params.slug;
  const segment = await get(slug);
  
  return (
    <main className="prose max-w-none mx-6">
      <Breadcrumbs breadcrumbs={[
        { uri: '/', title: 'Home' },
        { uri: '/segments', title: 'Segments' },
        { title: segment.title },
      ]} />

      
    </main>
  )
}
