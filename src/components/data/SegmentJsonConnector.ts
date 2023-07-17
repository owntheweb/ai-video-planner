// NOTE: Don't ever make a production website with a JSON "database". See /data/README.md.

import { JsonDB, Config } from 'node-json-db';
import { Segment } from './model/Segment';
import { SegmentListItem } from '../../app/segments/SegmentList';
import { v4 as uuidV4 } from 'uuid';

const db = new JsonDB(new Config('data/segments', true, true, '/'));

const emptyResponseSegment: Segment = {
  title: 'Unknown',
  actions: [],
};

// Return all segment titles and uuids.
const list = async (): Promise<SegmentListItem[]> => {
  const segmentData: any = await db.getObjectDefault('/', {}); // TODO: No any!
  const segments: Segment[] = Object.values(segmentData);
  const segmentList: SegmentListItem[] = segments.map((segment) => ({
    title: segment.title,
    uuid: segment.uuid ?? '',
  }));
  return segmentList ?? [];
};

// Get a single segment by uuid
const get = async (uuid: string): Promise<Segment> => {
  return await db.getObjectDefault(`/${uuid}`, emptyResponseSegment);
};

const create = async (segment: Segment): Promise<Segment> => {
  const uuid = uuidV4();

  const newSegment = {
    ...segment,
    uuid,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  };

  try {
    await db.push(`/${uuid}`, newSegment);
  } catch (err) {
    // TODO: Determine better plan for handling errors up the stack here.
    console.log('SegmentJsonConnector delete error', err);
  }

  return newSegment;
};

const update = async (segment: Segment) => {
  const updatedSegment = {
    ...segment,
    updated: new Date().toISOString(),
  };

  try {
    await db.push(`/${segment.uuid}`, updatedSegment);
  } catch (err) {
    // TODO: Determine better plan for handling errors up the stack here.
    console.log('SegmentJsonConnector delete error', err);
  }

  return updatedSegment;
};

// 'delete' would be more CRUD-like, yet delete is reserved word in JavaScript. :)
const remove = async (uuid: string) => {
  try {
    await db.delete(`/${uuid}`);
  } catch (err) {
    // TODO: Determine better plan for handling errors up the stack here.
    console.log('SegmentJsonConnector delete error');
  }
};

export { list, get, create, update, remove };
