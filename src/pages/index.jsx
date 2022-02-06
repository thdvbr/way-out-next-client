import React, { useEffect } from 'react';
import { setDefaultBreakpoints, Breakpoint } from 'react-socks';
import { motion, useAnimation } from 'framer-motion';
import _ from 'lodash';
import { useInView } from 'react-intersection-observer';
import { getClient, overlayDrafts } from '../utils/sanity.server';
import {
  indexQuery,
  pageQuery,
  staffQuery,
  bottomAdQuery,
} from '../utils/queries';
import {
  Container,
  HeroPost,
  MasonryGrid,
  Layout,
  BottomAdImage,
} from '../components';
import { useAppContext } from '../context/state';
import { adVariants } from '../utils/animation';

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
  const { ref, inView } = useInView();
  const animation = useAnimation();
  const randomSlice1 = _.sample(bottomAds);

  useEffect(() => {
    setStaffsData(staffs);
    setPagesData(pages);
  }, [staffs, pages, setStaffsData, setPagesData]);

  useEffect(() => {
    console.log('use effect hook, inview', inView);
    if (inView) {
      animation.start('visible');
    }
    if (!inView) {
      animation.start('hidden');
    }
  }, [inView, animation]);

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
                <MasonryGrid data={!query ? allPosts : searchResult} />
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
                <MasonryGrid data={!query ? morePosts : searchResult} />
              </div>
            </Breakpoint>
            <div className="font-title flex justify-center text-24">
              {isLoading && <span>... Loading</span>}
              {errorMsg && <span>{errorMsg}</span>}
            </div>
          </Container>
        </Layout>
        <motion.div
          className="flex justify-center px-3 mb-16 md:px-8 ml:px-14 lg:px-16 "
          ref={ref}
          animate={animation}
          variants={adVariants}
          initial="hidden"
        >
          <BottomAdImage
            image={randomSlice1.adImage}
            url={randomSlice1.adUrl}
          />
        </motion.div>
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
