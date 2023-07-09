import { SegmentListItem } from '@/components/SegmentList';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

// Thoughts:
// I could just load the segment content server-side if this was a full
// Next.js app. That would have SEO benefits and such. However, often
// I would be loading from a 

const tempSegmentData:SegmentListItem[] = [
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
 
export interface SegmentsResponseData {
  segments?: SegmentListItem[],
  error?: string,
}

const handleGet = (req: NextApiRequest, res: NextApiResponse<SegmentsResponseData>) => {
  res.status(200).json({ segments: tempSegmentData })
}

const handlePost = (req: NextApiRequest, res: NextApiResponse<SegmentsResponseData>) => {
  res.status(200).json({ segments: tempSegmentData })
}

export async function GET(req: NextRequest, res: NextResponse<SegmentsResponseData>) {
  //res.status(200).json({ segments: tempSegmentData })
  return NextResponse.json(
    {
      segments: tempSegmentData
    },
    {
      status: 200,
    }
  );
}

/*
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SegmentsResponseData>
) {
  try {
    console.log('yay');

    // Get list
    if (req.method === 'GET') {
      handleGet(req, res);
      return;
    }

    // Post new
    if (req.method === 'POST') {
      handlePost(req, res);
      return;
    }

    // Otherwise error
    throw new Error(`Invalid request method: ${req.method}`);
  } catch (err) {
    console.log('segments API error', err);
    res.status(500).send({ error: 'failed to fetch data' });
  }
}
*/