// NOTE: Don't ever make a production website with a JSON "database". See /data/README.md.

import fs from 'fs';
import { JsonDB, Config } from 'node-json-db';
import slugify from "../utils/Slugify";
import randomString from '../utils/RandomString';
import { Segment } from './model/Segment';
import { SegmentListItem } from '../../app/segments/SegmentList';

const db = new JsonDB(new Config('data/segments', true, true, '/'));

const emptyResponseSegment: Segment = {
  title: 'Unknown',
  actions: [],
}

// Return all segment titles and slugs.
const list = async (): Promise<SegmentListItem[]> => {
  const segmentData: any = await db.getObjectDefault('/', {}); // TODO: No any!
  const segments:Segment[] = Object.values(segmentData);
  const segmentList: SegmentListItem[] = segments.map(segment => ({
    title: segment.title,
    slug: segment.slug ?? '',
  }));
  return segmentList ?? [];
}

// Get a single segment by slug
const get = async (slug: string): Promise<Segment> => {
  return await db.getObjectDefault(`/${slug}`, emptyResponseSegment);
}

const create = async (segment: Segment): Promise<Segment> => {
  const segments:Segment[] = await db.getData("/");
  let slug = slugify(segment.title);

  // prevent data overwrite when duplicate title/slug
  if (segments.filter(seg => seg.slug === slug).length > 0) {
    slug = `${slug}-${randomString(6)}`
  }
  
  const newSegment = {
    ...segment,
    slug,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  };

  await db.push(`/${slug}`, newSegment);

  return newSegment;
}

const update = (segment: Segment) => {
  // not implemented
}

// 'delete' would be more CRUD-like, yet delete is reserved word in JavaScript. :)
const remove = (segment: Segment) => {
  // not implemented
}

export {
  list,
  get,
  create,
}
