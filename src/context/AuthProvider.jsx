import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const autenticarUsuario = async() => {
          const token = localStorage.getItem('token')
          if(!token) {
            return setCargando(false)
          }
    
          const config = {
            headers: {
              "Content-Type": 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
    
          
          try {
              const { data } = await clienteAxios('/usuario/perfil', config)
              setAuth(data)
              // navigate('/proyectos')
          } catch (error) {
              setAuth({})
            console.log(error);
          } finally {
              setCargando(false)
          }
        }
        autenticarUsuario()
    
      }, [])

      const cerrarSesionAuth = () => {
        setAuth({})
      }
  return ( 
  <AuthContext.Provider 
    value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth
    }}
    >
        {children}
    </AuthContext.Provider>)
}

export default AuthContext