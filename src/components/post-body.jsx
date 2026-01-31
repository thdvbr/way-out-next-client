/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import getYouTubeId from 'get-youtube-id';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import _ from 'lodash';
import useWindowDimensions from '../utils/useWindowDimensions';
import { urlForImage } from '../utils/sanity';
import { SideAdImage } from './index';

const postComponents = {
  block: {
    averiaSerif: ({ children }) => (
      <p className="block font-main leading-5 text-17 ml:text-20 ml:leading-6 xl:text-26.5 xl:leading-8 pb-4 ml:pb-6">
        {children}
      </p>
    ),
    agrandirNarrow: ({ children }) => (
      <p className="block pb-4 leading-5 ml:pb-6 font-secondary text-17 ml:text-21 ml:leading-6 xl:text-28 xl:leading-8">
        {children}
      </p>
    ),
    copenhagenGrotesk: ({ children }) => (
      <p className="block pb-4 leading-none ml:pb-6 font-copenhagen text-11 ">
        {children}
      </p>
    ),
    // intro font: add drop cap
    optiArtCraft: ({ children }) => {
      const firstChild = children[0];

      if (typeof firstChild === 'string') {
        const firstLetter = firstChild.charAt(0);
        const restText = firstChild.slice(1);

        return (
          <span className="block leading-5 drop-cap font-title text-17 sm:text-19 ml:text-22 xl:text-29 sm:leading-6 ml:leading-7 xl:leading-9">
            <br />
            <span className="drop-cap-letter">{firstLetter}</span>
            {restText}
            {children.slice(1)}
          </span>
        );
      }

      return (
        <span className="block leading-5 font-title text-17 sm:text-19 ml:text-22 xl:text-29 sm:leading-6 ml:leading-7 xl:leading-9">
          <br />
          {children}
        </span>
      );
    },

    quote: ({ children }) => (
      <p className="block pb-4 mx-4 my-8 leading-6 ml:my-16 ml:pb-6 font-title text-20 sm:text-24 sm:leading-7 ml:text-30 ml:leading-9 ml:mx-8 xl:leading-tight xl:text-40 xl:mx-16">
        {children}
      </p>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value || !value.asset || !value.asset._ref) {
        return null;
      }
      return (
        <div className="flex justify-center">
          <div className="flex-col pt-4">
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
    youtube: ({ value }) => {
      const { url } = value;
      const id = getYouTubeId(url);
      return <LiteYouTubeEmbed id={id} title="YouTube Embed" />;
    },
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    strong: ({ children }) => (
      <span className="font-extrabold">{children}</span>
    ),
    secondary: ({ children }) => (
      <span className="font-extrabold xl:font-black font-secondary extra-bold text-16 ml:text-20 xl:text-26.5 ">
        {children}
      </span>
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
          rel={target === '_blank' ? 'noindex nofollow' : undefined}>
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

  // mounted flag for client-only rendering
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // calculate postHeight after mount
  useEffect(() => {
    if (!mounted) return;
    const newHeight = bodyRef.current?.clientHeight || 0;
    setPostHeight(newHeight);
  }, [body, height, mounted]);

  if (!mounted) {
    // render only static content on server
    return (
      <div className="mx-3 p-wrap" ref={bodyRef}>
        <PortableText value={body} components={postComponents} />
      </div>
    );
  }

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
