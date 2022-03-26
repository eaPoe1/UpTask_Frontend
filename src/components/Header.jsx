import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAuth from "../hooks/useAuth"
import Busqueda from "./Busqueda"

const Header = () => {

    const { handleBuscador, cerrarSesion } = useProyectos()
    const { cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesion()
        cerrarSesionAuth()
        localStorage.removeItem('token')
    }
  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between text-center">
            <h2 className="text-4xl text-sky-600 font-black mb-2 md:m-0">
                UpTask
            </h2>


            <div className="flex flex-col md:flex-row items-center gap-4">
                <button
                    type="button"
                    onClick={handleBuscador}
                >Buscar Proyecto</button>
                <Link
                    to="/proyectos"
                    className="font-bold text-xl"
                >Proyectos</Link>

                <button onClick={handleCerrarSesion} type="submit" className="bg-sky-600 p-3 rounded-md font-bold text-white hover:bg-sky-800 transition-colors">
                    Cerrar Sesión

                </button>

                <Busqueda />
            </div>
        </div>
    </header>
  )
}

export default Header