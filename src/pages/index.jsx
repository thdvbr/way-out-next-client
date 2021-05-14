import React from 'react';
import Head from 'next/head';
import { Breakpoint, BreakpointProvider } from 'react-socks';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { indexQuery } from '../utils/queries';
import {
  Container,
  HeroPost,
  Toolbar,
  PreviewGrid,
  Layout,
} from '../components';


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
            <Toolbar />
            <Breakpoint customQuery="(max-width: 575px)">
              <PreviewGrid posts={allPosts} />
            </Breakpoint>
            <Breakpoint customQuery="(min-width: 576px)">
              {heroPost && (
                <HeroPost
                  title={heroPost.title}
                  subtitle={heroPost.subtitle}
                  mainImage={heroPost.mainImage}
                  mainCategory={heroPost.mainCategory}
                  slug={heroPost.slug}
                />
              )}
              {morePosts && <PreviewGrid posts={morePosts} />}
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
