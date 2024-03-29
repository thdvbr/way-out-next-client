import React from 'react';
import cn from 'classnames';
import Container from './container';

export default function AlertPreview({ preview }) {
  return (
    <div
      className={cn('border-b z-70', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          This page is a preview.
          {' '}
          <a
            href="/api/exit-preview"
            className="underline hover:text-cyan duration-200 transition-colors"
          >
            Click here
          </a>
          {' '}
          to exit preview mode.
        </div>
      </Container>
    </div>
  );
}
