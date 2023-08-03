import { RxStarFilled } from 'react-icons/rx';

function Star({ filled, onClick }) {
    return (
        <RxStarFilled
            className='h-6 w-6 cursor-pointer'
            color={filled ? "#FF9529" : "#B7CC70"}
            onClick={onClick} />
    );
}

export default Star;