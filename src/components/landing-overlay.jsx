import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useWindowWidth from '../utils/useWindowWidth';
import { useUIContext } from '../context/ui-context';

const OVERLAY_IMAGES = {
  desktop: [
    '/assets/background/overlay_desktop_test.svg',
    '/assets/background/overlay_desktop_test.svg',
    '/assets/background/overlay_desktop_test.svg',
  ],
  mobile: [
    '/assets/background/overlay_mobile_test.svg',
    '/assets/background/overlay_mobile_test.svg',
    '/assets/background/overlay_mobile_test.svg',
  ],
};

const LandingOverlay = () => {
  const width = useWindowWidth();
  const isMobile = width <= 500;
  const [isVisible, setIsVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const { searchIsOpen, infoIsOpen } = useUIContext();

  useEffect(() => {
    if (searchIsOpen || infoIsOpen) {
      setIsVisible(false);
    }
  }, [searchIsOpen, infoIsOpen]);

  useEffect(() => {
    if (!width) return; // wait until width is measured
    const hasSeenOverlay = sessionStorage.getItem('hasSeenLandingOverlay');

    if (!hasSeenOverlay) {
      const images = isMobile ? OVERLAY_IMAGES.mobile : OVERLAY_IMAGES.desktop;
      const randomImage = images[Math.floor(Math.random() * images.length)];

      setImageSrc(randomImage);
      setIsVisible(true);
      sessionStorage.setItem('hasSeenLandingOverlay', 'true');
    }
  }, [width]);

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
      {isVisible && imageSrc && (
        <motion.div
          initial={{ opacity: 0 }} // Start invisible
          animate={{ opacity: 1 }} // Fade in
          // exit={{ opacity: 0 }} // Fade out
          // transition={{ duration: 0.8 }} // Slower = smoother
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 pointer-events-none">
          <img src={imageSrc} alt="" className="object-cover w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingOverlay;
