import { useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'



const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  

  const handleSubmit = async(e) => {
    e.preventDefault()

    if([email, setEmail].includes('')) {
      return setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
    }

    try {
      const { data } = await clienteAxios.post('/usuario/login', {email, password})
      
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/proyectos')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  } 

  const {msg} = alerta
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">Inicia Sesión y administra tus <span className="text-slate-700">Proyectos</span></h1>

      <form className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input 
            id="email"
            name="email"
            type="text" 
            placeholder="Ingresa tu email"
            className="w-full mt-3 p-3 border rounded bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">password</label>
          <input 
            id="password"
            name="password"
            placeholder="Ingresa tu password"
            type="password" 
            className="w-full mt-3 p-3 border rounded bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          className="text-white bg-sky-700 p-3 mb-2 w-full font-black hover:bg-sky-800 hover:cursor-pointer transition-colors "
        />
      </form>
      {msg && <Alerta alerta={alerta} />}
        <nav className="lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-xs"
            to="/registrar"
          >
            ¿No tienes una cuenta? Regístrate.
          </Link>

          <Link
            className="block text-center my-5 text-slate-500 uppercase text-xs"
            to="/olvide-password"
          >
            Olvide mi contraseña
          </Link>
        </nav>

    </>
  )
}

export default Login 