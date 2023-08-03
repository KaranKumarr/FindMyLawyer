import Star from "./Star";

function RatingAStar({ onChange, rating, setRating }) {
    const changeRating = (newRating) => {
        setRating(newRating);
        onChange?.(newRating);
    };
    return (
        <span className="flex">
            {[1, 2, 3, 4, 5].map((value) => (
                <Star
                    key={value}
                    filled={value <= rating}
                    onClick={() => changeRating(value)}
                />
            ))}
        </span>
    );
}

export default RatingAStar;