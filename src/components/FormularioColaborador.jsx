import {useState} from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioColaborador = () => {
    const [email, setEmail] = useState('')
    
    const { alerta, mostrarAlerta, submitColaborador } = useProyectos()

    const handleSubmit = e => {
        e.preventDefault()

        if(email === '') {
            mostrarAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return

        }
        submitColaborador(email)
    }

    const { msg } = alerta

  return (
    <form className="w-96 bg-white rounded shadow py-8 px-5"
        onSubmit={handleSubmit}
    >
        {msg && <Alerta alerta={alerta} />}
        <div className="my-3">
            <label htmlFor="nombre" className="uppercase text-gray-500 font-bold">Nombre</label>
            <input 
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre de la tarea"
                className="w-full border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <input 
            type="submit" 
            className="bg-sky-600 p-2 text-white font-bold w-full mt-1 hover:bg-sky-700 cursor-pointer transition-colors"
            value='Buscar colaborador'
        />
    </form>
  )
}

export default FormularioColaborador