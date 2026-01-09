import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Home from "./Pages/Home";
import ErrorPage from "./ErrorPage";
import AddBook from "./Pages/AddBook";
import PrivateRoute from "./PrivateRoute";
import AllBooks from "./Pages/AllBooks";
import UpdateBook from "./Pages/UpdateBook";
import UniqueBookCategories from "./Pages/UniqueBookCategories";
import UniqueBookCategoryDetails from "./Pages/UniqueBookCategoryDetails";
import BorrowedBooks from "./Pages/BorrowedBooks";
import Chatbot from "./Pages/Chatbot";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-books",
        element: (
          <PrivateRoute>
            <AllBooks></AllBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateBook/:id",
        element: (
          <PrivateRoute>
            <UpdateBook></UpdateBook>
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          if (!params.id) {
            return null;
          }
          return fetch(`${import.meta.env.VITE_API_URL}/books/${params.id}`);
        },
      },
      {
        path: "/UniqueBookCategories/:id",
        element: <UniqueBookCategories></UniqueBookCategories>,
        loader: ({ params }) => {
          if (!params.id) return null;
          return fetch(`${import.meta.env.VITE_API_URL}/sub-Books/${params.id}`);
        },
      },
      {
        path: "/uniqueBookDetails/:id",
        element: (
          <PrivateRoute>
            <UniqueBookCategoryDetails></UniqueBookCategoryDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          if (!params.id) return null;
          return fetch(`${import.meta.env.VITE_API_URL}/sub-Books/${params.id}`);
        },
      },
      {
        path: "/borrowed-book",
        element: (
          <PrivateRoute>
            <BorrowedBooks></BorrowedBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/chatbot",
        element: (
          <PrivateRoute>
            <Chatbot></Chatbot>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default Router;
