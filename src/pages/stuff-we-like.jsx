import React from 'react';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { stuffWeLikeQuery } from '../utils/queries';
import {
  Container,
  MasonryGrid,
  Layout,
} from '../components';
import { useAppContext } from '../context/state';


export const StuffWeLike = ({ allPosts, preview }) => {
  const { query, searchResult } = useAppContext();
  return (
    <>
      <Layout preview={preview}>
        <Container>
          {allPosts && (
            <MasonryGrid posts={!query ? allPosts : searchResult} />
          )}
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
  };
};

export default StuffWeLike;
