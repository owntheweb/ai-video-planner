// TODO: support escape key to close

"use client"
import Drawer from 'react-modern-drawer';
// Override Drawer component
// TODO: May be good to seek alternative component with less hard-coded styling?
import './DrawerWrapper.css';
import React, { useState } from 'react';

export interface DrawerWrapperProps {
  open: boolean,
  onClose(): void,
  children: JSX.Element,
  title?: string,
}

const DrawerWrapper = (props: DrawerWrapperProps) => {  
  return (
    <Drawer
        open={props.open}
        onClose={props.onClose}
        direction='left'
        className='bg-neutral p-6 w-64'
        style={
          {
            transitionDuration: '0ms', // no frills for now
            width: 'inherit', // tries to hard set this outside of css :/
          }
        }
        customIdSuffix='d' // getting console id errors when this isn't set
    >
      { props.title && <h3 className="mt-0">{ props.title }</h3> }
      { props.children }
    </Drawer>
  )
}

export { DrawerWrapper };