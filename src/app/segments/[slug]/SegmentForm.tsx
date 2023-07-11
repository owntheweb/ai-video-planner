"use client"
import React, { useContext } from 'react';
import { Segment } from '@/components/data/model/Segment';
import { SegmentContext, SegmentProvider } from './SegmentContext';
import { SegmentActionTypes } from './SegmentReducer';

export interface SegmentFormProps {
  segment: Segment,
}

export default function SegmentForm(props: SegmentFormProps) {
  const { state, dispatch } = useContext(SegmentContext);
  dispatch({
    type: SegmentActionTypes.UpdateSegment,
    payload: props.segment,
  });
  
  return (
    <SegmentProvider>
      { !state.title && <span className="loading loading-spinner text-secondary"></span> }

      { state.title && <>A form will go here for: { state.title }</> }
      
    </SegmentProvider>
  )
}
