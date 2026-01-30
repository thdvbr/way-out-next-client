import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Layout, MasonryGrid } from '../components';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { radioShowsQuery } from '../utils/queries';
import { useAppContext } from '../context/state';

export const Radio = ({ allShows, preview, bottomAds }) => {
  const router = useRouter();
  const { setErrorMsg } = useAppContext();

  useEffect(() => {
    setErrorMsg('');
  }, [router.asPath]);
  return (
    <>
      <Layout preview={preview} bottomAds={bottomAds}>
        <Container>
          {allShows && <MasonryGrid type="radio" data={allShows} fixedHeight />}
          <div className="h-screen mx-4 mt-4 radio-placeholder font-main text-30" />
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allShows = overlayDrafts(
    await getClient(preview).fetch(radioShowsQuery)
  );
  return {
    props: { allShows, preview },
    revalidate: 10,
  };
};

export default Radio;
