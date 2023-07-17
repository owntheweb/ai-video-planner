'use client';
// TODO: support escape key to close
import { useEffect } from 'react';

import Drawer from 'react-modern-drawer';
// Override Drawer component
// TODO: May be good to seek (or make) alternative component with less hard-coded styling?
import './DrawerWrapper.css';
import React from 'react';

export interface DrawerWrapperProps {
  open: boolean;
  onClose(): void;
  children: JSX.Element;
  title?: string;
}

const DrawerWrapper = (props: DrawerWrapperProps) => {
  // Allow ESC key to signal drawer close
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        props.onClose();
      }
    };
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [props]);

  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      direction="left"
      className="bg-neutral p-6 w-64"
      style={{
        transitionDuration: '0ms', // no frills for now
        width: 'inherit', // tries to hard set this outside of css :/
      }}
      customIdSuffix="d" // getting console id errors when this isn't set
    >
      {props.title && <h3 className="mt-0">{props.title}</h3>}
      {props.children}
    </Drawer>
  );
};

export { DrawerWrapper };
