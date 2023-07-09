import React, { useEffect, useState } from 'react';
import { SegmentList, SegmentListItem } from '@/app/segments/SegmentList';
import Link from "next/link";
import Breadcrumbs from '@/components/Breadcrumbs';
import { get } from '@/components/data/SegmentJsonConnector';

export interface SegmentEditParams {
  slug: string,
}

export interface SegmentEditProps {
  params: SegmentEditParams,
}

export default async function SegmentEdit(props: SegmentEditProps) {
  const slug = props.params.slug;
  const segment = await get(slug);
  
  return (
    <main className="prose max-w-none mx-6">
      <Breadcrumbs breadcrumbs={[
        { uri: '/', title: 'Home' },
        { uri: '/segments', title: 'Segments' },
        { uri: `/segments/${segment.slug}`, title: segment.title },
        { title: 'Edit' },
      ]} />

      <p>Edit the segment here.</p>
    </main>
  )
}
