import React from 'react';
import Head from 'next/head';
import { setDefaultBreakpoints, Breakpoint, BreakpointProvider } from 'react-socks';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { indexQuery } from '../utils/queries';
import {
  Container,
  HeroPost,
  Navbar,
  MasonryGrid,
  Layout,
} from '../components';

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
            <Navbar />
            {/* TODO: WHATS THE BREAKPOINT HERE? */}
            <Breakpoint xs only>
              <MasonryGrid posts={allPosts} />
            </Breakpoint>
            <Breakpoint s up>
              {heroPost && (
                <HeroPost
                  title={heroPost.title}
                  subtitle={heroPost.subtitle}
                  mainImage={heroPost.mainImage}
                  slug={heroPost.slug}
                />
              )}
              {morePosts && <MasonryGrid posts={morePosts} />}
            </Breakpoint>
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
