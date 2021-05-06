import PostTitle from '../components/post-title';
import MainImage from '../components/main-image';
import Date from '../components/date';

const PostHeader = ({ title, mainImage, date }) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className='mb-8 md:mb-16 sm:mx-0'>
        <MainImage title={title} image={mainImage} />
      </div>
      {/* <div className='mb-6 text-lg'>
        <Date dateString={date} />
      </div> */}
    </>
  );
};

export default PostHeader;