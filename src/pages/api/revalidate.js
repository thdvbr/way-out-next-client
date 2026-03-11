export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    const { _type, slug } = req.body;
    const s = slug?.current;

    switch (_type) {
      case 'post':
        if (s) await res.revalidate(`/posts/${s}`);
        // revalidate listing pages that show posts
        await res.revalidate('/');
        await res.revalidate('/opinion');
        await res.revalidate('/interview');
        break;

      case 'radio':
        if (s) await res.revalidate(`/radios/${s}`);
        await res.revalidate('/radio');
        await res.revalidate('/');
        break;

      case 'page':
        if (s) await res.revalidate(`/${s}`);
        await res.revalidate('/legal');
        break;

      case 'staff':
        await res.revalidate('/');
        break;

      case 'ad':
      case 'adCategory':
        await res.revalidate('/');
        await res.revalidate('/opinion');
        await res.revalidate('/interview');
        await res.revalidate('/radio');
        break;

      case 'category':
      case 'subCategory':
        await res.revalidate('/');
        await res.revalidate('/opinion');
        await res.revalidate('/interview');
        break;

      default:
        await res.revalidate('/');
    }

    return res.json({ revalidated: true, type: _type, slug: s });
  } catch (err) {
    console.error('Revalidation error:', err);
    return res.status(500).json({ message: 'Error revalidating', error: err.message });
  }
}
