import React from 'react';
import Head from 'next/head';
import Container from '../components/container';
import HeroPost from '../components/hero-post';
import { Toolbar } from '../components/toolbar';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { indexQuery } from '../utils/queries';
import MasonryGrid from '../components/masonry-grid';
import Layout from '../components/layout';

export const Index = ({ allPosts, preview }) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
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
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              subtitle={heroPost.subtitle}
              mainImage={heroPost.mainImage}
              slug={heroPost.slug}
            />
          )}
          {morePosts && <MasonryGrid posts={morePosts} />}
        </Container>
      </Layout>
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
