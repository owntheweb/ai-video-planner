// TODO: Mocking SWR is making my head spin today.
// I'll head up on it and seek professional help. :D

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Segments from './page';
import { SegmentListItem } from '@/app/segments/SegmentList';
import * as SWR from 'swr';

const segmentData: SegmentListItem[] = [
  { title: 'Segment 1', uuid: 'segment-1' },
  { title: 'Segment 2', uuid: 'segment-2' },
  { title: 'Segment 3', uuid: 'segment-3' },
];

describe.skip('Segments', () => {
  test('should render segments and show loading spinner', async () => {});

  test('should filter segments based on search text', async () => {});

  test('should open and close the segment create form', async () => {});

  test('should create a new segment', async () => {});
});
