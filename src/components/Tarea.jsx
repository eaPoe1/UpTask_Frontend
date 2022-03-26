
import useProyectos from '../hooks/useProyectos'
import { formatearFecha } from '../helpers'
import useAdmin from '../hooks/useAdmin'

const Tarea = ({ tarea }) => {

    const admin = useAdmin()

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()
    const { nombre, descripcion, fechaEntrega, prioridad  } = tarea
  return (
    <div className="flex border-y justify-between">
        <div className="w-auto gap-1 mx-2">
            <p className="mb-1 text">{nombre}</p>
            <p className="mb-1 text-sm">{descripcion}</p>
            <p className="mb-1 text">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
            {tarea.estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white font-bold text-center mb-2">Completado: {tarea.completado.nombre}</p>}
        </div>
        <div className="flex items-center gap-2 mx-2">
          
            <button
              className={`${tarea.estado ? 'bg-green-600' : 'bg-gray-600'} font-bold text-white text-sm rounded hover:cursor-pointer hover:opacity-80 p-2`}
              onClick={() => completarTarea(tarea._id)}
            >{tarea.estado ? 'Completa' : 'Incompleta'}</button>

           {admin && (
          <button
            className="bg-orange-600 font-bold text-white text-sm rounded hover:cursor-pointer hover:opacity-80 p-2"
            onClick={() => handleModalEditarTarea(tarea)}
          >Editar</button>)}
           {admin && (
          <button
            className="bg-red-600 font-bold text-white text-sm rounded hover:cursor-pointer hover:opacity-80 p-2"
            onClick={() => handleModalEliminarTarea(tarea)}
          >Eliminar</button>)}
        </div>
    </div>
  )
}

export default Tarea