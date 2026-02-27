/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import {
  stuffWeLikeQuery,
  pageQuery,
  staffQuery,
  bottomAdQuery,
  sideAdQuery,
} from '../utils/queries';
import {
  Container, MasonryGrid, Layout, PageTransition,
} from '../components';
import { useUIContext } from '../context/ui-context';

export const Opinion = ({ allPosts, preview, bottomAds }) => {
  const router = useRouter();
  const { setErrorMsg } = useUIContext();

  useEffect(() => {
    setErrorMsg('');
  }, [router.asPath]);

  return (
    <>
      <PageTransition>
        <Layout
          preview={preview}
          bottomAds={bottomAds}
          title="Opinions — Way Out Mag">
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

  const pageData = await getClient(preview).fetch(pageQuery);
  const staffData = await getClient(preview).fetch(staffQuery);
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  const sideAds = await getClient(preview).fetch(sideAdQuery);
  return {
    props: {
      allPosts,
      preview,
      pageData,
      staffData,
      bottomAds,
      sideAds,
    },
    revalidate: 10,
  };
};

export default Opinion;
