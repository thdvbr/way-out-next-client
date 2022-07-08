/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import {
  stuffWeLikeQuery,
} from '../utils/queries';
import { Container, MasonryGrid, Layout } from '../components';

export const StuffWeLike = ({
  allPosts,
  preview,
  bottomAds,
}) => {
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
    await getClient(preview).fetch(stuffWeLikeQuery)
  );
  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};

export default StuffWeLike;
