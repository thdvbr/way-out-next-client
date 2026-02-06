import React from 'react';

const PlayButton = ({ style }) => {
  return (
    <svg
      width="51"
      height="52"
      viewBox="0 0 51 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <rect
        x="0.5"
        y="0.5"
        width="50"
        height="51"
        rx="1.5"
        fill="black"
        stroke="white"
      />
      <path
        d="M16.291 35.3043V17.186C16.291 15.6466 17.9573 14.6843 19.2907 15.4537L34.0143 23.9506C35.3058 24.6959 35.3569 26.5414 34.1087 27.3571L19.3851 36.9786C18.0548 37.8478 16.291 36.8934 16.291 35.3043Z"
        fill="white"
        stroke="black"
      />
    </svg>
  );
};

export default PlayButton;
