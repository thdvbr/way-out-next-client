import React, { useRef, useState, useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useCurrentWidth, Breakpoint } from 'react-socks';
// import { renderToStaticMarkup } from 'react-dom/server';
// import SubscribeSvg from './subscribe-svg';
// const svgString = encodeURIComponent(renderToStaticMarkup(<SubscribeSvg />));

const Subscribe = ({preview}) => {
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

  return (
    // <div style={{ backgroundImage: `url("data:image/svg+xml,${svgString}")` }}>
    <>
      <Breakpoint customQuery="(max-width: 499px)">
        {' '}
        <div className="px-3 mb-10 mt-3">
          <form
            style={{ height: '120px' }}
            onSubmit={subscribe}
            className="flex flex-col justify-between items-center font-agrandir text-center px-3">
            <label htmlFor="email-input" className="flex font-title text-18">
              {'Join our newsletter'}
            </label>
            <input
              style={{ width: '80%' }}
              id="email-input"
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
      </Breakpoint>
      {!preview && (
        <Breakpoint customQuery="(min-width: 500px)">
          <div className="join-search-bg z-40">
            <div className="xl:container px-3 md:px-8 ml:px-20 lg:px-28 mx-auto">
              <form
                style={{ height: '60px' }}
                onSubmit={subscribe}
                className="flex justify-between items-center font-title text-15 ml:text-18 text-center px-3">
                <label htmlFor="email-input" className="w-4/12 flex mr-auto">
                  {'Join our newsletter'}
                </label>
                <input
                  id="email-input"
                  name="email"
                  ref={input}
                  required
                  type="email"
                  className="subscribe-input font-agrandir w-6/12 mb-1"
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
        </Breakpoint>
      )}
    </>
  );
};

export default Subscribe;
