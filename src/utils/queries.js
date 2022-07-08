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

const pageFields = `
_id,
name,
title,
body,
"slug": slug.current,
`;

const staffFields = `
_id,
name,
staffName,
role
`;

const adFields = `
_id,
"adCategory": adCategory->title,
adImage,
adImageMobile,
adUrl`;

export const sideAdQuery = `
*[_type == "ad" && adCategory->title == "Side" ]| order(date desc, _updatedAt asc) {
  ${adFields}
}`;

export const bottomAdQuery = `
*[_type == "ad" && adCategory->title == "Bottom" ]| order(date desc, _updatedAt asc) {
  ${adFields}
}`;

export const pageQuery = `
{ "about": *[_type == "page" && title == "About"][0] {
  ${pageFields}
},
  "contact": *[_type == "page" && title == "Contact"][0] {
    ${pageFields}
  },
  "legal": *[_type == "page" && title == "Legal"][0] {
    ${pageFields}
  },
}
`;

export const staffQuery = `
*[_type == "staff"]| order(date desc, _updatedAt asc) {
  ${staffFields}
}`;

export const pageSlugsQuery = `
*[_type == "page" && defined(slug.current)][].slug.current
`;

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) | [0...9] {
  ${postPreviewFields}
}`;

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) | [0] {
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) | [0...12] {
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
*[_type == "post" && mainCategory->title == "Interview" ] | order(date desc, _updatedAt desc)  | [0...8] {
  ${postPreviewFields}
}`;

export const stuffWeLikeQuery = `
*[_type == "post" && mainCategory->title == "Stuff We Like" ] | order(date desc, _updatedAt desc) | [0...8]  {
  ${postPreviewFields}
}`;

export const searchQuery = `
*[_type == "post" && [title, subtitle, body[].children[].text ] match [$searchTerm]] {
  ${postPreviewFields}
}`;

const moreInterviewsQuery = (posts) => {
  return `
*[_type == "post" && mainCategory->title == "Interview" ] | order(date desc, _updatedAt desc) | [${
    posts.length
  }...${posts.length + 5}] {
  ${postPreviewFields}
}`;
};

const moreStuffWeLikeQuery = (posts) => {
  return `
  *[_type == "post" && mainCategory->title == "Stuff We Like" ] | order(date desc, _updatedAt desc) | [${
    posts.length
  }...${posts.length + 5}] {
      ${postPreviewFields}
  }`;
};

const moreAllPostsQuery = (posts) => {
  return `
  *[_type == "post"] | order(date desc, _updatedAt desc) | [${
    posts.length + 1
  }...${posts.length + 6}] {
    ${postPreviewFields}
  }`;
};

export const getMoreQuery = (type, posts) => {
  switch (type) {
    case 'stuffWeLike':
      return moreStuffWeLikeQuery(posts);
    case 'interviews':
      return moreInterviewsQuery(posts);
    default:
      return moreAllPostsQuery(posts);
  }
};