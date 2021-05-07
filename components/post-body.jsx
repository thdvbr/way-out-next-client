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
              style={{
                fontFamily: 'Averia Serif Regular',
                fontSize: '1.2em',
                fontWeight: 500,
                lineHeight: '1.5em',
              }}>
              {props.children}
              <br />
              <br />
            </span>
          );
        case 'secondary':
          return (
            <span
              style={{
                fontFamily: 'Agrandir',
                fontSize: '1.313em',
                fontWeight: 400,
                lineHeight: '1.315em',
              }}>
              {props.children}
              <br />
              <br />
            </span>
          );
        case 'intro':
          return (
            <span
              style={{
                fontFamily: 'OPTIArtCraft',
                fontSize: '1.375em',
                lineHeight: '1.625em',
              }}>
              {props.children} <br />
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
    <div className="max-w-2xl mx-auto">
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
