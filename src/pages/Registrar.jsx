import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})


  const handleSubmit = async(e) => {
    e.preventDefault()

    if([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: 'Los password no son iguales',
        error: true
      })
      return
    }

    if(password.length < 6) {
      setAlerta({
        msg: 'El password es muy corto',
        error: true
      })
      return
    }

    setAlerta({})

    try {
      const {data} = await clienteAxios.post(`/usuario`, {
        nombre, email, password
      })
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">Crea tu cuenta y administra tus <span className="text-slate-700">Proyectos</span></h1>



      <form className="my-10 bg-white shadow rounded-lg px-10 py-5"
            onSubmit={handleSubmit}
      >
        
        <div className="my-5">
          <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">nombre</label>
          <input 
            id="nombre"
            name="nombre"
            type="text" 
            placeholder="Ingresa tu nombre"
            className="w-full mt-3 p-3 border rounded bg-gray-50"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div><div className="my-5">
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
        <div className="my-5">
          <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">repite tu password</label>
          <input 
            id="password2"
            name="password2"
            placeholder="Repite tu password"
            type="password" 
            className="w-full mt-3 p-3 border rounded bg-gray-50"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          value="Crear Cuenta"
          className="text-white bg-sky-700 p-3 mb-2 w-full font-black hover:bg-sky-800 hover:cursor-pointer transition-colors "
        />
      {msg && <Alerta alerta={alerta}/>}

      </form>
        <nav className="lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-xs"
            to="/"
          >
            ¿Ya tienes una cuenta? Inicia Sesión.
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

export default Registrar