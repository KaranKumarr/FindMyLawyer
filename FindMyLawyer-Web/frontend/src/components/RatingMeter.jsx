import RatingBar from '../components/RatingBar';

const RatingMeter = ({ reviews }) => {

  const length = reviews.length;

  const getReviewsCount = (rating) => {
    let counter = 0;
    reviews.forEach((item) => {
      if (item.rating === rating) {
        counter++;
      }
    });

    const ratingPercentage = counter ? Number((counter / length) * 100).toFixed(1) : 0;

    return ratingPercentage;
  };

  return (
    <div className='px-5 w-full flex flex-col flex-grow'>
      <RatingBar rating={5} ratingPercentage={`${getReviewsCount(5)}%`} />
      <RatingBar rating={4} ratingPercentage={`${getReviewsCount(4)}%`} />
      <RatingBar rating={3} ratingPercentage={`${getReviewsCount(3)}%`} />
      <RatingBar rating={2} ratingPercentage={`${getReviewsCount(2)}%`} />
      <RatingBar rating={1} ratingPercentage={`${getReviewsCount(1)}%`} />
    </div>

  );
};

export default RatingMeter;