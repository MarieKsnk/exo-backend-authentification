import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {

  const [services, setServices] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  const fetchServices = async () => {
    try{
      const response = await axios.get('http://localhost:8000/api/services')
      if(response.status === 200){
        setServices(response.data)
      }

    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  })

  return (
    <>
    <h1 class="text-10xl font-bold underline">Hello, this is my event app</h1>
    {services && !loading && services.map(service => {
      return(
        <>
        <div>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <p>{service.price}</p>
        </div>
        </>
      )
    }) }
    </>
  )
}

export default App
