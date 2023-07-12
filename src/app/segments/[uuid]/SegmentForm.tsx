"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Segment } from '@/components/data/model/Segment';
import { SegmentContext } from './SegmentContext';
import { SegmentActionTypes } from './SegmentReducer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useDebouncedCallback } from 'use-debounce';

export interface SegmentFormProps {
  uuid?: string,
}

export default function SegmentForm(props: SegmentFormProps) {
  const { state, dispatch } = useContext(SegmentContext);
  const [loading, setLoading] = useState(props.uuid ? true : false); // no need to load if new/empty
  
  // initial load
  useEffect(() => {    
    setLoading(true);
    const getSegment = async (uuid: string) => {
      fetch(`/api/segments/${uuid}`)
      .then(res => res.json())
      .then(data => {
        if (!data.segment.uuid) {
          throw new Error('No segment returned');
        }
        dispatch({
          type: SegmentActionTypes.UpdateSegment,
          payload: data.segment,
        });
        setLoading(false);
      })
      .catch((err :string) => {
        console.log(`API error: ${err}`);
      });
    }

    if (props.uuid && props.uuid !== 'create') {
      getSegment(props.uuid);
    }
  }, []);

  // Save the full segment by either creating a new segment or updating the existing.
  const saveSegment = async (segment: Segment) => {
    if (segment.title === '') {
      return;
    }
    if (segment.uuid === 'create') {
      return;
    }
    
    const uri = segment.uuid ? `/api/segments/${segment.uuid}` : '/api/segments';
    
    const request = {
      method: segment.uuid ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(segment),
    };
    
    fetch(uri, request)
      .then(res => res.json())
      .then(data => {
        console.log('saved', data);
        dispatch({
          type: SegmentActionTypes.UpdateSegment,
          payload: data.segment,
        });
      })
      .catch((err :string) => {
        console.log(`API error: ${err}`);
      });
  }

  const deleteSegment = async () => {
    const request = {
      method: 'DELETE',
    };
    
    fetch(`/api/segments/${state.uuid}`, request)
      .then(() => {
        window.location.href = '/segments';
      })
      .catch((err :string) => {
        console.log(`API error: ${err}`);
      });
  }

  const handleDelete = () => {
    deleteSegment();
  }

  // Don't leave the page if form submit event occurs.
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  // Reduce calls to save data
  const handleDebouncedTitle = useDebouncedCallback(value => {
    saveSegment({
      ...state,
      title: value,
    });
  },
    1000
  );

  const breadcrumbTitle = !state.uuid && props.uuid === 'create'
    ? 'Create New Segment'
    : state.title;
  
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
            placeholder={ loading ? '' : 'What do we call this segment?'}
            className="input input-bordered w-full max-w-xs"
            defaultValue={state.title}
            onChange={e => handleDebouncedTitle(e.target.value)}
          />
        </div>

        <h3>Actions</h3>
        <p>[TODO: Get the fun started here!]</p>

        <button
          onClick={handleDelete}
          className="btn btn-error rounded-btn gap-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Delete Segment
        </button>
      </form>
      
    </>
  )
}
