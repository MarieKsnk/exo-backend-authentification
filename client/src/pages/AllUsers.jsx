import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AllUsers = () => {

  const navigate = useNavigate();
  const {isAuthenticated, tokenStorage} = useContext(AuthContext);
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchAllUsers = async () => {

    try {
      const response = await axios.get("http://localhost:8000/api/users", {
        headers: {
          "Authorization": `Bearer ${tokenStorage}`
        }
      });
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (tokenStorage) {
      fetchAllUsers();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, tokenStorage, navigate]);
  
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message || "Erreur lors du chargement des utilisateurs"}</div>;
  
  return (
        <>
        {!loading && users && users.map(user => {
            return (
                <>
                <h2 key={user._id} onClick={() => navigate(`/users/${user._id}`)} className="cursor-pointer text-indigo-600 hover:underline" >
                    {user.first_name}
                </h2>
                </>
            )
        })}
        </>
  );
};

export default AllUsers;
