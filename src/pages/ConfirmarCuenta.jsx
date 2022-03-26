import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'


const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  const { id } = params

  useEffect( async() => {
    try {
      const url = `/usuario/confirmar/${id}`
      const { data } = await clienteAxios(url)
      setAlerta({
        msg: data.msg,
        error: false
      })
      setCuentaConfirmada(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }, [])
  return (
    <>
     <h1 className="text-sky-600 rounded font-black text-6xl">Confirmar <span className="text-slate-700">Cuenta</span></h1>

     <div className='text-center bg-white p-5 mt-5 '>
       {alerta && <Alerta alerta={alerta} />}

       {cuentaConfirmada && (
         <Link to="/">
          <p className="font-black text-sky-400 hover:text-sky-600 hover:cursor-pointer">Iniciar Sesión</p>
         </Link>
       )}
     </div>
    </>
  )
}

export default ConfirmarCuenta