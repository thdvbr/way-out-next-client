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
import { useUIContext } from '../context/ui-context';

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
  const { setInfoIsOpen, setInfoDrawerSection } = useUIContext();

  return (
    <footer
      style={{
        transform: showPlayer ? 'translateY(60px)' : '',
        backgroundImage: getBackgroundImage(),
        // filter: isDark ? 'invert(1)' : 'none',
      }}>
      <nav
        className={`container px-3 py-6 sm:py-2 mx-auto sm:px-14 md:px-36 ml:px-72 lg:px-80 xl:px-96 text-13 sm:text-15 ml:text-16 xl:text-18 font-agrandir ${textColor}`}>
        <div className="flex flex-row items-center justify-between">
          <button
            className="hover:underline"
            type="button"
            onClick={() => {
              setInfoIsOpen(true);
              setInfoDrawerSection('contact');
            }}>
            Contact
          </button>
          <a
            href="https://buy.stripe.com/test_cNibJ1dCzfO93BY7WNfAc00 "
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline">
            Donate
          </a>
          <div className="hidden sm:block">
            <Link href="/">
              <div
                className="footer-logo-container"
                style={isDark ? { filter: 'invert(1)' } : {}}>
                {/* <Logo /> */}
              </div>
            </Link>
          </div>
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
