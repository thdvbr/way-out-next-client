import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Layout, RadioGrid, ThemeWrapper } from '../components';
import RadioItem from '../components/radio-item';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { radioShowsQuery } from '../utils/queries';
import { useAppContext } from '../context/state';

export const Radio = ({ allRadioShows, preview, bottomAds }) => {
  const router = useRouter();
  const { setErrorMsg } = useAppContext();

  useEffect(() => {
    setErrorMsg('');
  }, [router.asPath]);
  return (
    <>
      <ThemeWrapper theme="dark">
        <Layout
          preview={preview}
          bottomAds={bottomAds}
          theme="dark"
          page="radiomain">
          <div className="mt-1 sm:mt-2 md:mt-3 sm:px-2">
            <Container>
              {allRadioShows && <RadioGrid data={allRadioShows} />}
            </Container>
          </div>
        </Layout>
      </ThemeWrapper>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allRadioShows = overlayDrafts(
    await getClient(preview).fetch(radioShowsQuery)
  );
  return {
    props: { allRadioShows, preview },
    revalidate: 10,
  };
};

export default Radio;
