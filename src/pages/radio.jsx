import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Layout, MasonryGrid } from '../components';
import RadioItem from '../components/radio-item';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { radioShowsQuery } from '../utils/queries';
import { useAppContext } from '../context/state';

export const Radio = ({ allRadioShows, preview, bottomAds }) => {
  console.log(allRadioShows);
  const router = useRouter();
  const { setErrorMsg } = useAppContext();

  useEffect(() => {
    setErrorMsg('');
  }, [router.asPath]);
  return (
    <>
      <Layout preview={preview} bottomAds={bottomAds}>
        <Container>
          {allRadioShows && (
            <MasonryGrid
              type="radio"
              data={allRadioShows}
              ItemComponent={RadioItem}
            />
          )}
        </Container>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allRadioShows = overlayDrafts(
    await getClient(preview).fetch(radioShowsQuery),
  );
  return {
    props: { allRadioShows, preview },
    revalidate: 10,
  };
};

export default Radio;
