import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth'


const PreviewProyecto = ({proyecto}) => {
    const { nombre, cliente, _id, creador } = proyecto
    const { auth } = useAuth()
  return (
    <div className="border-y p-5 flex flex-col md:flex-row justify-start hover:bg-slate-100 md:justify-between">
      <div className="flex gap-1 p-0 justify-center">

        <p className="text-gray-400 text-sm flex-1"><span className="text-black text-xl capitalize font-bold">{nombre} {''}</span>{cliente} </p>

        {auth._id !== creador && (
          <p className="text-sm font-bold text-white rounded-lg p-1 bg-green-500">Colaborador</p>
        )}
      </div>
        <Link
            className="text-gray-600 w-fit font-bold hover:text-gray-700"
            to={`/proyectos/${_id}`}
        >Ver Proyecto</Link>
    </div> 
    
  )
}

export default PreviewProyecto