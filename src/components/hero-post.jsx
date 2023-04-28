import React from 'react';
import Link from 'next/link';
import HeroImage from './hero-image';
import { useAppContext } from '../context/state';

// TODO: Fix sizing on hero svg and image
const HeroPost = ({ mainImage, title, subtitle, slug }) => {
  const { searchIsOpen } = useAppContext();
  return (
    <section>
      <div
        className={`${
          searchIsOpen ? 'border-l-2 border-r-2 border-b-2' : 'border-2'
        } mb-2 flex flex-row border-black mx-3 mt-3`}>
        <div className="overflow-hidden hero-text-wrap-bg relative w-1/3">
          <div className="z-10 absolute text-white bottom-0 px-3 pb-4 ml:px-4 ml:pb-5 lg:px-6 lg:pb-7 xl:pb-8  xl:px-9 ">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="underline block font-title sm:text-20 sm:leading-tight md:text-22 ml:text-24 lg:text-28 xl:text-30">
                {title}
              </a>
            </Link>
            <div className="linebreak">
              <br />
            </div>
            <hr className="hero-line float-left transform translate-y-3" />
            <span className="font-subtitle block sm:text-16 sm:leading-tight md:text-18 ml:text-20 lg:text-22 xl:text-24">
              &nbsp;&nbsp;&nbsp;
              {subtitle}
            </span>
          </div>
        </div>
        <div className="overflow-hidden w-2/3">
          <HeroImage slug={slug} title={title} image={mainImage} />
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
