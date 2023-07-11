"use client"
import React, { useContext, useEffect } from 'react';
import { Segment } from '@/components/data/model/Segment';
import { SegmentContext, SegmentProvider } from './SegmentContext';
import { SegmentActionTypes } from './SegmentReducer';

export interface SegmentFormProps {
  segment: Segment,
}

export default function SegmentForm(props: SegmentFormProps) {
  const { state, dispatch } = useContext(SegmentContext);

  useEffect(() => {
    console.log(props);
    dispatch({
      type: SegmentActionTypes.UpdateSegment,
      payload: props.segment,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  
  return (
    <SegmentProvider>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Segment Name</span>
            <span className="label-text-alt">Example: Introduction</span>
          </label>
          <input
            type="text"
            placeholder="What do we call this segment?"
            className="input input-bordered w-full max-w-xs"
            defaultValue={state.title}
          />
        </div>
      </form>
      
    </SegmentProvider>
  )
}
