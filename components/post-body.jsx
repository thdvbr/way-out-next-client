import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { sanityConfig } from '../utils/config';

const serializers = {
  types: {
    block(props) {
      switch (props.node.style) {
        case 'h1':
          return <h1>{props.children}</h1>;
        case 'main':
          return (
            <span
              className="typo-post-main tracking-wider">
              <br />
              {props.children}
              <br />
            </span>
          );
        case 'secondary':
          return (
            <span
              className="typo-post-question tracking-wider">
              <br />
              {props.children}
              <br />
            </span>
          );
        case 'intro':
          return (
            <span
              className="typo-post-intro tracking-wider">
              {props.children} 
              <br />
              <br />
              <br />
            </span>
          );
        default:
          return <p>{props.children}</p>;
      }
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
