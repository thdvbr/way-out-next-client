import MainImage from './main-image';
import Link from 'next/link';

const PostPreview = ({ title, mainImage, slug }) => {
  return (
    <>
      <div className='mb-5'>
        <MainImage slug={slug} title={title} image={mainImage} />
      </div>
      <h3 className='text-3xl mb-3 leading-snug'>
        <Link as={`/posts/${slug}`} href='/posts/[slug]'>
          <a className='hover:underline'>{title}</a>
        </Link>
      </h3>
    </>
  );
};

export default PostPreview;