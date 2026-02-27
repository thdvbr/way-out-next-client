/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import {
  interviewsQuery,
  pageQuery,
  staffQuery,
  bottomAdQuery,
  sideAdQuery,
} from '../utils/queries';
import {
  Container, MasonryGrid, Layout, PageTransition,
} from '../components';
import { useUIContext } from '../context/ui-context';

// how to handle page redirect after search?
// should search on interview page only search inside of interviews?

export const Interview = ({ allPosts, preview }) => {
  const router = useRouter();
  const { setErrorMsg } = useUIContext();
  useEffect(() => {
    setErrorMsg('');
  }, [router.asPath]);
  return (
    <>
      <PageTransition>
        <Layout preview={preview} title="Interview — Way Out Mag">
          <Container>
            {allPosts && (
              <MasonryGrid categoryTitle="Interview" data={allPosts} />
            )}
          </Container>
        </Layout>
      </PageTransition>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(
    await getClient(preview).fetch(interviewsQuery),
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

export default Interview;
