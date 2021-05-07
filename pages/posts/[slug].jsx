import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import PostHeader from '../../components/post-header';
import PostBody from '../../components/post-body';
import { Toolbar } from '../../components/toolbar';
import {
  sanityClient,
  getClient,
  overlayDrafts,
} from '../../utils/sanity.server';
import { postQuery, postSlugsQuery } from '../../utils/queries';
import { usePreviewSubscription } from '../../utils/sanity';
import SectionSeparator from '../../components/section-separator';
import ReadMore from '../../components/read-more';


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
      <Toolbar />
      <article>
        <PostHeader
          title={post.title}
          mainImage={post.mainImage}
          date={post.date}
        />
        <PostBody body={post.body} />
      </article>
      <SectionSeparator />
      {morePosts.length > 0 && <ReadMore posts={morePosts} />}
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
