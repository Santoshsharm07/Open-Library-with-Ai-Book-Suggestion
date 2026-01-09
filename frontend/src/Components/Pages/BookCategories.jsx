import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SingleCategories from "./SingleCategories";

const BookCategories = () => {
  const [subBooks, setSubBooks] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        // For now, we'll use categories endpoint since we don't have a direct subBooks endpoint
        const { data } = await axios(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        setSubBooks(data);
      } catch (error) {
        toast(error.message);
        console.error(error);
      }
    };
    getData();
  }, []);
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Explore Our Book Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subBooks.slice(0, 6).map((subBook) => (
            <SingleCategories
              key={subBook._id}
              subBook={subBook}
            ></SingleCategories>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCategories;
