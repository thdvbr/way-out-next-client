/* eslint-disable */

import React, { useRef, useState, useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
// import { renderToStaticMarkup } from 'react-dom/server';
// import SubscribeSvg from './subscribe-svg';
// const svgString = encodeURIComponent(renderToStaticMarkup(<SubscribeSvg />));

const Subscribe = ({ preview }) => {
  const mobileInput = useRef(null);
  const desktopInput = useRef(null);
  // response from the mailchimp api
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  }, [message]);

  const subscribe = async (e, inputRef) => {
    e.preventDefault();

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputRef.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();

    if (error) {
      // if there was an error, update the message in the state
      setMessage(error);

      return;
    }

    // clear the input value and show a success message.

    inputRef.current.value = '';
    setMessage('Got it!');
  };

  return (
    // <div style={{ backgroundImage: `url("data:image/svg+xml,${svgString}")` }}>
    <>
      {/* MOBILE */}
      <div className="block sm:hidden">
        <div className="px-3 mt-3 mb-10">
          <form
            style={{ height: '120px' }}
            onSubmit={(e) => subscribe(e, mobileInput)}
            className="flex flex-col items-center justify-between px-3 text-center text-black font-agrandir">
            <label htmlFor="email-input" className="flex font-title text-18">
              Join our newsletter
            </label>
            <input
              style={{ width: '80%' }}
              id="email-input"
              name="email"
              ref={mobileInput}
              required
              type="email"
              className="subscribe-input font-agrandir"
            />
            {message ? (
              <div className="font-title text-gold ">{message}</div>
            ) : (
              <button type="submit" className="flex underline font-agrandir">
                Sign up
              </button>
            )}
          </form>
        </div>
      </div>
      {/* DESKTOP */}
      {!preview && (
        <div className="z-40 hidden sm:block join-search-bg">
          <div className="px-3 mx-auto xl:container md:px-8 ml:px-20 lg:px-28">
            <form
              style={{ height: '60px' }}
              onSubmit={(e) => subscribe(e, desktopInput)}
              onClick={() => desktopInput.current?.focus()}
              className="flex items-center justify-between px-3 text-center text-black cursor-text font-title text-15 ml:text-18">
              <label htmlFor="email-input" className="flex w-4/12 mr-auto">
                Join our newsletter
              </label>
              <input
                id="email-input"
                name="email"
                ref={desktopInput}
                required
                type="email"
                className="w-6/12 mb-1 subscribe-input font-agrandir"
              />
              <div className="w-3/12">
                {message ? (
                  <div className="font-title ">{message}</div>
                ) : (
                  <button type="submit" className="flex ml-auto">
                    <BsArrowRight size={32} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Subscribe;
