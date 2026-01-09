import axios from "axios";
import { useEffect, useState } from "react";
import SingleBook from "./SingleBook";
import { MdViewList } from "react-icons/md";
import { MdGridView } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [view, setView] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/books`, {
        withCredentials: true,
      });
      setBooks(data);
    };
    getData();
  }, []);

  const handleAllBook = () => {
    const allBook = books.filter((book) => book.quantity > 0);
    setBooks(allBook);
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-5 bg-lime-500 p-2 rounded-md">
        Our All Book Here
      </h1>
      <div className="flex items-center justify-center my-5 gap-5">
        <select onClick={handleAllBook} className="p-2 border rounded">
          <option value="show all book">Show All Book</option>
        </select>
        <div className="flex items-center gap-4 border py-1 px-3 rounded">
          <NavLink
            className={({ isActive }) => (isActive ? " text-lime-600" : "")}
          >
            <button onClick={() => setView(false)}>
              <MdViewList className="text-2xl"></MdViewList>
            </button>
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? " text-orange-500" : "")}
          >
            <button onClick={() => setView(true)}>
              <MdGridView className="text-2xl"></MdGridView>
            </button>
          </NavLink>
        </div>
      </div>
      {view === true ? (
        <>
          <div className="grid md:grid-cols-2  gap-5 py-5">
            {books.map((book) => (
                    <SingleBook key={book.id} book={book}></SingleBook>
                  ))}
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-xl">
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Rating</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={book.image || book.photo || 'https://via.placeholder.com/100x100?text=Book+Cover'}
                                alt={book.name || book.title || 'Book Cover'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{book.name || book.title}</div>
                            <div className="text-sm opacity-50">
                              {book.author}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{book.category}</td>
                      <td>{book.description}</td>
                      <th>{book.rating}</th>
                      <th>
                        {" "}
                        <Link to={`/updateBook/${book.id}`}>
                          <button className="btn bg-lime-500">Update</button>
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllBooks;
