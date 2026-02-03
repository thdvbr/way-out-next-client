import React from 'react';
import { motion } from 'framer-motion';
import RadioItem from './radio-item';

const RadioGrid = ({ data }) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((radio) => (
          <div key={radio._id} className="w-full">
            <RadioItem {...radio} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RadioGrid;
