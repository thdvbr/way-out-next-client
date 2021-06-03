const postFields = `
  _id,
  name,
  title,
  subtitle,
  publishedAt,
  credits,
  mainImage,
  previewImage,
  body,
  artistLink,
  "subCategory": subCategory->title,
  "mainCategory": mainCategory->title,
  "slug": slug.current,
`;

const postPreviewFields = `
_id,
name,
title,
subtitle,
publishedAt,
mainImage,
previewImage,
"subCategory": subCategory->title,
"mainCategory": mainCategory->title,
"slug": slug.current,
`;

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postPreviewFields}
}`;

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) | [0] {
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) | [0...4] {
    ${postPreviewFields}
  }
}`;

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;

export const interviewsQuery = `
*[_type == "post" && mainCategory->title == "Interview" ] | order(date desc, _updatedAt desc) {
  ${postPreviewFields}
}`;

export const stuffWeLikeQuery = `
*[_type == "post" && mainCategory->title == "Stuff We Like" ] | order(date desc, _updatedAt desc) {
  ${postPreviewFields}
}`;
