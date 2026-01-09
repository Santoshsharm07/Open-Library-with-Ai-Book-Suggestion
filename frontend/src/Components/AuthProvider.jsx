import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage
  useEffect(() => {
    try {
      // Clean up any potential corruption first
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Only set user if it's a valid object with expected properties
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.email) {
          setUser(parsedUser);
        } else {
          // Invalid user data structure
          throw new Error('Invalid user data structure');
        }
      }
    } catch (error) {
      console.error('Error initializing user from localStorage:', error);
      // Clear invalid data from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logOut = async () => {
    setLoading(true);
    try {
      // Call backend logout endpoint if needed
      await axios.post(`${import.meta.env.VITE_API_URL}/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setLoading(false);
    }
  };

  // No longer needed Firebase methods
  const createUser = () => {
    throw new Error("createUser method is no longer supported. Use the register form instead.");
  };

  const signIn = () => {
    throw new Error("signIn method is no longer supported. Use the login form instead.");
  };

  const signInWithGoogle = () => {
    throw new Error("signInWithGoogle method is no longer supported.");
  };

  const updateUserProfile = () => {
    throw new Error("updateUserProfile method is no longer supported.");
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
