import React from 'react';

const Logo = ({ theme = 'light' }) => {
  const strokeColor = theme === 'dark' ? 'white' : 'black';
  return (
    <div className="svg-logo-container">
      <svg viewBox="0 0 54 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.4837 40.6427C16.4388 40.6427 20.4557 36.4729 20.4557 31.3293C20.4557 26.1856 16.4388 22.0159 11.4837 22.0159C6.52861 22.0159 2.51172 26.1856 2.51172 31.3293C2.51172 36.4729 6.52861 40.6427 11.4837 40.6427Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.500632"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 1H4.3156L7.24133 12.6051L10.362 1H12.7026L15.6282 12.6051L18.3588 1H21.9671L17.4812 18.6515H14.2629L11.4835 8.80174L8.80174 18.6515H5.48599L1 1Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.500632"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.8936 18.6026H26.5019L27.9648 15.2868H35.0838L36.4491 18.6026H40.1551L32.8408 1.04868H30.2078L22.8936 18.6026Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.500632"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M31.5244 6.80255L29.2327 11.8736H33.7186L31.5244 6.80255Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.500632"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M38.8872 1.04868H42.593L46.2013 6.80251L49.7121 1.04868H53.613L48.1517 10.2157L47.9568 18.6026H44.3485V10.4108L38.8872 1.04868Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.500632"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.435 37.0343C14.2961 37.0343 16.6154 34.4801 16.6154 31.3292C16.6154 28.1784 14.2961 25.6241 11.435 25.6241C8.57397 25.6241 6.25464 28.1784 6.25464 31.3292C6.25464 34.4801 8.57397 37.0343 11.435 37.0343Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.500632"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.5762 22.5035H27.3389V32.7433C27.3389 32.7433 27.0869 37.0342 30.3051 37.0342C30.3051 37.0342 33.7184 37.4242 33.7184 32.6457V22.5033H37.5218V32.7431C37.5218 32.7431 37.6192 36.3515 35.5713 38.497C35.5713 38.497 30.5002 42.8855 25.5266 38.497C25.5266 38.497 23.6736 36.9366 23.5762 32.9382V22.5035Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.500632"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40.155 22.5035H51.8576V25.6243H47.7617L47.6642 39.8625H43.9583V25.6243H40.155V22.5035Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.500632"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Logo;
