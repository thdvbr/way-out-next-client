import React from 'react';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '../utils/sanity';

const components = {
  block: {
    averiaSerif: ({ children }) => (
      <span className="block font-main leading-3 text-17 sm:font-main sm:text-23 xl:text-26.5 xl:leading-8 sm:leading-6 lg:text-20">
        <br />
        {children}
        <br />
      </span>
    ),
    agrandirNarrow: ({ children }) => (
      <span className="block font-secondary text-18 leading-tight">
        {children}
        <br />
      </span>
    ),
    copenhagenGrotesk: ({ children }) => (
      <span className="block font-copenhagen text-11 leading-none">
        {children}
        <br />
      </span>
    ),
    optiArtCraft: ({ children }) => (
      <span className="block font-title text-17 leading-none sm:text-23 sm:leading-7 xl:leading-9 xl:text-29 lg:text-22 lg:leading-83">
        <br />
        {children}
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

export default function Content({ body }) {
  return (
    <div>
      <PortableText value={body} components={components} />
    </div>
  );
}
