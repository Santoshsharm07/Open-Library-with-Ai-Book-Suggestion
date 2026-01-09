import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookSuggestions = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast('Please enter a book query');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/book-suggestions`, {
        query
      });
      setSuggestions(data);
      toast.success(`Found ${data.length} book suggestions`);
    } catch (error) {
      toast.error('Failed to get book suggestions');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Find Your Next Favorite Book
        </h2>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="e.g., 'Suggest horror fantasy book' or 'Find mystery novels'"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-lime-500 text-white font-medium rounded-lg hover:bg-lime-600 transition-colors disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Get Suggestions'}
            </button>
          </div>
        </form>

        {suggestions.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestions.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x400?text=Book+Cover';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-1">by {book.author}</p>
                  <p className="text-sm text-gray-500 mb-3">Category: {book.category}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{book.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {book.available ? 'Available' : 'Borrowed'}
                    </span>
                    <button className="px-4 py-2 bg-lime-500 text-white text-sm font-medium rounded-lg hover:bg-lime-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {suggestions.length === 0 && query && (
          <div className="text-center py-12">
            <p className="text-gray-600">No book suggestions found for your query.</p>
            <p className="text-gray-500 text-sm mt-2">Try a different search term!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSuggestions;
