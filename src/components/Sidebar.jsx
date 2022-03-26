import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
      <aside className="xl:w-1/3 md:w-1/4 px-5 py-10 border-b-2 md:border-r-2">
          <p className="text-xl font-bold">Hola: Matias</p>

          <Link
            to="crear-proyecto"
            className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md hover:bg-sky-800 transition-colors"
          >Nuevo Proyecto</Link>
      </aside>
  )
}

export default Sidebar