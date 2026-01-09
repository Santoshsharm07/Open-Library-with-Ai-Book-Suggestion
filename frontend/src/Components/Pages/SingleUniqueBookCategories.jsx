import { Link } from "react-router-dom";
import Star from "./Star";

const SingleUniqueBookCategories = ({ book }) => {
  const { name, categories, description, rating, author, image, _id } = book;
  return (
    <div data-aos="zoom-in" data-aos-duration="1000">
      <div className="card  bg-base-100 shadow-xl h-[90%]">
        <figure>
          <img className="w-2/3" src={image} alt="Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-bold text-left">{name}</h2>
          <p className="font-semibold text-lg py-2 text-left">
            Category : {categories}
          </p>
          <p className="font-medium pb-2 text-left">{description}</p>
          <div>
            <p className="border border-orange-500 p-1 rounded-md font-semibold mb-3">
              Author : {author}
            </p>
            <Star stars={rating}></Star>
          </div>
          <div className="text-left">
            <Link to={`/uniqueBookDetails/${_id}`}>
              <button className="btn bg-lime-500 text-white">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUniqueBookCategories;
