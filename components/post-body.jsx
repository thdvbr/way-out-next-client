import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { sanityConfig } from '../utils/config';

const { projectId, dataset } = sanityConfig;
export default function PostBody({ body }) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* imageOptions={{w: 320, h: 240, fit: 'max'}}  */}
      <BlockContent blocks={body} projectId={projectId} dataset={dataset} />
    </div>
  );
}
