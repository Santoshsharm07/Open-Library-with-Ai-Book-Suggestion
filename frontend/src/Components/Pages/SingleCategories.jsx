import { Link } from "react-router-dom";

const SingleCategories = ({ subBook }) => {
  const { categories, image, _id } = subBook;
  return (
    <Link
      to={`/UniqueBookCategories/${_id}`}
      className="block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-2 transform"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={`${categories} books`}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x250?text=Book+Category';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-800">{categories}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          Explore our collection of {categories} books and level up your knowledge.
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-lime-600 font-medium">
            View Collection
          </span>
          <svg className="w-5 h-5 text-lime-600 transition-transform duration-300 hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default SingleCategories;
