import { createContext, useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import useAuth from '../hooks/useAuth'
let socket

const ProyectosContext = createContext()

export const ProyectosProvider = ({children}) => {

    const [alerta, setAlerta] = useState({})
    const [proyectos, setProyectos] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [tarea, setTarea] = useState({})
    const [tareaEditar, setTareaEditar] = useState({})
    const [colaborador, setColaborador] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormTarea, setModalFormTarea] = useState(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)


    const navigate = useNavigate()

    const { auth } = useAuth()


    useEffect(() => {
        const obtenerProyectos = async() => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }

                }

                const { data } = await clienteAxios('proyecto', config)
                setProyectos(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerProyectos()
    }, [auth])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])
    
    const mostrarAlerta = (datos) => {
        setAlerta(datos)

        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const submitProyecto = async proyecto => {
        if(proyecto.id) {
            await actualizarProyecto(proyecto)
        } else {
            await crearProyecto(proyecto)
        }
    }

    const actualizarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }

            }

            const { data } = await clienteAxios.put(`proyecto/${proyecto.id}`, proyecto, config)
            
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)

            setAlerta({
                msg: 'Proyecto Actualizado',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);


        } catch (error) {
            
        }
    }

    const crearProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }

            }
            const { data } = await clienteAxios.post('/proyecto', proyecto, config)
            setProyectos([...proyectos, data])
            
            setAlerta({
                msg: 'Proyecto creado',
                error: false
            })
            navigate('/proyectos')
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }

            }
            const { data } = await clienteAxios(`/proyecto/${id}`, config)
            setProyecto(data)
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
        setCargando(false)
    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }

            }
            const { data } = await clienteAxios.delete(`/proyecto/${id}`, config)
            
            const proyectosActualizados = proyectos.filter(proyecto => proyecto._id !== id)
            setProyectos(proyectosActualizados)
            setAlerta({
                msg: data.msg,
                error: false
            })

            navigate('/proyectos')
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalTarea = () => {
        setModalFormTarea(!modalFormTarea)
        setTareaEditar({})
    }

    const submitTarea = async tarea => {
        if(tarea?.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }
    }

    const editarTarea = async tarea => {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }

        try {
            const { data } = await clienteAxios.put(`/tarea/${tarea?.id}`, tarea, config)


            
            setAlerta({})
            // socket.io
            socket.emit('actualizar tarea', data)
        } catch (error) {
            console.log(error)
        }


    }

    const crearTarea = async tarea => {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }
        try {
            const { data } = await clienteAxios.post('/tarea', tarea, config)
            setTarea(data)
        
            //socket io    
            socket.emit('nueva tarea', data)
            
        } catch (error) {
            console.log(error)
        }

    

    } 

    const handleModalEditarTarea = (tarea) => {
        

        setTareaEditar(tarea)
        setModalFormTarea(true)
    }

    const handleModalEliminarTarea = (tarea) => {
        setTareaEditar(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async() => {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }

        try {
            const { data } = await clienteAxios.delete(`/tarea/${tareaEditar?._id}`, config)
            setAlerta({
                msg: data.msg,
                error: false
            })


            // const proyectoActualizado = { ...proyecto }
            // proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tareaEditar._id)
            // setProyecto(proyectoActualizado)
            setModalEliminarTarea(false)
            socket.emit('eliminar tarea', tareaEditar)
            setTareaEditar({})
            setTimeout(() => {
                alerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }

    }

    const submitColaborador = async email => {
        setCargando(true)
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }

        try {
            const { data } = await clienteAxios.post('/proyecto/colaboradores', {email}, config)
            setColaborador(data);
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        } finally {
            setCargando(false)
        }
    }

    const agregarColaborador = async email => {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }

        try {
            const { data } = await clienteAxios.post(`/proyecto/colaboradores/${proyecto._id}`, email, config)    
            setAlerta({
                msg: data.msg,
                error: false

            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            setColaborador({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true

            })
        }
    }

    const handleModalEliminarColaborador = colaborador => {
        setColaborador(colaborador);
        setModalEliminarColaborador(!modalEliminarColaborador)
    }

    const eliminarColaborador = async() => {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }
        try {
            const { data } = await clienteAxios.post(`/proyecto/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config)

            const proyectoActualizado = {...proyecto}

            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter
            (colaboradorState => colaboradorState._id !== colaborador._id)

            setProyecto(proyectoActualizado)
            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 2000);

            setColaborador({})
        } catch (error) {
            console.log(error)
        }
    }

    const arTarea = async( tarea ) => {
       
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }

        try {
            const { data } = await clienteAxios.post(`/tarea/estado/${tarea}`, { id: tarea }, config )

            const proyectoActualizado = {...proyecto}
            setTarea({})
            setAlerta({})

            socket.emit('cambiar estado', data)
            
        } catch (error) {
            console.log(error)
        }
    } 

    const handleBuscador = () => {
        setBuscador(!buscador)
    }

    const cerrarSesion = () => {
        setProyectos([])
        setProyecto({})
        setAlerta({})
    }

    //socket io
    const handleTareasProyecto = (tarea) => {
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea]
        setProyecto(proyectoActualizado)
    }
    const eliminarTareaProyecto = ( tareaEditar ) => {
        
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tareaEditar._id)
        setProyecto(proyectoActualizado)
    }
    const actualizarTareaProyecto = ( tarea ) => {
        const proyectoActualizado = { ...proyecto }
            proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === tarea._id ? tarea : tareaState)
            setProyecto(proyectoActualizado)
    }
    const camiarEstadoTareaProyecto = (tarea) => {
        
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }
    return (
        <ProyectosContext.Provider value={{
            mostrarAlerta,
            alerta,
            submitProyecto,
            proyectos,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto,
            modalFormTarea,
            handleModalTarea,
            submitTarea,
            tarea,
            handleModalEditarTarea,
            tareaEditar,
            modalEliminarTarea,
            handleModalEliminarTarea,
            eliminarTarea,
            submitColaborador,
            colaborador,
            agregarColaborador,
            handleModalEliminarColaborador,
            modalEliminarColaborador,
            eliminarColaborador,
            arTarea,
            buscador,
            handleBuscador,
            handleTareasProyecto,
            eliminarTareaProyecto,
            actualizarTareaProyecto,
            camiarEstadoTareaProyecto,
            cerrarSesion
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export default ProyectosContext