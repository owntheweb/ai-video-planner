import { Segment } from '@/components/data/model/Segment';
import { SegmentListItem } from '../app/segments/SegmentList';

const segmentListEndpoint = '/api/segments';

export interface SegmentListData {
  segments: SegmentListItem[];
}

const getSegmentList = async (): Promise<SegmentListItem[]> => {
  const response = await fetch(segmentListEndpoint);
  const responseJson: SegmentListData = await response.json();
  return responseJson.segments;
};

export interface SegmentData {
  segment: Segment;
}

const createSegment = async (segmentTitle: string): Promise<Segment> => {
  const newSegment: Segment = {
    title: segmentTitle,
    actions: [],
  };

  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newSegment),
  };
  const response = await fetch(segmentListEndpoint, request);
  const responseJson: SegmentData = await response.json();
  return responseJson.segment;
};

const getSegmentEndpoint = (uuid: string): string => {
  return `/api/segments/${uuid}`;
};

const getSegment = async (uuid: string): Promise<Segment> => {
  const response = await fetch(getSegmentEndpoint(uuid));
  const responseJson: SegmentData = await response.json();
  return responseJson.segment;
};

const updateSegment = async (segment: Segment): Promise<Segment> => {
  if (!segment.uuid) {
    throw new Error('Cannot update an existing segment without a valid uuid.');
  }

  const request = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(segment),
  };

  const response = await fetch(getSegmentEndpoint(segment.uuid), request);
  const responseJson: SegmentData = await response.json();
  return responseJson.segment;
};

const deleteSegment = async (uuid: string): Promise<Segment> => {
  const request = {
    method: 'DELETE',
  };

  const response = await fetch(getSegmentEndpoint(uuid), request);
  const responseJson: SegmentData = await response.json();
  return responseJson.segment;
};

export {
  segmentListEndpoint,
  getSegmentList,
  createSegment,
  getSegmentEndpoint,
  getSegment,
  updateSegment,
  deleteSegment,
};
