import React from 'react';
import Link from 'next/link';
import { renderToStaticMarkup } from 'react-dom/server';
import FooterSvg from './footer-svg';
import useWindowWidth from '../utils/useWindowWidth';

export default function Footer({ theme = 'light', showPlayer = true }) {
  const width = useWindowWidth();
  const isDark = theme === 'dark';
  const svgString = encodeURIComponent(renderToStaticMarkup(<FooterSvg />));
  // Invert text color for dark theme
  const textColor = isDark ? 'text-black' : 'text-white';
  return (
    <footer
      style={{
        transform: showPlayer ? 'translateY(60px)' : '',
        backgroundImage: `url("data:image/svg+xml,${svgString}")`,
        filter: isDark ? 'invert(1)' : 'none',
      }}>
      <nav
        className={`container px-3 py-6 sm:py-2 mx-auto sm:px-14 md:px-36 ml:px-72 lg:px-80 xl:px-96 text-13 sm:text-15 ml:text-16 xl:text-18 font-agrandir ${textColor}`}
        style={isDark ? { filter: 'invert(1)' } : {}}>
        <div className="flex flex-row items-center justify-between">
          <a className="hover:underline" href="mailto:info@wayoutmagazine.com">
            Contact
          </a>
          <a className="hover:underline" href="mailto:info@wayoutmagazine.com">
            Donate
          </a>
          {width > 499 && (
            <Link href="/">
              <div
                className="footer-logo-container"
                style={isDark ? { filter: 'invert(1)' } : {}}
              />
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
