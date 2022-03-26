import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import useProyecto from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin'

import Tarea from '../components/Tarea'
import MFormularioTarea from '../components/MFormularioTarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import Alerta from '../components/Alerta'
import Colaborador from '../components/Colaborador'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import io from 'socket.io-client'
let socket

const Proyecto = () => {


    const { id } = useParams()

    const { camiarEstadoTareaProyecto, actualizarTareaProyecto, eliminarTareaProyecto ,handleTareasProyecto, obtenerProyecto, proyecto, cargando, handleModalTarea, alerta } = useProyecto()
    useEffect(() => {
        obtenerProyecto(id)
    }, [])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('abrir proyecto', id)
    }, [])

    useEffect(() => {
        socket.on('tarea agregada', (tareaNueva) => {
            if(tareaNueva.proyecto === proyecto._id){
                handleTareasProyecto(tareaNueva)
                
            }
        })

        socket.on('tarea eliminada', tareaEliminada => {
            if(tareaEliminada.proyecto === proyecto._id){
                eliminarTareaProyecto(tareaEliminada)
            }
        })

        socket.on('tarea actualizada', tareaActualizada => {
            if(tareaActualizada.proyecto._id === proyecto._id) {
                actualizarTareaProyecto(tareaActualizada)
            }
        })
        socket.on('estado cambiado', estadoCambiado => {
            if(estadoCambiado.proyecto._id === proyecto._id) {
                camiarEstadoTareaProyecto(estadoCambiado)
            }
        })
    })

    const admin = useAdmin()
    console.log(admin);

    const { nombre } = proyecto
    const { msg } = alerta
  return (
      msg ? <Alerta alerta={alerta} /> : ( 
    <>
        <div>
         
            {cargando ? 'Cargando...' : (
                <div className="flex">
                    <h1 className="flex-1">{nombre}</h1>
                    {admin && (
                    <div className="flex gap-1 text-orange-700 font-bold opacity-60 hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>

                        <Link to={`/proyectos/editar/${id}`}>Editar</Link>
                    </div>
                    )}
                </div>
        )}
        </div>
        {admin && (
         <button onClick={handleModalTarea} className="bg-sky-500 p-2 w-full md:w-auto rounded text-white font-bold flex gap-2 mt-3 items-center justify-center ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
                Tarea
        </button>)}

        <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>

        {msg && <Alerta alerta={alerta} />}

        <div className="bg-white shadow mt-10 rounded-lg">
            {proyecto.tareas?.length ? (
            proyecto.tareas?.map( tarea => (
                <Tarea 
                    key={tarea._id}
                    tarea={tarea}
                /> 
            ))
            ) : <p className="text-center my-5 p-10">No hay tareas en este proyecto</p>}
        </div>
        {admin && (
            <>
                <div className="flex items-center justify-between mt-10">
                    <p className="font-bold text-xl mt-10">Colaboradores</p>

                    <Link
                        to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                        className="text-gray-500 uppercase font-bold"
                    >Añadir</Link>
                </div>
                <div className="bg-white shadow mt-10 rounded-lg">
                    {proyecto.colaboradores?.length ? (
                    proyecto.colaboradores?.map( colaborador => (
                        <Colaborador 
                            key={colaborador._id}
                            colaborador={colaborador}
                        /> 
                    ))
                    ) : <p className="text-center my-5 p-10">No hay colaboradores en este proyecto</p>}
                </div>
                <MFormularioTarea />
                <ModalEliminarTarea />
                <ModalEliminarColaborador />
            </>
            )}
    </>)
  )
}

export default Proyecto