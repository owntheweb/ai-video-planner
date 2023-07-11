"use client"
import React, { useContext, useEffect } from 'react';
import { Segment } from '@/components/data/model/Segment';
import { SegmentContext } from './SegmentContext';
import { SegmentActionTypes } from './SegmentReducer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useDebouncedCallback } from 'use-debounce';

export interface SegmentFormProps {
  segment: Segment,
}

export default function SegmentForm(props: SegmentFormProps) {
  const { state, dispatch } = useContext(SegmentContext);

  // initial load
  useEffect(() => {
    dispatch({
      type: SegmentActionTypes.UpdateSegment,
      payload: props.segment,
    });
  }, []);

  // Save the full segment by either creating a new segment or updating the existing.
  const saveSegment = async () => {
    const request = {
      method: state.uuid ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    };
    
    await fetch('/api/segments', request)
    .then(res => res.json())
    .then(data => {
      console.log('saved', data);
    })
    .catch((err :string) => {
      console.log(`API error: ${err}`);
    });
  }

  // Save segment when form segment-specifics change
  useEffect(() => {
    // TODO: I feel this needs a few heartfelt 🍅🍅🍅. I only want to trigger a save when not loading (two state changes for that).
    // What's the best pattern for triggering segment saves on specific state changes? Or do I need to save BEFORE state change hmm...
    
    // Segment has loaded and has changed from what was loaded.
    if (state.title !== '' && state.title !== props.segment.title) {
      saveSegment();
    }
  }, [state.title]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const debouncedTitle = useDebouncedCallback(value => {
    // TODO: Sanity check: Should I update state then submit to API, or other way around?
    // I like the idea of updating the sate immediately and having server things run in the background.
    dispatch({
      type: SegmentActionTypes.UpdateSegment,
      payload: {
        ...state,
        title: value,
      }
    });
  },
    1000
  );

  const breadcrumbTitle = state.uuid === 'create'
    ? 'Create New Segment'
    : state.title !== '' // hmm...
      ? state.title
      : props.segment.title; // Loading with hard refresh here, initial title available
  
  return (
    <>
      { 
      /* 
       * Note: I would prefer to have breadcrumbs in page.tsx, yet am struggling
       * a bit with Next.js client vs. server component use (learning every day!).
       * get this to a Next.js guru for tomatoes and discussion.
       **/
      }
      <Breadcrumbs breadcrumbs={[
        { uri: '/', title: 'Home' },
        { uri: '/segments', title: 'Segments' },
        { title: breadcrumbTitle },
      ]} />
      
      <form className="form" onSubmit={handleFormSubmit}>
        <h3>Segment Info</h3>
        
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Segment Title</span>
            <span className="label-text-alt">Example: Introduction</span>
          </label>
          <input
            type="text"
            placeholder="What do we call this segment?"
            className="input input-bordered w-full max-w-xs"
            defaultValue={state.title}
            onChange={(e) => debouncedTitle(e.target.value)}
          />
        </div>

        <h3>Actions</h3>
        <p>TODO: Explain what these are.</p>
      </form>
      
    </>
  )
}
