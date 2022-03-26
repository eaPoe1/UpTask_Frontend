import { useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from '../components/Alerta'
import { useParams } from 'react-router-dom'


const Formulario = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [cliente, setCliente] = useState('')
    const [fecha, setFecha] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    const params = useParams()

    useEffect(() => {
        if(params.id){
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setCliente(proyecto.cliente)
            setFecha(proyecto.fechaEntrega?.split('T')[0])
            setDescripcion(proyecto.descripcion)
        }
    }, [params])


    const handleSubmit = async e => {
        e.preventDefault()

        if([nombre, cliente, fecha, descripcion].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        await submitProyecto({id, nombre, cliente, fecha, descripcion})

        setId(null)
        setNombre('')
        setCliente('')
        setFecha('')
        setDescripcion('')
    }

    const { msg } = alerta
  return (
    <form 
        onSubmit={handleSubmit}
        className="bg-white py-10 mt-5 px-5 rounded-lg shadow-md3"
    >
        {msg && <Alerta alerta={alerta}/>}
        <div>
            <label htmlFor="nombre"
                   className="text-gray-700 uppercase font-bold text-sm" 
                   >Nombre Proyecto</label>

            <input 
                type="text" 
                name="nombre" 
                id="nombre" 
                className="border-2 w-full p-2 mt-2 rounded-md" 
                placeholder="Nombre del proyecto" 
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>   

        <div className="mt-5">
            <label htmlFor="cliente"
                   className="text-gray-700 uppercase font-bold text-sm" 
                   >Nombre Cliente</label>

            <input 
                type="text" 
                name="cliente" 
                id="cliente"
                className="border-2 w-full p-2 mt-2 rounded-md"
                placeholder="Nombre del cliente"
                value={cliente}
                onChange={e => setCliente(e.target.value)}
            />
        </div> 

        <div className="mt-5">
            <label htmlFor="fecha-entrega"
                   className="text-gray-700 uppercase font-bold text-sm" 
                   >Entrega</label>

            <input 
                type="date" 
                name="fecha-entrega" 
                id="fecha-entrega" 
                className="border-2 w-full p-2 mt-2 rounded-md" 
                placeholder="Fecha de entrega"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
            />
        </div> 

        <div className="mt-5">
            <label htmlFor="Descripcion"
                   className="text-gray-700 uppercase font-bold text-sm" 
                   >Descripción</label>

            <textarea 
                name="descripcion" 
                id="descripcion" 
                className="border-2 w-full p-2 mt-2 rounded-md" 
                placeholder="Descripción" 
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
        </div> 

        <input 
            type="submit" 
            value={id ? 'Guardar Cambios' : 'Crear Proyecto'} 
            className="bg-sky-600 text-white w-full mt-5 p-2 font-bold rounded-lg hover:cursor-pointer hover:bg-sky-700 transition-colors"
        />
    </form>
  )
}

export default Formulario