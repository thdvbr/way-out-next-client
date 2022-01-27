import React from 'react';
import { motion } from 'framer-motion';
import RelatedItem from './related-item';

const RelatedGrid = ({ posts }) => (
  <motion.div
    initial="initial"
    animate="enter"
    exit="exit"
    variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
    <section className="mt-14 px-1 sm:mx-0 mb-10">
      <h2 className="font-title text-24 sm:text-40 xl:text-55 lg:text-42 text-center mb-6 md:mb-16">
        More to read
      </h2>
      <div className="grid grid-cols-2 grid-rows-2 sm:gap-2 justify-items-center sm:flex sm:justify-between">
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
