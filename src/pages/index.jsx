/* eslint-disable no-plusplus */
import React, { useEffect, useMemo } from 'react';
import CookieConsent from 'react-cookie-consent';
import { useRouter } from 'next/router';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import useWindowWidth from '../utils/useWindowWidth';
import { indexQuery } from '../utils/queries';
import interleaveTwoPostsOneRadio from '../utils/interleave';
import {
  Container,
  MasonryGrid,
  Layout,
  PageTransition,
  LandingOverlay,
} from '../components';
import { useAppContext } from '../context/state';

export const Index = ({ allPosts, preview }) => {
  const router = useRouter();
  // only create a new morePosts when allPosts actually changes
  const morePosts = useMemo(() => allPosts.slice(1), [allPosts]);
  const { searchIsOpen, setErrorMsg } = useAppContext();
  const width = useWindowWidth();

  useEffect(() => {
    setErrorMsg('');
  }, [router.asPath]);

  // TODO: search result when theres no result?
  // needs to wait until searchResult is returned.
  return (
    <>
      <LandingOverlay
        imageSrc={
          width > 500
            ? '/assets/background/handdrawn_overlay.png'
            : '/assets/background/handdrawn_overlay_mobile.png'
        }
      />
      <CookieConsent
        acceptOnScroll
        acceptOnScrollPercentage={60}
        disableButtonStyles
        contentStyle={{
          color: 'black',
          fontFamily: 'Averia Serif Light Italic',
        }}
        contentClasses="flex-none"
        containerClasses="flex flex-row"
        buttonText="X"
        buttonStyle={{ color: 'black' }}
        buttonClasses="mr-3"
        style={{
          backgroundImage:
            'url(/assets/background/ylw_bkgd_noise_card_LARGE.jpg)',
          width: '100vw',
          boxShadow: '3px 4px 7px rgba(0, 0, 0, 0.25)',
          textAlign: 'center',
        }}>
        Hey, We use{' '}
        <a href="/legal" className="underline">
          cookies
        </a>{' '}
        !
      </CookieConsent>
      <PageTransition>
        <Layout preview={preview}>
          <Container>
            {/* <div className={`${searchIsOpen && 'sm:mt-8'}`}> */}
            <MasonryGrid
              data={allPosts}
              interleave="true"
              categoryTitle={null}
            />
            {/* </div> */}
          </Container>
        </Layout>
      </PageTransition>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const data = await getClient(preview).fetch(indexQuery);
  const allContent = interleaveTwoPostsOneRadio(overlayDrafts(data));
  return {
    props: {
      allPosts: allContent,
      preview,
    },
    revalidate: 10,
  };
};

export default Index;
