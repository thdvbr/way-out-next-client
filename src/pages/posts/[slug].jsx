import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import {
  sanityClient,
  getClient,
  overlayDrafts,
} from '../../utils/sanity.server';
import { postQuery, postSlugsQuery } from '../../utils/queries';
import { usePreviewSubscription } from '../../utils/sanity';
import {
  PostHeader, PostBody, Toolbar, Layout, ArtistLink, RelatedPosts, SectionSeparator,
} from '../../components';

export const Post = ({ data = {}, preview }) => {
  const router = useRouter();
  const slug = data?.post?.slug;
  const {
    data: { post, morePosts },
  } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  });

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Layout preview={preview}>
        <Toolbar />
        <SectionSeparator />
        <article>
          <PostHeader
            title={post.title}
            subtitle={post.subtitle}
            mainImage={post.mainImage}
            subCategory={post.subCategory}
            publishedAt={post.publishedAt}
            credits={post.credits}
          />
          <PostBody body={post.body} />
          {post.artistLink && <ArtistLink artistLink={post.artistLink} />}
        </article>
        {morePosts.length > 0 && <RelatedPosts posts={morePosts} />}
      </Layout>
    </>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { post, morePosts } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      data: {
        post,
        morePosts: overlayDrafts(morePosts),
      },
    },
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default Post;
