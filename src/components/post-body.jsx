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
            <span className="font-main text-23 xl:text-26.5 xl:leading-8 leading-7">
              <br />
              {children}
              <br />
            </span>
          );
        case 'secondary':
          return (
            <span className="font-secondary text-24 xl:text-28 leading-6">
              <br />
              {children}
              <br />
            </span>
          );
        case 'intro':
          return (
            <span className="font-title text-23 xl:leading-9 xl:text-29">
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
        <div className="flex justify-center">
          <div className="flex-col">
            <img alt="post img" src={urlForImage(node.asset).url()} />
            {node.caption && <p className="font-secondary xl:text-16">{node.caption}</p>}
          </div>
        </div>
      );
    },
  },
};
const { projectId, dataset } = sanityConfig;

export default function PostBody({ body }) {
  return (
    <div className="mx-6">
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
