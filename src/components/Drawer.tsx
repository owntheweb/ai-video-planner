'use client';
import React from 'react';
import { useEffect } from 'react';

export interface DrawerProps {
  open: boolean;
  onClose(): void;
  children: JSX.Element;
  title?: string;
}

const Drawer = (props: DrawerProps) => {
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
    <>
      {props.open && (
        <>
          <div
            className={`bg-black h-full w-full absolute top-0 left-0 opacity-75`}
            onClick={props.onClose}
            data-testid="drawer-overlay"
          ></div>
          <nav className={`bg-neutral p-6 w-96 h-full absolute top-0 left-0`}>
            {props.title && <h3 className="mt-0">{props.title}</h3>}
            {props.children}
          </nav>
        </>
      )}
    </>
  );
};

export { Drawer };
