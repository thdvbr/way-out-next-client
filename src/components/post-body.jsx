import React, { useState, useRef, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import useWindowDimensions from '../utils/useWindowDimensions';
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
            <span className="font-main-bold leading-3 text-17 sm:font-main sm:text-23 xl:text-26.5 xl:leading-8 sm:leading-6 lg:text-20">
              <br />
              {children}
              <br />
            </span>
          );
        case 'secondary':
          return (
            <span className="font-secondary text-18 leading-none sm:text-24 xl:text-28 lg:text-21 sm:leading-6">
              <br />
              {children}
              <br />
            </span>
          );
        case 'intro':
          return (
            <span className="font-title text-17 leading-none sm:text-23 sm:leading-7 xl:leading-9 xl:text-29 lg:text-22 lg:leading-83">
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
            {node.caption && (
              <>
                <p className="font-secondary my-1 text-10 sm:text-16">
                  {node.caption}
                </p>
                <hr className="border-black" />
              </>
            )}
          </div>
        </div>
      );
    },
  },
};
const { projectId, dataset } = sanityConfig;

export default function PostBody({ body }) {

  const [postHeight, setPostHeight] = useState(0);
  const {height} = useWindowDimensions();
  const bodyRef = useRef();
  const getPostBodyHeight = () => {
    const newHeight = bodyRef.current.clientHeight;
    setPostHeight(newHeight);
  }
  useEffect(() => {
    getPostBodyHeight();
  }, [body, height])

  return (
    <>
      <div className="absolute left-0">
        {/* need to wrap each sticky so it pushes up not overlap */}
        <div style={{ height: `${postHeight / 2}px` }}>
          <div className="sticky bg-red-300 h-48 top-1/3">1st ad</div>
          </div>
        { postHeight > 500 && <div style={{ height: `${postHeight / 2}px` }}><div className="sticky bg-blue-300 h-48 top-1/3">2nd ad</div></div>}       
      </div>
      <div className="mx-3" ref={bodyRef}>
        {/* imageOptions={{w: 320, h: 240, fit: 'max'}}  */}
        <span>{postHeight}</span>
        <BlockContent
          blocks={body}
          projectId={projectId}
          dataset={dataset}
          serializers={serializers}
        />
      </div>
    </>
  );
}
