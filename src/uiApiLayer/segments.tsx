import { Segment } from "@/components/data/model/Segment";
import { SegmentListItem } from "../app/segments/SegmentList";


const segmentListEndpoint = '/api/segments';

export interface SegmentListData {
  segments: SegmentListItem[],
}

const getSegmentList = async (): Promise<SegmentListItem[]> => {
  const response = await fetch(segmentListEndpoint);
  const responseJson: SegmentListData = await response.json();
  return responseJson.segments;
}

export interface SegmentData {
  segment: Segment,
}

const createSegment = async (segmentTitle: string): Promise<Segment> => {
  const newSegment: Segment = {
    title: segmentTitle,
    actions: [],
  }
  
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
}

export {
  segmentListEndpoint,
  getSegmentList,
  createSegment,
};
