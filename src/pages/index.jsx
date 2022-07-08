import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { setDefaultBreakpoints, Breakpoint, useCurrentWidth } from 'react-socks';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import {
  indexQuery,
} from '../utils/queries';
import { Container, HeroPost, MasonryGrid, Layout } from '../components';
import { useAppContext } from '../context/state';

setDefaultBreakpoints([
  { xs: 0 },
  { s: 500 },
  { m: 768 },
  { l: 1366 },
  { xl: 1536 },
]);

export const Index = ({ allPosts, preview }) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const { searchIsOpen } = useAppContext();


  // TODO: search result when theres no result?
  // needs to wait until searchResult is returned.
  return (
    <>
      <CookieConsent
        acceptOnScroll={true}
        acceptOnScrollPercentage={60}
        disableButtonStyles={true}
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
          textAlign: 'center'
        }}>
        Hey, We use{' '}
        <a href="/legal" className="underline">
          cookies
        </a> !
      </CookieConsent>
      <Layout preview={preview}>
        <Container>
          <Breakpoint customQuery="(max-width: 499px)">
            <div>
              <MasonryGrid data={allPosts} />
            </div>
          </Breakpoint>
          <Breakpoint customQuery="(min-width: 500px)">
            <div className={`${searchIsOpen && 'sm:mt-8'}`}>
              {heroPost && (
                <HeroPost
                  title={heroPost.title}
                  subtitle={heroPost.subtitle}
                  mainImage={heroPost.mainImage}
                  slug={heroPost.slug}
                />
              )}
              <MasonryGrid data={morePosts} />
            </div>
          </Breakpoint>
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};

export default Index;
