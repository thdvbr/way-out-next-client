import PostPreview from '../components/post-preview';

const ReadMore = ({ posts }) => {
  return (
    <section>
      <h2 className='mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight'>
        read more
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32'>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            mainImage={post.mainImage}
            slug={post.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default ReadMore;
