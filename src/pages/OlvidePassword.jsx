import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"



const OlvidePassword = () => {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState('')
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    if(email === '' || email.length < 4){
      setAlerta({
        msg: 'Ingrese un email válido',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post(`/usuario/olvide-password`, {email})
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">Recupera tu cuenta y administra tus <span className="text-slate-700">Proyectos</span></h1>

      <form className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">email</label>
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

        <input 
          type="submit"
          className="text-white bg-sky-700 p-3 mb-2 w-full font-black hover:bg-sky-800 hover:cursor-pointer transition-colors "
        />

        {msg && <Alerta alerta={alerta} />}
      </form>
        <nav className="lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-xs"
            to="/"
          >
            Inicia sesión
          </Link>
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-xs"
            to="/registrar"
          >
            ¿No tienes una cuenta? Regístrate.
          </Link>
        </nav>

    </>
  )
}

export default OlvidePassword