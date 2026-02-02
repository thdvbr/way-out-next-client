import React from 'react';

const MixcloudWidget = ({ url, width = '100%', height = 60 }) => {
  if (!url) return null;
  const src = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${encodeURIComponent(url)}`;
  return (
    <iframe
      width={width}
      height={height}
      src={src}
      frameBorder="0"
      allow="autoplay; encrypted-media; clipboard-write"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      title="Mixcloud Player"
    />
  );
};

export default MixcloudWidget;
