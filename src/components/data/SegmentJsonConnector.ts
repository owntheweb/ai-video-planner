// NOTE: Don't ever make a production website with a JSON "database". See /data/README.md.

import fs from 'fs';
import { JsonDB, Config } from 'node-json-db';
import slugify from "../utils/Slugify";
import randomString from '../utils/RandomString';
import { Segment } from './model/Segment';
import { SegmentListItem } from '../SegmentList';

const db = new JsonDB(new Config('data/segments', true, true, '/'));

/*
// TEMP: I populated the JSON data here to figure out how the schema looked fast.
const makeTestData = async () => {
  const startingData: SegmentListItem[] = [
    {
      "title": "Multiverse Storytime Splash Screen",
      "slug": "multiverse-storytime-splash-screen"
    },
    {
      "title": "Storytime Initiation Sequence",
      "slug": "storytime-initiation-sequence"
    },
    {
      "title": "Calm Audience for Storytime Talk",
      "slug": "calm-audience-for-storytime-talk"
    },
    {
      "title": "Read Storybook",
      "slug": "read-storybook"
    },
    {
      "title": "Story Commentary",
      "slug": "story-commentary"
    },
    {
      "title": "Goodbye Message",
      "slug": "goodbye-message"
    }
  ];
  
  for (const segment of startingData) {
    await db.push(`/${segment.slug}`, {
      title: segment.title,
      slug: segment.slug,
    });
  }
}
*/

// Return all segment titles and slugs.
const list = async (): Promise<SegmentListItem[]> => {
  const segmentData: any = await db.getData("/"); // TODO: No any!
  const segments:Segment[] = Object.values(segmentData);
  const segmentList: SegmentListItem[] = segments.map(segment => ({
    title: segment.title,
    slug: segment.slug ?? '',
  }));
  return segmentList ?? [];
}

// TODO: This will currently overwrite existing content by slug. Need to check existing and alter slug or reject.
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
  create,
}
