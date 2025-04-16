import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthController = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenStorage, setTokenStorage] = useState(localStorage.getItem("token") || null);
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
      setTokenStorage(storedToken);
    }
  }, []);
  
  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    console.log("Tentative de connexion avec :", email, password);
    try {
      const response = await axios.post("http://localhost:8000/api/login", { email, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setTokenStorage(response.data.token);
        setIsAuthenticated(true);
        alert(response.data.message);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Échec de la connexion");
    }
  };
  
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setTokenStorage(null);
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <AuthContext.Provider value={{isAuthenticated, tokenStorage, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};
