/* eslint-disable */ 

import { sanityClient } from '../../utils/sanity.server';
import { searchQuery } from '../../utils/queries';

// TODO: error handling and better search query
const handler = async (req, res) => {
  const results = await sanityClient.fetch(searchQuery, {
    searchTerm: req.query.q,
  });
  if (!results) {
    return res.status(404).json({ message: 'Nothing found.' });
  }
   const merged = [
    ...(results.posts || []),
    ...(results.radio || []),
  ];

  res.end(JSON.stringify({ results: merged }));
};

export default handler;
