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
          <div className="pb-24 mt-1 sm:mt-2 md:mt-3 sm:px-2">
            {/* The footer has transform: translateY(58px) which shifts it down. With fixed bottom-0,
            the footer will sit at the very bottom of the viewport.
            The content behind it will scroll naturally since the main content area is already scrollable.
            However, we should add some bottom padding to the radio page content so the last items aren't hidden behind the sticky footer. */}
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
