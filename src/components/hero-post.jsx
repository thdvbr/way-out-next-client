import React from 'react';
import Link from 'next/link';
import HeroImage from './hero-image';
import HeroSvg from './hero-svg';

// TODO: Fix sizing on hero svg and image
const HeroPost = ({ mainImage, title, subtitle, slug }) => (
  <section>
    <div className="mb-8 md:mb-6 flex border-2 border-black max-h-full">
      <div className="max-h-full w-1/3 relative">
        <div className="z-0">
          <HeroSvg />
        </div>
        <div className="z-10 absolute text-white bottom-0 pb-8 px-8 ">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="underline font-title text-30 xl:text-40 leading-9 xl:leading-tight ">
              {title}
            </a>
          </Link>
          <br />
          <hr className="hero-line float-left transform translate-y-5" />
          <span className="font-subtitle text-25 leading-7 xl:text-33 xl:leading-tight">
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

export default HeroPost;
