import { Link } from "react-router-dom"
import { useContext } from "react"
import { ServicesContext } from "../context/servicesContext"
import { AuthContext } from "../context/authContext"

const NavBar = () => {
    const [services] = useContext(ServicesContext)
    const {isAuthenticated, setIsAuthenticated, handleLogout} = useContext(AuthContext)
    return(
        <>
        
        <ul className="bg-gray-200 flex justify-center space-x-4">
        <h3>Hello there is {services.length} events</h3>
            <Link to="/"><li>Home</li></Link>
            <Link to="/users"><li>All users</li></Link>
            {!isAuthenticated ? (
                <>
                <Link to="/inscription"><li>Register</li></Link>
                <Link to="/login"><li>Login</li></Link>
                </>
            )
            
            : (
                <>
                <Link to="/profile"><li>Profile</li></Link>
                <Link onClick={handleLogout}><li>Logout</li></Link>
                </>
            )}
        </ul>
        </>
    )
}

export default NavBar