import { createContext, useContext, useEffect, useState } from "react";
import {
  generateFakeJWT,
  isTokenValid,
  decodeFakeJWT,
} from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken =
      localStorage.getItem("taskManagerToken") ||
      sessionStorage.getItem("taskManagerToken");

    const savedUsername =
      localStorage.getItem("taskManagerUsername") ||
      sessionStorage.getItem("taskManagerUsername");

    if (savedToken && isTokenValid(savedToken)) {
      setToken(savedToken);

      const decodedToken = decodeFakeJWT(savedToken);

      setUser({
        username: savedUsername || decodedToken?.username,
      });
    } else {
      localStorage.removeItem("taskManagerToken");
      localStorage.removeItem("taskManagerUsername");

      sessionStorage.removeItem("taskManagerToken");
      sessionStorage.removeItem("taskManagerUsername");
    }

    setLoading(false);
  }, []);

  const login = (username, rememberMe) => {
    const newToken = generateFakeJWT(username);

    setToken(newToken);
    setUser({ username });

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem("taskManagerToken", newToken);
    storage.setItem("taskManagerUsername", username);
  };

  const logout = () => {
    localStorage.removeItem("taskManagerToken");
    localStorage.removeItem("taskManagerUsername");

    sessionStorage.removeItem("taskManagerToken");
    sessionStorage.removeItem("taskManagerUsername");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};