import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Link from "next/link";
import { SegmentList, SegmentListItem } from '@/components/SegmentList';

export default function Segments() {
  
  // TODO: Start reading from a data source, perhaps locally stored JSON files for demo simplicity
  // TEMP
  const segments: SegmentListItem[] = [
    {
      title: 'Multiverse Storytime Splash Screen',
      slug: 'multiverse-storytime-splash-screen',
    },
    {
      title: 'Storytime Initiation Sequence',
      slug: 'storytime-initiation-sequence',
    },
    {
      title: 'Calm Audience for Storytime Talk',
      slug: 'calm-audience-for-storytime-talk',
    },
    {
      title: 'Read Storybook',
      slug: 'read-storybook',
    },
    {
      title: 'Story Commentary',
      slug: 'story-commentary',
    },
    {
      title: 'Goodbye Message',
      slug: 'goodbye-message',
    },
  ];
  
  return (
    <main className="prose max-w-none mx-6">
      <h1>Segments</h1>

      <SegmentList segments={segments} />

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
