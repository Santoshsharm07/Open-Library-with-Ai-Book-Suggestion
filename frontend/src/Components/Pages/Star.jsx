import { FaRegStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
const Star = ({ stars }) => {
  const starRating = Array.from({ length: 5 }, (elem, index) => {
    const number = index + 0.5;

    return (
      <span key={index}>
        {stars > index + 1 ? (
          <FaStar className="text-orange-500 text-2xl"></FaStar>
        ) : stars > number ? (
          <FaRegStarHalfStroke className="text-orange-500 text-2xl"></FaRegStarHalfStroke>
        ) : (
          <FaRegStar className="text-orange-500 text-2xl"></FaRegStar>
        )}
      </span>
    );
  });
  return <div className="flex items-center">{starRating}</div>;
};

export default Star;
