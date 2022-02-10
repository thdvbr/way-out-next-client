/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { stuffWeLikeQuery, bottomAdQuery } from '../utils/queries';
import { Container, MasonryGrid, Layout } from '../components';

export const StuffWeLike = ({ allPosts, preview, bottomAds }) => {
  return (
    <>
      <Layout preview={preview} bottomAds={bottomAds}>
        <Container>
          {allPosts && <MasonryGrid type="stuffWeLike" data={allPosts} />}
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(
    await getClient(preview).fetch(stuffWeLikeQuery),
  );
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  return {
    props: { allPosts, preview, bottomAds },
  };
};

export default StuffWeLike;
