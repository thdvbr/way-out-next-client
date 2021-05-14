import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { sanityConfig } from '../utils/config';
import { urlForImage } from '../utils/sanity';

const serializers = {
  types: {
    block: ({ node, children }) => {
      switch (node.style) {
        case 'h1':
          return <h1>{children}</h1>;
        case 'main':
          return (
            <span className="typo-post-main tracking-wider">
              <br />
              {children}
              <br />
            </span>
          );
        case 'secondary':
          return (
            <span className="typo-post-question tracking-wider">
              <br />
              {children}
              <br />
            </span>
          );
        case 'intro':
          return (
            <span className="typo-post-intro tracking-wider">
              {children}
              <br />
              <br />
              <br />
            </span>
          );
        default:
          return <p>{children}</p>;
      }
    },
    image: ({ node }) => {
      if (!node || !node.asset || !node.asset._ref) {
        return null;
      }
      return (
        <>
          <img alt="post img" src={urlForImage(node.asset).url()} />
          {node.caption && <p>{node.caption}</p>}
        </>
      );
    },
  },
};
const { projectId, dataset } = sanityConfig;

export default function PostBody({ body }) {
  return (
    <div className="mx-64">
      {/* imageOptions={{w: 320, h: 240, fit: 'max'}}  */}
      <BlockContent
        blocks={body}
        projectId={projectId}
        dataset={dataset}
        serializers={serializers}
      />
    </div>
  );
}
