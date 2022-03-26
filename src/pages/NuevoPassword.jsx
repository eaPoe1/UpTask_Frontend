import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const NuevoPassword = () => {
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [passwordMod, setPasswordMod] = useState(false)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const comprobarToken = async() => {
      try {
        await clienteAxios(`/usuario/olvide-password/${id}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })  
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if(password.length < 6) {
      return setAlerta({
        msg: 'El password es muy corto',
        error: true
      })
    }

    if( password !== repetirPassword){
      return setAlerta({
        msg: 'Los password deben ser iguales',
        error: true
      })
    }

    try {
      const url = `/usuario/olvide-password/${id}`
      
      const { data } = await clienteAxios.post(url, { password })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordMod(true)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  const { msg } = alerta
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">Recupera tu cuenta y administra tus <span className="text-slate-700">Proyectos</span></h1>
      

        {tokenValido && (
          <form className="my-10 bg-white shadow rounded-lg px-10 py-5"
                onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo password</label>
              <input 
                id="password"
                name="password"
                type="text" 
                placeholder="Ingresa tu password"
                className="w-full mt-3 p-3 border rounded bg-gray-50"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">Repite el password</label>
              <input 
                id="password2"
                name="password2"
                type="text" 
                placeholder="Repite tu password"
                className="w-full mt-3 p-3 border rounded bg-gray-50"
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
              />
            </div>
    
            <input 
              type="submit"
              className="text-white bg-sky-700 p-3 mb-2 w-full font-black hover:bg-sky-800 hover:cursor-pointer transition-colors "
            />
          </form>
        )}
        {msg && <Alerta alerta={alerta} />}
        <nav className="lg:flex lg:justify-between">
          { passwordMod && (
            <Link
            className="block text-center my-5 text-slate-500 uppercase text-xs"
            to="/"
            >
              Inicia sesión
            </Link>
          )}
          
        </nav>

    </>
  )
}

export default NuevoPassword