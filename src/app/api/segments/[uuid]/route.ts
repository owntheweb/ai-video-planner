import { get, remove, update } from '@/components/data/SegmentJsonConnector';
import { NextRequest, NextResponse } from "next/server";
import { Segment } from '@/components/data/model/Segment';
import { validate as validateUuid } from 'uuid';

const validateGetInput = (uuid: string) => {
  if (!uuid || !validateUuid(uuid)) return false;
  
  return true;
}

export interface SegmentGetDeleteParams {
  uuid: string,
}

// Get a single segment
export async function GET(req: NextRequest, context: { params: SegmentGetDeleteParams }) {
  try {
    const { uuid } = context.params;
    if (!validateGetInput(uuid)) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    const segment: Segment = await get(uuid);
    return NextResponse.json(
      { segment },
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

const validatePutInput = (segment: Segment) => {
  if (!segment.title) return false;
  if (!segment.uuid) return false; // needs an existing uuid to proceed
  
  return true;
}

export async function PUT(req: NextRequest) {
  try {
    const segment: Segment = await req.json();
    
    const segmentValid = validatePutInput(segment);
    if (!segmentValid) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    const updatedSegment = await update(segment);

    return NextResponse.json(
      { updatedSegment },
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

// Get a single segment
export async function DELETE(req: NextRequest, context: { params: SegmentGetDeleteParams }) {
  try {
    const { uuid } = context.params;
    if (!validateGetInput(uuid)) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    await remove(uuid);
    return NextResponse.json(
      {},
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