import React, { useRef, useState, useEffect } from 'react';
import { BsArrowRight } from 'react-icons/bs';
// import { renderToStaticMarkup } from 'react-dom/server';
// import SubscribeSvg from './subscribe-svg';
// const svgString = encodeURIComponent(renderToStaticMarkup(<SubscribeSvg />));

const Subscribe = () => {
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
    <div className="join-search-bg">
      <form
        style={{ height: '48px' }}
        onSubmit={subscribe}
        className="flex justify-evenly items-center font-title text-center">
        <label htmlFor="email-input" className="w-4/12">{'Join our newsletter'}</label>
        <input
          id="email-input"
          name="email"
          ref={input}
          required
          type="email"
          className="subscribe-input font-agrandir w-6/12"
        />
        <div className="w-3/12">
          {message || (
            <button type="submit">
              <BsArrowRight size={32} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
