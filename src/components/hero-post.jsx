import React from 'react';
import Link from 'next/link';
import HeroImage from './hero-image';
import { useUIContext } from '../context/ui-context';

// TODO: Fix sizing on hero svg and image
const HeroPost = ({ mainImage, title, subtitle, slug }) => {
  const { searchIsOpen } = useUIContext();
  return (
    <section>
      <div
        className={`${
          searchIsOpen ? 'border-l-2 border-r-2 border-b-2' : 'border-2'
        } mb-2 flex flex-row border-black mx-3 mt-3`}>
        <div className="relative w-1/3 overflow-hidden hero-text-wrap-bg">
          <div className="absolute bottom-0 z-10 px-3 pb-4 text-white ml:px-4 ml:pb-5 lg:px-6 lg:pb-7 xl:pb-8 xl:px-9 ">
            <Link
              as={`/posts/${slug}`}
              href="/posts/[slug]"
              className="block underline font-title sm:leading-tight sm:text-20 md:text-22 ml:text-24 lg:text-28 xl:text-30">
              {title}
            </Link>
            <div className="linebreak">
              <br />
            </div>
            <hr className="float-left transform translate-y-3 hero-line" />
            <span className="block font-subtitle sm:text-16 sm:leading-tight md:text-18 ml:text-20 lg:text-22 xl:text-24">
              &nbsp;&nbsp;&nbsp;
              {subtitle}
            </span>
          </div>
        </div>
        <div className="w-2/3 overflow-hidden">
          <HeroImage slug={slug} title={title} image={mainImage} />
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
