import React from 'react'
import YourComponent from './pages/ngo'
import MapComponent from './pages/map'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WebcamStream from './pages/camera'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/a' element={<YourComponent/>}/>
      <Route path='/b' element={<MapComponent/>}/>
      <Route path='/c' element={<WebcamStream/>}/>
    </Routes>
    </BrowserRouter>
     
    </>
   
  )
}

export default App
