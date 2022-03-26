import React from 'react'
import Formulario from '../components/Formulario'

const NuevoProyecto = () => {
  return (
    <>
        <h1 className="font-bold text-2xl">Nuevo Proyecto</h1>

        <div className="flex justify-center">
            <Formulario />
        </div>
    </>
  )
}

export default NuevoProyecto