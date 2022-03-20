import React from 'react';
import Link from 'next/link';
import HeroImage from './hero-image';
import HeroSvg from './hero-svg';
import { useAppContext } from '../context/state';

// TODO: Fix sizing on hero svg and image
const HeroPost = ({ mainImage, title, subtitle, slug }) => {
  const { searchIsOpen } = useAppContext();
  return (
    <section>
      <div
        className={`${
          searchIsOpen ? 'border-l-2 border-r-2 border-b-2' : 'border-2'
        } mb-2 flex border-black max-h-full mx-3 mb-5`}>
        <div className="max-h-full w-1/3 relative">
          <div className="z-0">
            <HeroSvg />
          </div>
          <div className="z-10 absolute text-white bottom-0 px-3 pb-4 ml:px-4 ml:pb-5 lg:px-6 lg:pb-7 xl:pb-8  xl:px-9 ">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="underline font-title sm:text-17.25 sm:leading-4 md:text-18.5 ml:text-21 ml:leading-8 lg:text-25 lg:leading-9 xl:text-30 xl:leading-10 ">
                {title}
              </a>
            </Link>
            <div className="linebreak">
              <br />
            </div>
            <hr className="hero-line float-left transform translate-y-3" />
            <span className="font-subtitle sm:text-14 sm:leading-4 md:text-16 ml:text-18 xl:text-24 lg:text-22 lg:leading-6 xl:leading-8">
              &nbsp;&nbsp;&nbsp;
              {subtitle}
            </span>
          </div>
        </div>
        <div className="w-2/3">
          <HeroImage slug={slug} title={title} image={mainImage} />
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
