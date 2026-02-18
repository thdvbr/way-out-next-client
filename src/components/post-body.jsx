/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import getYouTubeId from 'get-youtube-id';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import useWindowDimensions from '../utils/useWindowDimensions';
import { urlForImage } from '../utils/sanity';
import { SideAdImage } from './index';

const ListicleItem = ({ value }) => {
  const numberIcon =
    parseInt(value.number) % 2 === 0
      ? '/assets/icons/handdrawn_circle.svg'
      : '/assets/icons/handdrawn_x.svg';

  return (
    <div className="my-12 listicle-item">
      <hr className="mb-2 border-black sm:mb-4" />

      <div className="flex items-center gap-4">
        {/* Number box - own hover state */}
        <div className="relative flex-shrink-0 overflow-visible group sm:p-1">
          <div className="px-1 py-1 bg-darkyellow">
            <span className="font-bold text-22 sm:text-27 lg:text-33 font-title">
              {value.number}
            </span>
          </div>
          <img
            src={numberIcon}
            style={{
              position: 'absolute',
              top: '6px',
              left: '-5px',
              transform: 'scale(1.5)',
              transformOrigin: 'center center',
            }}
            className="absolute opacity-0 pointer-events-none group-hover:opacity-100"
            alt=""
          />
        </div>
        {/* Title - own hover state */}
        <div className="relative flex-1 overflow-visible group">
          <h3 className="flex-1 relative inline-block font-bold leading-tight text-22.5 font-title sm:text-27 lg:text-37">
            <span className="">{value.title}</span>

            <img
              src="/assets/icons/handdrawn_scribble.svg"
              className="absolute inset-0 left-0 w-full opacity-0 pointer-events-none -top-2 group-hover:opacity-100"
              alt=""
            />
          </h3>
        </div>
      </div>

      {value.content && (
        <div>
          <PortableText value={value.content} components={postComponents} />
        </div>
      )}
    </div>
  );
};

const postComponents = {
  block: {
    averiaSerif: ({ children }) => (
      <p className="my-2 block font-main leading-5 text-17 ml:text-20 ml:leading-6 xl:text-26.5 xl:leading-8 pb-4 ml:pb-6">
        {children}
      </p>
    ),
    agrandirNarrow: ({ children }) => (
      <p className="block pb-4 my-2 leading-5 ml:pb-6 font-secondary text-17 ml:text-21 ml:leading-6 xl:text-28 xl:leading-8">
        {children}
      </p>
    ),
    copenhagenGrotesk: ({ children }) => (
      <p className="block pb-4 my-2 leading-none ml:pb-6 font-copenhagen text-11 ">
        {children}
      </p>
    ),
    optiArtCraft: ({ children }) => (
      <p className="block my-2 leading-5 font-title text-17 sm:text-19 ml:text-22 xl:text-29 sm:leading-6 ml:leading-7 xl:leading-9">
        {children}
      </p>
    ),
    // intro font: add drop cap
    optiArtCraftDropCap: ({ children }) => {
      const firstChild = children[0];

      if (typeof firstChild === 'string') {
        const firstLetter = firstChild.charAt(0);
        const restText = firstChild.slice(1);

        return (
          <span className="block my-2 leading-5 drop-cap font-title text-17 sm:text-19 ml:text-22 xl:text-29 sm:leading-6 ml:leading-7 xl:leading-9">
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
          <div className="flex-col pt-2 sm:pt-4">
            <img
              alt={value.alt || ''}
              loading="lazy"
              src={urlForImage(value.asset).url()}
            />
            {value.caption && (
              <>
                <p className="my-1 italic font-secondary text-12 ml:text-16 xl:text-20">
                  {value.caption}
                </p>
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
    listicleItem: ({ value }) => <ListicleItem value={value} />,

    // (
    //   <div className="my-12 listicle-item">
    //     {/* Horizontal line */}
    //     <hr className="mb-4 border-black" />

    //     <div className="flex items-center gap-5">
    //       {/* Number - big yellow box */}
    //       <div className="flex-shrink-0 px-2 py-2 bg-darkyellow">
    //         <span className="font-bold text-22 sm:text-27 lg:text-33 font-title">
    //           {value.number}
    //         </span>
    //       </div>
    //       <h3 className="flex-1 font-bold leading-tight text-22.5 font-title sm:text-27 lg:text-37">
    //         {value.title}
    //       </h3>
    //     </div>
    //     {value.content && (
    //       <div>
    //         <PortableText value={value.content} components={postComponents} />
    //       </div>
    //     )}
    //   </div>
    // ),
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

export default function PostBody({
  body,
  adShortPost = null,
  adLongPost = [],
}) {
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
      {width > 500 && adLongPost.length > 0 && (
        <div className="absolute left-0">
          {/* need to wrap each sticky so it pushes up not overlap */}
          {postHeight > 500
            ? adLongPost.map((ad) => (
                <div key={ad._id} style={{ height: `${postHeight / 2}px` }}>
                  {ad?.adImage && (
                    <SideAdImage image={ad.adImage} url={ad.adUrl} />
                  )}
                </div>
              ))
            : adShortPost?.adImage && (
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
