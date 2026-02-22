const postFields = `
  _id,
  name,
  title,
  subtitle,
  publishedAt,
  credits,
  mainImage
  body,
  socialLinks,
  externalLinks,
  "subCategory": subCategory->title,
  mainCategory->{
    _id,
    title,
    description
  },
  "slug": slug.current,
`;

const postPreviewFields = `
_id,
name,
title,
subtitle,
publishedAt,
featured,
previewImage {
  ...,
  asset-> {
    _id,
    metadata {
      lqip,
      dimensions
    }
  }
},
"subCategory": subCategory->title,
  mainCategory->{
    _id,
    title,
    description
  },
"slug": slug.current,
`;

const radioFields = `  
  _id,
  name,
  episodeLabel,
  featured,
  title,
  subtitle,
  "slug": slug.current,
    heroImage {
    ...,
    asset-> {
      _id,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  mixcloudUrl,
  tracklist,
publishedAt,
  description,
  tags `;


const radioShowFields = `  
  _id,
  name,
  episodeLabel,
  featured,
  title,
  subtitle,
  "slug": slug.current,
  heroImage,
  mixcloudUrl,
  tracklist,
publishedAt,
  description,
  tags `;

// this one is for search result using masonry grid format
const previewFields = `
  _id,
  _type,
  title,
  subtitle,
  publishedAt,
  featured,
  "slug": slug.current,
  "previewImage": coalesce(heroImage, previewImage) {
    ...,
    asset-> {
      _id,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  mixcloudUrl,
  "subCategory": subCategory->title,
  mainCategory->{
    _id,
    title,
    description
  }
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

// Fix ordering - use publishedAt instead of date, primary sort by pulishedat, secondary updatedat
export const indexQuery = `
*[_type in ["post", "radio"]]
| order(featured desc, publishedAt desc, _updatedAt desc) [0...12]{
  ${previewFields}
}`;

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(publishedAt desc, _updatedAt desc) | [0] {
    ${postFields}
  },
    "morePosts": *[_type in ["post", "radio"] && slug.current != $slug] | order(publishedAt desc)[0...20]{
  ${previewFields}
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
export const radioQuery = `
*[_type == "radio" && slug.current == $slug]
  | order(publishedAt desc, _updatedAt desc)[0] {
    ${radioShowFields}
  }
`;
export const radioSlugsQuery = `
*[_type == "radio" && defined(slug.current)][].slug.current
`;

export const radioBySlugQuery = `
*[_type == "radio" && slug.current == $slug][0] {
  ${radioFields}
}
`;

export const interviewsQuery = `
*[_type == "post" && mainCategory->title == "Interview"] 
| order(featured desc, publishedAt desc, _updatedAt desc)  [0...8] {
  ${postPreviewFields}
}`;

export const stuffWeLikeQuery = `
*[_type == "post" && mainCategory->title == "Stuff We Like" ] | order(featured desc, publishedAt desc, _updatedAt desc) | [0...8]  {
  ${postPreviewFields}
}`;

export const searchQuery = `
{
  "posts": *[_type == "post" && [title, subtitle, body[].children[].text] match [$searchTerm]] {
    ${previewFields}
  },
"radio": *[_type == "radio" && (
  title match $searchTerm ||
  subtitle match $searchTerm ||
  description match $searchTerm ||
  count((tags)[@ match $searchTerm]) > 0 ||
  count((tracklist[].artist)[@ match $searchTerm]) > 0
)] {
  ${previewFields}
}
}`;

export const radioShowsQuery = `*[_type == "radio"] | order(featured desc,publishedAt desc, _updatedAt desc) {
${radioFields}
}`;

const moreAllPostsQuery = (offset) => `
*[_type in ["post", "radio"]]
| order(featured desc, publishedAt desc, _updatedAt desc)
| [${offset}...${offset + 8}] {
  ${previewFields}
}`;

const moreInterviewsQuery = (offset) => `
*[_type == "post" && mainCategory->title == "Interview"]
| order(publishedAt desc, _updatedAt desc)
| [${offset}...${offset + 5}] {
  ${postPreviewFields}
}`;

const moreStuffWeLikeQuery = (offset) => `
*[_type == "post" && mainCategory->title == "Stuff We Like"]
| order(publishedAt desc, _updatedAt desc)
| [${offset}...${offset + 5}] {
  ${postPreviewFields}
}`;

const moreRadioQuery = (offset) => `
*[_type == "radio"] | order(publishedAt desc)
| [${offset}...${offset + 8}] {
  ${radioFields}
}`;

export const getMoreQuery = (categoryTitle, offset) => {
  switch (categoryTitle) {
    case 'stuffWeLike':
      return moreStuffWeLikeQuery(offset);
    case 'interviews':
      return moreInterviewsQuery(offset);
    case 'radio':
      return moreRadioQuery(offset);
    case null:
    case undefined:
      return moreAllPostsQuery(offset);
    default:
      return `
*[_type == "post" && mainCategory->title == "${categoryTitle}"]
| order(publishedAt desc)
| [${offset}...${offset + 8}] {
  ${postPreviewFields}
}`;
  }
};
