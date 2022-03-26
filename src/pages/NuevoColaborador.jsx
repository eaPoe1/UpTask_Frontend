import { useEffect } from 'react'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'

const NuevoColaborador = () => {

    const { obtenerProyecto, proyecto, colaborador, cargando, agregarColaborador, alerta } = useProyectos()
    const params = useParams()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    if(!proyecto?._id) return <Alerta alerta={alerta} />
  return (
    <div>
        <h1 className="text-2xl font-bold ">Añadir Colaborador <span className="text-xl text-gray-500">{proyecto.nombre}</span></h1>

        <div className="flex justify-center mt-5">
            <FormularioColaborador />
        </div>

        {cargando ? <p className="text-center">Cargando...</p> : colaborador?._id && (
          <div className="bg-white rounded flex justify-center mt-10 shadow">
            <div className="p-5 w-full text-center">
              <h1 className="text-xl">Resultado</h1>

              <div className="mt-5 flex justify-between w-full">
                <p>{colaborador.nombre}</p>

                <button
                  type="button"
                  className="bg-slate-500 font-bold text-sm text-white p-2 rounded hover:bg-slate-600 transition-colors"
                  onClick={() => agregarColaborador({
                    email: colaborador.email
                  })}
                >Agregar</button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default NuevoColaborador