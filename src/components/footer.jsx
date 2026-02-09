/* eslint import/no-cycle: */
import React from 'react';
import Link from 'next/link';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  FooterSvg,
  FooterSvgDarkMode,
  FooterSvgDarkModeMobile,
  Logo,
} from './index';
import useWindowWidth from '../utils/useWindowWidth';
import { useAppContext } from '../context/state';

export default function Footer({ theme = 'light', showPlayer = true }) {
  const width = useWindowWidth();
  const isDark = theme === 'dark';
  const svgString = encodeURIComponent(renderToStaticMarkup(<FooterSvg />));
  const svgDarkModeString = encodeURIComponent(
    renderToStaticMarkup(<FooterSvgDarkMode />),
  );
  const svgDarkModeMobileString = encodeURIComponent(
    renderToStaticMarkup(<FooterSvgDarkModeMobile />),
  );
  // Invert text color for dark theme
  const textColor = isDark ? 'text-black' : 'text-white';
  const getBackgroundImage = () => {
    if (isDark && width <= 499) {
      return `url("data:image/svg+xml,${svgDarkModeMobileString}")`;
    }
    if (isDark) {
      return `url("data:image/svg+xml,${svgDarkModeString}")`;
    }
    return `url("data:image/svg+xml,${svgString}")`;
  };
  const { setInfoIsOpen, setInfoDrawerSection } = useAppContext();

  return (
    <footer
      style={{
        transform: showPlayer ? 'translateY(60px)' : '',
        backgroundImage: getBackgroundImage(),
        // filter: isDark ? 'invert(1)' : 'none',
      }}
    >
      <nav
        className={`container px-3 py-6 sm:py-2 mx-auto sm:px-14 md:px-36 ml:px-72 lg:px-80 xl:px-96 text-13 sm:text-15 ml:text-16 xl:text-18 font-agrandir ${textColor}`}
      >
        <div className="flex flex-row items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setInfoIsOpen(true);
              setInfoDrawerSection('contact');
            }}
          >
            Contact
          </button>
          <a className="hover:underline" href="mailto:info@wayoutmagazine.com">
            Donate
          </a>
          {width > 499 && (
            <Link href="/">
              <div
                className="footer-logo-container"
                style={isDark ? { filter: 'invert(1)' } : {}}
              >
                {/* <Logo /> */}
              </div>
            </Link>
          )}
          <Link href="/legal" className="hover:underline">
            Legal
          </Link>
          <a className="hover:underline" href="mailto:ads@wayoutmagazine.com">
            Advertise
          </a>
        </div>
      </nav>
    </footer>
  );
}
