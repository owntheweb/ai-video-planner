import React, { useEffect, useState } from 'react';
import { SegmentList, SegmentListItem } from '@/app/segments/SegmentList';
import Link from "next/link";
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Segments() {
  
  return (
    <main className="prose max-w-none mx-6">
      <Breadcrumbs breadcrumbs={[
        { uri: '/', title: 'Home' },
        { uri: '/segments', title: 'Segments' },
        { title: 'Create' },
      ]} />
      
    </main>
  )
}
