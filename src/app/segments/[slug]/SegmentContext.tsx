"use client"
import { Segment } from '@/components/data/model/Segment';
import React, { Dispatch, createContext, useReducer } from 'react';
import { SegmentActions, segmentReducer } from './SegmentReducer';

// TODO: Consider adding update methods here, I remember that being great in context (fact check please!)

const emptySegment: Segment = {
  title: '',
  actions: [],
}

const SegmentContext = createContext<{
  state: Segment,
  dispatch: Dispatch<SegmentActions>,
}>({
  state: emptySegment,
  dispatch: () => null
});

// hmm...
type FcProps = {
  children?: React.ReactNode
};

const SegmentProvider: React.FC<FcProps> = ({ children }) => {
  const [state, dispatch] = useReducer(segmentReducer, emptySegment);

  return (
    <SegmentContext.Provider value={{state, dispatch}}>
      {children}
    </SegmentContext.Provider>
  )
}

export { SegmentProvider, SegmentContext, emptySegment };
