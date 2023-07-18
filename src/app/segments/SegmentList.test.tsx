import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentList, SegmentListItem } from './SegmentList';

const realLocation = window.location;

describe('SegmentList', () => {
  const segments: SegmentListItem[] = [
    { title: 'Segment 1', uuid: '1bf8e20e-1feb-11ee-be56-0242ac120000' },
    { title: 'Segment 2', uuid: '1bf8e20e-1feb-11ee-be56-0242ac120001' },
    { title: 'Segment 3', uuid: '1bf8e20e-1feb-11ee-be56-0242ac120002' },
  ];

  test('should render segment list items', () => {
    render(<SegmentList segments={segments} />);

    const segmentListItems = screen.getAllByRole('link');
    expect(segmentListItems).toHaveLength(segments.length);

    segments.forEach((segment, index) => {
      expect(segmentListItems[index]).toHaveAttribute('href', `/segments/${segment.uuid}`);
      expect(segmentListItems[index]).toHaveTextContent(segment.title);
    });
  });

  test('should not render segment list items when segments prop is empty', () => {
    render(<SegmentList segments={[]} />);

    const segmentListItems = screen.queryAllByRole('link');
    expect(segmentListItems).toHaveLength(0);
  });

  // TODO: Check this: I'm testing href value rather than actual click and watching window.location.href
  // I'm seeing a lot of issues online as people try that (including me). Make sure href is correct for now.
  test('should link to the correct segment page', () => {
    render(<SegmentList segments={segments} />);

    const segmentLinks = screen.getAllByRole('link');

    expect(segmentLinks[0].getAttribute('href')).toBe(`/segments/${segments[0].uuid}`);
    expect(segmentLinks[1].getAttribute('href')).toBe(`/segments/${segments[1].uuid}`);
    expect(segmentLinks[2].getAttribute('href')).toBe(`/segments/${segments[2].uuid}`);
  });
});
