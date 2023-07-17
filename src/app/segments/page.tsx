import React, { useEffect, useState } from 'react';
import { SegmentList, SegmentListItem } from '@/app/segments/SegmentList';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Segments() {
  return (
    <main className="prose max-w-none mx-6">
      <Breadcrumbs breadcrumbs={[{ uri: '/', title: 'Home' }, { title: 'Segments' }]} />

      <SegmentList />

      <p>
        A segment is a reusable chunk of video that can be strung together with other segments to form a full video
        production. Example ideas:
      </p>

      <ul>
        <li>recipe introduction</li>
        <li>logo intro</li>
        <li>recipe background story</li>
        <li>cooking show sponsor</li>
        <li>ingredients</li>
        <li>like and follow social screen</li>
        <li>recipe preparation step</li>
        <li>family side-story about cooking step</li>
        <li>finished meal showcase</li>
        <li>final social and Patreon push</li>
      </ul>

      <p>
        Once a set of segments are created, they can be combined and varied in multiple video productions, keeping video
        content fresh and unique.
      </p>
    </main>
  );
}
