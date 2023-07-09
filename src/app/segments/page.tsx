import React, { useEffect, useState } from 'react';
import { SegmentList, SegmentListItem } from '@/components/SegmentList';
import Link from "next/link";

export default function Segments() {
  
  return (
    <main className="prose max-w-none mx-6">
      <div className="not-prose text-sm breadcrumbs mb-6">
        <ul>
          <li className=""><Link href="/">Home</Link></li> 
          <li>Segments</li>
        </ul>
      </div>

      <SegmentList />

      <p>A segment is a reusable chunk of video that can be strung together with other segments to form a full video production. Example ideas:</p>

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

      <p>Once a set of segments are created, they can be combined and varied in multiple video productions, keeping video content fresh and unique.</p>
    </main>
  )
}
