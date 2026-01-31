import React, { useRef, useState, useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import useWindowWidth from '../utils/useWindowWidth';
// import { renderToStaticMarkup } from 'react-dom/server';
// import SubscribeSvg from './subscribe-svg';
// const svgString = encodeURIComponent(renderToStaticMarkup(<SubscribeSvg />));

const Subscribe = ({ preview }) => {
  const width = useWindowWidth();
  const input = useRef(null);
  // response from the mailchimp api
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  }, [message]);

  const subscribe = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: input.current.value,
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

    input.current.value = '';
    setMessage('Got it!');
  };

  // Generate a unique ID for the input so mobile/desktop don't clash
  const inputId = 'subscribe-email';

  return (
    // <div style={{ backgroundImage: `url("data:image/svg+xml,${svgString}")` }}>
    <>
      {/* MOBILE */}
      {width < 500 && (
        <div className="px-3 mt-3 mb-10">
          <form
            style={{ height: '120px' }}
            onSubmit={subscribe}
            className="flex flex-col items-center justify-between px-3 text-center font-agrandir"
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor={inputId} className="flex font-title text-18">
              Join our newsletter
            </label>
            <input
              style={{ width: '80%' }}
              id={inputId}
              name="email"
              ref={input}
              required
              type="email"
              className="subscribe-input font-agrandir"
            />
            {message || (
              <button type="submit" className="flex underline">
                Sign up
              </button>
            )}
          </form>
        </div>
      )}
      {/* DESKTOP */}
      {!preview && width >= 500 && (
        <div className="z-40 join-search-bg">
          <div className="px-3 mx-auto xl:container md:px-8 ml:px-20 lg:px-28">
            <form
              style={{ height: '60px' }}
              onSubmit={subscribe}
              className="flex items-center justify-between px-3 text-center font-title text-15 ml:text-18"
            >
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor={inputId} className="flex w-4/12 mr-auto">
                Join our newsletter
              </label>
              <input
                id={inputId}
                name="email"
                ref={input}
                required
                type="email"
                className="w-6/12 mb-1 subscribe-input font-agrandir"
              />
              <div className="w-3/12">
                {message || (
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
