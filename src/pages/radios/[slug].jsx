/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
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
  PlayButton,
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
  // State to track if player should be visible
  const [showPlayer, setShowPlayer] = useState(false);

  // choose the source of truth
  const radio = preview ? previewData : data.radio;
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback || !radio) {
    return <div>Loading...</div>;
  }
  // Handler for play button - only shows player once
  const handlePlayClick = () => {
    if (!showPlayer) {
      setShowPlayer(true);
    }
  };
  return (
    <ThemeWrapper theme="dark">
      <RadioLayout
        theme="dark"
        preview={preview}
        url={radio.mixcloudUrl}
        showPlayer={showPlayer}
      >
        {width < 1025 ? (
          <MobileRadioView radio={radio} onPlayClick={handlePlayClick} />
        ) : (
          <DesktopRadioView radio={radio} onPlayClick={handlePlayClick} />
        )}
      </RadioLayout>
    </ThemeWrapper>
  );
}

// ===== MOBILE VIEW =====
function MobileRadioView({ radio, onPlayClick }) {
  return (
    <div className="flex flex-col items-center gap-6 px-2 text-center">
      {/* Thumbnail */}
      <section
        className="w-full max-w-xl"
        style={{
          WebkitTransform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <Thumbnail slug="" image={radio.heroImage} width="800" height="800" />
      </section>
      {/* Content */}
      <section className="flex flex-col items-center w-full max-w-md px-12">
        {/* Metadata */}
        <div className="mb-6">
          <div className="my-5 font-agrandir text-13">{radio.episodeLabel}</div>
          <h1 className="text-24 font-title">{radio.title}</h1>
          <h2 className="text-20 font-agrandir">{radio.subtitle}</h2>
        </div>

        {/* Play Button */}
        <button className="px-8 pb-2 mb-5 " onClick={onPlayClick}>
          {' '}
          <PlayButton />
        </button>

        {/* Tags */}
        {radio.tags && (
          <div className="flex justify-center mb-6">
            <Tags tags={radio.tags} />
          </div>
        )}
        {/* Description */}
        <div className="mb-6 text-justify font-secondary text-15">
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
function DesktopRadioView({ radio, onPlayClick }) {
  return (
    <div className="flex flex-row justify-between gap-8 px-3 desktop-radio-content-container ">
      {/* Left: Content */}
      <section className="flex flex-col flex-1 order-1 min-h-0">
        {/* Fixed Metadata */}
        <div className="flex-shrink-0 mb-3">
          <div className="my-3 font-agrandir text-13 xl:text-16">
            {radio.episodeLabel}
          </div>
          <h1 className="leading-tight text-28 font-title xl:text-43">
            {radio.title}
          </h1>
          <h2 className="mb-5 leading-tight text-24 font-agrandir xl:text-33">
            {radio.subtitle}
          </h2>
          {radio.tags && (
            <div className="mb-8">
              <Tags tags={radio.tags} />
            </div>
          )}
          <hr className="border-white" />
        </div>
        {/* Scrollable Container */}
        <div className="flex-1 min-h-0 pt-4 overflow-y-auto">
          {/* Play + Description */}
          <div className="flex gap-6 mb-6">
            <button onClick={onPlayClick}>
              <PlayButton />
            </button>
            <div className="flex-1 leading-6 font-secondary text-15 xl:text-20">
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
      <section className="flex-shrink-0 order-2 w-1/2 overflow-hidden radio-thumbnail-square">
        <div className="mb-32">
          <Thumbnail
            slug=""
            image={radio.heroImage}
            width="1000"
            height="1000"
          />
        </div>
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
