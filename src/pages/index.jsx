import React, { useEffect } from 'react';
import { setDefaultBreakpoints, Breakpoint } from 'react-socks';
import { motion } from 'framer-motion';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import { indexQuery, pageQuery, staffQuery, bottomAdQuery } from '../utils/queries';
import { Container, HeroPost, MasonryGrid, Layout } from '../components';
import { useAppContext } from '../context/state';

setDefaultBreakpoints([
  { xs: 0 },
  { s: 500 },
  { m: 768 },
  { l: 1366 },
  { xl: 1536 },
]);

export const Index = ({ allPosts, pages, staffs, preview, bottomAds }) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const {
    query,
    searchResult,
    isLoading,
    errorMsg,
    setStaffsData,
    setPagesData,
  } = useAppContext();

  useEffect(() => {
    setStaffsData(staffs);
    setPagesData(pages);
  }, [staffs, pages, setStaffsData, setPagesData]);

  // TODO: search result when theres no result?
  // needs to wait until searchResult is returned.
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <Layout preview={preview}>
          <Container>
            <Breakpoint customQuery="(max-width: 499px)">
              <div>
                <MasonryGrid data={!query ? allPosts : searchResult} ads={bottomAds} />
              </div>
            </Breakpoint>
            <Breakpoint customQuery="(min-width: 500px)">
              <div>
                {!query && heroPost && (
                  <HeroPost
                    title={heroPost.title}
                    subtitle={heroPost.subtitle}
                    mainImage={heroPost.mainImage}
                    slug={heroPost.slug}
                  />
                )}
                <MasonryGrid data={!query ? morePosts : searchResult} ads={bottomAds} />
              </div>
            </Breakpoint>
            <div className="font-title flex justify-center text-24">
              {isLoading && <span>... Loading</span>}
              {errorMsg && <span>{errorMsg}</span>}
            </div>
          </Container>
        </Layout>
      </motion.div>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
  const pages = await getClient(preview).fetch(pageQuery);
  const staffs = await getClient(preview).fetch(staffQuery);
  const bottomAds = await getClient(preview).fetch(bottomAdQuery);
  return {
    props: { allPosts, pages, staffs, bottomAds, preview },
  };
};

export default Index;
