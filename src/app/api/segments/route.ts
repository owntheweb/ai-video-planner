import { SegmentListItem } from '@/components/SegmentList';
import { list } from '@/components/data/SegmentJsonConnector';
import { NextRequest, NextResponse } from "next/server";
 
export interface SegmentsResponseData {
  segments?: SegmentListItem[],
  error?: string,
}

// TODO Next.js 13 seems to have a different way to handle API requests/responses. Need to
// dig into how req and res play into this shortly.
export async function GET(req: NextRequest, res: NextResponse<SegmentsResponseData>) {
  try {
    const segmentList:SegmentListItem[] = await list();
    return NextResponse.json(
      {
        segments: segmentList,
      },
      {
        status: 200,
      }
    );
  } catch(err) {
    console.log('segments api error', err);
    return NextResponse.json(
      {
        error: 'An API access error occurred. Tell an adult!',
      },
      {
        status: 500,
      }
    );
  }
}
