import React from 'react';
import { motion } from 'framer-motion';
import RadioItem from './radio-item';
import Container from './container';

const RadioGrid = ({ data }) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((radio, index) => (
            <div key={radio._id} className="w-full">
              <RadioItem {...radio} priority={index < 4} />
            </div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
};

export default RadioGrid;
