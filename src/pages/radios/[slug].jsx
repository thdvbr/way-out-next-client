import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import useWindowWidth from '../../utils/useWindowWidth';
import {
  RadioLayout,
  ThemeWrapper,
  Footer,
  Thumbnail,
  Tracklist,
  Tags,
} from '../../components';

import { sanityClient, getClient } from '../../utils/sanity.server';
import { radioQuery, radioSlugsQuery } from '../../utils/queries';
import { usePreviewSubscription } from '../../utils/sanity';

// 1. skeleton, layout
// 2. bring the data in
// 3. feed the data in
// 4. state
// 5. desktop / mobile?

function Radio({ data = {}, preview }) {
  const router = useRouter();
  const slug = data?.radio?.slug;
  const { data: previewData } = usePreviewSubscription(radioQuery, {
    params: { slug },
    initialData: data.radio,
    enabled: preview && !!slug,
  });
  const width = useWindowWidth();
  // !!slug === true only if slug exists
  // choose the source of truth
  const radio = preview ? previewData : data.radio;
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <ThemeWrapper theme="dark">
      <RadioLayout theme="dark" preview={preview} url={radio.mixcloudUrl}>
        {width < 768 ? (
          <MobileRadioView radio={radio} />
        ) : (
          <DesktopRadioView radio={radio} />
        )}
      </RadioLayout>
    </ThemeWrapper>
  );
}

// ===== MOBILE VIEW =====
function MobileRadioView({ radio }) {
  return (
    <div className="flex flex-col gap-6 px-2">
      {/* Thumbnail */}
      <section className="w-full">
        <Thumbnail slug="" image={radio.heroImage} />
      </section>
      {/* Content */}
      <section className="flex flex-col">
        {/* Metadata */}
        <div className="mb-6">
          <div className="my-3 font-agrandir text-13">
            Episode {radio.episodeNumber}
          </div>
          <h1 className="leading-tight text-28 font-title">{radio.title}</h1>
          <h2 className="-mt-2 leading-tight text-24 font-agrandir">
            {radio.subtitle}
          </h2>
        </div>

        {/* Play Button */}
        <button className="w-full py-3 mb-6 text-black bg-white">Play</button>

        {/* Tags */}
        {radio.tags && (
          <div className="mb-6">
            <Tags tags={radio.tags} />
          </div>
        )}
        {/* Description */}
        <div className="mb-6 font-secondary text-13">
          <p>{radio.description}</p>
        </div>

        {/* Tracklist */}
        <div>
          {radio.tracklist && <Tracklist tracklist={radio.tracklist} />}
        </div>
      </section>
    </div>
  );
}

// ===== DESKTOP VIEW =====
function DesktopRadioView({ radio }) {
  return (
    <div
      className="flex flex-row h-[400px] gap-8 px-2"
      style={{ height: '470px' }}>
      {/* Left: Content */}
      <section className="flex flex-col flex-1 order-1 min-h-0">
        {/* Fixed Metadata */}
        <div className="flex-shrink-0 mb-4">
          <div className="my-3 font-agrandir text-13">
            {`Episode 
            ${radio.episodeNumber}`}
          </div>
          <h1 className="leading-tight text-28 font-title">{radio.title}</h1>
          <h2 className="mb-4 -mt-2 leading-tight text-24 font-agrandir">
            {radio.subtitle}
          </h2>
          {radio.tags && (
            <div className="mb-4">
              <Tags tags={radio.tags} />
            </div>
          )}
          <hr className="border-white" />
        </div>
        {/* Scrollable Container */}
        <div className="flex-1 min-h-0 pt-4 overflow-y-auto">
          {/* Play + Description */}
          <div className="flex gap-6 mb-6">
            <button className="px-6 py-3 text-black bg-white whitespace-nowrap h-fit">
              Play
            </button>
            <div className="flex-1 font-secondary text-13">
              <p>{radio.description}</p>
            </div>
          </div>

          <hr className="mb-6 border-white" />

          {/* Tracklist */}
          <div>
            {radio.tracklist && <Tracklist tracklist={radio.tracklist} />}
          </div>
        </div>
      </section>

      {/* Right: Thumbnail */}
      <section className="flex-shrink-0 order-2 w-1/2">
        <Thumbnail slug="" image={radio.heroImage} />
      </section>
    </div>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const radio = await getClient(preview).fetch(radioQuery, {
    slug: params.slug,
  });
  if (!radio) {
    return { notFound: true };
  }

  return {
    props: {
      preview,
      data: { radio },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(radioSlugsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
export default Radio;
