import React from 'react';
import Link from 'next/link';
import { renderToStaticMarkup } from 'react-dom/server';
import FooterSvg from './footer-svg';

export default function Footer() {
  const svgString = encodeURIComponent(renderToStaticMarkup(<FooterSvg />));
  return (
    <footer style={{ transform: 'translateY(60px)' }}>
      <nav
        className="text-white py-2 px-16 sm:px-24 md:px-48 ml:px-64 lg:px-80 xl:px-96 xl:text-18 text-15 ml:text-16 font-secondary"
        style={{
          backgroundImage: `url("data:image/svg+xml,${svgString}")`,
        }}>
        <div className="flex flex-row justify-evenly items-center">

            <a className="hover:underline" href="mailto:info@wayoutmagazine.com">
              Contact
            </a>
            <a className="hover:underline" href="mailto:info@wayoutmagazine.com">
              Donate
            </a>
          <Link href="/">
            <a href="/">
              <div className="footer-logo-container" />
            </a>
          </Link>
          <Link href="/legal">
            <a className="hover:underline" href="/legal">
              Legal
            </a>
          </Link>
          <a className="hover:underline" href="mailto:info@wayoutmagazine.com">Advertise</a>
        </div>
      </nav>
    </footer>
  );
}
