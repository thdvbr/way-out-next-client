import { getClient } from '../utils/sanity.server';

const BASE_URL = 'https://www.wayoutmagazine.com';

function generateSiteMap(posts, radios) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}</loc>
      </url>
      <url>
        <loc>${BASE_URL}/interview</loc>
      </url>
      <url>
        <loc>${BASE_URL}/opinion</loc>
      </url>
      <url>
        <loc>${BASE_URL}/radio</loc>
      </url>
      ${posts.map(({ slug }) => `
        <url>
          <loc>${BASE_URL}/posts/${slug}</loc>
        </url>
      `).join('')}
      ${radios.map(({ slug }) => `
        <url>
          <loc>${BASE_URL}/radios/${slug}</loc>
        </url>
      `).join('')}
    </urlset>
  `;
}

export async function getServerSideProps({ res }) {
  const posts = await getClient(false).fetch(
    '*[_type == "post" && defined(slug.current)]{ "slug": slug.current }',
  );
  const radios = await getClient(false).fetch(
    '*[_type == "radio" && defined(slug.current)]{ "slug": slug.current }',
  );

  const sitemap = generateSiteMap(posts, radios);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {}
