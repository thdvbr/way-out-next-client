import React, { useState, useRef, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import _ from 'lodash';
import useWindowDimensions from '../utils/useWindowDimensions';
import { urlForImage } from '../utils/sanity';
import { SideAdImage } from './index';

const postComponents = {
  block: {
    h1: ({ children }) => <h1>{children}</h1>,
    main: ({ children }) => (
      <span className="font-main-bold leading-3 text-17 sm:font-main sm:text-23 xl:text-26.5 xl:leading-8 sm:leading-6 lg:text-20">
        <br />
        {children}
        <br />
      </span>
    ),
    secondary: ({ children }) => (
      <span className="font-secondary text-18 leading-none sm:text-24 xl:text-28 lg:text-21 sm:leading-6">
        {children}
        <br />
        <br />
      </span>
    ),
    copenhagenGrotesk: ({ children }) => (
      <span className="font-copenhagen text-11 leading-none">
        {children}
        <br />
      </span>
    ),
    intro: ({ children }) => (
      <span className="font-title text-17 leading-none sm:text-23 sm:leading-7 xl:leading-9 xl:text-29 lg:text-22 lg:leading-8">
        {children}
        <br />
        <br />
        <br />
      </span>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value || !value.asset || !value.asset._ref) {
        return null;
      }
      return (
        <div className="flex justify-center">
          <div className="flex-col">
            <img alt={value.alt || ''} loading="lazy" src={urlForImage(value.asset).url()} />
            {value.caption && (
              <>
                <p className="font-secondary my-1 text-10 sm:text-16">
                  {value.caption}
                </p>
                <hr className="border-black" />
              </>
            )}
          </div>
        </div>
      );
    },
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    strong: ({ children }) => <strong>{children}</strong>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;
      return (
        <a
          className="underline"
          href={value?.href}
          target={target}
          rel={target === '_blank' && 'noindex nofollow'}>
          {children}
        </a>
      );
    },
  },
};



export default function PostBody({ body, ads }) {
  const randomSlice2 = _.sampleSize(ads, 2);
  const randomSlice1 = _.sample(ads);

  const [postHeight, setPostHeight] = useState(0);
  const { height, width } = useWindowDimensions();
  const bodyRef = useRef();
  const getPostBodyHeight = () => {
    const newHeight = bodyRef.current.clientHeight;
    setPostHeight(newHeight);
  };

  useEffect(() => {
    getPostBodyHeight();
  }, [body, height]);

  return (
    <>
      {(width > 500 && ads) && (
        <div className="absolute left-0">
          {/* need to wrap each sticky so it pushes up not overlap */}
          {postHeight > 500 ? (
            randomSlice2.map((ad) => (
              <div key={ad._id} style={{ height: `${postHeight / 2}px` }}>
                <SideAdImage image={ad.adImage} url={ad.adUrl} />
              </div>
            ))
          ) : (
            <div style={{ height: `${postHeight / 2}px` }}>
              <SideAdImage
                image={randomSlice1.adImage}
                url={randomSlice1.adUrl}
              />
            </div>
          )}
        </div>
      )}

      <div className="mx-3" ref={bodyRef}>
        {/* imageOptions={{w: 320, h: 240, fit: 'max'}}  */}
        <span>{postHeight}</span>
        <PortableText value={body} components={postComponents} />
      </div>
    </>
  );
}
