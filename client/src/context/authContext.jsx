import { useState, createContext } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthController = ({children}) => {
    let navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleLogin = async (e, email, password) => {
        e.preventDefault()
        console.log('handleLogin appele avec :', email, password)

        try{
            const response = await axios.post('http://localhost:8000/api/login', {email, password})
            console.log('api response :', response)

            if(response.status === 200){
                localStorage.setItem('token', response.data.token)
                setIsAuthenticated(true)
                alert(response.data.message)
                navigate('/')
            }

        } 
        catch(err){
            console.error("Erreur dans le handleLogin:", err)
            alert('Echec connexion')
        }
    }

    return(
        <AuthContext.Provider value={[isAuthenticated, handleLogin]}>
            {children}
        </AuthContext.Provider>
    )
}