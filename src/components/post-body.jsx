import React, { useState, useRef, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import _ from 'lodash';
import useWindowDimensions from '../utils/useWindowDimensions';
import { urlForImage } from '../utils/sanity';
import { SideAdImage } from './index';

const postComponents = {
  block: {
    averiaSerif: ({ children }) => (
      <span className="block font-main leading-5 text-17 ml:text-20 ml:leading-6 xl:text-26.5 xl:leading-8">
        <br />
        {children}
      </span>
    ),
    agrandirNarrow: ({ children }) => (
      <span className="block leading-5 font-secondary text-17 ml:text-21 ml:leading-6 xl:text-28 xl:leading-8 ">
        <br />
        {children}
      </span>
    ),
    copenhagenGrotesk: ({ children }) => (
      <span className="block leading-none font-copenhagen text-11">
        <br />
        {children}
      </span>
    ),
    optiArtCraft: ({ children }) => (
      <span className="block leading-5 font-title text-17 sm:text-19 ml:text-22 xl:text-29 sm:leading-6 ml:leading-7 xl:leading-9 ">
        <br />
        {children}
      </span>
    ),
    quote: ({ children }) => (
      <span className="block mx-4 leading-6 font-title text-20 sm:text-24 sm:leading-7 ml:text-30 ml:leading-9 ml:mx-8 xl:leading-tight xl:text-40 xl:mx-16">
        <br />
        <br />
        {children}
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
            <br />
            <br />
            <br />
            <img
              alt={value.alt || ''}
              loading="lazy"
              src={urlForImage(value.asset).url()}
            />
            {value.caption && (
              <>
                <p className="my-1 font-secondary text-12 ml:text-16 xl:text-20">
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
    strong: ({ children }) => (
      <span className="font-extrabold">{children}</span>
    ),
    secondary: ({ children }) => (
      <span className="font-extrabold xl:font-black font-secondary extra-bold text-16 ml:text-20 xl:text-26.5 ">{children}</span>
    ),
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

export default function PostBody({ body, adShortPost, adLongPost }) {

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
      {width > 500 && adLongPost && (
        <div className="absolute left-0">
          {/* need to wrap each sticky so it pushes up not overlap */}
          {postHeight > 500 ? (
            adLongPost.map((ad) => (
              <div key={ad._id} style={{ height: `${postHeight / 2}px` }}>
                <SideAdImage image={ad.adImage} url={ad.adUrl} />
              </div>
            ))
          ) : (
            <div style={{ height: `${postHeight / 2}px` }}>
              <SideAdImage
                image={adShortPost.adImage}
                url={adShortPost.adUrl}
              />
            </div>
          )}
        </div>
      )}

      <div className="mx-3 p-wrap" ref={bodyRef}>
        {/* imageOptions={{w: 320, h: 240, fit: 'max'}}  */}
        <PortableText value={body} components={postComponents} />
      </div>
    </>
  );
}
