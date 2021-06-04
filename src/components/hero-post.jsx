import React from 'react';
import Link from 'next/link';
import MainImage from './main-image';
import HeroSvg from './hero-svg';

const HeroPost = ({ mainImage, title, subtitle, slug }) => (
  <section>
    <div className="mb-8 md:mb-16 flex" style={{ height: '365px'}}>
      <div className="max-h-full">
        <HeroSvg />
      </div>
      <div className="max-h-full">
        <MainImage slug={slug} title={title} image={mainImage} />
      </div>
    </div>
    <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
      <div>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline typo-main-preview-title">{title}</a>
        </Link>
        <p className="typo-main-preview-subtitle">{subtitle}</p>
      </div>
    </div>
  </section>
);

export default HeroPost;
