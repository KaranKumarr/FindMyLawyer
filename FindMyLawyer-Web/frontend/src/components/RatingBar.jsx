import { RxStarFilled } from 'react-icons/rx';

const RatingBar = ({ rating, ratingPercentage }) => {


    return (
        <div className='flex w-full justify-between items-center my-5' >
            <h6 className='w-1/5 text-secondary-b flex items-center justify-center'>{rating} <RxStarFilled className='h-5 w-5 mx-1' color={'#FF9529'} />
            </h6>
            <div className='w-4/5 relative  z-10 h-10 bg-primary bg-opacity-10 rounded-r-full mx-5'>
                <div style={{ width: ratingPercentage }} className={`bg-gold h-10 rounded-r-full`}></div>
            </div>
            <h6 className='w-1/5 text-secondary-b'>{ratingPercentage}</h6>
        </div>
    );
};

export default RatingBar;