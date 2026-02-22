/* eslint-disable no-plusplus */
export default function interleaveTwoPostsOneRadio(items) {
  const featured = items.filter((i) => i.featured);
  const rest = items.filter((i) => !i.featured);

  // Shuffle featured so radios don't always appear first
  const shuffledFeatured = [...featured].sort(() => Math.random() - 0.5);

  const posts = rest.filter((i) => i._type === 'post');
  const radios = rest.filter((i) => i._type === 'radio');

  const interleaved = [];
  let p = 0;
  let r = 0;

  while (p < posts.length || r < radios.length) {
    if (p < posts.length) interleaved.push(posts[p++]);
    if (p < posts.length) interleaved.push(posts[p++]);
    if (r < radios.length) interleaved.push(radios[r++]);
  }

  // Featured items come first, then interleaved rest
  return [...shuffledFeatured, ...interleaved];
}
