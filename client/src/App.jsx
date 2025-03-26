import './App.css'
import { useContext } from 'react'
import { ServicesContext } from './context/servicesContext'

function App() {

  const [services, setServices] = useContext(ServicesContext)

  return (
    <>
    <h1 class="text-10xl font-bold underline">Hello, this is my event app</h1>
    <div className="flex justify-center flex-wrap p-7 m-7" >
    {services && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services && services.map(service => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="text-gray-800 font-medium mb-2">
                Prix : {service.price} €
              </p>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  )
}

export default App
