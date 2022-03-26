import {useEffect} from 'react'
import PreviewProyecto from '../components/PreviewProyecto'
import useProyectos from '../hooks/useProyectos'

const Proyectos = () => {

  const { proyectos } = useProyectos()
  
  

  return (
    <>
      <h1 className="font-bold text-2xl">Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length > 0 ? (

          proyectos.map(proyecto => (
            <PreviewProyecto 
              key={proyecto._id}
              proyecto={proyecto} 
            />
          ))
          
        ) : <p>No tienes proyectos</p>} 
        </div>
    </>
  )
}

export default Proyectos