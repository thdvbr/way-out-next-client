/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { stuffWeLikeQuery } from '../utils/queries';
import {
  Container, MasonryGrid, Layout, PageTransition,
} from '../components';
import { useAppContext } from '../context/state';

export const StuffWeLike = ({ allPosts, preview, bottomAds }) => {
  const router = useRouter();
  const { setErrorMsg } = useAppContext();

  useEffect(() => {
    setErrorMsg('');
  }, [router.asPath]);

  return (
    <>
      <PageTransition>
        <Layout preview={preview} bottomAds={bottomAds}>
          <Container>
            {allPosts && (
              <MasonryGrid categoryTitle="stuffWeLike" data={allPosts} />
            )}
          </Container>
        </Layout>
      </PageTransition>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(
    await getClient(preview).fetch(stuffWeLikeQuery),
  );
  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};

export default StuffWeLike;
