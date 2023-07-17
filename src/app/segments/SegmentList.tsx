'use client';
import React from 'react';
import Link from 'next/link';

export interface SegmentListProps {
  segments: SegmentListItem[];
}

export interface SegmentListItem {
  title: string;
  uuid: string;
}

const SegmentList = (props: SegmentListProps) => {
  return (
    <>
      {props.segments.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 not-prose">
            {props.segments.map((segment) => (
              <Link
                className="p-4 rounded-lg shadow-lg btn-secondary flex gap-4"
                href={`/segments/${segment.uuid}`}
                key={segment.uuid}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <span>{segment.title}</span>
              </Link>
            ))}
          </div>
          <div className="divider mt-4"></div>
        </>
      )}
    </>
  );
};

export { SegmentList };
