import { SegmentListItem } from '@/app/segments/SegmentList';
import { list, create } from '@/components/data/SegmentJsonConnector';
import { NextRequest, NextResponse } from "next/server";
import { Segment } from '@/components/data/model/Segment';

// list without full segment details, just title and uuid
export interface SegmentsResponseData {
  segments?: SegmentListItem[],
  error?: string,
}

// singular segments, full data
export interface SegmentResponseData {
  segment?: Segment,
  error?: string,
}

// TODO Next.js 13 seems to have a different way to handle API requests/responses. Need to
// dig into how req and res play into this shortly.
export async function GET(req: NextRequest, res: NextResponse<SegmentsResponseData>) {
  try {
    const segmentList:SegmentListItem[] = await list();
    return NextResponse.json(
      { segments: segmentList },
      { status: 200 }
    );
  } catch(err) {
    console.log('segments api GET error', err);
    return NextResponse.json(
      { error: 'An API access error occurred. Tell an adult!' },
      { status: 500 }
    );
  }
}

const validatePostInput = (segment: Segment) => {
  if (!segment.title) return false;
  if (segment.uuid) return false; // Don't create a duplicate with POST.
  
  return true;
}

export async function POST(req: NextRequest, res: NextResponse<SegmentResponseData>) {
  try {
    const segment: Segment = await req.json();
    
    const segmentValid = validatePostInput(segment);
    if (!segmentValid) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    const newSegment = await create(segment);

    return NextResponse.json(
      { newSegment },
      { status: 200 }
    );
  } catch(err) {
    console.log('segments api POST error', err);
    return NextResponse.json(
      { error: 'An API access error occurred. Tell an adult!' },
      { status: 500 }
    );
  }
}