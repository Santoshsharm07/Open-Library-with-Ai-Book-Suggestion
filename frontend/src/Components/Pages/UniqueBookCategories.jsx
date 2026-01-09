import { useLoaderData } from "react-router-dom";
import SingleUniqueBookCategories from "./SingleUniqueBookCategories";
import { useEffect, useState } from "react";
import axios from "axios";

const UniqueBookCategories = () => {
  const uniqueBook = useLoaderData();

  const [subBooks, setSubBooks] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_API_URL}/subBooks`
        );
        setSubBooks(data);
      } catch (error) {
        toast(error.message);
      }
    };
    getData();
  }, []);

  let uniqueBooks = subBooks.filter(
    (book) => uniqueBook.categories === book.categories
  );
  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold my-5 text-lime-600 text-center">
        Releted Book By Categories
      </h1>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
        {uniqueBooks.map((book) => (
          <SingleUniqueBookCategories
            key={book._id}
            book={book}
          ></SingleUniqueBookCategories>
        ))}
      </div>
    </div>
  );
};

export default UniqueBookCategories;
