import React from 'react';

const SocialLinks = ({ socialLinks }) => {
  const platforms = [
    {
      name: 'Facebook',
      url: socialLinks?.facebook,
      crossIcon: '/assets/icons/cross-opinions.svg', // or use text
    },
    {
      name: 'Email',
      url: socialLinks?.email ? `mailto:${socialLinks.email}` : null,
      crossIcon: '/assets/icons/cross-email.svg',
    },
    {
      name: 'Instagram',
      url: socialLinks?.instagram,
      crossIcon: '/assets/icons/cross-instagram.svg',
    },
  ];
  return (
    <div className="flex items-center justify-center gap-8 text-center underline md:gap-12 font-title text-14 ml:text-16 xl:text-20">
      {platforms.map((platform) => (
        <div key={platform.name} className="relative">
          {platform.url ? (
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              {platform.name}
            </a>
          ) : (
            <div className="relative inline-block">
              <span className="opacity-50">{platform.name}</span>
              <img
                src={platform.crossIcon}
                className="absolute inset-0 object-cover w-full h-full pointer-events-none"
                alt=""
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
