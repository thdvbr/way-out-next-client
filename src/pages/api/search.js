import { sanityClient } from '../../utils/sanity.server';
import { searchQuery } from '../../utils/queries';
/* eslint-disable consistent-return */
// TODO: error handling and better search query
const handler = async (req, res) => {
  const results = await sanityClient.fetch(searchQuery, {
    searchTerm: req.query.q,
  });
  if (!results) {
    return res.status(404).json({ message: 'No search result' });
  }
  res.end(JSON.stringify({ results }));
};

export default handler;
