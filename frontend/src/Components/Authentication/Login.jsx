import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import lottie from "../../assets/login.json";
import Lottie from "lottie-react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";
  const { setUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm();

  // Load Google Sign-In script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize Google Sign-In and handle callback
  useEffect(() => {
    if (window.google) {
      // Remove the Google Sign-In initialization since we're using direct button click flow
      // This fixes the missing client_id error
    }
  }, []);

  const handleGoogleCallback = async (response) => {
    try {
      setLoading(true);
      const token = response.credential;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const userData = JSON.parse(jsonPayload);
      
      // Send data to backend
      const backendResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/google-login`,
        {
          name: userData.name,
          email: userData.email,
          photoURL: userData.picture
        }
      );
      
      // Store token and user data
      localStorage.setItem('token', backendResponse.data.token);
      localStorage.setItem('user', JSON.stringify(backendResponse.data.user));
      
      // Update AuthContext user state
      setUser(backendResponse.data.user);
      
      toast("Google Login Successful");
      navigate(from);
    } catch (error) {
      console.error("Google login error:", error);
      toast(error?.response?.data?.message || "Google Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleForm = () => {
    // Redirect to Google login page or show a message that Google login is being implemented
    toast("Google login is being implemented. Please use email/password login for now.");
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password
        }
      );
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Update AuthContext user state
      setUser(response.data.user);
      
      toast("Login Successful");
      navigate(from);
    } catch (error) {
      toast(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex">
      <div className="md:w-[50%] p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
        <h2 className="mb-3 text-3xl font-bold text-center text-lime-500">
          Login to your account
        </h2>
        <div className="my-6 space-y-4">
          <button
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
            onClick={handleGoogleForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-600" />
          <p className="px-3 dark:text-gray-600">OR</p>
          <hr className="w-full dark:text-gray-600" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
              <input
                autoComplete="on"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <p className="text-base font-medium text-center dark:text-gray-600">
            Dont have account ?
            <Link
              to={"/register"}
              href="#"
              rel="noopener noreferrer"
              className="focus:underline hover:underline text-blue-600"
            >
              {" "}
              Please Register
            </Link>
          </p>
          <button
            type="submit"
            className="w-full px-8 py-3 text-base bg-lime-500 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>
      </div>
      <div className="p-5 md:w-[50%]">
        <Lottie animationData={lottie} loop={true}></Lottie>
      </div>
    </div>
  );
};

export default Login;
