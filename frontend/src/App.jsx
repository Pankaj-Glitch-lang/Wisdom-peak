import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './component/Home'
import { Route, Routes } from 'react-router-dom'
import Detailspage from './component/Detailspage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/user/:id' element={<Detailspage/>}/>
     </Routes>
  
    </>
  )
}

export default App
