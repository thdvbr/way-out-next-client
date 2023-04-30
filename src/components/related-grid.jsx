import React from 'react';
import { motion } from 'framer-motion';
import RelatedItem from './related-item';

const RelatedGrid = ({ posts }) => (
  <motion.div
    initial="initial"
    animate="enter"
    exit="exit"
    variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
    <section className="mt-14 sm:mx-0">
      <h2 className="font-title text-24 ml:text-40 xl:text-55 text-center mb-10 md:mb-16">
        More to read
      </h2>
      <div className="px-2 grid grid-cols-2 grid-rows-2 sm:grid-cols-4 sm:grid-rows-1 sm:gap-2 ml:gap-4">
        {posts.map((post) => (
          <RelatedItem
            key={post.slug}
            title={post.title}
            subtitle={post.subtitle}
            previewImage={post.previewImage}
            subCategory={post.subCategory}
            slug={post.slug}
          />
        ))}
      </div>
    </section>
  </motion.div>
);

export default RelatedGrid;
