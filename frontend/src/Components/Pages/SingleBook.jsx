import { Link } from "react-router-dom";
import Star from "./Star";

const SingleBook = ({ book }) => {
  const { name, title, image, description, author, rating, id, photo } = book;
  const coverImage = image || photo || 'https://via.placeholder.com/300x400?text=Book+Cover';
  return (
    <div className="h-full">
      <div className="card card-side h-full bg-base-100 shadow-xl overflow-hidden">
        <figure className="h-full w-2/5 flex-shrink-0">
          <img 
            className="w-full h-full object-cover object-center" 
            src={coverImage} 
            alt={name || title || 'Book Cover'} 
          />
        </figure>
        <div className="card-body flex flex-col justify-between">
          <div>
            <h2 className="card-title text-lg md:text-xl">{name || title}</h2>
            <h3 className="text-sm text-gray-600 mt-1">Author: {author}</h3>
            <p className="mt-2 line-clamp-3 text-sm">{description}</p>
            <div className="flex items-center mt-2">
              <Star stars={rating || 0}></Star>
            </div>
          </div>

          <div className="card-actions justify-end mt-4">
            <Link to={`/updateBook/${id}`}>
              <button className="btn bg-lime-500 btn-sm">Update</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
