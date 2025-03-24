import { Link } from "react-router"

const NavBar = () => {
    return(
        <>
        <ul class="bg-gray-200 flex justify-center space-x-4">
            <Link to="/"><li>Home</li></Link>
            <Link to="/profile"><li>Profile</li></Link>
            <li>Contact</li>
            <Link to="/inscription"><li>S'inscire</li></Link>
        </ul>
        </>
    )
}

export default NavBar