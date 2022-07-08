/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import {
  interviewsQuery,
} from '../utils/queries';
import { Container, MasonryGrid, Layout } from '../components';

// how to handle page redirect after search?
// should search on interview page only search inside of interviews?

export const Interviews = ({ allPosts, preview }) => {
  return (
    <>
      <Layout preview={preview}>
        <Container>
          {allPosts && <MasonryGrid type="interviews" data={allPosts} />}
        </Container>
      </Layout>
    </>
  );
};

// TODO: Think about what to do with staffs and pages fetching on interviews/ stuff-we-like.

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(
    await getClient(preview).fetch(interviewsQuery)
  );
  return {
    props: { allPosts, preview },
    revalidate : 10
  };
};

export default Interviews;
