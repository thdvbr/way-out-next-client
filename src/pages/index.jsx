import React from 'react';
import Head from 'next/head';
import {
  setDefaultBreakpoints,
  Breakpoint,
  BreakpointProvider,
} from 'react-socks';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { indexQuery } from '../utils/queries';
import {
  Container,
  HeroPost,
  NavbarMobile,
  MasonryGrid,
  Layout,
  NavbarDesktop,
  InfoDrawer,
} from '../components';
import { useAppContext } from '../context/state';

setDefaultBreakpoints([
  { xs: 0 },
  { s: 500 },
  { m: 768 },
  { l: 1366 },
  { xl: 1920 },
]);

export const Index = ({ allPosts, preview }) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const { query, searchResult, isLoading, errorMsg, infoIsOpen } = useAppContext();
  // TODO: search result when theres no result? 
  // needs to wait until searchResult is returned.
  return (
    <>
      <BreakpointProvider>
        <Layout preview={preview}>
          <Head>
            <title>Way Out Mag</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Container>
            <Breakpoint xs only>
              <NavbarMobile />
              <MasonryGrid posts={!query ? allPosts : searchResult} />
            </Breakpoint>
            <Breakpoint s up>
              <NavbarDesktop />
              <InfoDrawer />
              {!query && heroPost && (
                <HeroPost
                  title={heroPost.title}
                  subtitle={heroPost.subtitle}
                  mainImage={heroPost.mainImage}
                  slug={heroPost.slug}
                />
              )}
              <MasonryGrid posts={!query ? morePosts : searchResult} />
            </Breakpoint>
            {isLoading && <span>... Loading</span> }
            {errorMsg && <span>{errorMsg}</span>}
          </Container>
        </Layout>
      </BreakpointProvider>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
  return {
    props: { allPosts, preview },
  };
};

export default Index;
