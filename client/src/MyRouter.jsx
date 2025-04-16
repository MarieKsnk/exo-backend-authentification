import { Routes, Route } from "react-router-dom";
import App from "./App";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AllUsers from "./pages/AllUsers";


const MyRouter = () => {
    return(
        <>
        <NavBar />
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="*" element={<p>404 not found</p>} />
        </Routes>
        </>
    )
}

export default MyRouter;