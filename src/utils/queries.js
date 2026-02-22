const postFields = `
  _id,
  name,
  title,
  subtitle,
  publishedAt,
  credits,
  mainImage {
  ...,
  asset-> {
    _id,
    metadata {
      lqip,
      dimensions
    }
  }
},
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
mainImage,
featured,
mainImage {
  ...,
  asset-> {
    _id,
    metadata {
      lqip,
      dimensions
    }
  }
},
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

const radioPreviewFields = `
    _id,
    title,
    subtitle,
    publishedAt,
    "slug": slug.current,
    "previewImage": heroImage,
    mixcloudUrl,
`;

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
    ${radioFields}
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

const moreInterviewsQuery = (posts) => {
  return `
*[_type == "post" && mainCategory->title == "Interview" ] | order(publishedAt desc, _updatedAt desc) | [${
  posts.length
}...${posts.length + 5}] {
  ${postPreviewFields}
}`;
};

const moreStuffWeLikeQuery = (posts) => {
  return `
  *[_type == "post" && mainCategory->title == "Stuff We Like" ] | order(publishedAt desc, _updatedAt desc) | [${
  posts.length
}...${posts.length + 5}] {
      ${postPreviewFields}
  }`;
};

const moreAllPostsQuery = (posts) => `
*[_type in ["post", "radio"]]
| order(featured desc, publishedAt desc, _updatedAt desc)
| [${posts.length}...${posts.length + 8}] {
  ${previewFields}
}`;

const moreRadioQuery = (posts) => {
  return `
*[_type == "radio"] | order(publishedAt desc) [${posts.length}...${posts.length + 8}] {
  ${radioFields}
}
`;
};

// UPDATED: Use categoryTitle instead of type
export const getMoreQuery = (categoryTitle, posts) => {
  // Filter by category title
  // TODO: Change name later for stuffwelike
  switch (categoryTitle) {
    case 'stuffWeLike':
      return moreStuffWeLikeQuery(posts);
    case 'interviews':
      return moreInterviewsQuery(posts);
    case 'radio': // ← explicit radio category
      return moreRadioQuery(posts);
    case null:
    case undefined:
      return moreAllPostsQuery(posts);
    default:
      // Dynamic category support!
      return `
*[_type == "post" && mainCategory->title == "${categoryTitle}"] | order(publishedAt desc) | [${posts.length}...${posts.length + 8}] {
  ${postPreviewFields}
}`;
  }
};
