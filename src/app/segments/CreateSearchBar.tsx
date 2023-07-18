import React from 'react';

export interface CreateSearchBarProps {
  onOpenCreateForm(): void;
  onSearch(value: string): void;
  searchText: string;
  searchEnabled: boolean;
}

export default function CreateSearchBar(props: CreateSearchBarProps) {
  return (
    <div className="not-prose pb-6 flex gap-4">
      <button onClick={props.onOpenCreateForm} className="btn btn-primary rounded-btn gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Create Segment
      </button>

      {props.searchEnabled && (
        <div className="form-control flex-1 invisible sm:visible">
          <input
            type="text"
            placeholder="Search"
            value={props.searchText}
            className="input input-bordered w-100 md:w-auto text-white"
            onChange={(e) => props.onSearch(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
