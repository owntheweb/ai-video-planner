"use client"
import React, { useEffect, useState } from 'react';
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

const SegmentList = () => {

  const [searchText, setSearchText] = useState('');
  const [segments, setSegments] = useState<SegmentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Changes with search, defaults to all
  const [filteredSegments, setFilteredSegments] = useState(segments);
  
  const sortSegments = (segments: SegmentListItem[]) => {
    return segments.sort((a, b) => {
      return a.title.localeCompare(b.title)
    });
  }

  const filterSegments = (segments: SegmentListItem[], searchString: string): SegmentListItem[] => {
    return segments.filter(segment => segment.title.toLowerCase().includes(searchString.toLowerCase()));
  }

  // We don't really need debounce for this quick project. However,
  // if we start making dynamic search requests to the server for
  // larger or filtered lists, debounce is very important. :D
  const debouncedSearch = useDebouncedCallback(value => {
      setSearchText(value);
      setFilteredSegments(filterSegments(segments, value));
    },
    350
  );

  useEffect(() => {
    setLoading(true);
    fetch('/api/segments')
      .then(res => res.json())
      .then(data => {
        setSegments(data.segments);
        setFilteredSegments(data.segments);
        setSearchText('');
        setLoading(false);
      })
      .catch((err :string) => {
        setError(`There was an error loading segments. Tell an adult!`);
        console.log(`API error: ${err}`);
        setLoading(false);
      });
  }, []);
  
  return (
    <>
      <div className="not-prose pb-6 flex gap-4">
        <Link href="/segments/create/" className="btn btn-primary rounded-btn gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Segment
        </Link>

        { segments?.length > 0 &&
          <div className="form-control flex-1 invisible sm:visible">
            <input
              type="text"
              placeholder="Search"
              defaultValue={searchText}
              className="input input-bordered w-100 md:w-auto text-white"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
        }
      </div>
      
      { filteredSegments.length > 0 && 
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 not-prose">
            {sortSegments(filteredSegments).map(segment => 
              <Link
                className="p-4 rounded-lg shadow-lg btn-secondary flex gap-4"
                href={`/segments/${segment.slug}`}
                key={segment.slug}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 shrink-0">
                  <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span>{segment.title}</span>
              </Link>
            )}
          </div>
          <div className="divider mt-4"></div>
        </>
      }

      { !loading && filteredSegments.length === 0 && <div className="text-white">
        No results
      </div> }

      { loading && <span className="loading loading-spinner text-secondary"></span> }

      { error && <div className="text-error">
        {error}
      </div> }
    </>
  )
}

export { SegmentList };