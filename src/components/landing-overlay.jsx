import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingOverlay = ({ imageSrc }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if overlay was already shown this session
    const hasSeenOverlay = sessionStorage.getItem('hasSeenLandingOverlay');

    if (!hasSeenOverlay) {
      setIsVisible(true);
      sessionStorage.setItem('hasSeenLandingOverlay', 'true');
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }} // Start invisible
          animate={{ opacity: 1 }} // Fade in
          exit={{ opacity: 0 }} // Fade out
          transition={{ duration: 0.8 }} // Slower = smoother
          //   initial={{ opacity: 0, filter: 'blur(10px)' }}
          //   animate={{ opacity: 1, filter: 'blur(0px)' }}
          //   exit={{ opacity: 0 }}
          //   transition={{ duration: 1.2 }}
          className="fixed inset-0 z-50 pointer-events-none">
          <img src={imageSrc} alt="" className="object-cover w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingOverlay;
