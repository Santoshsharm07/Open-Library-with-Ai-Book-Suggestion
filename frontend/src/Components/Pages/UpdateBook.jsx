import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider";

const UpdateBook = () => {
  const { user } = useContext(AuthContext);
  const singleBook = useLoaderData();
  const navigate = useNavigate();
  const { name, photo, category, author, rating, _id } = singleBook;
  const handleUpdateBook = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.bookname.value;
    const photo = form.photo.value;
    const category = form.category.value;
    const author = form.author.value;
    const rating = parseFloat(form.rating.value);
    const updateBook = {
      name,
      category,
      photo,
      author,
      rating,
      email: user?.email,
    };

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/books/${_id}`,
        updateBook,
        { withCredentials: true }
      );
      console.log(data);
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Update Book Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        form.reset();
        navigate("/all-books");
      }
    } catch (error) {
      toast(error?.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-lime-600 py-6 px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
            Update Your Book
          </h2>
          <p className="text-lime-100 text-center mt-2 max-w-2xl mx-auto">
            Books ignite the imagination, transporting readers to fantastical worlds and sparking creativity.
          </p>
        </div>
        <form
          onSubmit={handleUpdateBook}
          className="p-6 md:p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="bookname" className="block text-sm font-medium text-gray-700">
                Book Name
              </label>
              <input
                id="bookname"
                type="text"
                name="bookname"
                placeholder="Book name"
                defaultValue={name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Book Image URL
              </label>
              <input
                id="photo"
                type="text"
                name="photo"
                placeholder="https://example.com/book-cover.jpg"
                defaultValue={photo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={category}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all duration-200"
              >
                <option>Novel</option>
                <option>Self-Help</option>
                <option>Thriller</option>
                <option>History</option>
                <option>Drama</option>
                <option>Sci-Fi</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author Name
              </label>
              <input
                id="author"
                type="text"
                name="author"
                placeholder="Author name"
                defaultValue={author}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all duration-200"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating (1-5)
              </label>
              <input
                id="rating"
                type="number"
                name="rating"
                placeholder="Rating"
                min="1"
                max="5"
                step="0.1"
                defaultValue={rating}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all duration-200"
              />
            </div>
          </div>
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
            >
              Update Book
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateBook;
