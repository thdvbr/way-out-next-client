import { getClient } from '../../utils/sanity.server';
import { getMoreQuery } from '../../utils/queries';

export default async function handler(req, res) {
  const { categoryTitle, offset } = req.query;
  const query = getMoreQuery(
    categoryTitle === 'null' ? null : categoryTitle,
    parseInt(offset, 10),
  );
  const data = await getClient(false).fetch(query);
  res.status(200).json(data);
}
