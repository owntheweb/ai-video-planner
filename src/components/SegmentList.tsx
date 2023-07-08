"use client"
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Link from "next/link";

export interface SegmentListProps {
  segments: SegmentListItem[],
}

export interface SegmentListItem {
  title: string,
  slug: string,
  // TODO: Idea: perhaps a tag to group by hmm...
}

const SegmentList = (props: SegmentListProps) => {

  const [searchText, setSearchText] = useState('');

  // Changes with search, defaults to all
  const [filteredSegments, setFilteredSegments] = useState(props.segments);
  
  const sortSegments = (segments: SegmentListItem[]) => {
    return segments.sort((a, b) => {
      return a.title.localeCompare(b.title)
    });
  }

  const filterSegments = (segments: SegmentListItem[], searchString: string): SegmentListItem[] => {
    return segments.filter(segment => segment.title.toLowerCase().includes(searchString.toLowerCase()));
  }

  // We don't really need debounce for this quick project. However,
  // if we start making dynamic search requests to the server, debounce
  // is very important. :D
  const debouncedSearch = useDebouncedCallback(value => {
      setSearchText(value); // TODO: check: line may not be needed
      setFilteredSegments(filterSegments(props.segments, value));
    },
    350
  );
  
  return (
    <>
      <div className="not-prose pb-6 flex gap-4">
        <Link href="/segments/create/" className="btn btn-primary rounded-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Segment
        </Link>

        { props.segments?.length > 0 &&
          <div className="form-control flex-1">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-100 md:w-auto text-white"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
        }
      </div>
      
      { props.segments?.length > 0 && 
        <>
          <div className="grid grid-cols-3 gap-4 not-prose">
            {sortSegments(filteredSegments).map(segment => 
              <Link className="p-4 rounded-lg shadow-lg btn-secondary" href={`/segments/edit/${segment.slug}`}>{segment.title}</Link>
            )}
          </div>
          <div className="divider mt-6"></div>
        </>
      }
    </>
  )
}

export { SegmentList };