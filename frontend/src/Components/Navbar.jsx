import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import toast from "react-hot-toast";
import logo from "../../public/logo.jpg";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  // Fix localStorage corruption
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Verify user data has expected structure
        if (!parsedUser || typeof parsedUser !== 'object' || !parsedUser.email) {
          throw new Error('Invalid user data structure');
        }
      }
    } catch (error) {
      console.error('Fixing corrupted localStorage data:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.reload();
    }
  }, []);
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("synthwave");
    } else {
      setTheme("light");
    }
  };
  const handleLogOut = () => {
    logOut();
    toast("LogOut Successfull");
  };
  return (
    <div>
      <div className="navbar bg-base-100 relative z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive ? " text-lime-600" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/add-book"}
                  className={({ isActive }) =>
                    isActive ? " text-lime-600" : ""
                  }
                >
                  Add Book
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/all-books"}
                  className={({ isActive }) =>
                    isActive ? " text-lime-600" : ""
                  }
                >
                  All Books
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/borrowed-book"}
                  className={({ isActive }) =>
                    isActive ? "text-lime-600" : ""
                  }
                >
                  Borrowed Books
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/chatbot"}
                  className={({ isActive }) =>
                    isActive ? " text-lime-600" : ""
                  }
                >
                  AI Librarybot
                </NavLink>
              </li>
            </ul>
          </div>
          <img className="w-16 rounded-lg hidden md:block" src={logo} alt="" />
          <a className="btn btn-ghost gap-0 text-xl md:text-2xl font-bold">
            open<span className="text-lime-600">library</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-semibold">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? " text-lime-600" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/add-book"}
                className={({ isActive }) => (isActive ? " text-lime-600" : "")}
              >
                Add Book
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/all-books"}
                className={({ isActive }) => (isActive ? " text-lime-600" : "")}
              >
                All Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/borrowed-book"}
                className={({ isActive }) => (isActive ? " text-lime-600" : "")}
              >
                Borrowed Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/chatbot"}
                className={({ isActive }) => (isActive ? " text-lime-600" : "")}
              >
                AI Librarybot
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end space-x-2">
          <label className="cursor-pointer grid place-items-center">
            <input
              onChange={handleToggle}
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
            />
            <svg
              className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
          {!user && (
            <Link
              to={"/login"}
              className="py-1 px-2 border font-medium rounded-md border-lime-600"
            >
              Login
            </Link>
          )}
          {user && (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                role="button"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white font-bold text-sm cursor-pointer hover:bg-green-800 transition-colors"
              >
                {(() => {
                  // Always show first letter for consistent UI
                  const displayName = user.name || user.email || 'User';
                  const firstLetter = displayName.trim().charAt(0).toUpperCase();
                  return firstLetter || 'U';
                })()}
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <span className="font-semibold">{user.name || user.email || 'User'}</span>
                </li>
                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
