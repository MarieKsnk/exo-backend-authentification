import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const {isAuthenticated, tokenStorage, handleLogin, handleLogout} = useContext(AuthContext);
  
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchUserProfile = async () => {
    console.log("FONCTION DES INFOS USER");
    try {
      const response = await axios.get("http://localhost:8000/api/users/profile", {
        headers: {
          "Authorization": `Bearer ${tokenStorage}`
        }
      });
      if (response.status === 200) {
        setUserProfile(response.data);
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
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, tokenStorage, navigate]);
  
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message || "Erreur lors du chargement du profil"}</div>;
  
  return (
        <>
        {!loading && userProfile && (
            <>
            <h1>Hello, my name is {userProfile.first_name}</h1>
            <img src={`http://localhost:8000${userProfile.image}`} />
            </>
        )}
        </>
  );
};

export default Profile;
