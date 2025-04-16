import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const UserID = () => {

    const { id } = useParams();
  const {isAuthenticated, tokenStorage} = useContext(AuthContext);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchUserById = async () => {

    try {
      const response = await axios.get(`http://localhost:8000/api/users/${id}`, {
        headers: {
          "Authorization": `Bearer ${tokenStorage}`
        }
      });
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (isAuthenticated && tokenStorage) {
      fetchUserById();
    } else {
      setLoading(false);
    }
  }, [id, isAuthenticated, tokenStorage]);
  
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message || "Erreur lors du chargement du profil de l'utilisateur"}</div>;
  
  return (
        <>
        <h1>{user.first_name}</h1>
        <img src={`http://localhost:8000${user.image}`} alt="" className="w-48 h-48 object-cover rounded-full border" />
        </>
  );
};

export default UserID;
