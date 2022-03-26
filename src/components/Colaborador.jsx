import useProyectos from "../hooks/useProyectos"

const Colaborador = ({colaborador}) => {

    const { handleModalEliminarColaborador } = useProyectos()
    const { nombre, email } = colaborador
  return (
    <div className="flex justify-between p-2">
        <div>
            <p className="text-xl font-bold">{nombre}</p>
            <p className="text-slate-500">{email}</p>
        </div>

        <button
            type="button"
            onClick={() => handleModalEliminarColaborador(colaborador)}
        >Eliminar</button>
    </div>
  )
}

export default Colaborador